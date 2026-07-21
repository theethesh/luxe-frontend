"use client";

import { API_URL } from "@/lib/api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Search,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Tag,
  TrendingUp,
  Eye,
  ArrowLeft,
  Gem,
  Infinity,
  Gift,
  Zap,
  Clock
} from "lucide-react";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await axios.get(
        `${API_URL}/api/getproduct`
      );
      setProduct(res.data.data || []);
    } catch (error) {
      console.log(error);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      await axios.delete(
        `${API_URL}/api/deleteproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product deleted successfully");
      await getProduct();
    } catch (error) {
      console.log(error);
      setError("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = product.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Products</p>
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
        
        {/* ===== PAGE HEADER ===== */}
        <div className="mb-10 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Inventory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Products</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8B5CF6]" />
                <span>Manage your product inventory</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 animate-slideInRight">
              <button
                onClick={() => router.push("/admin/addproduct")}
                className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-light px-6 py-3 rounded-xl text-sm tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] active:scale-[0.98] flex items-center gap-2 group border border-white/5"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                <span>Add Product</span>
              </button>
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

        {/* ===== SEARCH BAR ===== */}
        <div className="mb-6 animate-fadeInUp">
          <div className="relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15 group-focus-within:text-[#8B5CF6] transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.015] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/5 outline-none focus:border-[#8B5CF6]/20 focus:shadow-[0_0_30px_rgba(139,92,246,0.03)] transition-all duration-300 font-light text-sm tracking-wide"
            />
          </div>
        </div>

        {/* ===== PRODUCTS TABLE ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/[0.015] border-b border-white/5">
                <tr>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Image</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Title</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Category</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Brand</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Price</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Stock</th>
                  <th className="px-4 py-4 text-center text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
                          <Package className="w-10 h-10 text-[#8B5CF6] opacity-30" />
                        </div>
                        <p className="text-white/40 text-base font-light tracking-wide">
                          {searchTerm ? "No products match your search" : "No Products Found"}
                        </p>
                        <p className="text-white/10 text-sm font-light">
                          {searchTerm ? "Try a different search term" : "Add your first product to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((p, index) => {
                    const imageUrl = p.thumbnail
                      ? p.thumbnail.startsWith("http")
                        ? p.thumbnail
                        : `${API_URL}/${p.thumbnail}`
                      : "/no-image.png";

                    return (
                      <tr
                        key={p._id}
                        className="hover:bg-white/[0.015] transition-colors duration-300 group animate-fadeInUp"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-4 py-4">
                          <div className="relative">
                            <img
                              src={imageUrl}
                              alt={p.title}
                              className="w-14 h-14 rounded-xl object-cover border border-white/5 group-hover:border-[#8B5CF6]/15 transition-all duration-300"
                              onError={(e) => {
                                e.target.src = "/no-image.png";
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-white/50 text-sm font-light tracking-wide line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                            {p.title}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-light bg-[#8B5CF6]/5 text-[#8B5CF6] border border-[#8B5CF6]/10">
                            <Tag className="w-2.5 h-2.5" />
                            {p.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-white/20 text-sm font-light">
                          {p.brand || "N/A"}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[#8B5CF6] font-light text-sm">
                            ₹{p.price?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-light border ${
                            p.stock > 0 
                              ? "bg-[#22C55E]/5 text-[#22C55E] border-[#22C55E]/10"
                              : "bg-red-500/5 text-red-400 border-red-500/10"
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${p.stock > 0 ? "bg-[#22C55E]" : "bg-red-400"} animate-pulse`}></span>
                            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => router.push(`/admin/addproduct?id=${p._id}`)}
                              className="p-1.5 bg-[#8B5CF6]/5 text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-all duration-300 hover:scale-110 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/20 group/btn"
                              title="Edit Product"
                            >
                              <Edit className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform duration-300" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p._id)}
                              disabled={deletingId === p._id}
                              className="p-1.5 bg-red-500/5 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/10 hover:border-red-500/20"
                              title="Delete Product"
                            >
                              {deletingId === p._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => router.push(`/product/${p._id}`)}
                              className="p-1.5 bg-white/5 text-white/20 rounded-lg hover:bg-white/10 hover:text-white/40 transition-all duration-300 hover:scale-110 border border-white/5 hover:border-white/15"
                              title="View Product"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ===== PAGINATION ===== */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-white/5">
              <div className="text-sm text-white/15 font-light">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white/[0.015] border border-white/5 rounded-lg hover:border-[#8B5CF6]/15 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#8B5CF6]/5"
                >
                  <ChevronLeft className="w-4 h-4 text-white/15" />
                </button>
                <span className="text-white/20 text-sm px-4 py-1.5 bg-white/[0.015] rounded-lg border border-white/5 font-light">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white/[0.015] border border-white/5 rounded-lg hover:border-[#8B5CF6]/15 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#8B5CF6]/5"
                >
                  <ChevronRight className="w-4 h-4 text-white/15" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===== FOOTER STATS ===== */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl transition-all duration-500 hover:border-[#8B5CF6]/10 animate-fadeInUp">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
              <Package className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <span className="text-white/20 text-sm font-light">
              Total Products: <span className="text-[#8B5CF6] font-light">{product.length}</span>
              {searchTerm && ` (Filtered: ${filteredProducts.length})`}
            </span>
          </div>
          <button
            onClick={() => router.push("/admin/addproduct")}
            className="text-[#8B5CF6] hover:text-[#A855F7] transition-colors flex items-center gap-1.5 text-sm font-light group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* ===== TRUST BADGE ===== */}
        <div className="mt-6 flex items-center justify-center gap-3 animate-fadeInUp">
          <Shield className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">Secure Inventory Management</span>
          <div className="w-px h-3 bg-white/5" />
          <Sparkles className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">LUXE</span>
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

export default Product;