"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  LogOut,
  Home,
  Menu,
  X,
  DollarSign,
  Loader2,
  AlertCircle,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  ArrowRight,
  BarChart3,
  Award,
  Gift,
  ChevronRight,
  Clock,
  Star,
  Zap,
  Activity,
  PieChart,
  Target,
  UserCircle,
  Gem,
  Infinity,
  Rocket
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(0);
  const [product, setProduct] = useState(0);
  const [order, setOrder] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const getDashboard = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      console.log(res.data);
      setUser(res.data.usercount || 0);
      setProduct(res.data.productcounts || 0);
      setOrder(res.data.ordercounts || 0);
      setRevenue(res.data.totalamount || 0);
    } catch (error) {
      console.log(error);
      setError("Failed to load dashboard data");
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Add Product", icon: Package, href: "/admin/addproduct" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { name: "Users", icon: Users, href: "/admin/users" },
  ];

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
            <p className="text-[#8B5CF6] text-xs tracking-[0.4em] uppercase font-light">Loading Dashboard</p>
            <p className="text-white/10 text-[10px] tracking-widest font-light">Preparing your insights</p>
          </div>
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
        
        {/* ===== PAGE HEADER ===== */}
        <div className="mb-10 animate-fadeInDown">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                <span className="text-white/15 text-[8px] tracking-[0.4em] uppercase font-light">Admin Panel</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Dashboard</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <p className="text-white/20 text-sm font-light tracking-wider flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#8B5CF6]" />
                  Welcome back
                </p>
                <div className="w-px h-4 bg-white/5" />
                <p className="text-white/15 text-sm font-light flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/[0.015] px-5 py-3 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/10 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">System</p>
                <p className="text-[#22C55E] text-[10px] font-light flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
                  Operational
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

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="group bg-[#12121A] border border-white/5 rounded-xl p-5 transition-all duration-500 hover:border-[#8B5CF6]/15 hover:shadow-[0_20px_60px_rgba(139,92,246,0.04)] hover:-translate-y-1 animate-fadeInUp relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/10 group-hover:scale-110 transition-all duration-500">
                <Package className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <span className="text-[#22C55E] text-[10px] font-light">+12%</span>
            </div>
            <p className="text-white/20 text-[10px] mt-3 font-light tracking-wide">Products</p>
            <p className="text-2xl font-light text-white mt-0.5">{product.toLocaleString()}</p>
            <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div className="group bg-[#12121A] border border-white/5 rounded-xl p-5 transition-all duration-500 hover:border-blue-500/15 hover:shadow-[0_20px_60px_rgba(59,130,246,0.04)] hover:-translate-y-1 animate-fadeInUp relative overflow-hidden" style={{ animationDelay: '100ms' }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-500">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-[#22C55E] text-[10px] font-light">+8%</span>
            </div>
            <p className="text-white/20 text-[10px] mt-3 font-light tracking-wide">Users</p>
            <p className="text-2xl font-light text-white mt-0.5">{user.toLocaleString()}</p>
            <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '60%' }} />
            </div>
          </div>

          <div className="group bg-[#12121A] border border-white/5 rounded-xl p-5 transition-all duration-500 hover:border-purple-500/15 hover:shadow-[0_20px_60px_rgba(168,85,247,0.04)] hover:-translate-y-1 animate-fadeInUp relative overflow-hidden" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-purple-500/5 border border-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:scale-110 transition-all duration-500">
                <ShoppingBag className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-[#22C55E] text-[10px] font-light">+5%</span>
            </div>
            <p className="text-white/20 text-[10px] mt-3 font-light tracking-wide">Orders</p>
            <p className="text-2xl font-light text-white mt-0.5">{order.toLocaleString()}</p>
            <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="group bg-[#12121A] border border-white/5 rounded-xl p-5 transition-all duration-500 hover:border-green-500/15 hover:shadow-[0_20px_60px_rgba(34,197,94,0.04)] hover:-translate-y-1 animate-fadeInUp relative overflow-hidden" style={{ animationDelay: '300ms' }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-green-500/5 border border-green-500/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:scale-110 transition-all duration-500">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-[#22C55E] text-[10px] font-light">+18%</span>
            </div>
            <p className="text-white/20 text-[10px] mt-3 font-light tracking-wide">Revenue</p>
            <p className="text-2xl font-light text-white mt-0.5">₹{revenue.toLocaleString()}</p>
            <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* ===== STATS SUMMARY ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 animate-fadeInUp">
          <div className="bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/10 transition-all duration-500 hover:bg-[#12121A]/80">
            <div className="flex items-center justify-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-[7px] text-white/15 font-light tracking-wider uppercase">Growth</span>
            </div>
            <p className="text-[#8B5CF6] text-lg font-light">+12.5%</p>
            <p className="text-white/5 text-[7px] font-light">vs last month</p>
          </div>
          
          <div className="bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/10 transition-all duration-500 hover:bg-[#12121A]/80">
            <div className="flex items-center justify-center gap-1.5">
              <PieChart className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-[7px] text-white/15 font-light tracking-wider uppercase">Conversion</span>
            </div>
            <p className="text-[#8B5CF6] text-lg font-light">3.2%</p>
            <p className="text-white/5 text-[7px] font-light">+0.8%</p>
          </div>
          
          <div className="bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/10 transition-all duration-500 hover:bg-[#12121A]/80">
            <div className="flex items-center justify-center gap-1.5">
              <ShoppingBag className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-[7px] text-white/15 font-light tracking-wider uppercase">Avg Order</span>
            </div>
            <p className="text-[#8B5CF6] text-lg font-light">₹{Math.round(revenue / (order || 1))}</p>
            <p className="text-white/5 text-[7px] font-light">+₹120</p>
          </div>
          
          <div className="bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/10 transition-all duration-500 hover:bg-[#12121A]/80">
            <div className="flex items-center justify-center gap-1.5">
              <Star className="w-3 h-3 text-[#8B5CF6] fill-[#8B5CF6]" />
              <span className="text-[7px] text-white/15 font-light tracking-wider uppercase">Satisfaction</span>
            </div>
            <p className="text-[#8B5CF6] text-lg font-light">4.9★</p>
            <p className="text-white/5 text-[7px] font-light">Excellent</p>
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="mt-6 bg-[#12121A]/50 backdrop-blur-sm border border-white/5 rounded-xl p-5 transition-all duration-500 hover:border-[#8B5CF6]/10 animate-fadeInUp">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-light text-white flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                <Zap className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span>Quick Actions</span>
            </h2>
            <span className="text-[7px] text-white/5 font-light tracking-[0.3em] uppercase">Premium</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/admin/addproduct"
              className="group bg-white/[0.015] border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-[#8B5CF6]/10 transition-all duration-500">
                <Package className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-white/30 text-[9px] font-light group-hover:text-white/60 transition-colors duration-300">Add Product</span>
            </Link>
            
            <Link
              href="/admin/orders"
              className="group bg-white/[0.015] border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-[#8B5CF6]/10 transition-all duration-500">
                <ShoppingBag className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-white/30 text-[9px] font-light group-hover:text-white/60 transition-colors duration-300">View Orders</span>
            </Link>
            
            <Link
              href="/admin/users"
              className="group bg-white/[0.015] border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-[#8B5CF6]/10 transition-all duration-500">
                <Users className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-white/30 text-[9px] font-light group-hover:text-white/60 transition-colors duration-300">Manage Users</span>
            </Link>
            
            <Link
              href="/"
              className="group bg-white/[0.015] border border-white/5 rounded-xl p-3 text-center hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-[#8B5CF6]/10 transition-all duration-500">
                <Home className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-white/30 text-[9px] font-light group-hover:text-white/60 transition-colors duration-300">Go to Store</span>
            </Link>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-5 border-t border-white/5 animate-fadeInUp">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-white/5" />
            <p className="text-white/5 text-[8px] font-light tracking-wider">© 2024 LUXE</p>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2 text-white/5 text-[7px] font-light tracking-wider">
            <span className="hover:text-white/10 transition-colors">Secure</span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/5" />
            <span className="hover:text-white/10 transition-colors">Premium</span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/5" />
            <span className="hover:text-white/10 transition-colors">LUXE</span>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <span className="text-white/5 text-[7px] font-light">v2.0</span>
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