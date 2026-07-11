"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryWise = () => {
  const { category } = useParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);

  const productsummary = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4006/api/categoryproduct/${category}`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (category) {
      productsummary();
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">

      {/* Header */}
      <div className="border-b border-[#D4AF37]/20 bg-[#15181E]">
        <div className="max-w-7xl mx-auto px-5 py-12">

          <h1 className="text-4xl md:text-5xl font-bold capitalize text-[#D4AF37]">
            {category}
          </h1>

          <p className="text-gray-400 mt-3">
            Discover premium collections curated just for you.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

          <h2 className="text-2xl font-bold">
            <span className="text-[#D4AF37]">
              {products?.products?.length || 0}
            </span>{" "}
            Products Found
          </h2>

          <span className="bg-[#D4AF37] text-black px-5 py-2 rounded-full font-bold capitalize">
            {category}
          </span>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {products?.products?.map((item) => (

            <div
              key={item._id}
              className="bg-[#1A1D23]
              border border-[#D4AF37]/20
              rounded-2xl
              overflow-hidden
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-[#D4AF37]
              hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
            >

              <div className="overflow-hidden relative">
                <img
                  src={
                    item.thumbnail
                      ? item.thumbnail.startsWith("http")
                        ? item.thumbnail
                        : `http://localhost:4006/${item.thumbnail}`
                      : "/no-image.png"
                  }
                  alt={item.title}
                  className="w-full h-64 object-cover transition duration-500 hover:scale-110"
                />

                <span className="absolute top-4 left-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-bold">
                  Premium
                </span>

              </div>

              <div className="p-5">

                <h2 className="text-xl font-bold text-white line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-gray-400 mt-2 text-sm">
                  Premium Quality Product
                </p>

                <div className="flex items-center mt-4">

                  <span className="bg-[#D4AF37] text-black px-2 py-1 rounded text-sm font-bold">
                    ⭐ 4.8
                  </span>

                  <span className="ml-3 text-gray-500 text-sm">
                    (250 Reviews)
                  </span>

                </div>

                <div className="mt-5 flex items-center">

                  <span className="text-3xl font-bold text-[#D4AF37]">
                    ₹{item.price}
                  </span>

                  <span className="ml-3 text-gray-500 line-through">
                    ₹{Math.round(item.price * 1.3)}
                  </span>

                </div>

                <button
                  onClick={() => router.push(`/viewcart/${item._id}`)}
                  className="w-full mt-6 bg-[#D4AF37] text-black py-3 rounded-xl font-bold hover:bg-[#F5D76E] transition-all duration-300"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default CategoryWise;