"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DealsSection = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDeals();
  }, []);

  const getDeals = async () => {
    try {
      const res = await axios.get("http://localhost:4006/api/getproduct");

      // Demo: first 4 products as deals
      setProducts(res.data.data.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-bold">
          🔥 Today's Deals
        </h2>

        <button className="text-orange-500 font-semibold">
          View All →
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >

            <div className="relative">

              <img
                src={item.thumbnail}
                className="w-full h-56 object-cover"
              />

              <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                30% OFF
              </span>

            </div>

            <div className="p-5">

              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

              <p className="text-orange-500 text-2xl font-bold mt-3">
                ₹ {item.price}
              </p>

              <button
                onClick={() => router.push(`/viewcart/${item._id}`)}
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
              >
                Shop Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default DealsSection;