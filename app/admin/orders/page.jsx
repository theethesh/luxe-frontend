"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Package, 
  Users, 
  ShoppingBag, 
  Truck,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ChevronDown,
  Search,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Gem,
  Infinity,
  Gift
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orderdata || []);
    } catch (error) {
      console.log(error.message);
      setError("Failed to load orders");
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem("token");

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/updateorderstatus/${id}`,
        { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getOrders();
    } catch (error) {
      console.log(error.message);
      setError("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      packed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      delivered: "bg-green-500/10 text-green-400 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return colors[status?.toLowerCase()] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      packed: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle,
    };
    const Icon = icons[status?.toLowerCase()] || Clock;
    return Icon;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.userid?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? order.orderStatus === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Orders</p>
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
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Manage Orders</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Orders</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" />
                <span>Manage and track all customer orders</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/[0.015] px-5 py-3 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Total</p>
                <p className="text-white/60 text-lg font-light">{orders.length}</p>
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

        {/* ===== FILTERS ===== */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fadeInUp">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15 group-focus-within:text-[#8B5CF6] transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search by customer or order ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.015] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/5 outline-none focus:border-[#8B5CF6]/20 focus:shadow-[0_0_30px_rgba(139,92,246,0.03)] transition-all duration-300 font-light text-sm tracking-wide"
            />
          </div>
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.015] border border-white/5 rounded-xl py-3.5 pl-11 pr-10 text-white outline-none focus:border-[#8B5CF6]/20 focus:shadow-[0_0_30px_rgba(139,92,246,0.03)] transition-all duration-300 appearance-none font-light text-sm tracking-wide"
            >
              <option value="" className="bg-[#12121A]">All Status</option>
              <option value="pending" className="bg-[#12121A]">Pending</option>
              <option value="packed" className="bg-[#12121A]">Packed</option>
              <option value="shipped" className="bg-[#12121A]">Shipped</option>
              <option value="delivered" className="bg-[#12121A]">Delivered</option>
              <option value="cancelled" className="bg-[#12121A]">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15 pointer-events-none" />
          </div>
        </div>

        {/* ===== ORDERS TABLE ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/[0.015] border-b border-white/5">
                <tr>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Order ID</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Customer</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Product</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Image</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Qty</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Price</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Payment</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Status</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
                          <Package className="w-10 h-10 text-[#8B5CF6] opacity-30" />
                        </div>
                        <p className="text-white/40 text-base font-light tracking-wide">No Orders Found</p>
                        <p className="text-white/10 text-sm font-light">Orders will appear here once customers place them</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order, index) => {
                    const StatusIcon = getStatusIcon(order.orderStatus);
                    
                    return (
                      <tr key={order._id} className="hover:bg-white/[0.015] transition-colors duration-300 group animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
                        <td className="px-4 py-4">
                          <span className="text-[#8B5CF6] font-mono text-sm font-light tracking-wider">
                            #{order._id?.slice(-6) || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-white/10" />
                            <span className="text-white/40 text-sm font-light">
                              {order.userid?.name || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-white/20 text-sm font-light">
                            {order.products?.length || 0} items
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {order.products?.[0]?.productid ? (
                            <img
                              src={
                                order.products[0].productid.thumbnail?.startsWith("http")
                                  ? order.products[0].productid.thumbnail
                                  : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/${order.products[0].productid.thumbnail}`
                              }
                              alt={order.products[0].productid.title}
                              className="w-12 h-12 rounded-xl object-cover border border-white/5 group-hover:border-[#8B5CF6]/15 transition-all duration-300"
                              onError={(e) => {
                                e.target.src = "/no-image.png";
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-white/[0.015] border border-white/5 flex items-center justify-center">
                              <Package className="w-5 h-5 text-white/10" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-white/40 text-sm font-light">
                          {order.products?.reduce((sum, p) => sum + p.quantity, 0) || 0}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[#8B5CF6] font-light text-sm">
                            ₹{order.totalAmount?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-white/20 text-sm font-light">
                            {order.paymentMethod || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-light border ${getStatusColor(order.orderStatus)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.orderStatus || 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              defaultValue={order.orderStatus || 'pending'}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                updateStatus(order._id, newStatus);
                              }}
                              disabled={updatingId === order._id}
                              className="bg-white/[0.015] border border-white/5 rounded-lg px-3 py-2 text-white/40 text-sm outline-none focus:border-[#8B5CF6]/20 focus:shadow-[0_0_20px_rgba(139,92,246,0.03)] transition-all duration-300 disabled:opacity-50 font-light tracking-wide appearance-none min-w-[100px]"
                            >
                              <option value="pending" className="bg-[#12121A]">Pending</option>
                              <option value="packed" className="bg-[#12121A]">Packed</option>
                              <option value="shipped" className="bg-[#12121A]">Shipped</option>
                              <option value="delivered" className="bg-[#12121A]">Delivered</option>
                              <option value="cancelled" className="bg-[#12121A]">Cancelled</option>
                            </select>
                            {updatingId === order._id && (
                              <Loader2 className="w-4 h-4 text-[#8B5CF6] animate-spin" />
                            )}
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
          {filteredOrders.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-white/5">
              <div className="text-sm text-white/15 font-light">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
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

        {/* ===== STATS FOOTER ===== */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl transition-all duration-500 hover:border-[#8B5CF6]/10 animate-fadeInUp">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
              <Package className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <span className="text-white/20 text-sm font-light">
              Showing <span className="text-[#8B5CF6] font-light">{filteredOrders.length}</span> orders
              {orders.length !== filteredOrders.length && ` (filtered from ${orders.length})`}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[9px] font-light tracking-wider">
            <span className="flex items-center gap-1.5 text-yellow-400/40">
              <span className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
              Pending
            </span>
            <span className="flex items-center gap-1.5 text-blue-400/40">
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
              Packed
            </span>
            <span className="flex items-center gap-1.5 text-purple-400/40">
              <span className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
              Shipped
            </span>
            <span className="flex items-center gap-1.5 text-green-400/40">
              <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
              Delivered
            </span>
            <span className="flex items-center gap-1.5 text-red-400/40">
              <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
              Cancelled
            </span>
          </div>
        </div>

        {/* ===== TRUST BADGE ===== */}
        <div className="mt-6 flex items-center justify-center gap-3 animate-fadeInUp">
          <Shield className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">Secure Order Management</span>
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
      `}</style>
    </div>
  );
}