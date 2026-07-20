"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  ArrowRight,
  Loader2,
  Star,
  Sparkles,
  Shield,
  Truck,
  Headphones,
  Award,
  ChevronRight,
  Clock,
  TrendingUp,
  Gem,
  Heart,
  Eye,
  Package,
  Zap,
  Gift,
  BadgePercent,
  Store,
  Users,
  ThumbsUp,
  Crown,
  Diamond,
  Mail,
  Feather,
  Orbit,
  Flower2,
  Grid3X3,
  Layers,
  Tag,
  CircleCheck,
  Flame,
  Rocket,
  Medal,
  Wand2,
  Infinity,
  ArrowUpRight,
  Leaf,
  ArrowLeft
} from "lucide-react";

const Productpage = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter();

  const getcategory = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/getproduct`
      );

      if (!res.data || !res.data.data) {
        setError("No products found");
        setCategory([]);
        return;
      }

      const unique = [
        ...new Map(
          res.data.data.map((item) => [
            item.category,
            {
              category: item.category,
              image: item.thumbnail,
            },
          ])
        ).values(),
      ];

      setCategory(unique);
    } catch (err) {
      console.log(err);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  const handleCategoryClick = (categoryName) => {
    router.push(`/categorywise/${categoryName}`);
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
            <p className="text-[#8B5CF6] text-xs tracking-[0.4em] uppercase font-light">Crafting Luxury</p>
            <p className="text-white/10 text-[10px] tracking-widest font-light">Curating excellence</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 pt-28">
        <div className="bg-[#12121A] border border-white/5 rounded-3xl p-12 text-center max-w-md">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-2xl font-light text-white">Something went wrong</h2>
          <p className="text-white/30 text-sm font-light mt-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-10 py-3.5 rounded-full text-sm font-light tracking-wider transition-all duration-300 border border-white/5 hover:border-white/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] overflow-x-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-[40%] -right-[20%] w-[800px] h-[800px] bg-[#8B5CF6]/[0.02] rounded-full blur-3xl"></div>
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

      {/* ===== BACK BUTTON ===== */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
        >
          <div className="p-2 rounded-full bg-white/[0.015] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
        </button>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-7xl mx-auto pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-3 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-full px-5 py-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="text-[#8B5CF6] text-[9px] tracking-[0.3em] uppercase font-light">Curated Collection 2024</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]">
                Discover
                <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent font-medium">
                  Premium
                </span>
                <br />
                <span className="font-light">Products</span>
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-transparent" />
                <span className="text-white/20 text-[9px] tracking-[0.3em] uppercase font-light">Since 2020</span>
                <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-transparent" />
              </div>
            </div>

            <p className="text-white/30 text-base max-w-lg leading-relaxed font-light tracking-wide">
              Explore our curated collection of premium products from top brands. 
              Quality meets elegance in every selection.
            </p>

            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => {
                  const section = document.getElementById('categories');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-8 py-3.5 rounded-xl font-light text-sm tracking-wider hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 flex items-center gap-2.5"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => router.push("/wishlist")}
                className="group bg-white/[0.02] border border-white/5 text-white/40 hover:text-white/70 px-8 py-3.5 rounded-xl font-light text-sm tracking-wider hover:bg-white/5 hover:border-white/20 transition-all duration-500 flex items-center gap-2.5"
              >
                <Heart className="w-4 h-4 text-[#8B5CF6]" />
                <span>Wishlist</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              {['Premium Quality', 'Secure Shopping', 'Fast Delivery', '24/7 Support'].map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
                  <span className="text-white/20 text-[9px] tracking-[0.15em] uppercase font-light">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-8 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl" />
              <div className="relative bg-[#12121A] border border-white/5 rounded-3xl p-10 md:p-12 shadow-2xl">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border border-[#8B5CF6]/10 rounded-full animate-ping" />
                    </div>
                    <Diamond className="w-40 h-40 text-[#8B5CF6]/20 mx-auto relative z-10" />
                  </div>
                  <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-light">Premium Selection</p>
                  <p className="text-white/40 text-lg font-light tracking-wide mt-2">Curated For You</p>
                  <div className="flex items-center justify-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#8B5CF6] fill-[#8B5CF6]" />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="w-8 h-px bg-[#8B5CF6]/10" />
                    <span className="text-white/10 text-[7px] tracking-[0.4em] uppercase font-light">Luxury</span>
                    <div className="w-8 h-px bg-[#8B5CF6]/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section className="max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Gem, value: '500+', label: 'Premium Products' },
            { icon: Users, value: '50K+', label: 'Happy Customers' },
            { icon: Star, value: '4.9★', label: 'Customer Rating' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group bg-[#12121A] border border-white/5 rounded-xl p-5 text-center hover:border-[#8B5CF6]/15 hover:bg-[#8B5CF6]/5 hover:-translate-y-0.5 transition-all duration-500"
            >
              <div className="w-10 h-10 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                <stat.icon className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <p className="text-2xl font-light text-white tracking-tight mt-2">{stat.value}</p>
              <p className="text-white/20 text-[8px] uppercase tracking-[0.2em] font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Truck, label: "Free Delivery", desc: "Above ₹499" },
            { icon: Shield, label: "Secure", desc: "100% protected" },
            { icon: Clock, label: "Fast Shipping", desc: "3-5 days" },
            { icon: Headphones, label: "24/7 Support", desc: "Always here" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-[#12121A] border border-white/5 rounded-xl p-4 text-center hover:border-[#8B5CF6]/15 hover:bg-[#8B5CF6]/5 hover:-translate-y-0.5 transition-all duration-500 group"
              >
                <div className="w-10 h-10 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-all duration-300">
                  <Icon className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <h4 className="text-white/40 text-xs font-light mt-2 tracking-wide">{item.label}</h4>
                <p className="text-white/10 text-[8px] mt-0.5 font-light">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== LUXURY CATEGORIES ===== */}
      <section id="categories" className="max-w-7xl mx-auto pb-16">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-full px-4 py-1.5 mb-4">
            <Grid3X3 className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[#8B5CF6] text-[8px] tracking-[0.3em] uppercase font-light">Collections</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Browse <span className="text-[#8B5CF6] font-medium">Luxury</span> Categories
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/20 mx-auto mt-3" />
          <p className="text-white/20 text-xs mt-3 max-w-xl mx-auto font-light tracking-wide">
            Explore our curated categories and discover premium products
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="bg-[#8B5CF6]/5 text-[#8B5CF6] px-3.5 py-1 rounded-full text-[8px] font-light tracking-wider border border-[#8B5CF6]/10">
              {category.length} Categories
            </span>
            <span className="bg-white/5 text-white/30 px-3.5 py-1 rounded-full text-[8px] font-light flex items-center gap-1.5 border border-white/5">
              <Flame className="w-2.5 h-2.5 text-[#8B5CF6]" />
              Trending
            </span>
            <span className="bg-white/5 text-white/30 px-3.5 py-1 rounded-full text-[8px] font-light flex items-center gap-1.5 border border-white/5">
              <Rocket className="w-2.5 h-2.5 text-[#8B5CF6]" />
              Best Sellers
            </span>
            <span className="bg-white/5 text-white/30 px-3.5 py-1 rounded-full text-[8px] font-light flex items-center gap-1.5 border border-white/5">
              <Crown className="w-2.5 h-2.5 text-[#8B5CF6]" />
              Premium
            </span>
          </div>
        </div>

        {category.length === 0 ? (
          <div className="bg-[#12121A] border border-white/5 rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-xl font-light text-white">No Categories Found</h3>
            <p className="text-white/20 text-sm font-light mt-2">Please check back later for new collections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {category.map((item, index) => {
              const imageUrl = item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/${item.image}`
                : "/no-image.png";

              return (
                <div
                  key={item.category}
                  onClick={() => handleCategoryClick(item.category)}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group relative bg-[#12121A] rounded-xl overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-1 border border-white/5 hover:border-[#8B5CF6]/20 hover:shadow-[0_20px_60px_rgba(139,92,246,0.04)]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative overflow-hidden h-48 sm:h-52">
                    <img
                      src={imageUrl}
                      alt={item.category}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/no-image.png";
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 via-30% to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-px bg-[#8B5CF6]" />
                        <span className="text-[#8B5CF6] text-[7px] tracking-[0.3em] uppercase font-light">Premium</span>
                      </div>
                      <h3 className="text-xl font-light text-white group-hover:text-[#8B5CF6] transition-colors duration-500 capitalize tracking-tight">
                        {item.category}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/5">
                          <Star className="w-2.5 h-2.5 text-[#8B5CF6] fill-[#8B5CF6]" />
                          <span className="text-white/70 text-[8px] font-light">4.9</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/5">
                          <Package className="w-2 h-2 text-[#8B5CF6]" />
                          <span className="text-white/40 text-[7px] font-light">2500+</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-2.5 py-0.5 rounded-full text-[6px] font-light tracking-[0.15em] uppercase flex items-center gap-1 shadow-lg shadow-[#8B5CF6]/10 z-20">
                      <Crown className="w-2 h-2" />
                      <span>Luxury</span>
                    </div>

                    <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10`}>
                      <div className="bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/5 transform scale-90 group-hover:scale-100 transition-all duration-500">
                        <div className="flex flex-col items-center gap-2">
                          <Eye className="w-5 h-5 text-[#8B5CF6]" />
                          <span className="text-white/60 text-[8px] font-light tracking-wider uppercase">Quick View</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-t from-[#09090B] to-transparent">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E] animate-pulse" />
                        <span className="text-[#22C55E] text-[7px] font-light tracking-wider">In Stock</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/10 text-[7px] font-light">
                        <Gift className="w-2 h-2 text-[#8B5CF6]" />
                        <span>Free</span>
                      </div>
                    </div>
                    
                    <button className={`relative w-full py-2.5 rounded-lg font-light text-[10px] tracking-wider transition-all duration-500 overflow-hidden group/btn ${
                      hoveredCategory === index 
                        ? 'text-white' 
                        : 'text-white/40'
                    }`}>
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        hoveredCategory === index 
                          ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
                          : 'bg-white/5 border border-white/5'
                      }`} />
                      
                      <span className="relative flex items-center justify-center gap-1.5">
                        <span>Explore</span>
                        <ChevronRight className={`w-3 h-3 transition-all duration-300 ${
                          hoveredCategory === index ? 'translate-x-0.5' : ''
                        }`} />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ===== OFFER BANNER ===== */}
      <section className="max-w-7xl mx-auto pb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-2xl p-10 md:p-14 text-center">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1 mb-3">
              <BadgePercent className="w-3.5 h-3.5" />
              <span className="text-[8px] font-light tracking-[0.25em] uppercase text-white/90">Limited Offer</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-2">Get 20% Off on Your First Order</h3>
            <p className="text-white/60 text-xs max-w-lg mx-auto mb-4 font-light">
              Use code <span className="font-medium text-white">WELCOME20</span> at checkout
            </p>
            <button className="bg-white text-[#8B5CF6] px-8 py-3 rounded-xl font-light text-sm tracking-wider hover:scale-[1.02] transition-all duration-500 shadow-xl">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="max-w-7xl mx-auto pb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-full px-4 py-1.5 mb-3">
            <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[#8B5CF6] text-[8px] tracking-[0.3em] uppercase font-light">Testimonials</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            What Our <span className="text-[#8B5CF6] font-medium">Customers Say</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Sarah Johnson",
              role: "Verified Buyer",
              text: "Absolutely love the quality of products! The delivery was fast and the customer service was exceptional."
            },
            {
              name: "Michael Chen",
              role: "Premium Member",
              text: "Best shopping experience ever. Premium quality products at affordable prices. Highly recommended!"
            },
            {
              name: "Emily Davis",
              role: "Frequent Shopper",
              text: "I've been shopping here for months and never been disappointed. The variety and quality are unmatched."
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-[#12121A] border border-white/5 rounded-xl p-5 text-center hover:border-[#8B5CF6]/15 hover:bg-[#8B5CF6]/5 transition-all duration-500 group"
            >
              <div className="flex justify-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#8B5CF6] fill-[#8B5CF6]" />
                ))}
              </div>
              <p className="text-white/30 text-xs leading-relaxed font-light">"{testimonial.text}"</p>
              <div className="mt-3">
                <p className="text-white/60 text-xs font-light">{testimonial.name}</p>
                <p className="text-white/10 text-[8px] font-light">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="max-w-7xl mx-auto pb-16">
        <div className="bg-[#12121A] border border-white/5 rounded-2xl p-10 md:p-14 text-center">
          <div className="inline-flex items-center gap-2.5 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-full px-4 py-1.5 mb-3">
            <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[#8B5CF6] text-[8px] tracking-[0.3em] uppercase font-light">Stay Connected</span>
          </div>
          <h3 className="text-2xl font-light text-white tracking-tight mb-1.5">
            Subscribe to Our <span className="text-[#8B5CF6] font-medium">Newsletter</span>
          </h3>
          <p className="text-white/20 text-xs max-w-lg mx-auto mb-5 font-light tracking-wide">
            Get the latest updates on new products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3 text-white placeholder-white/10 outline-none focus:border-[#8B5CF6]/30 transition-all duration-300 font-light text-sm"
            />
            <button className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-8 py-3 rounded-xl font-light text-sm tracking-wider hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="max-w-7xl mx-auto border-t border-white/5 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Diamond className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-lg font-light text-white tracking-tight">LUXE<span className="text-[#8B5CF6]">.</span></span>
            </div>
            <p className="text-white/10 text-xs font-light leading-relaxed max-w-xs">
              Premium products curated for the discerning customer.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-light text-white/30 tracking-[0.2em] uppercase mb-3">Shop</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">All Products</a></li>
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">Categories</a></li>
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-light text-white/30 tracking-[0.2em] uppercase mb-3">Support</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">Returns</a></li>
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-light text-white/30 tracking-[0.2em] uppercase mb-3">Company</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">About</a></li>
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/10 text-xs font-light hover:text-[#8B5CF6] transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-white/5 text-[8px] font-light tracking-wider">© 2024 LUXE. All rights reserved.</p>
        </div>
      </footer>

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
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out both; }
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

export default Productpage;