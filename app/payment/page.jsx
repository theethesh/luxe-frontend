"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleContinue = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Store selected payment method
    sessionStorage.setItem("paymentMethod", paymentMethod);

    router.push("/revieworder");
  };
return (
  <div className="min-h-screen bg-[#0F1115] text-white">

    {/* Header */}
    <div className="border-b border-[#D4AF37]/20 bg-[#15181E]">
      <div className="max-w-5xl mx-auto px-5 py-12">

        <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
          💳 Payment Method
        </h1>

        <p className="mt-3 text-gray-400">
          Choose your preferred payment option
        </p>

      </div>
    </div>

    <div className="max-w-4xl mx-auto px-5 py-10">

      <div className="space-y-5">

        {/* Cash On Delivery */}
        <label
          className={`cursor-pointer rounded-2xl border p-6 bg-[#1A1D23] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]
          ${
            paymentMethod === "Cash On Delivery"
              ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              : "border-[#D4AF37]/20"
          }`}
        >
          <div className="flex items-center gap-5">

            <input
              type="radio"
              name="payment"
              value="Cash On Delivery"
              checked={paymentMethod === "Cash On Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-[#D4AF37]"
            />

            <div className="text-5xl">💵</div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Cash On Delivery
              </h2>

              <p className="text-gray-400 mt-1">
                Pay when your order arrives.
              </p>
            </div>

          </div>
        </label>

        {/* UPI */}
        <label
          className={`cursor-pointer rounded-2xl border p-6 bg-[#1A1D23] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]
          ${
            paymentMethod === "UPI"
              ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              : "border-[#D4AF37]/20"
          }`}
        >
          <div className="flex items-center gap-5">

            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-[#D4AF37]"
            />

            <div className="text-5xl">📱</div>

            <div>
              <h2 className="text-xl font-bold text-white">
                UPI Payment
              </h2>

              <p className="text-gray-400 mt-1">
                Google Pay, PhonePe, Paytm & more.
              </p>
            </div>

          </div>
        </label>

        {/* Debit Card */}
        <label
          className={`cursor-pointer rounded-2xl border p-6 bg-[#1A1D23] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]
          ${
            paymentMethod === "Debit Card"
              ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              : "border-[#D4AF37]/20"
          }`}
        >
          <div className="flex items-center gap-5">

            <input
              type="radio"
              name="payment"
              value="Debit Card"
              checked={paymentMethod === "Debit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-[#D4AF37]"
            />

            <div className="text-5xl">💳</div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Debit Card
              </h2>

              <p className="text-gray-400 mt-1">
                Visa, RuPay & Mastercard.
              </p>
            </div>

          </div>
        </label>

        {/* Credit Card */}
        <label
          className={`cursor-pointer rounded-2xl border p-6 bg-[#1A1D23] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]
          ${
            paymentMethod === "Credit Card"
              ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              : "border-[#D4AF37]/20"
          }`}
        >
          <div className="flex items-center gap-5">

            <input
              type="radio"
              name="payment"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-[#D4AF37]"
            />

            <div className="text-5xl">🏦</div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Credit Card
              </h2>

              <p className="text-gray-400 mt-1">
                Secure online card payment.
              </p>
            </div>

          </div>
        </label>

      </div>

      {/* Security Notice */}
      <div className="mt-8 bg-[#1A1D23] border border-[#D4AF37]/20 rounded-2xl p-5">

        <p className="text-[#D4AF37] font-semibold">
          🔒 Your payment is protected with secure encryption.
        </p>

      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full mt-8 bg-[#D4AF37] hover:bg-[#F5D76E] text-black py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.02]"
      >
        Continue to Review →
      </button>

    </div>

  </div>
);
};

export default Payment;