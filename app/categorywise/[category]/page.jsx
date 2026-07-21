"use client";

import { API_URL } from "@/lib/api";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Grid,
  Package,
  Star,
  ShoppingBag,
  ChevronRight,
  Tag,
  TrendingUp,
  Eye,
  Diamond,
  Crown,
  Shield,
  Heart,
  Sparkles,
  Gift,
  Award,
  Gem,
  Clock,
  Infinity,
  Zap,
  Leaf,
  Feather
} from "lucide-react";

const CategoryWise = () => {
  const { category } = useParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const productsummary = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/api/categoryproduct/${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      productsummary();
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center pt-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/[0.03] rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#A855F7]/[0.02] rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#7C3AED]/[0.02] rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="flex flex-col items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-28 h-28 border border-[#8B5CF6]/10 rounded-full animate-spin-slow" />
            <div className="absolute top-1.5 left-1.5 w-25 h-25 border border-[#8B5CF6]/20 rounded-full animate-spin-reverse" />
            <div className="absolute top-3 left-3 w-22 h-22 border border-[#8B5CF6]/30 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Diamond className="w-12 h-12 text-[#8B5CF6] animate-float" />
            </div>
            <Sparkles className="absolute -top-5 -right-5 w-6 h-6 text-[#8B5CF6]/30 animate-pulse" />
            <Sparkles className="absolute -bottom-5 -left-5 w-5 h-5 text-[#A855F7]/30 animate-pulse delay-500" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-[#8B5CF6] text-[10px] font-light tracking-[0.5em] uppercase">
              Curating Excellence
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* ===== BACKGROUND EFFECTS ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-80 -right-80 w-[900px] h-[900px] bg-[#8B5CF6]/[0.02] rounded-full blur-3xl" />
        <div className="absolute -bottom-80 -left-80 w-[900px] h-[900px] bg-[#A855F7]/[0.015] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#7C3AED]/[0.01] rounded-full blur-3xl" />
        
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-[#8B5CF6]/20 rounded-full animate-float-particle"
            style={{
              top: `${5 + Math.random() * 90}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          />
        ))}
        
        <div className="absolute inset-0 opacity-[0.01]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #8B5CF6 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ===== BACK BUTTON ===== */}
        <div className="relative z-20 mb-6 animate-fade-in">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2.5 text-white/20 hover:text-[#8B5CF6] transition-all duration-500 bg-white/[0.02] backdrop-blur-md px-5 py-2.5 rounded-full border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 hover:shadow-[0_0_30px_rgba(139,92,246,0.05)] group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-light tracking-[0.2em] text-[10px] uppercase">Back</span>
          </button>
        </div>

        {/* ===== HERO HEADER ===== */}
        <div className="relative mb-12 group animate-fade-in">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#8B5CF6]/5 via-[#A855F7]/5 to-[#7C3AED]/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-[#12121A] border border-white/5 rounded-3xl p-8 md:p-10 transition-all duration-700 hover:border-[#8B5CF6]/15 hover:shadow-[0_30px_100px_rgba(139,92,246,0.04)] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent animate-gradient-x" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#8B5CF6]/5 rounded-tr-xl" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#8B5CF6]/5 rounded-bl-xl" />
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                  <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Luxury Collection</span>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-[#8B5CF6]/40 animate-pulse" />
                    <Sparkles className="w-2.5 h-2.5 text-[#A855F7]/20 animate-pulse delay-500" />
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
                  <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent animate-gradient font-medium">
                    {category}
                  </span>
                </h1>
                
                <div className="flex items-center gap-5">
                  <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6] to-transparent" />
                  <p className="text-white/20 text-[10px] font-light tracking-[0.2em] uppercase flex items-center gap-2">
                    <Gem className="w-3 h-3 text-[#8B5CF6]" />
                    Curated Excellence
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/[0.015] backdrop-blur-sm px-5 py-3.5 rounded-xl border border-white/5 hover:border-[#8B5CF6]/15 transition-all duration-500">
                <div className="relative">
                  <Grid className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <div className="absolute -top-1 -right-1 w-1 h-1 bg-[#8B5CF6] rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="text-white/10 text-[8px] font-light uppercase tracking-[0.25em]">Pieces</span>
                  <div className="text-3xl font-light text-[#8B5CF6] tracking-tight">
                    {products?.products?.length || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {products?.products?.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="relative group animate-fade-in">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8B5CF6]/5 via-[#A855F7]/5 to-[#7C3AED]/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-[#12121A] border border-white/5 rounded-3xl p-16 text-center transition-all duration-500 hover:border-[#8B5CF6]/15 hover:shadow-[0_30px_100px_rgba(139,92,246,0.04)]">
              <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-40 h-40 mx-auto bg-gradient-to-br from-[#8B5CF6]/5 to-[#A855F7]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
                  <Package className="w-20 h-20 text-[#8B5CF6]/30 animate-float" />
                </div>
                <Sparkles className="absolute -top-6 -right-6 w-6 h-6 text-[#8B5CF6]/20 animate-pulse" />
                <Sparkles className="absolute -bottom-6 -left-6 w-6 h-6 text-[#A855F7]/20 animate-pulse delay-500" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-4">
                No Products <span className="text-[#8B5CF6] font-medium">Found</span>
              </h2>
              <p className="text-white/20 text-sm max-w-md mx-auto font-light tracking-wide">
                This collection is being curated. Discover other exclusive pieces.
              </p>
              <button
                onClick={() => router.push("/")}
                className="mt-10 group/btn relative inline-flex items-center gap-4 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-12 py-4 rounded-full font-light tracking-wider transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] active:scale-[0.98]"
              >
                <span className="text-sm">Browse Collection</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ===== STATS BAR ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-2.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-500/40 rounded-full border-2 border-[#09090B]" />
                </div>
                <div>
                  <h2 className="text-base font-light text-white tracking-wide">
                    <span className="text-[#8B5CF6] font-medium">{products?.products?.length}</span> 
                    <span className="text-white/20 ml-2 text-[10px] font-light tracking-[0.15em] uppercase">Exclusive Pieces</span>
                  </h2>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="group relative bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-4 py-2 rounded-full font-light capitalize flex items-center gap-2 text-[9px] overflow-hidden tracking-wider">
                  <Tag className="w-2.5 h-2.5" />
                  {category}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </span>
                <span className="bg-white/[0.015] backdrop-blur-sm text-white/30 px-3.5 py-2 rounded-full text-[9px] flex items-center gap-2 border border-white/5 hover:border-[#8B5CF6]/15 transition-all duration-300">
                  <TrendingUp className="w-2.5 h-2.5 text-[#8B5CF6] animate-pulse" />
                  <span className="tracking-wider">Trending</span>
                </span>
                <span className="bg-white/[0.015] backdrop-blur-sm text-white/10 px-3.5 py-2 rounded-full text-[8px] flex items-center gap-1.5 border border-white/5 tracking-wider">
                  <Clock className="w-2 h-2" />
                  <span className="font-light">Limited</span>
                </span>
              </div>
            </div>

            {/* ===== PRODUCT GRID ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products?.products?.map((item, index) => (
                <div
                  key={item._id}
                  className="group relative animate-scale-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/0 to-[#A855F7]/0 rounded-xl blur-xl transition-all duration-1000 group-hover:from-[#8B5CF6]/5 group-hover:via-[#A855F7]/5 group-hover:to-[#7C3AED]/5" />
                  
                  <div className="relative bg-[#12121A] border border-white/5 rounded-xl overflow-hidden transition-all duration-700 hover:-translate-y-1 hover:border-[#8B5CF6]/20 hover:shadow-[0_20px_60px_rgba(139,92,246,0.04)]">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative overflow-hidden bg-[#12121A]">
                      <img
                        src={
                          item.thumbnail
                            ? item.thumbnail.startsWith("http")
                              ? item.thumbnail
                              : `${API_URL}/${item.thumbnail}`
                            : "/no-image.png"
                        }
                        alt={item.title}
                        className="w-full h-52 object-cover transition-all duration-1000 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/no-image.png";
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 via-40% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-2 py-0.5 rounded-full text-[6px] font-light tracking-[0.1em] uppercase flex items-center gap-1 shadow-lg">
                          <Crown className="w-1.5 h-1.5" />
                          Premium
                        </span>
                        <span className="bg-black/40 backdrop-blur-md text-white/50 px-1.5 py-0.5 rounded-full text-[6px] font-light tracking-wider border border-white/5 flex items-center gap-0.5">
                          <Star className="w-1.5 h-1.5 fill-[#8B5CF6] text-[#8B5CF6]" />
                          4.8
                        </span>
                      </div>

                      <button className="absolute top-3 right-3 p-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/5 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100">
                        <Heart className="w-2.5 h-2.5 text-white/30 hover:text-[#8B5CF6] transition-colors" />
                      </button>
                      
                      <button
                        onClick={() => router.push(`/viewcart/${item._id}`)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-2xl text-white px-4 py-1.5 rounded-full font-light text-[8px] tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105 flex items-center gap-1.5 border border-white/5 hover:border-[#8B5CF6]/20"
                      >
                        <Eye className="w-2.5 h-2.5 text-[#8B5CF6]" />
                        <span>Quick View</span>
                      </button>

                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <div className="p-4 bg-gradient-to-t from-[#09090B] to-transparent">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-sm font-light text-white line-clamp-1 group-hover:text-[#8B5CF6] transition-colors tracking-tight">
                          {item.title}
                        </h2>
                        <Award className="w-2.5 h-2.5 text-[#8B5CF6]/20 flex-shrink-0 mt-0.5" />
                      </div>

                      <p className="text-white/5 text-[7px] line-clamp-1 font-light tracking-[0.15em] uppercase mt-1">
                        Luxury Collection
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5 bg-[#8B5CF6]/5 px-2 py-0.5 rounded-lg border border-[#8B5CF6]/10">
                          <Star className="w-2 h-2 text-[#8B5CF6] fill-[#8B5CF6]" />
                          <span className="text-[8px] font-light text-[#8B5CF6]">4.8</span>
                        </div>
                        <span className="text-white/10 text-[7px] font-light tracking-wider">
                          (250)
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-white/5 text-[6px] tracking-wider uppercase">
                          <Infinity className="w-1.5 h-1.5" />
                          <span>LTD</span>
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-end justify-between">
                        <div>
                          <span className="text-lg font-light text-[#8B5CF6] tracking-tight">
                            ₹{item.price}
                          </span>
                          <span className="ml-2 text-white/10 line-through text-[9px]">
                            ₹{Math.round(item.price * 1.3)}
                          </span>
                        </div>
                        <span className="text-[6px] text-emerald-400/40 bg-emerald-400/5 px-1.5 py-0.5 rounded-full border border-emerald-400/10 font-light tracking-wider">
                          Save ₹{Math.round(item.price * 0.3)}
                        </span>
                      </div>

                      <button
                        onClick={() => router.push(`/viewcart/${item._id}`)}
                        className="w-full mt-2.5 relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-2 rounded-full font-light text-[9px] tracking-wider transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] active:scale-[0.98] group/btn"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                          View Details
                          <ChevronRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="mt-12 relative group animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8B5CF6]/5 via-[#A855F7]/5 to-[#7C3AED]/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-[#12121A] border border-white/5 rounded-xl transition-all duration-500 hover:border-[#8B5CF6]/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                    <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <span className="text-white/20 text-[10px] font-light tracking-wider">
                      Showing <span className="text-[#8B5CF6] font-light">{products?.products?.length}</span> luxury pieces
                    </span>
                    <p className="text-white/5 text-[6px] font-light tracking-[0.3em] uppercase mt-0.5">Curated with precision</p>
                  </div>
                </div>
                
                <button
                  onClick={() => router.push("/")}
                  className="group/btn text-white/10 hover:text-[#8B5CF6] transition-colors flex items-center gap-2 text-[10px] font-light tracking-wider"
                >
                  <span>Explore All Collections</span>
                  <ChevronRight className="w-2.5 h-2.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* ===== FOOTER BADGES ===== */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
              <div className="flex items-center gap-1.5">
                <Shield className="w-2.5 h-2.5 text-white/5" />
                <span className="text-white/5 text-[6px] font-light tracking-[0.4em] uppercase">Authenticity</span>
              </div>
              <div className="w-px h-2 bg-white/5" />
              <div className="flex items-center gap-1.5">
                <Gift className="w-2.5 h-2.5 text-white/5" />
                <span className="text-white/5 text-[6px] font-light tracking-[0.4em] uppercase">Gift Wrapping</span>
              </div>
              <div className="w-px h-2 bg-white/5" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-2.5 h-2.5 text-white/5" />
                <span className="text-white/5 text-[6px] font-light tracking-[0.4em] uppercase">Express Delivery</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== GLOBAL STYLES ===== */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        h1, h2, h3, .heading {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes gradient-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.8); opacity: 0.4; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out both; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out both; }
        .animate-float { animation: float 3.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 7s linear infinite; }
        .animate-gradient-x { animation: gradient-x 4s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
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

export default CategoryWise;