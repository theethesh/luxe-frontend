"use client";

import { API_URL } from "@/lib/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Landmark,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle,
  Shield,
  Zap,
  Diamond,
  Sparkles,
  Crown,
  Gift,
  Star,
  Gem,
  Infinity,
  Clock
} from "lucide-react";
import { useApp } from "../contaxt/authcontaxt";

const Payment = () => {
  const router = useRouter();
  const { cartTotal, fetchCart } = useApp();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressId, setAddressId] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("addressId");
    if (id) {
      setAddressId(id);
    } else {
      setError("No address selected. Please go back and select an address.");
    }

    // Cart total now comes from the global context (already loaded on
    // app start / login) instead of a duplicate axios call here. A single
    // refresh keeps it current in case items changed on another tab.
    fetchCart();

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    if (!addressId) {
      setError("No address selected. Please go back and select an address.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (paymentMethod === "Cash On Delivery") {
      localStorage.setItem("paymentMethod", paymentMethod);
      router.push("/revieworder");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const { data } = await axios.post(
        `${API_URL}/api/createorder`,
        { addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order created:", data);

      localStorage.setItem("paymentMethod", paymentMethod);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TCx1jgrN7i49CW",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "LUXE Store",
        description: `Order Payment - ${paymentMethod}`,
        image: "/logo.png",
        handler: async function (response) {
          try {
            console.log("Payment successful:", response);
            
            const verifyRes = await axios.post(
              `${API_URL}/api/verifypayment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                addressId,
                paymentMethod,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Payment verified:", verifyRes.data);
            
            const orders = JSON.parse(localStorage.getItem("orders") || "[]");
            const newOrder = {
              id: `LUX${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              total: data.amount / 100,
              date: new Date().toLocaleString(),
              status: "Paid",
              paymentMethod: paymentMethod,
            };
            orders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(orders));

            alert("Payment Successful! 🎉");
            router.push("/ordersuccess");
          } catch (err) {
            console.error("Payment verification error:", err);
            setError("Payment verification failed. Please try again.");
            setIsLoading(false);
          }
        },
        prefill: {
          name: data.userName || "",
          email: data.userEmail || "",
          contact: data.userMobile || "",
        },
        notes: {
          address: addressId,
          paymentMethod: paymentMethod,
        },
        theme: {
          color: "#8B5CF6",
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            setError("Payment cancelled. Please try again.");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      console.error("Order creation error:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  const paymentOptions = [
    {
      id: "Cash On Delivery",
      icon: Wallet,
      emoji: "💵",
      title: "Cash On Delivery",
      description: "Pay when your order arrives.",
      color: "from-green-400/20 to-green-500/20",
      border: "border-green-500/20",
      text: "text-green-400"
    },
    {
      id: "UPI",
      icon: Smartphone,
      emoji: "📱",
      title: "UPI Payment",
      description: "Google Pay, PhonePe, Paytm & more.",
      color: "from-blue-400/20 to-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-400"
    },
    {
      id: "Debit Card",
      icon: CreditCard,
      emoji: "💳",
      title: "Debit Card",
      description: "Visa, RuPay & Mastercard.",
      color: "from-purple-400/20 to-purple-500/20",
      border: "border-purple-500/20",
      text: "text-purple-400"
    },
    {
      id: "Credit Card",
      icon: Landmark,
      emoji: "🏦",
      title: "Credit Card",
      description: "Secure online card payment.",
      color: "from-orange-400/20 to-orange-500/20",
      border: "border-orange-500/20",
      text: "text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-1/3 -right-1/3 w-[600px] h-[600px] bg-[#8B5CF6]/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/3 -left-1/3 w-[600px] h-[600px] bg-[#A855F7]/[0.015] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/[0.01] rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-[#8B5CF6]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-[#A855F7]/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#8B5CF6]/15 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#A855F7]/10 rounded-full blur-lg animate-float-slow-delayed"></div>
        
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8B5CF6 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto relative">
        
        {/* ===== BACK BUTTON ===== */}
        <button
          onClick={() => router.back()}
          className="group mb-8 flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
        >
          <div className="p-2 rounded-full bg-white/[0.015] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
        </button>

        {/* ===== PAGE HEADER ===== */}
        <div className="mb-10 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Payment</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Payment <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Method</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#8B5CF6]" />
                <span>Choose your preferred payment option</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/[0.015] px-6 py-3.5 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Total</p>
                <p className="text-xl font-light text-[#8B5CF6] group-hover:scale-105 transition-transform duration-500">
                  ₹{cartTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ERROR MESSAGE ===== */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl backdrop-blur-sm animate-shake">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-white/60 text-sm font-light tracking-wide">{error}</span>
            </div>
          </div>
        )}

        {/* ===== PAYMENT OPTIONS ===== */}
        <div className="space-y-3 animate-fadeInUp">
          {paymentOptions.map((option, index) => {
            const isSelected = paymentMethod === option.id;

            return (
              <label
                key={option.id}
                className={`group cursor-pointer rounded-xl border bg-[#12121A] p-5 transition-all duration-500 hover:-translate-y-0.5 relative overflow-hidden
                ${
                  isSelected
                    ? `border-[#8B5CF6]/30 shadow-[0_20px_60px_rgba(139,92,246,0.04)]`
                    : "border-white/5 hover:border-[#8B5CF6]/15"
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={isSelected}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setError("");
                    }}
                    className="w-4 h-4 accent-[#8B5CF6] cursor-pointer"
                  />

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-2xl border ${option.border} group-hover:scale-110 transition-transform duration-500`}>
                    {option.emoji}
                  </div>

                  <div className="flex-1">
                    <h2 className={`text-base font-light text-white group-hover:text-[#8B5CF6] transition-colors duration-300 tracking-tight ${isSelected ? 'text-[#8B5CF6]' : ''}`}>
                      {option.title}
                    </h2>
                    <p className="text-white/15 text-[10px] font-light tracking-wide">
                      {option.description}
                    </p>
                  </div>

                  {isSelected && (
                    <CheckCircle className="w-4 h-4 text-[#8B5CF6] animate-bounce flex-shrink-0" />
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {/* ===== SECURITY NOTICE ===== */}
        <div className="mt-6 bg-[#12121A] border border-white/5 rounded-xl p-5 transition-all duration-500 hover:border-[#8B5CF6]/10 animate-fadeInUp">
          <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
            <div className="p-2.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex-shrink-0">
              <Lock className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-light tracking-wide">
                🔒 Your payment is protected with secure encryption.
              </p>
              <p className="text-white/10 text-[10px] mt-0.5 font-light tracking-wide">
                All transactions are secure and encrypted
              </p>
            </div>
          </div>
        </div>

        {/* ===== CONTINUE BUTTON ===== */}
        <button
          onClick={handleContinue}
          disabled={isLoading || !razorpayLoaded}
          className="w-full mt-6 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(139,92,246,0.12)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border border-white/5 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : paymentMethod === "Cash On Delivery" ? (
            <>
              <span>Continue to Review</span>
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          ) : (
            <>
              <span>Pay ₹{cartTotal.toLocaleString()}</span>
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>

        {/* ===== SELECTED METHOD DISPLAY ===== */}
        {paymentMethod && (
          <div className="mt-3 text-center animate-fadeInUp">
            <p className="text-[9px] text-white/10 font-light tracking-wider">
              Selected: <span className="text-[#8B5CF6] font-light">{paymentMethod}</span>
            </p>
          </div>
        )}

        {/* ===== TRUST BADGE ===== */}
        <div className="mt-6 flex items-center justify-center gap-2.5 animate-fadeInUp">
          <Shield className="w-2.5 h-2.5 text-white/5" />
          <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure Payment Gateway</span>
          <div className="w-px h-2.5 bg-white/5" />
          <Sparkles className="w-2.5 h-2.5 text-white/5" />
          <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">LUXE</span>
        </div>
      </div>

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        h1, h2, h3, .heading {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatSlowDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out both; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out both; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out both; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite 1s; }
        .animate-float-slow { animation: floatSlow 7s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 7s ease-in-out infinite 1.5s; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-1000 { transition-duration: 1000ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .-translate-x-full { transform: translateX(-100%); }
        .group-hover\\:translate-x-full:hover { transform: translateX(100%); }
      `}</style>
    </div>
  );
};

export default Payment;