"use client";

import { API_URL } from "@/lib/api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Lock,
  Loader2,
  CheckCircle,
  AlertCircle,
  Package,
  User,
  Phone,
  Home,
  ChevronRight,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Gift,
  Star,
  Gem,
  Infinity,
  Clock,
  Zap
} from "lucide-react";
import { useApp } from "../contaxt/authcontaxt";

const ReviewOrder = () => {
  const router = useRouter();
  const { cartItems: cart, fetchCart, clearCart, isAuthenticated, isLoading: authLoading } = useApp();

  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressId, setAddressId] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const payment = localStorage.getItem("paymentMethod");
    const id = localStorage.getItem("addressId");

    setPaymentMethod(payment || "");
    setAddressId(id || "");

    if (authLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Cart comes from the global context; a single refresh here just
    // guarantees it's current when the user reaches the review step.
    fetchCart().finally(() => setInitialLoad(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated]);

  const isLoading = authLoading || initialLoad;

  useEffect(() => {
    if (addressId) {
      getAddress();
    }
  }, [addressId]);

  const getAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/getaddress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const selected = res.data.address.find(
        (item) => item._id === addressId
      );

      setAddress(selected);
    } catch (error) {
      console.log(error);
      setError("Failed to load address");
    }
  };

  const grandTotal = cart.reduce(
    (total, item) => total + (item.productid?.price || 0) * (item.quantity || 0),
    0
  );

  const itemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const getPaymentMethodEnum = (method) => {
    const paymentMap = {
      "Cash On Delivery": "COD",
      "UPI": "UPI",
      "Debit Card": "DEBIT_CARD",
      "Credit Card": "CREDIT_CARD",
      "cod": "COD",
      "upi": "UPI",
      "debit": "DEBIT_CARD",
      "credit": "CREDIT_CARD"
    };
    return paymentMap[method] || method;
  };

  const handlePlaceOrder = async () => {
    if (!address) {
      setError("Please select a delivery address");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        router.push("/login");
        return;
      }

      const paymentEnum = getPaymentMethodEnum(paymentMethod);
      
      console.log("Placing order with:", {
        addressId,
        paymentMethod: paymentEnum,
        originalPaymentMethod: paymentMethod,
        cartItems: cart.length,
        total: grandTotal
      });

      const res = await axios.post(
        `${API_URL}/api/placeorder`,
        {
          addressId,
          paymentMethod: paymentEnum,
          items: cart.map(item => ({
            productId: item.productid?._id || item.productid?.id,
            quantity: item.quantity,
            price: item.productid?.price
          })),
          total: grandTotal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order placed successfully:", res.data);

      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      
      const newOrder = {
        id: `LUX${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        items: cart,
        total: grandTotal,
        date: new Date().toLocaleString(),
        timestamp: Date.now(),
        status: "Confirmed",
        paymentMethod: paymentMethod,
        paymentEnum: paymentEnum,
        addressId: addressId,
        orderId: res.data.orderId || res.data._id || "N/A",
      };

      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      localStorage.removeItem("cart");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("addressId");

      // The backend already deletes the user's cart documents when the
      // order is placed (Cart.deleteMany in placeOrder). Clear the
      // context's cart state immediately too, so the header badge and any
      // other page reading cartCount update instantly instead of showing
      // stale data until the next full reload.
      clearCart();

      alert(res.data.message || "Order Placed Successfully! 🎉");
      router.push("/ordersuccess");
      
    } catch (error) {
      console.error("Order placement error:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMsg = error.response?.data?.message || error.message || "Order Failed. Please try again.";
      setError(errorMsg);
      setIsPlacingOrder(false);
    }
  };

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

      <div className="max-w-7xl mx-auto relative">
        
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
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Review Order</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Review <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Your Order</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8B5CF6]" />
                <span>Please verify your details before placing your order</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/[0.015] px-6 py-3.5 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                <ShoppingBag className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Items</p>
                <p className="text-xl font-light text-[#8B5CF6] group-hover:scale-105 transition-transform duration-500">
                  {itemCount}
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

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ===== LEFT SECTION - ADDRESS & PRODUCTS ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* Address Card */}
            <div className="bg-[#12121A] border border-white/5 rounded-xl p-6 hover:border-[#8B5CF6]/10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(139,92,246,0.03)]">
              <h2 className="text-base font-light text-white/60 mb-4 flex items-center gap-2.5 tracking-wider">
                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                Delivery Address
              </h2>

              {address ? (
                <div className="space-y-2.5 text-white/20">
                  <div className="flex items-center gap-2.5 font-light">
                    <User className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <h3 className="text-lg font-light text-white">
                      {address.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2.5 font-light text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <p className="text-white/30">{address.mobile}</p>
                  </div>
                  <div className="flex items-start gap-2.5 font-light text-xs">
                    <Home className="w-3.5 h-3.5 text-[#8B5CF6] mt-0.5" />
                    <div className="text-white/30">
                      <p>{address.doorno}, {address.streetname}</p>
                      <p>{address.city}, {address.district}</p>
                      <p>{address.state} - {address.pincode}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#8B5CF6]/10">
                    <span className="inline-flex items-center gap-1.5 text-[#22C55E]/60 text-[10px] bg-[#22C55E]/5 px-3 py-1.5 rounded-full border border-[#22C55E]/10 font-light">
                      <CheckCircle className="w-3 h-3" />
                      Selected for delivery
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-[#8B5CF6]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-[#8B5CF6] opacity-40" />
                  </div>
                  <p className="text-white/20 text-sm font-light">No Address Selected</p>
                  <button
                    onClick={() => router.push("/checkout")}
                    className="mt-2 text-[#8B5CF6] hover:text-[#A855F7] transition-colors text-xs font-light"
                  >
                    Select Address →
                  </button>
                </div>
              )}
            </div>

            {/* Products Card */}
            <div className="bg-[#12121A] border border-white/5 rounded-xl p-6 transition-all duration-500 hover:border-[#8B5CF6]/10">
              <h2 className="text-base font-light text-white/60 mb-4 flex items-center gap-2.5 tracking-wider">
                <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" />
                Products ({itemCount})
              </h2>

              {cart.length > 0 ? (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 py-3 gap-3 hover:bg-white/[0.015] p-2 rounded-lg transition-all"
                    >
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              item.productid?.thumbnail
                                ? item.productid.thumbnail.startsWith("http")
                                  ? item.productid.thumbnail
                                  : `${API_URL}/${item.productid.thumbnail}`
                                : "/no-image.png"
                            }
                            alt={item.productid?.title}
                            className="w-16 h-16 rounded-lg object-cover border border-white/5 hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "/no-image.png";
                            }}
                          />
                          <div className="absolute -top-1 -right-1 bg-[#8B5CF6] text-white text-[7px] font-light w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09090B]">
                            {item.quantity || 1}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-light text-white truncate">
                            {item.productid?.title || "Product"}
                          </h3>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-white/20 text-[10px] font-light">
                              Qty: {item.quantity || 1}
                            </span>
                            <span className="text-[#8B5CF6] font-light text-[10px]">
                              ₹{item.productid?.price || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-lg font-light text-[#8B5CF6] whitespace-nowrap">
                        ₹{((item.productid?.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-[#8B5CF6]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-6 h-6 text-[#8B5CF6] opacity-40" />
                  </div>
                  <p className="text-white/20 text-sm font-light">Your Cart is Empty</p>
                  <button
                    onClick={() => router.push("/")}
                    className="mt-2 text-[#8B5CF6] hover:text-[#A855F7] transition-colors text-xs font-light"
                  >
                    Start Shopping →
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* ===== RIGHT SECTION - ORDER SUMMARY ===== */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#12121A] border border-white/5 rounded-xl p-6 transition-all duration-500 hover:border-[#8B5CF6]/10 hover:shadow-[0_20px_60px_rgba(139,92,246,0.03)]">
              
              <h2 className="text-base font-light text-white/60 mb-5 flex items-center gap-2.5 tracking-wider">
                <CreditCard className="w-4 h-4 text-[#8B5CF6]" />
                Order Summary
              </h2>

              <div className="space-y-3 text-white/20">
                <div className="flex justify-between py-2 font-light text-xs">
                  <span>Products ({itemCount})</span>
                  <span className="text-white/40">₹{grandTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-t border-white/5 font-light text-xs">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Delivery
                  </span>
                  <span className="text-[#22C55E]/60 font-light">FREE</span>
                </div>

                <div className="flex justify-between py-2 border-t border-white/5 font-light text-xs">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Payment
                  </span>
                  <span className="text-white/30 font-light text-xs">
                    {paymentMethod || "Not Selected"}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#8B5CF6]/15 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/20 text-sm font-light">Total</span>
                  <span className="text-xl md:text-2xl font-light text-[#8B5CF6]">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[8px] text-white/5 text-right font-light mt-1 tracking-wider">
                  Inclusive of all taxes
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.015] p-3.5">
                <div className="flex items-center gap-2 text-[#8B5CF6]/40 text-[10px] font-light">
                  <Lock className="w-3 h-3" />
                  <span>Secure Checkout • Premium Protection</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || !address || !paymentMethod || cart.length === 0}
                className="w-full mt-5 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 group border border-white/5"
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

              {/* Order Status */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[8px] text-white/10 font-light tracking-wider">
                <span className="inline-block w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
                Ready to place
              </div>

              {/* Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <Shield className="w-2.5 h-2.5 text-white/5" />
                <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure Order Processing</span>
              </div>
            </div>
          </div>
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
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default ReviewOrder;