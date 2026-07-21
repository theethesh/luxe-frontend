"use client";

import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  Truck,
  CreditCard,
  Loader2,
  ChevronRight,
  Diamond,
  Shield,
  Gift,
  Heart,
  Star,
  Zap,
  Clock,
  Award,
  CheckCircle,
  Sparkles,
  Crown,
  X,
  TrendingUp,
  Package,
  Gem,
  Infinity
} from "lucide-react";
import { useApp } from "../contaxt/authcontaxt";

const ViewCart = () => {
  // Cart data now comes straight from the global AppContext instead of a
  // page-local copy fetched with a raw axios call. This is what makes the
  // header badge and this page always agree — they read the exact same
  // array/count, there is nothing left to fall out of sync.
  const {
    cartItems: cart,
    fetchCart,
    updateCartQuantity,
    removeFromCart,
    isAuthenticated,
    isLoading: authLoading,
  } = useApp();

  // UI-only local state (per-row spinners, checkout button state) — these
  // are NOT data, so they correctly stay local rather than living in
  // context.
  const [initialLoad, setInitialLoad] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return; // wait for the initial session check to finish

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // A single refresh to make sure we have the latest cart when this page
    // is opened (cheap no-op-ish call; AppProvider already loaded the cart
    // on login/app start, this just guarantees freshness).
    fetchCart().finally(() => setInitialLoad(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated]);

  const isLoading = authLoading || initialLoad;

  const updateQuantity = async (id, action) => {
    setUpdatingId(id);
    await updateCartQuantity(id, action); // context refetches cart + updates header count
    setUpdatingId(null);
  };

  const removeCart = async (id) => {
    setRemovingId(id);
    await removeFromCart(id); // context refetches cart + updates header count
    setRemovingId(null);
  };

  const grandTotal = cart.reduce((total, item) => {
    return total + item.quantity * item.productid.price;
  }, 0);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const savings = Math.round(grandTotal * 0.2);
  const deliveryCharge = grandTotal > 500 ? 0 : 50;
  const finalTotal = grandTotal + deliveryCharge - savings;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center pt-28">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 border border-[#8B5CF6]/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border border-[#8B5CF6]/30 rounded-full animate-spin border-t-[#8B5CF6]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Diamond className="w-10 h-10 text-[#8B5CF6] animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-[#8B5CF6] text-xs tracking-[0.4em] uppercase font-light">Loading Your Cart</p>
            <p className="text-white/10 text-[10px] tracking-widest font-light">Premium products loading...</p>
          </div>
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

      <div className="max-w-[1440px] mx-auto relative">
        
        {/* ===== HEADER ===== */}
        <div className="mb-12 animate-fadeInDown">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
            >
              <div className="p-2.5 rounded-full bg-white/[0.015] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
            </button>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8B5CF6]/10 to-transparent" />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8B5CF6]/30" />
                <span className="text-[#8B5CF6] text-[10px] tracking-[0.4em] uppercase font-light">Shopping Cart</span>
                <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6]/30 to-transparent" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                Your <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Collection</span>
              </h1>
              <div className="w-20 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-4 animate-pulse-slow" />
              <div className="flex items-center gap-4 mt-4">
                <p className="text-white/20 text-sm font-light tracking-wider">
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'} in your cart
                </p>
                <div className="w-px h-4 bg-white/5" />
                <p className="text-white/10 text-sm font-light">
                  {cart.length} Products
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-white/[0.015] px-6 py-4 rounded-xl border border-white/5 hover:border-[#8B5CF6]/15 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.03)] animate-slideInRight group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                  <ShoppingCart className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-white/10 text-[9px] tracking-[0.2em] uppercase font-light">Total</p>
                  <p className="text-2xl sm:text-3xl font-light text-[#8B5CF6] group-hover:scale-105 transition-transform duration-500">
                    ₹{grandTotal.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div>
                <p className="text-white/10 text-[9px] tracking-[0.2em] uppercase font-light">Items</p>
                <p className="text-2xl font-light text-white group-hover:scale-105 transition-transform duration-500">
                  {itemCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          /* ===== EMPTY CART ===== */
          <div className="bg-[#12121A] border border-white/5 rounded-3xl p-16 md:p-20 text-center transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp group">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-36 h-36 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10 group-hover:scale-110 transition-all duration-700 group-hover:border-[#8B5CF6]/20">
                <ShoppingCart className="w-14 h-14 text-[#8B5CF6] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute -top-2 -right-2 w-9 h-9 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full flex items-center justify-center text-white text-sm font-light animate-bounce shadow-[0_0_40px_rgba(139,92,246,0.2)]">
                  0
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
              Your Cart is <span className="text-[#8B5CF6] font-medium">Empty</span>
            </h2>
            <p className="text-white/20 text-sm font-light tracking-wide mt-4 max-w-md mx-auto">
              Begin your luxury shopping journey and discover exceptional products.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-10 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-12 py-4 rounded-full font-light tracking-wider hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] active:scale-[0.98] inline-flex items-center gap-3 group/btn"
            >
              <span>Explore Collection</span>
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            
            {/* ===== CART ITEMS ===== */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => {
                const isUpdating = updatingId === item._id;
                const isRemoving = removingId === item._id;
                const imageUrl = item.productid?.thumbnail
                  ? item.productid.thumbnail.startsWith("http")
                    ? item.productid.thumbnail
                    : `${API_URL}/${item.productid.thumbnail}`
                  : "/no-image.png";

                return (
                  <div
                    key={item._id}
                    className="group bg-[#12121A] border border-white/5 rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-6 transition-all duration-500 hover:border-[#8B5CF6]/15 hover:shadow-[0_20px_60px_rgba(139,92,246,0.03)] hover:-translate-y-0.5 animate-fadeInUp"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* Image */}
                    <div className="relative flex-shrink-0 self-center md:self-start">
                      <div className="w-[150px] h-[150px] md:w-[160px] md:h-[160px] bg-white/[0.015] rounded-xl overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-[#8B5CF6]/10 transition-all duration-500">
                        <img
                          src={imageUrl}
                          alt={item.productid?.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            (e.target).src = "/no-image.png";
                          }}
                        />
                      </div>
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs font-light w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#09090B] shadow-lg shadow-[#8B5CF6]/20">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg md:text-xl font-light text-white group-hover:text-[#8B5CF6] transition-colors duration-300 tracking-tight truncate">
                              {item.productid.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <span className="text-xl md:text-2xl font-light text-[#8B5CF6]">
                                ₹{item.productid.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-white/10 line-through">
                                ₹{Math.round(item.productid.price * 1.2).toLocaleString()}
                              </span>
                              <span className="bg-[#22C55E]/5 text-[#22C55E] text-[9px] px-2.5 py-1 rounded-full border border-[#22C55E]/10 font-light">
                                20% OFF
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCart(item._id)}
                            disabled={isRemoving}
                            className="text-white/10 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-300 disabled:opacity-30 group/btn flex-shrink-0"
                          >
                            {isRemoving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5 text-white/10">
                            <Truck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            <span className="text-[9px] font-light">Free Delivery</span>
                          </div>
                          <div className="w-px h-3 bg-white/5" />
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#8B5CF6] fill-[#8B5CF6]" />
                            <span className="text-[9px] font-light text-white/20">4.9</span>
                          </div>
                          <div className="w-px h-3 bg-white/5" />
                          <div className="flex items-center gap-1.5 text-[#22C55E]/40">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-[9px] font-light">In Stock</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-white/5">
                        {/* Quantity */}
                        <div className="flex items-center bg-white/[0.015] border border-white/5 rounded-full overflow-hidden hover:border-[#8B5CF6]/10 transition-all duration-300">
                          <button
                            onClick={() => updateQuantity(item._id, "dec")}
                            disabled={isUpdating || item.quantity <= 1}
                            className="px-4 py-2 text-white/15 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 disabled:opacity-30"
                          >
                            {isUpdating ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                          </button>
                          
                          <span className="px-5 text-sm font-light text-white/40 min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item._id, "inc")}
                            disabled={isUpdating}
                            className="px-4 py-2 text-white/15 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all duration-300 disabled:opacity-30"
                          >
                            {isUpdating ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Plus className="w-3 h-3" />
                            )}
                          </button>
                        </div>

                        <div className="text-right w-full sm:w-auto">
                          <p className="text-white/5 text-[9px] tracking-[0.15em] uppercase font-light">Subtotal</p>
                          <p className="text-lg md:text-xl font-light text-[#8B5CF6] hover:scale-105 transition-transform duration-300">
                            ₹{(item.productid.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== ORDER SUMMARY ===== */}
            <div className="lg:col-span-1">
              <div className="bg-[#12121A] border border-white/5 rounded-xl p-6 md:p-8 sticky top-28 transition-all duration-500 hover:border-[#8B5CF6]/10 hover:shadow-[0_20px_60px_rgba(139,92,246,0.03)] animate-fadeInUp">
                
                <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                  <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                    <Package className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <h2 className="text-lg font-light text-white tracking-tight">Order Summary</h2>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between py-2 text-white/20 font-light text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="text-white/50 font-light">₹{grandTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-2 text-white/20 font-light text-sm border-t border-white/5">
                    <span className="flex items-center gap-2">
                      <Truck className="w-3 h-3 text-[#8B5CF6]" />
                      Delivery
                    </span>
                    <span className="text-[#22C55E]/60 font-light">
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 text-white/20 font-light text-sm border-t border-white/5">
                    <span className="flex items-center gap-2">
                      <Gift className="w-3 h-3 text-[#8B5CF6]" />
                      Discount
                    </span>
                    <span className="text-[#22C55E]/60 font-light">-₹{savings.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-2 text-white/20 font-light text-sm border-t border-white/5">
                    <span className="flex items-center gap-2">
                      <Award className="w-3 h-3 text-[#8B5CF6]" />
                      You Save
                    </span>
                    <span className="text-[#22C55E]/60 font-light">₹{savings.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-[#8B5CF6]/15 pt-5 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/20 text-sm font-light">Total</span>
                      <div className="text-right">
                        <span className="text-2xl md:text-3xl font-light bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                          ₹{finalTotal.toLocaleString()}
                        </span>
                        <p className="text-white/5 text-[9px] tracking-widest font-light mt-1">
                          Inclusive of all taxes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full mt-6 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(139,92,246,0.12)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border border-white/5 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Checkout</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="w-full mt-3 text-white/10 hover:text-[#8B5CF6] text-sm font-light transition-colors duration-300 flex items-center justify-center gap-2 group"
                >
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  <span>Continue Shopping</span>
                </button>

                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center gap-2 text-white/5 text-[9px] font-light tracking-wider hover:text-white/10 transition-colors duration-300">
                      <Shield className="w-2.5 h-2.5 text-[#8B5CF6]" />
                      Secure
                    </div>
                    <div className="w-px h-3 bg-white/5" />
                    <div className="flex items-center gap-2 text-white/5 text-[9px] font-light tracking-wider hover:text-white/10 transition-colors duration-300">
                      <Clock className="w-2.5 h-2.5 text-[#8B5CF6]" />
                      24/7
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-center gap-2 text-white/5 text-[8px] font-light tracking-wider">
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">💳 Visa</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">Mastercard</span>
                    <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">Razorpay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== ANIMATIONS ===== */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        h1, h2, h3, .heading {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlowDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s ease-out both; }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out both; }
        .animate-slideInLeft { animation: slideInLeft 0.7s ease-out both; }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out both; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 6s ease-in-out infinite 1.5s; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 8s ease-in-out infinite 2s; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
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

export default ViewCart;