"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "../contaxt/authcontaxt";
import {
  ShoppingBag,
  Heart,
  Filter,
  Grid3x3,
  List,
  Star,
  StarHalf,
  Eye,
  X,
  SlidersHorizontal,
  Search,
  Package,
  Truck,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Loader2,
  AlertCircle,
  Gem,
  Crown,
  Shield,
  Infinity,
  Zap,
  ArrowUpRight,
  Leaf
} from "lucide-react";
import axios from "axios";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist, isInCart, cartCount } = useApp();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006";

  const categories = [
    { id: "", name: "All Products", icon: Package },
    { id: "men", name: "Men's Fashion", icon: Crown },
    { id: "women", name: "Women's Fashion", icon: Sparkles },
    { id: "accessories", name: "Accessories", icon: Gem },
    { id: "footwear", name: "Footwear", icon: Truck },
    { id: "watches", name: "Watches", icon: Clock },
    { id: "jewelry", name: "Jewelry", icon: Award },
    { id: "bags", name: "Bags", icon: ShoppingBag },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
  ];

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      if (sortBy) params.append("sort", sortBy);
      if (priceRange.min > 0) params.append("minPrice", priceRange.min);
      if (priceRange.max < 10000) params.append("maxPrice", priceRange.max);
      params.append("page", currentPage);
      params.append("limit", 12);

      const res = await axios.get(
        `${API_URL}/api/products?${params.toString()}`
      );

      setProducts(res.data.products || []);
      setFilteredProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, sortBy, priceRange, currentPage, API_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      // Optional: Show success toast
    }
  };

  const handleWishlistToggle = async (productId) => {
    // context.toggleWishlist looks up the right id for add vs remove and
    // refreshes wishlistItems/wishlistCount itself — no extra fetch needed.
    await toggleWishlist(productId);
  };

  const handleFilter = () => {
    fetchProducts();
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setPriceRange({ min: 0, max: 10000 });
    setSortBy("featured");
    setCurrentPage(1);
    fetchProducts();
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3.5 h-3.5 fill-[#8B5CF6] text-[#8B5CF6]" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-3.5 h-3.5 fill-[#8B5CF6] text-[#8B5CF6]" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3.5 h-3.5 text-white/10" />);
    }
    return stars;
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Collection</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 pt-28">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-white/40 mb-2">Something went wrong</h2>
          <p className="text-white/10 text-sm mb-4">{error}</p>
          <button
            onClick={() => fetchProducts()}
            className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white rounded-xl font-light text-sm tracking-wider hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500"
          >
            Try Again
          </button>
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
        
        {/* ===== HEADER ===== */}
        <div className="mb-10 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Collection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Shop <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Collection</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" />
                <span>{filteredProducts.length} premium products</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto animate-slideInRight">
              <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-[#8B5CF6] transition-colors duration-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchProducts()}
                  placeholder="Search products..."
                  className="w-full bg-white/[0.015] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/10 outline-none focus:border-[#8B5CF6]/30 focus:shadow-[0_0_30px_rgba(139,92,246,0.03)] transition-all duration-300 font-light text-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-white/20 hover:text-white/60 hover:border-[#8B5CF6]/20 transition-all duration-500 hover:bg-[#8B5CF6]/5"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        {showFilters && (
          <div className="bg-[#12121A] border border-white/5 rounded-xl p-6 mb-6 animate-slideDown">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white/40 text-sm font-light flex items-center gap-2.5 tracking-wider">
                <Filter className="w-4 h-4 text-[#8B5CF6]" />
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-white/10 hover:text-white/30 transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-white/10 text-[10px] font-light tracking-wider uppercase block mb-1.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/[0.015] border border-white/5 rounded-lg px-4 py-2.5 text-white/60 text-sm outline-none focus:border-[#8B5CF6]/30 transition-all duration-300 font-light"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#12121A]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/10 text-[10px] font-light tracking-wider uppercase block mb-1.5">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white/[0.015] border border-white/5 rounded-lg px-4 py-2.5 text-white/60 text-sm outline-none focus:border-[#8B5CF6]/30 transition-all duration-300 font-light"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#12121A]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/10 text-[10px] font-light tracking-wider uppercase block mb-1.5">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                    placeholder="Min"
                    className="w-full bg-white/[0.015] border border-white/5 rounded-lg px-3 py-2 text-white/60 text-sm outline-none focus:border-[#8B5CF6]/30 transition-all duration-300 font-light"
                  />
                  <span className="text-white/10 text-xs">-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                    placeholder="Max"
                    className="w-full bg-white/[0.015] border border-white/5 rounded-lg px-3 py-2 text-white/60 text-sm outline-none focus:border-[#8B5CF6]/30 transition-all duration-300 font-light"
                  />
                </div>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={handleFilter}
                  className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white rounded-lg py-2.5 font-light text-sm tracking-wider hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all duration-500 hover:scale-[1.02]"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2.5 bg-white/[0.015] text-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 text-sm font-light"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== VIEW CONTROLS ===== */}
        <div className="flex items-center justify-between mb-6 animate-fadeInUp">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20"
                  : "text-white/10 hover:text-white/30 hover:bg-white/[0.02]"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20"
                  : "text-white/10 hover:text-white/30 hover:bg-white/[0.02]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="text-white/10 text-[10px] font-light tracking-wider">
            {filteredProducts.length} products
          </div>
        </div>

        {/* ===== PRODUCT GRID ===== */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#12121A] border border-white/5 rounded-xl p-16 text-center animate-fadeInUp">
            <Package className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-white/40 text-lg font-light mb-2">No products found</h3>
            <p className="text-white/10 text-sm font-light">Try adjusting your filters or search terms</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white rounded-lg font-light text-sm tracking-wider hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all duration-500"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-4 md:gap-5 animate-fadeInUp`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className={`group bg-[#12121A] border border-white/5 rounded-xl overflow-hidden hover:border-[#8B5CF6]/15 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(139,92,246,0.03)] animate-scale-in ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className={`relative ${viewMode === "list" ? "md:w-64 shrink-0" : ""}`}>
                  <Link href={`/product/${product._id}`}>
                    <div className="aspect-square overflow-hidden bg-[#09090B]">
                      <img
                        src={
                          product.thumbnail?.startsWith("http")
                            ? product.thumbnail
                            : `${API_URL}/${product.thumbnail}`
                        }
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "/no-image.png";
                        }}
                      />
                    </div>
                  </Link>

                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.discount > 0 && (
                      <span className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-2 py-0.5 rounded-full text-[6px] font-light tracking-[0.1em] uppercase flex items-center gap-1 shadow-lg">
                        <Tag className="w-1.5 h-1.5" />
                        {product.discount}% OFF
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[6px] font-light tracking-[0.1em] uppercase flex items-center gap-1 border border-emerald-500/20">
                        <Sparkles className="w-1.5 h-1.5" />
                        New
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    <button
                      onClick={() => handleWishlistToggle(product._id)}
                      className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/5 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isInWishlist(product._id) ? "fill-pink-500 text-pink-500" : "text-white/30"}`}
                      />
                    </button>
                    <Link
                      href={`/product/${product._id}`}
                      className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/5 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/20 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100"
                    >
                      <Eye className="w-3.5 h-3.5 text-white/30 hover:text-[#8B5CF6] transition-colors" />
                    </Link>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#09090B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={isInCart(product._id)}
                      className={`w-full py-2 rounded-lg font-light text-[10px] tracking-wider transition-all duration-500 flex items-center justify-center gap-2 ${
                        isInCart(product._id)
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {isInCart(product._id) ? "In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>

                <div className="p-4 flex-1">
                  <Link href={`/product/${product._id}`}>
                    <h3 className="text-white/60 text-sm font-light hover:text-[#8B5CF6] transition-colors duration-300 line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.rating || 4)}
                    </div>
                    <span className="text-white/5 text-[8px] font-light">
                      ({product.reviews?.length || 0})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[#8B5CF6] font-light text-base">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-white/10 text-[10px] line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {viewMode === "list" && (
                    <p className="text-white/10 text-xs mt-2 line-clamp-2 font-light">
                      {product.description || "Premium luxury product crafted with attention to detail."}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 animate-fadeInUp">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-white/5 text-white/10 hover:text-white/30 hover:border-[#8B5CF6]/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed font-light text-sm"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-9 h-9 rounded-lg transition-all duration-300 text-sm font-light ${
                    currentPage === index + 1
                      ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20"
                      : "text-white/10 hover:text-white/30 hover:bg-white/[0.02]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-white/5 text-white/10 hover:text-white/30 hover:border-[#8B5CF6]/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed font-light text-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* ===== FEATURES BANNER ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 pt-6 border-t border-white/5 animate-fadeInUp">
          <div className="text-center group">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-500">
              <Truck className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <h4 className="text-white/30 text-[10px] font-light tracking-wider">Free Shipping</h4>
            <p className="text-white/5 text-[8px] font-light">On orders over ₹999</p>
          </div>
          <div className="text-center group">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-500">
              <Award className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <h4 className="text-white/30 text-[10px] font-light tracking-wider">Premium Quality</h4>
            <p className="text-white/5 text-[8px] font-light">Authentic products</p>
          </div>
          <div className="text-center group">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-500">
              <Clock className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <h4 className="text-white/30 text-[10px] font-light tracking-wider">Fast Delivery</h4>
            <p className="text-white/5 text-[8px] font-light">3-5 business days</p>
          </div>
          <div className="text-center group">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <h4 className="text-white/30 text-[10px] font-light tracking-wider">Secure Payments</h4>
            <p className="text-white/5 text-[8px] font-light">100% protected</p>
          </div>
        </div>
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
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
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
        .animate-scale-in { animation: scale-in 0.5s ease-out both; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}