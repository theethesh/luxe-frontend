"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Trash2,
  Diamond,
  Sparkles,
  Package,
  Tag,
  Star,
  Shield,
  Crown,
  Zap,
  Gem,
  Infinity,
  Clock,
  Gift
} from "lucide-react";

const AddProduct = () => {
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    rating: "",
    stock: "",
    discountPercentage: "",
    thumbnail: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getProduct();
    }
  }, [id]);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/viewdetail/${id}`
      );
      const p = res.data.details;
      setData({
        title: p.title || "",
        price: p.price || "",
        description: p.description || "",
        category: p.category || "",
        rating: p.rating || "",
        stock: p.stock || "",
        discountPercentage: p.discountPercentage || "",
        thumbnail: p.thumbnail || null
      });
      if (p.thumbnail) {
        setImagePreview(
          p.thumbnail.startsWith("http")
            ? p.thumbnail
            : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/${p.thumbnail}`
        );
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({
        ...data,
        thumbnail: file
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setData({
      ...data,
      thumbnail: null
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.title || !data.price || !data.category || !data.description) {
      setError("Please fill in all required fields");
      return;
    }

    if (!data.thumbnail && !isEditing) {
      setError("Please select an image");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("stock", data.stock || "0");
      formData.append("discountPercentage", data.discountPercentage || "0");
      formData.append("rating", data.rating || "0");
      
      if (data.thumbnail instanceof File) {
        formData.append("thumbnail", data.thumbnail);
      }

      if (isEditing) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/update/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setSuccess("Product updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/productcreate`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setSuccess("Product added successfully!");
        
        setData({
          title: "",
          price: "",
          description: "",
          category: "",
          rating: "",
          stock: "",
          discountPercentage: "",
          thumbnail: null
        });
        setImagePreview(null);
      }

      setTimeout(() => {
        setSuccess("");
        router.push("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: "title", placeholder: "Product Title", type: "text", required: true, icon: Package },
    { name: "price", placeholder: "Price (₹)", type: "number", required: true, icon: Tag },
    { name: "category", placeholder: "Category", type: "text", required: true, icon: Crown },
    { name: "description", placeholder: "Description", type: "text", required: true, icon: Sparkles },
    { name: "rating", placeholder: "Rating (0-5)", type: "number", step: "0.1", icon: Star },
    { name: "stock", placeholder: "Stock Quantity", type: "number", icon: Package },
    { name: "discountPercentage", placeholder: "Discount %", type: "number", icon: Tag }
  ];

  if (isLoading && isEditing) {
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-medium">Loading Product</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-1/3 -right-1/3 w-[600px] h-[600px] bg-[#8B5CF6]/[0.025] rounded-full blur-3xl animate-pulse"></div>
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
          <div className="p-2 rounded-full bg-white/[0.02] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
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
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">
                  {isEditing ? "Update Product" : "Add New Product"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                {isEditing ? "Edit" : "New"} <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Product</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/30 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#8B5CF6]" />
                <span>
                  {isEditing ? "Update your product details" : "Create a new product for your store"}
                </span>
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-3 bg-white/[0.02] px-5 py-3 rounded-xl border border-white/5 hover:border-[#8B5CF6]/15 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                {isEditing ? (
                  <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
                ) : (
                  <Diamond className="w-3.5 h-3.5 text-[#8B5CF6]" />
                )}
              </div>
              <div>
                <p className="text-white/15 text-[8px] tracking-[0.2em] uppercase font-light">Status</p>
                <p className="text-white/40 text-xs font-light">{isEditing ? "Editing Product" : "New Product"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MAIN CARD ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/15 hover:shadow-[0_30px_100px_rgba(139,92,246,0.05)] animate-fadeInUp">
          
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
          
          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl backdrop-blur-sm animate-slideDown">
                <div className="flex items-center gap-3 text-[#22C55E]">
                  <CheckCircle className="w-5 h-5 animate-bounce" />
                  <span className="text-white/60 text-sm font-light tracking-wide">{success}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl backdrop-blur-sm animate-shake">
                <div className="flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-white/60 text-sm font-light tracking-wide">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Image Upload */}
              <div className="bg-white/[0.015] border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-[#8B5CF6]/10">
                <label className="block text-white/40 font-light tracking-wide mb-3 flex items-center gap-2 text-xs">
                  <ImageIcon className="w-4 h-4 text-[#8B5CF6]" />
                  Product Image <span className="text-red-400/40 text-[10px]">*</span>
                </label>
                
                {imagePreview ? (
                  <div className="relative inline-block group">
                    <div className="relative overflow-hidden rounded-xl border border-white/5">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500/60 text-white rounded-full p-1.5 hover:bg-red-500 transition-all duration-300 border-2 border-[#09090B] hover:scale-110"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="image-upload" className="block cursor-pointer">
                    <div className="border-2 border-dashed border-white/5 rounded-xl p-8 text-center hover:border-[#8B5CF6]/20 transition-all duration-500 group">
                      <div className="w-14 h-14 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center group-hover:bg-[#8B5CF6]/10 transition-all duration-500 group-hover:scale-110">
                        <ImageIcon className="w-6 h-6 text-[#8B5CF6] opacity-40" />
                      </div>
                      <p className="text-white/20 text-sm font-light mt-3 group-hover:text-white/40 transition-colors duration-300">Click to upload or drag and drop</p>
                      <p className="text-white/5 text-xs mt-1 font-light">PNG, JPG, WEBP (Max 5MB)</p>
                    </div>
                  </label>
                )}
                
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleImage}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                {imagePreview && (
                  <label
                    htmlFor="image-upload"
                    className="mt-4 inline-block bg-[#8B5CF6]/5 text-[#8B5CF6] px-5 py-2 rounded-full cursor-pointer hover:bg-[#8B5CF6]/10 transition-all duration-300 text-[10px] font-light border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/30 hover:scale-[1.02]"
                  >
                    Change Image
                  </label>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputFields.map((field) => {
                  const Icon = field.icon;
                  const isFocused = focusedField === field.name;
                  const value = data[field.name] || "";

                  return (
                    <div
                      key={field.name}
                      className={field.name === "description" ? "md:col-span-2" : ""}
                    >
                      <label className="block text-white/20 text-[10px] font-light tracking-wide mb-1.5 capitalize flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        {field.placeholder.replace(/[()₹%]/g, "").trim()}
                        {field.required && <span className="text-red-400/40 text-[9px]">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={value}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          step={field.step}
                          className={`w-full bg-white/[0.015] text-white border rounded-xl py-3.5 px-4 placeholder-white/5 outline-none transition-all duration-300 font-light text-sm
                            ${isFocused ? 'border-[#8B5CF6]/20 shadow-[0_0_30px_rgba(139,92,246,0.03)]' : 'border-white/5 hover:border-[#8B5CF6]/10'}
                          `}
                          required={field.required}
                        />
                        {isFocused && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Sparkles className="w-3 h-3 text-[#8B5CF6] animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-light tracking-wider py-3.5 rounded-xl text-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isEditing ? "Updating..." : "Adding..."}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span>{isEditing ? "Update Product" : "Add Product"}</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-white/[0.02] text-white/30 font-light tracking-wider py-3.5 rounded-xl text-sm hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-[#8B5CF6]/15 hover:text-white/50"
                >
                  Cancel
                </button>
              </div>

              {/* Progress Indicator */}
              {Object.values(data).some(v => v && v !== null) && !isLoading && (
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] text-white/15 font-light tracking-wide mb-1">
                    <span>Completion</span>
                    <span className="text-[#8B5CF6]">
                      {Math.round((Object.values(data).filter(v => v && v !== null && v !== "").length / 8) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full transition-all duration-700"
                      style={{ 
                        width: `${Math.round((Object.values(data).filter(v => v && v !== null && v !== "").length / 8) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-5 border-t border-white/5 animate-fadeInUp">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-white/10" />
            <p className="text-white/10 text-[8px] font-light tracking-wider">Your product data is securely stored</p>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2 text-white/5 text-[7px] font-light tracking-wider">
            <Sparkles className="w-3 h-3 text-white/5" />
            <span>LUXE</span>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2 text-white/5 text-[7px] font-light tracking-wider">
            <Gift className="w-3 h-3 text-white/5" />
            <span>Premium</span>
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-slideDown { animation: slideDown 0.3s ease-out both; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
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

export default AddProduct;