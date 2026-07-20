"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Star, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  ShoppingBag,
  TrendingUp,
  Crown,
  Diamond,
  Sparkles,
  Shield,
  Gift,
  Tag,
  Zap,
  Clock,
  Gem,
  Infinity,
  Award
} from "lucide-react";
import { useApp } from "../contaxt/authcontaxt";

const Wishlist = () => {
  // Wishlist data comes straight from the global AppContext — same array
  // the header badge reads — instead of a page-local axios fetch. Adding
  // to cart / removing from wishlist here goes through the context too, so
  // the header updates instantly without a refresh.
  const {
    wishlistItems: wish,
    fetchWishlist,
    removeFromWishlist,
    addToCart,
    isAuthenticated,
    isLoading: authLoading,
  } = useApp();

  const [initialLoad, setInitialLoad] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchWishlist().finally(() => setInitialLoad(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated]);

  const isLoading = authLoading || initialLoad;

  const handleRemove = async (id) => {
    setRemovingId(id);
    const result = await removeFromWishlist(id); // context refetches wishlist + updates header count
    if (result.success) {
      setSuccess("Removed from wishlist!");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(result.error || "Failed to remove item");
      setTimeout(() => setError(""), 3000);
    }
    setRemovingId(null);
  };

  const handleAddToCart = async (productId) => {
    setAddingId(productId);
    const result = await addToCart(productId); // context refetches cart + updates header count
    if (result.success) {
      setSuccess("Added to cart successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(result.error || "Failed to add to cart");
      setTimeout(() => setError(""), 3000);
    }
    setAddingId(null);
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Wishlist</p>
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
        
        {/* ===== HEADER SECTION ===== */}
        <div className="mb-12 animate-fadeInDown">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
            >
              <div className="p-2 rounded-full bg-white/[0.015] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
            </button>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8B5CF6]/10 to-transparent" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8B5CF6]/30" />
                <span className="text-[#8B5CF6] text-[9px] tracking-[0.4em] uppercase font-medium">Wishlist</span>
                <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6]/30 to-transparent" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
                My <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Wishlist</span>
              </h1>
              <div className="w-20 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-4 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-4">
                {wish?.length || 0} {wish?.length === 1 ? 'Item' : 'Items'} saved for later
              </p>
            </div>
            
            <div className="flex items-center gap-6 bg-white/[0.015] px-6 py-4 rounded-xl border border-white/5 hover:border-[#8B5CF6]/15 transition-all duration-500 animate-slideInRight group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                  <Heart className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div className="text-right">
                  <p className="text-white/10 text-[8px] tracking-[0.25em] uppercase font-light">Total</p>
                  <p className="text-2xl font-light text-[#8B5CF6] group-hover:scale-105 transition-transform duration-500">
                    {wish?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MESSAGES ===== */}
        {success && (
          <div className="mb-6 p-4 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl backdrop-blur-sm animate-slideDown">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              <span className="text-white/60 text-sm font-light tracking-wide">{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl backdrop-blur-sm animate-shake">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-white/60 text-sm font-light tracking-wide">{error}</span>
            </div>
          </div>
        )}

        {wish?.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="bg-[#12121A] border border-white/5 rounded-3xl p-20 text-center transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp group">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-700 group-hover:border-[#8B5CF6]/20">
                <Heart className="w-12 h-12 text-[#8B5CF6] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full flex items-center justify-center text-white text-xs font-light animate-bounce shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  0
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-light text-white">
              Your Wishlist is <span className="text-[#8B5CF6] font-medium">Empty</span>
            </h2>
            <p className="text-white/20 text-sm font-light tracking-wide mt-3">Start adding your favourite products</p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-10 py-4 rounded-full font-light tracking-wider hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] flex items-center gap-2.5 mx-auto border border-white/5"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* ===== STATS BAR ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-5 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl animate-fadeInUp hover:border-[#8B5CF6]/10 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                  <Heart className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Wishlist</p>
                  <p className="text-white/40 font-light">
                    <span className="text-[#8B5CF6]">{wish?.length}</span> Items Saved
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-white/10 text-[10px] font-light">
                <TrendingUp className="w-3 h-3 text-[#8B5CF6]" />
                <span>Saved for later</span>
              </div>
            </div>

            {/* ===== WISHLIST GRID ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {wish.map((w, index) => {
                const isRemoving = removingId === w._id;
                const isAdding = addingId === w.productid?._id;
                const imageUrl = w.productid?.thumbnail
                  ? w.productid.thumbnail.startsWith("http")
                    ? w.productid.thumbnail
                    : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/${w.productid?.thumbnail}`
                  : "/no-image.png";

                return (
                  <div
                    key={w._id}
                    className="group bg-[#12121A] border border-white/5 rounded-xl overflow-hidden transition-all duration-700 hover:-translate-y-1 hover:border-[#8B5CF6]/20 hover:shadow-[0_20px_60px_rgba(139,92,246,0.04)] animate-scale-in"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-[#12121A]">
                      <img
                        src={imageUrl}
                        alt={w.productid?.title}
                        className="w-full h-56 object-contain p-4 transition-all duration-1000 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/no-image.png";
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 via-30% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-2 py-0.5 rounded-full text-[6px] font-light tracking-[0.1em] uppercase flex items-center gap-1 shadow-lg">
                          <Crown className="w-1.5 h-1.5" />
                          Premium
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/40 backdrop-blur-md text-white/50 px-1.5 py-0.5 rounded-full text-[6px] font-light tracking-wider border border-white/5 flex items-center gap-0.5">
                          <Star className="w-1.5 h-1.5 fill-[#8B5CF6] text-[#8B5CF6]" />
                          {w.productid?.rating || 4.8}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 bg-gradient-to-t from-[#09090B] to-transparent">
                      <h2 className="text-sm font-light text-white line-clamp-1 group-hover:text-[#8B5CF6] transition-colors duration-300 tracking-tight">
                        {w.productid?.title}
                      </h2>

                      <p className="text-white/10 text-[7px] font-light tracking-[0.15em] uppercase mt-0.5">
                        {w.productid?.brand || "Premium"}
                      </p>

                      <div className="flex items-end justify-between mt-2.5">
                        <div>
                          <span className="text-lg font-light text-[#8B5CF6]">
                            ₹{w.productid?.price?.toLocaleString()}
                          </span>
                          <span className="ml-1.5 text-white/10 line-through text-[8px] font-light">
                            ₹{Math.round(w.productid?.price * 1.3).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[6px] text-[#22C55E]/40 bg-[#22C55E]/5 px-1.5 py-0.5 rounded-full border border-[#22C55E]/10 font-light">
                          Save ₹{Math.round(w.productid?.price * 0.3)}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        <button
                          onClick={() => handleAddToCart(w.productid?._id)}
                          disabled={isAdding}
                          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-2 rounded-lg font-light text-[9px] tracking-wider transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                        >
                          {isAdding ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleRemove(w._id)}
                          disabled={isRemoving}
                          className="w-full bg-red-500/5 hover:bg-red-500/10 text-white/20 hover:text-red-400 py-2 rounded-lg font-light text-[9px] tracking-wider transition-all duration-500 border border-white/5 hover:border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isRemoving ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Removing...</span>
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl animate-fadeInUp hover:border-[#8B5CF6]/10 transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                  <Heart className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Wishlist</p>
                  <p className="text-white/40 font-light">
                    <span className="text-[#8B5CF6]">{wish?.length}</span> Items Saved
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push("/")}
                className="text-white/10 hover:text-[#8B5CF6] transition-colors flex items-center gap-2 text-sm font-light group"
              >
                <span>Browse More Products</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* ===== TRUST BADGE ===== */}
            <div className="mt-6 flex items-center justify-center gap-3 animate-fadeInUp">
              <Shield className="w-3 h-3 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure Wishlist</span>
              <div className="w-px h-3 bg-white/5" />
              <Clock className="w-3 h-3 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">24/7 Access</span>
              <div className="w-px h-3 bg-white/5" />
              <Gift className="w-3 h-3 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Premium</span>
            </div>
          </>
        )}
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
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-scale-in { animation: scale-in 0.5s ease-out both; }
        .animate-slideDown { animation: slideDown 0.3s ease-out both; }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-1000 { transition-duration: 1000ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Wishlist;