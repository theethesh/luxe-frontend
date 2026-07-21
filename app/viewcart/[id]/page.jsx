"use client";

import { API_URL } from "@/lib/api";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Zap,
  Truck,
  RefreshCw,
  Lock,
  Award,
  Loader2,
  CheckCircle,
  AlertCircle,
  Share2,
  TrendingUp,
  Crown,
  Diamond,
  Sparkles,
  Shield,
  Gift,
  Tag,
  Users,
  Clock,
  Gem,
  Infinity,
  Leaf,
  Feather
} from "lucide-react";
import { useApp } from "../../contaxt/authcontaxt";

const ProductDetail = () => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingCart, setIsAddingCart] = useState(false);
  const [isAddingWish, setIsAddingWish] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { id } = useParams();

  // Add to Cart / Add to Wishlist go through the global AppContext so the
  // header badge updates instantly. Previously this page called axios
  // directly and never told the context anything changed, which is why the
  // count only updated after a full page refresh (when checkAuth re-ran).
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useApp();

  // Product detail itself stays local — it's page-specific data, not
  // global app state, so it doesn't belong in the context.
  const getview = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/api/viewdetail/${id}`
      );
      setDetail(res.data.details);
      setError("");
    } catch (error) {
      console.log(error.message);
      setError("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  const addcart = async () => {
    setIsAddingCart(true);
    setError("");
    const result = await addToCart(id);
    if (result.success) {
      setSuccess("Added to cart successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } else if (result.error) {
      setError(result.error);
      setTimeout(() => setError(""), 3000);
    }
    setIsAddingCart(false);
  };

  const addwish = async () => {
    setIsAddingWish(true);
    setError("");
    const result = await addToWishlist(detail?._id || id);
    if (result.success) {
      setSuccess(result.alreadyExists ? "Already in your wishlist!" : "Added to wishlist!");
      setTimeout(() => setSuccess(""), 3000);
    } else if (result.error) {
      setError(result.error);
      setTimeout(() => setError(""), 3000);
    }
    setIsAddingWish(false);
  };

  useEffect(() => {
    if (id) getview();
  }, [id]);

  const inCart = detail ? isInCart(detail._id) : false;
  const inWishlist = detail ? isInWishlist(detail._id) : false;

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
            <p className="text-[#8B5CF6] text-xs tracking-[0.4em] uppercase font-light">Loading</p>
            <p className="text-white/10 text-[10px] tracking-widest font-light">Premium product details</p>
          </div>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 pt-28">
        <div className="bg-[#12121A] border border-white/5 rounded-3xl p-16 text-center max-w-md">
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-36 h-36 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
              <ShoppingCart className="w-16 h-16 text-[#8B5CF6]/40" />
            </div>
          </div>
          <h2 className="text-3xl font-light text-white tracking-tight">
            Product Not <span className="text-[#8B5CF6] font-medium">Found</span>
          </h2>
          <p className="text-white/20 text-sm font-light mt-3">The premium product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-10 py-3.5 rounded-full text-sm font-light tracking-wider transition-all duration-300 border border-white/5 hover:border-white/20"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = detail?.thumbnail
    ? detail.thumbnail.startsWith("http")
      ? detail.thumbnail
      : `${API_URL}/${detail.thumbnail}`
    : "/no-image.png";

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-[40%] -right-[20%] w-[800px] h-[800px] bg-[#8B5CF6]/[0.025] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[20%] w-[800px] h-[800px] bg-[#A855F7]/[0.015] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#8B5CF6]/[0.01] rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-[#8B5CF6]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-[#A855F7]/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-[#8B5CF6]/15 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#A855F7]/10 rounded-full blur-lg animate-float-slow-delayed"></div>
        
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8B5CF6 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ===== BACK BUTTON ===== */}
        <button
          onClick={() => router.back()}
          className="group mb-10 flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
        >
          <div className="p-2 rounded-full bg-white/[0.02] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
        </button>

        {/* ===== MESSAGES ===== */}
        {success && (
          <div className="mb-8 p-4 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl animate-slideDown">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              <span className="text-white/60 text-sm font-light tracking-wide">{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-500/5 border border-red-500/10 rounded-xl animate-shake">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-white/60 text-sm font-light tracking-wide">{error}</span>
            </div>
          </div>
        )}

        {/* ===== MAIN PRODUCT CARD ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)]">
          
          <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">
            
            {/* ===== PRODUCT IMAGE ===== */}
            <div className="flex justify-center items-center">
              <div className="relative w-full bg-white/[0.015] border border-white/5 rounded-2xl p-8 md:p-10 hover:border-[#8B5CF6]/15 transition-all duration-700 group">
                <img
                  src={imageUrl}
                  alt={detail?.title}
                  className="w-full h-auto max-h-[500px] object-contain transition-all duration-1000 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                
                <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-[#8B5CF6]/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-[#8B5CF6]/10 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* ===== PRODUCT DETAILS ===== */}
            <div className="flex flex-col">
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2.5">
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-3.5 py-1.5 rounded-full text-[9px] font-light tracking-wider flex items-center gap-1.5 border border-white/5">
                  <Crown className="w-3 h-3" />
                  Premium
                </span>
                <span className="bg-[#22C55E]/10 text-[#22C55E] px-3.5 py-1.5 rounded-full text-[9px] font-light tracking-wider border border-[#22C55E]/10 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
                <span className="bg-white/5 text-white/30 px-3.5 py-1.5 rounded-full text-[9px] font-light tracking-wider border border-white/5 flex items-center gap-1.5">
                  <Infinity className="w-3 h-3" />
                  Limited
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-5 tracking-tight leading-tight">
                {detail?.title}
              </h1>

              <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6] to-transparent mt-4" />

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-5 mt-5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#8B5CF6] fill-[#8B5CF6]" />
                    ))}
                  </div>
                  <span className="text-white/40 text-sm font-light ml-1">(1.2k)</span>
                </div>
                <div className="w-px h-4 bg-white/5" />
                <span className="text-white/30 text-sm font-light flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  1,250 Reviews
                </span>
                <div className="w-px h-4 bg-white/5" />
                <span className="text-[#22C55E] text-sm font-light flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="mt-8 flex items-end gap-5 flex-wrap">
                <span className="text-5xl md:text-6xl font-light text-white tracking-tight">
                  ₹{detail?.price?.toLocaleString()}
                </span>
                <span className="text-lg text-white/20 line-through font-light">
                  ₹{Math.round(detail?.price * 1.3).toLocaleString()}
                </span>
                <span className="bg-[#22C55E]/5 text-[#22C55E] text-xs px-3.5 py-1.5 rounded-full border border-[#22C55E]/10 font-light tracking-wider">
                  Save ₹{Math.round(detail?.price * 0.3)}
                </span>
              </div>

              {/* Description */}
              <div className="mt-8">
                <p className="text-white/30 leading-[2] font-light tracking-wide text-sm">
                  {detail?.description || "Premium quality product with excellent features and superior craftsmanship."}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-8">
                {[
                  { icon: Truck, label: "Free Delivery" },
                  { icon: RefreshCw, label: "7 Days Return" },
                  { icon: Lock, label: "Secure Payment" },
                  { icon: Award, label: "Premium Quality" }
                ].map((item, index) => (
                  <div key={index} 
                    className="group bg-white/[0.015] border border-white/5 rounded-xl p-3.5 text-center hover:border-[#8B5CF6]/15 hover:bg-[#8B5CF6]/5 transition-all duration-500"
                  >
                    <div className="flex items-center justify-center gap-2.5 text-white/20 group-hover:text-[#8B5CF6] transition-colors duration-300">
                      <item.icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-light tracking-wide">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== ACTION BUTTONS ===== */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                <button
                  onClick={addwish}
                  disabled={isAddingWish}
                  className={`group border py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 ${
                    inWishlist
                      ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6]"
                      : "bg-white/[0.02] border-white/5 hover:border-[#8B5CF6]/20 text-white/30 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/5"
                  }`}
                >
                  {isAddingWish ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Heart className={`w-4 h-4 group-hover:scale-110 transition-transform duration-300 ${inWishlist ? "fill-[#8B5CF6]" : ""}`} />
                      <span>{inWishlist ? "In Wishlist" : "Wishlist"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={addcart}
                  disabled={isAddingCart}
                  className="group bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {isAddingCart ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{inCart ? "Add More" : "Add to Cart"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    addcart();
                    setTimeout(() => router.push("/cart"), 500);
                  }}
                  className="col-span-2 bg-transparent border border-[#8B5CF6]/15 text-[#8B5CF6] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#A855F7] hover:text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] flex items-center justify-center gap-2.5 group"
                >
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center justify-center gap-4 text-white/10 text-xs font-light tracking-wider group cursor-pointer hover:text-[#8B5CF6] transition-colors duration-300">
                <Share2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-500" />
                <span>Share this product</span>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <Shield className="w-3 h-3 text-white/5" />
                <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">Premium Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RECOMMENDED SECTION ===== */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#8B5CF6]/20" />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-light">You May Also Like</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8B5CF6]/20 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group bg-[#12121A] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/15 transition-all duration-500 hover:-translate-y-0.5 cursor-pointer">
                <div className="aspect-square bg-white/[0.015] rounded-lg mb-3 flex items-center justify-center">
                  <Gem className="w-8 h-8 text-[#8B5CF6]/10" />
                </div>
                <h3 className="text-white/40 text-sm font-light truncate">Premium Product</h3>
                <p className="text-[#8B5CF6] font-light text-sm">₹2,499</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-white/5" />
            <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">Secure Shopping</span>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2">
            <Gift className="w-3 h-3 text-white/5" />
            <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">Gift Wrapping</span>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-white/5" />
            <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">24/7 Support</span>
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
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
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
        .animate-slideDown { animation: slideDown 0.3s ease-out both; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite 1s; }
        .animate-float-slow { animation: floatSlow 7s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 7s ease-in-out infinite 1.5s; }
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

export default ProductDetail;