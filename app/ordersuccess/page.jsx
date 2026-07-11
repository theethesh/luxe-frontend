"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OrderSuccess = () => {
  const router = useRouter();

  return (
  <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-5 py-10">

    <div className="max-w-2xl w-full bg-[#1A1D23] border border-[#D4AF37]/20 rounded-3xl shadow-[0_0_35px_rgba(212,175,55,0.15)] p-10 text-center">

      {/* Success Icon */}
      <div className="mx-auto w-28 h-28 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center animate-pulse">
        <span className="text-6xl">✅</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mt-8">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-300 mt-5 text-lg">
        Thank you for shopping with us.
      </p>

      <p className="text-gray-500 mt-2">
        Your order has been confirmed and is now being processed.
      </p>

      {/* Order Details */}
      <div className="mt-10 bg-[#111317] border border-[#D4AF37]/20 rounded-2xl p-6 space-y-5 text-left">

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-300">
            📦 Order Status
          </span>

          <span className="text-[#D4AF37] font-bold">
            Confirmed
          </span>
        </div>

        <div className="border-t border-[#D4AF37]/10 pt-4 flex justify-between items-center">
          <span className="font-semibold text-gray-300">
            🚚 Delivery
          </span>

          <span className="text-white">
            Within 3–5 Days
          </span>
        </div>

        <div className="border-t border-[#D4AF37]/10 pt-4 flex justify-between items-center">
          <span className="font-semibold text-gray-300">
            💳 Payment
          </span>

          <span className="text-[#D4AF37] font-bold">
            Successful
          </span>
        </div>

      </div>

      {/* Success Message */}
      <div className="mt-8 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-5">

        <p className="text-gray-300 leading-7">
          🎉 Your order has been received successfully.
          You can track the delivery status anytime from
          <span className="text-[#D4AF37] font-semibold">
            {" "}My Orders
          </span>.
        </p>

      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-2 gap-5 mt-10">

        <button
          onClick={() => router.push("/")}
          className="bg-[#D4AF37] hover:bg-[#F5D76E] text-black py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
        >
          🛍 Continue Shopping
        </button>

        <button
          onClick={() => router.push("/myorders")}
          className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-4 rounded-xl text-lg font-bold transition-all duration-300"
        >
          📄 View My Orders
        </button>

      </div>

    </div>

  </div>
);
};

export default OrderSuccess;