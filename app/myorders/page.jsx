"use client";

import { API_URL } from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle,
  MapPin,
  User,
  Phone,
  Home,
  Loader2,
  AlertCircle,
  ShoppingBag,
  ArrowLeft,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Gift,
  Star,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Hash,
  ShoppingCart,
  Gem,
  Infinity,
  Zap
} from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
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
        `${API_URL}/api/getorder`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      packed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      placed: "bg-green-500/10 text-green-400 border-green-500/20",
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
      placed: CheckCircle,
      delivered: CheckCircle,
      cancelled: XCircle,
    };
    const Icon = icons[status?.toLowerCase()] || Clock;
    return Icon;
  };

  const getStatusProgress = (status) => {
    const progress = {
      pending: 25,
      packed: 50,
      shipped: 75,
      placed: 100,
      delivered: 100,
      cancelled: 0,
    };
    return progress[status?.toLowerCase()] || 0;
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getOrderNumber = (index) => {
    const year = new Date().getFullYear();
    const num = String(index + 1).padStart(3, '0');
    return `#ORD-${year}-${num}`;
  };

  const getProductNames = (products) => {
    return products
      .filter(item => item.productid)
      .map(item => item.productid.title)
      .join(', ');
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light animate-pulse">Loading Orders</p>
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
                <span className="text-[#8B5CF6] text-[9px] tracking-[0.4em] uppercase font-medium">Your Orders</span>
                <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6]/30 to-transparent" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
                My <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Orders</span>
              </h1>
              <div className="w-20 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-4 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-4 flex items-center gap-2">
                <span className="inline-block animate-bounce-slow">📦</span>
                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} placed
              </p>
            </div>
            
            <div className="flex items-center gap-6 bg-white/[0.015] px-6 py-4 rounded-xl border border-white/5 hover:border-[#8B5CF6]/15 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.03)] animate-slideInRight group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                  <Package className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div className="text-right">
                  <p className="text-white/10 text-[8px] tracking-[0.25em] uppercase font-light">Total</p>
                  <p className="text-2xl font-light text-[#8B5CF6] group-hover:scale-105 transition-transform duration-500">
                    {orders.length}
                  </p>
                </div>
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

        {orders.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="bg-[#12121A] border border-white/5 rounded-3xl p-20 text-center transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp group">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-700 group-hover:border-[#8B5CF6]/20">
                <ShoppingBag className="w-12 h-12 text-[#8B5CF6] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full flex items-center justify-center text-white text-xs font-light animate-bounce shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  0
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-light text-white">
              No Orders <span className="text-[#8B5CF6] font-medium">Found</span>
            </h2>
            <p className="text-white/20 text-sm font-light tracking-wide mt-3">Start shopping to place your first order</p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-10 py-4 rounded-full font-light tracking-wider hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.12)] active:scale-[0.98] flex items-center gap-2 mx-auto group/btn"
            >
              <ShoppingBag className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-500" />
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* ===== STATS BAR ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-5 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl animate-fadeInUp hover:border-[#8B5CF6]/10 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 animate-pulse-slow">
                  <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Order History</p>
                  <p className="text-white/40 font-light">
                    <span className="text-[#8B5CF6]">{orders.length}</span> Total Orders
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/10 text-[10px] font-light">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                  Active
                </span>
              </div>
            </div>

            {/* ===== ORDERS LIST ===== */}
            {orders.map((order, index) => {
              const StatusIcon = getStatusIcon(order.orderStatus);
              const statusColor = getStatusColor(order.orderStatus);
              const progress = getStatusProgress(order.orderStatus);
              const isExpanded = expandedOrder === order._id;
              const orderNumber = getOrderNumber(index);
              const productNames = getProductNames(order.products);
              
              return (
                <div
                  key={order._id}
                  className="bg-[#12121A] border border-white/5 rounded-xl p-6 mb-5 transition-all duration-500 hover:border-[#8B5CF6]/15 hover:shadow-[0_20px_60px_rgba(139,92,246,0.03)] animate-fadeInUp group"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* ===== ORDER HEADER ===== */}
                  <div 
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 cursor-pointer"
                    onClick={() => toggleExpand(order._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="p-1 rounded-lg bg-[#8B5CF6]/5 group-hover:scale-110 transition-transform duration-500">
                          <Hash className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        </div>
                        <h2 className="text-[10px] font-light text-white/20 tracking-wider">Order Number</h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-white/60 font-mono font-light tracking-wider text-sm group-hover:text-[#8B5CF6] transition-colors duration-300">
                          {orderNumber}
                        </p>
                        <span className="text-white/5 text-[10px] font-light">|</span>
                        <p className="text-white/10 font-mono font-light tracking-wider text-[10px]">
                          ID: {order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      
                      <div className="mt-2 flex items-start gap-2">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                        <p className="text-white/30 text-xs font-light tracking-wide truncate group-hover:text-white/50 transition-colors duration-300">
                          {productNames || 'No products'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1.5 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-light border ${statusColor} transition-all duration-300 hover:scale-105`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.orderStatus}
                      </span>
                      <p className="text-white/10 text-[10px] font-light flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* ===== EXPANDABLE CONTENT ===== */}
                  <div className={`overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {/* Progress Bar */}
                    <div className="mb-5 pt-5 border-t border-white/5">
                      <div className="flex justify-between text-[8px] text-white/15 mb-1.5 font-light">
                        <span>Placed</span>
                        <span>Processing</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                      <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* ===== PRODUCTS ===== */}
                    <div className="space-y-3">
                      {order.products.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0 hover:bg-white/[0.015] rounded-lg p-2.5 transition-all duration-300"
                        >
                          {item.productid ? (
                            <>
                              <div className="flex gap-4 items-start">
                                <div className="relative flex-shrink-0">
                                  <img
                                    src={
                                      item.productid.thumbnail?.startsWith("http")
                                        ? item.productid.thumbnail
                                        : `${API_URL}/${item.productid.thumbnail}`
                                    }
                                    alt={item.productid.title}
                                    className="w-20 h-20 rounded-lg object-cover border border-white/5 hover:scale-105 transition-transform duration-500 hover:border-[#8B5CF6]/15"
                                    onError={(e) => {
                                      e.target.src = "/no-image.png";
                                    }}
                                  />
                                  <div className="absolute -top-1.5 -right-1.5 bg-[#8B5CF6] text-white text-[8px] font-light w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09090B] animate-pulse-slow">
                                    {item.quantity}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-sm font-light text-white hover:text-[#8B5CF6] transition-colors duration-300">
                                    {item.productid.title}
                                  </h3>
                                  <div className="flex items-center gap-3 mt-1">
                                    <p className="text-white/20 text-[10px] font-light flex items-center gap-1">
                                      <span className="text-white/10">Qty:</span> {item.quantity}
                                    </p>
                                    <p className="text-white/20 text-[10px] font-light flex items-center gap-1">
                                      <span className="text-white/10">Price:</span> ₹{item.price}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="text-lg font-light text-[#8B5CF6] whitespace-nowrap hover:scale-105 transition-transform duration-300">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div className="text-red-400/60 font-light flex items-center gap-2 text-sm">
                              <AlertCircle className="w-4 h-4 animate-pulse" />
                              Product removed by Admin.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* ===== ORDER FOOTER ===== */}
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1.5">
                          <p className="text-white/20 text-xs font-light flex items-center gap-2">
                            <CreditCard className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            Payment: <span className="text-white/40">{order.paymentMethod}</span>
                          </p>
                          <p className="text-white/15 text-xs font-light flex items-center gap-2">
                            <Package className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            Items: <span className="text-white/30">{order.products.length}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/10 text-[8px] font-light tracking-wider">Total</p>
                          <p className="text-2xl font-light text-[#8B5CF6] hover:scale-105 transition-transform duration-500">
                            ₹{order.totalAmount?.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* ===== ADDRESS ===== */}
                      {order.addressid && (
                        <div className="mt-5 pt-5 border-t border-white/5">
                          <h3 className="text-[10px] font-light text-white/20 tracking-wider flex items-center gap-2 mb-3">
                            <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            Delivery Address
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/20 font-light text-xs">
                            <div className="space-y-1">
                              <p className="flex items-center gap-2 hover:text-white/40 transition-colors duration-300">
                                <User className="w-3 h-3 text-[#8B5CF6]" />
                                {order.addressid.name}
                              </p>
                              <p className="flex items-center gap-2 hover:text-white/40 transition-colors duration-300">
                                <Phone className="w-3 h-3 text-[#8B5CF6]" />
                                {order.addressid.mobile}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="flex items-center gap-2 hover:text-white/40 transition-colors duration-300">
                                <Home className="w-3 h-3 text-[#8B5CF6]" />
                                {order.addressid.doorno}, {order.addressid.streetname}
                              </p>
                              <p className="pl-6 hover:text-white/40 transition-colors duration-300">
                                {order.addressid.city}, {order.addressid.district}
                              </p>
                              <p className="pl-6 hover:text-white/40 transition-colors duration-300">
                                {order.addressid.state} - {order.addressid.pincode}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ===== ACTION BUTTONS ===== */}
                      <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-white/5">
                        <button className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-6 py-2 rounded-lg font-light text-xs tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] active:scale-[0.98] border border-white/5 flex items-center gap-2 group/btn">
                          <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform duration-500" />
                          Buy Again
                        </button>

                        {order.orderStatus?.toLowerCase() === "pending" && (
                          <button className="bg-red-500/5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 px-6 py-2 rounded-lg font-light text-xs tracking-wide transition-all duration-500 border border-red-500/20 hover:border-red-500/40 hover:scale-[1.02] flex items-center gap-2 group/btn">
                            <XCircle className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform duration-500" />
                            Cancel
                          </button>
                        )}

                        <button className="bg-white/[0.02] text-white/20 hover:text-white/40 px-6 py-2 rounded-lg font-light text-xs tracking-wide transition-all duration-500 border border-white/5 hover:border-white/15 hover:scale-[1.02] flex items-center gap-2 group/btn">
                          <Truck className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-500" />
                          Track
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ===== EXPAND TOGGLE ===== */}
                  <div 
                    className="mt-4 pt-4 border-t border-white/5 flex justify-center cursor-pointer group/toggle"
                    onClick={() => toggleExpand(order._id)}
                  >
                    <div className="flex items-center gap-2 text-white/10 hover:text-[#8B5CF6] transition-all duration-300 group-hover/toggle:scale-105">
                      <span className="text-[9px] font-light tracking-wider">
                        {isExpanded ? 'Show Less' : 'Show Details'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 transition-transform duration-500" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-500 group-hover/toggle:translate-y-0.5" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ===== TRUST BADGE ===== */}
        <div className="mt-10 flex items-center justify-center gap-3 animate-fadeInUp">
          <Shield className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure Order Management</span>
          <div className="w-px h-3 bg-white/5" />
          <Clock className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Real-time Tracking</span>
          <div className="w-px h-3 bg-white/5" />
          <Gift className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Premium Service</span>
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
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-1000 { transition-duration: 1000ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}