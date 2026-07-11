"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewCart = () => {
  const [detail, setDetail] = useState(null);
  const router = useRouter();
  const { id } = useParams();


  const getview = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4006/api/viewdetail/${id}`
      );

      console.log(res.data.details);
      setDetail(res.data.details);

    } catch (error) {
      console.log(error.message);
    }
  };


  const addcart = async () => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      alert("please login first")
      router.push("/login")
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4006/api/addcart",
        {
          productid: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        }
      );

      alert(res.data.message);
      console.log(res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (id) getview();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0F1115] py-10 px-5">

      <div className="max-w-7xl mx-auto bg-[#1A1D23] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)]">

        <div className="grid lg:grid-cols-2 gap-10 p-10">

          {/* Product Image */}
          <div className="flex justify-center items-center">

            <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-3xl p-8 hover:border-[#D4AF37] transition">
              <img
                src={
                  detail?.thumbnail
                    ? detail.thumbnail.startsWith("http")
                      ? detail.thumbnail
                      : `http://localhost:4006/${detail.thumbnail}`
                    : "/no-image.png"
                }
                alt={detail?.title}
                className="w-[450px] h-[450px] object-contain hover:scale-105 transition duration-500"
              />

            </div>

          </div>

          {/* Product Details */}
          <div>

            <span className="bg-[#D4AF37] text-black px-4 py-2 rounded-full font-bold">
              ⭐ Bestseller
            </span>

            <h1 className="text-4xl font-bold text-white mt-6">
              {detail?.title}
            </h1>

            <div className="flex items-center gap-4 mt-5">

              <span className="bg-[#D4AF37] text-black px-3 py-1 rounded-lg font-semibold">
                ⭐ {detail?.rating}
              </span>

              <span className="text-gray-400">
                1,250 Reviews
              </span>

            </div>

            <div className="mt-8">

              <span className="text-4xl font-bold text-[#D4AF37]">
                ₹ {detail?.price}
              </span>

              <span className="ml-4 text-xl text-gray-500 line-through">
                ₹ {Math.round(detail?.price * 1.3)}
              </span>

              <span className="ml-4 text-green-400 font-bold">
                30% OFF
              </span>

            </div>

            {/* Description */}

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
                Description
              </h2>

              <p className="text-gray-300 leading-8">
                {detail?.description}
              </p>

            </div>

            {/* Features */}

            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-center text-gray-300">
                ✅ Free Delivery
              </div>

              <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-center text-gray-300">
                🔄 7 Days Replacement
              </div>

              <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-center text-gray-300">
                🔒 Secure Payment
              </div>

              <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-center text-gray-300">
                🏆 Premium Quality
              </div>

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-5 mt-10">

              <button
                onClick={addcart}
                className="bg-[#D4AF37] hover:bg-[#F5D76E] text-black py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() => {
                  addcart();
                  router.push("/cart");
                }}
                className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                ⚡ Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewCart;