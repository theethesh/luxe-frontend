"use client";

import { API_URL } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { 
  CheckCircle, 
  ShoppingBag, 
  Package, 
  Truck, 
  Calendar,
  ArrowRight,
  Home,
  Receipt,
  CreditCard,
  Loader2,
  Clock,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Gift,
  Star,
  MapPin,
  User,
  Phone,
  Gem,
  Infinity,
  Zap,
  Award
} from "lucide-react";

const OrderSuccess = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateOrderId = () => {
      const prefix = "LUX";
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${prefix}${timestamp}${random}`;
    };

    setOrderId(generateOrderId());

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length > 0) {
      setOrderDetails(orders[orders.length - 1]);
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center pt-28">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border border-[#8B5CF6]/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border border-[#8B5CF6]/30 rounded-full animate-spin border-t-[#8B5CF6]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Diamond className="w-8 h-8 text-[#8B5CF6] animate-pulse" />
            </div>
          </div>
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Order Details</p>
        </div>
      </div>
    );
  }

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
        
        {/* ===== SUCCESS CARD ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
          
          {/* ===== HEADER ===== */}
          <div className="relative bg-gradient-to-br from-[#1A1A2E] to-[#12121A] border-b border-white/5 px-8 md:px-10 py-10 md:py-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 via-transparent to-transparent" />
            
            <div className="relative text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-[#22C55E]/10 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-28 h-28 rounded-full bg-[#22C55E]/5 border-2 border-[#22C55E]/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-700">
                  <CheckCircle className="w-14 h-14 text-[#22C55E] animate-bounce" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#22C55E]/0 via-[#22C55E]/10 to-transparent animate-spin-slow" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mt-6 tracking-tight">
                Order <span className="bg-gradient-to-r from-[#22C55E] to-emerald-400 bg-clip-text text-transparent font-medium">Placed</span> Successfully!
              </h1>
              
              <div className="w-12 h-px bg-gradient-to-r from-[#22C55E] to-[#22C55E]/30 mx-auto mt-4" />
              
              <p className="text-white/20 text-sm font-light tracking-wide mt-3">
                Thank you for your purchase. Your order has been confirmed.
              </p>

              <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 bg-white/[0.015] px-5 py-2.5 rounded-xl border border-white/5">
                <Receipt className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-white/10 text-[10px] font-light tracking-wider">Order ID:</span>
                <span className="text-[#8B5CF6] font-light text-xs tracking-wider">{orderId}</span>
              </div>
            </div>
          </div>

          {/* ===== BODY ===== */}
          <div className="p-6 md:p-8 lg:p-10">
            
            {/* ===== ORDER DETAILS GRID ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
              
              <div className="bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                    <Package className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <h3 className="font-light text-white/20 text-[10px] tracking-wider uppercase">Status</h3>
                </div>
                <p className="text-[#22C55E] font-light text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                  {orderDetails?.status || "Confirmed"}
                </p>
              </div>

              <div className="bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                    <Clock className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <h3 className="font-light text-white/20 text-[10px] tracking-wider uppercase">Date</h3>
                </div>
                <p className="text-white/30 text-sm font-light">{orderDetails?.date || new Date().toLocaleString()}</p>
              </div>

              <div className="bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                    <Truck className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <h3 className="font-light text-white/20 text-[10px] tracking-wider uppercase">Delivery</h3>
                </div>
                <p className="text-[#22C55E]/60 font-light text-sm">FREE Delivery</p>
                <p className="text-white/10 text-[10px] font-light">Expected in 3-5 days</p>
              </div>

              <div className="bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                    <CreditCard className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <h3 className="font-light text-white/20 text-[10px] tracking-wider uppercase">Payment</h3>
                </div>
                <p className="text-white/30 text-sm font-light">{orderDetails?.paymentMethod || "Cash On Delivery"}</p>
              </div>
            </div>

            {/* ===== ORDER SUMMARY ===== */}
            <div className="bg-white/[0.015] border border-white/5 rounded-xl p-4 md:p-5 mb-6">
              <h3 className="font-light text-white/40 mb-4 flex items-center gap-2 text-sm tracking-wider">
                <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" />
                Order Summary ({orderDetails?.items?.length || 0} items)
              </h3>

              {orderDetails?.items && orderDetails.items.length > 0 ? (
                <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                  {orderDetails.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 py-2 hover:bg-white/[0.02] px-2 rounded-lg transition-all gap-2"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              item.thumbnail || item.productid?.thumbnail
                                ? (item.thumbnail || item.productid?.thumbnail).startsWith("http")
                                  ? (item.thumbnail || item.productid?.thumbnail)
                                  : `${API_URL}/${item.thumbnail || item.productid?.thumbnail}`
                                : "/no-image.png"
                            }
                            alt={item.title || item.productid?.title}
                            className="w-10 h-10 rounded-lg object-cover border border-white/5"
                            onError={(e) => {
                              e.target.src = "/no-image.png";
                            }}
                          />
                          <div className="absolute -top-1 -right-1 bg-[#8B5CF6] text-white text-[7px] font-light w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09090B]">
                            {item.quantity || 1}
                          </div>
                        </div>
                        <div>
                          <p className="text-white/50 text-xs font-light line-clamp-1">
                            {item.title || item.productid?.title || "Product"}
                          </p>
                          <p className="text-white/10 text-[9px] font-light">
                            Qty: {item.quantity || 1}
                          </p>
                        </div>
                      </div>
                      <span className="text-[#8B5CF6] font-light text-sm">
                        ₹{((item.price || item.productid?.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/20 text-sm font-light">No items found</p>
              )}

              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-white/20 text-sm font-light">Total Amount</span>
                <span className="text-xl md:text-2xl font-light text-[#8B5CF6]">
                  ₹{orderDetails?.total?.toLocaleString() || 0}
                </span>
              </div>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-light tracking-wider py-3 rounded-xl text-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] active:scale-[0.98] flex items-center justify-center gap-2.5 group border border-white/5"
              >
                <Home className="w-4 h-4" />
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => router.push("/myorders")}
                className="flex-1 bg-white/[0.02] text-white/30 hover:text-white/60 font-light tracking-wider py-3 rounded-xl text-sm hover:bg-white/5 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group border border-white/5 hover:border-white/15"
              >
                <Receipt className="w-4 h-4" />
                <span>View Orders</span>
              </button>
            </div>

            {/* ===== CONFIRMATION MESSAGE ===== */}
            <div className="mt-6 text-center">
              <p className="text-white/10 text-xs font-light flex items-center justify-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" />
                A confirmation email has been sent to your registered email address.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[8px] text-white/10 font-light tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
                  Confirmed
                </span>
                <span className="text-white/5">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
                  Processing
                </span>
                <span className="text-white/5">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                  Shipping Soon
                </span>
              </div>
            </div>

            {/* ===== TRUST BADGE ===== */}
            <div className="mt-6 flex items-center justify-center gap-2.5">
              <Shield className="w-2.5 h-2.5 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure Order Confirmation</span>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-5 border-t border-white/5 animate-fadeInUp">
          <div className="flex items-center gap-1.5">
            <span className="text-white/5 text-xs">🔒</span>
            <p className="text-white/5 text-[7px] font-light tracking-wider">Your order is secure</p>
          </div>
          <div className="w-px h-2.5 bg-white/5" />
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5 text-white/5" />
            <span className="text-white/5 text-[7px] font-light tracking-wider">LUXE</span>
          </div>
          <div className="w-px h-2.5 bg-white/5" />
          <div className="flex items-center gap-1.5">
            <Gift className="w-2.5 h-2.5 text-white/5" />
            <span className="text-white/5 text-[7px] font-light tracking-wider">Premium</span>
          </div>
        </div>
      </div>

      {/* ===== CUSTOM STYLES ===== */}
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite 1s; }
        .animate-float-slow { animation: floatSlow 7s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 7s ease-in-out infinite 1.5s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8B5CF6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #A855F7;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-1000 { transition-duration: 1000ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
};

export default OrderSuccess;