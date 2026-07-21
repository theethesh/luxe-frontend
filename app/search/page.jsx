"use client";

import { API_URL } from "@/lib/api";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { 
  Search as SearchIcon, 
  ArrowLeft, 
  Package, 
  Star, 
  Truck,
  Loader2,
  AlertCircle,
  ChevronRight,
  Tag,
  TrendingUp,
  ShoppingBag,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Eye,
  Heart,
  Gem,
  Infinity,
  Zap,
  Award
} from "lucide-react";

const Search = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) {
      setIsLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await axios.get(
          `${API_URL}/api/search?search=${search}`
        );
        setProduct(res.data || []);
      } catch (error) {
        console.log(error.message);
        setError("Failed to fetch search results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Searching Products</p>
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
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Search</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Search <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Results</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <SearchIcon className="w-4 h-4 text-[#8B5CF6]" />
                <span>Showing results for</span>
                <span className="text-[#8B5CF6] font-light text-sm">"{search}"</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/[0.015] px-6 py-3.5 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Results</p>
                <p className="text-xl font-light text-[#8B5CF6] group-hover:scale-105 transition-transform duration-500">
                  {product?.length || 0}
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

        {product?.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="bg-[#12121A] border border-white/5 rounded-3xl p-16 text-center transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-700 group-hover:border-[#8B5CF6]/20">
                <SearchIcon className="w-16 h-16 text-[#8B5CF6] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-white tracking-tight">
              No Products <span className="text-[#8B5CF6] font-medium">Found</span>
            </h2>
            <p className="text-white/20 text-sm font-light mt-3 max-w-md mx-auto">
              We couldn't find any products matching "{search}". Try searching with another keyword.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-10 py-4 rounded-full font-light tracking-wider hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] active:scale-[0.98] flex items-center gap-2.5 mx-auto border border-white/5"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            {/* ===== STATS BAR ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-5 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl animate-fadeInUp hover:border-[#8B5CF6]/10 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                  <SearchIcon className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Search Results</p>
                  <p className="text-white/40 font-light">
                    <span className="text-[#8B5CF6]">{product?.length}</span> Products Found
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="bg-white/[0.015] text-white/20 px-4 py-2 rounded-full text-[9px] flex items-center gap-2 border border-white/5 font-light tracking-wider">
                  <TrendingUp className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  Relevant Results
                </span>
              </div>
            </div>

            {/* ===== PRODUCTS GRID ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {product.map((p, index) => {
                const imageUrl = p.thumbnail
                  ? p.thumbnail.startsWith("http")
                    ? p.thumbnail
                    : `${API_URL}/${p.thumbnail}`
                  : "/no-image.png";

                return (
                  <div
                    key={p._id}
                    onClick={() => router.push(`/viewcart/${p._id}`)}
                    className="group relative bg-[#12121A] border border-white/5 rounded-xl overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-1 hover:border-[#8B5CF6]/20 hover:shadow-[0_20px_60px_rgba(139,92,246,0.04)] animate-scale-in"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative overflow-hidden bg-[#12121A]">
                      <img
                        src={imageUrl}
                        alt={p.title}
                        className="w-full h-52 object-cover transition-all duration-1000 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/no-image.png";
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 via-40% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-2 py-0.5 rounded-full text-[6px] font-light tracking-[0.1em] uppercase flex items-center gap-1 shadow-lg">
                          <Tag className="w-1.5 h-1.5" />
                          {p.category || "Product"}
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/40 backdrop-blur-md text-white/50 px-1.5 py-0.5 rounded-full text-[6px] font-light tracking-wider border border-white/5 flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
                          In Stock
                        </span>
                      </div>

                      <button className="absolute bottom-3 right-3 p-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/5 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100">
                        <Heart className="w-2.5 h-2.5 text-white/30 hover:text-[#8B5CF6] transition-colors" />
                      </button>
                    </div>

                    <div className="p-4 bg-gradient-to-t from-[#09090B] to-transparent">
                      <h2 className="text-sm font-light text-white line-clamp-1 group-hover:text-[#8B5CF6] transition-colors tracking-tight">
                        {p.title}
                      </h2>

                      <p className="text-white/5 text-[7px] line-clamp-1 font-light tracking-[0.15em] uppercase mt-0.5">
                        Brand: <span className="text-[#8B5CF6] font-light">{p.brand || "Premium"}</span>
                      </p>

                      <p className="text-white/10 text-[8px] line-clamp-2 font-light mt-1.5">
                        {p.description || "Premium quality product"}
                      </p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center gap-0.5 bg-[#8B5CF6]/5 px-2 py-0.5 rounded-lg border border-[#8B5CF6]/10">
                          <Star className="w-2.5 h-2.5 text-[#8B5CF6] fill-[#8B5CF6]" />
                          <span className="text-[9px] font-light text-[#8B5CF6]">4.8</span>
                        </div>
                        <span className="ml-2 text-white/10 text-[8px] font-light">
                          (250)
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-end justify-between">
                        <div>
                          <span className="text-lg font-light text-[#8B5CF6] tracking-tight">
                            ₹{p.price?.toLocaleString()}
                          </span>
                          <span className="ml-1.5 text-white/10 line-through text-[8px]">
                            ₹{Math.round(p.price * 1.3).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[6px] text-[#22C55E]/40 bg-[#22C55E]/5 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-[#22C55E]/10 font-light tracking-wider">
                          <Truck className="w-1.5 h-1.5" />
                          Free
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/viewcart/${p._id}`);
                        }}
                        className="w-full mt-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-2 rounded-lg font-light text-[9px] tracking-wider transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] active:scale-[0.98] group/btn flex items-center justify-center gap-1.5 border border-white/5"
                      >
                        View Product
                        <ChevronRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-[#12121A] border border-white/5 rounded-xl animate-fadeInUp">
              <div className="flex items-center gap-3">
                <SearchIcon className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-white/20 text-sm font-light">
                  Found <span className="text-[#8B5CF6] font-light">{product?.length}</span> products for "{search}"
                </span>
              </div>
              <button
                onClick={() => router.push("/")}
                className="text-white/10 hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5 text-sm font-light group"
              >
                Browse All Categories
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* ===== TRUST BADGE ===== */}
            <div className="mt-6 flex items-center justify-center gap-2.5 animate-fadeInUp">
              <Shield className="w-2.5 h-2.5 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Premium Search Results</span>
              <div className="w-px h-2.5 bg-white/5" />
              <Sparkles className="w-2.5 h-2.5 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">LUXE</span>
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

export default Search;