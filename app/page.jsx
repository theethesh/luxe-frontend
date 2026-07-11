"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Productpage = () => {
  const [category, setCategory] = useState([]);
  const router = useRouter();

  const getcategory = async () => {
    try {
      const res = await axios.get("http://localhost:4006/api/getproduct");

      const unique = [
        ...new Map(
          res.data.data.map((item) => [
            item.category,
            {
              category: item.category,
              image: item.thumbnail,
            },
          ])
        ).values(),
      ];

      setCategory(unique);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">

      {/* Hero Banner */}
      <div className="relative h-[260px] md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
          alt="Banner"
          className="w-full h-full object-cover brightness-50"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#D4AF37]">
            Premium Shopping
          </h1>

          <p className="mt-4 text-gray-200 text-center px-5">
            Discover top brands, exclusive collections & premium quality products.
          </p>

          <button className="mt-6 bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition">
            Explore Now
          </button>
        </div>
      </div>

      {/* Category Section */}
      <div className="max-w-7xl mx-auto px-5 py-14">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#D4AF37]">
          Shop By Category
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-12">
          Browse premium collections curated just for you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">

          {category.map((item) => (
            <div
              key={item.category}
              onClick={() => router.push(`/categorywise/${item.category}`)}
              className="bg-[#1A1D23] border border-[#D4AF37]/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >

              <div className="overflow-hidden">
                <img

                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:4006/${item.image}`
                      : "/no-image.png"
                  }
                  alt={item.category}
                  className="w-full h-56 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5 text-center">

                <h3 className="text-xl font-bold capitalize text-white">
                  {item.category}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Premium Quality Products
                </p>

                <button className="mt-5 w-full bg-[#D4AF37] text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition">
                  Shop Now
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Productpage;