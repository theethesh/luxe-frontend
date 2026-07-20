"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Home,
  Menu,
  X,
  Diamond,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
  Shield,
  UserCircle
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Add Product", icon: Package, href: "/admin/addproduct" },
  { name: "Products", icon: Package, href: "/admin/products" },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Users", icon: Users, href: "/admin/users" },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* ===== MOBILE MENU TOGGLE ===== */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#12121A] text-[#8B5CF6] p-2.5 rounded-xl border border-white/5 shadow-2xl hover:border-[#8B5CF6]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
      >
        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* ===== MOBILE OVERLAY ===== */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen 
          bg-[#12121A] border-r border-white/5 
          shadow-2xl shadow-[#8B5CF6]/5
          z-40
          transition-all duration-700 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          hover:shadow-[0_0_60px_rgba(139,92,246,0.03)]
        `}
      >
        {/* ===== SIDEBAR GLOW ===== */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#8B5CF6]/30 via-[#A855F7]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-1/2 bg-gradient-to-t from-[#8B5CF6]/10 to-transparent" />
        
        {/* ===== AMBIENT GLOW ===== */}
        <div className={`absolute -top-20 -left-20 w-40 h-40 bg-[#8B5CF6]/5 rounded-full blur-2xl opacity-0 transition-opacity duration-700 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`} />

        <div className="flex flex-col h-full p-4 relative">
          
          {/* ===== LOGO SECTION ===== */}
          <div className={`mb-8 pb-5 border-b border-white/5 ${isCollapsed ? 'px-2' : 'px-3'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="relative flex-shrink-0 group">
                <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-full blur-xl animate-pulse group-hover:scale-150 transition-all duration-700" />
                <div className="absolute inset-0 bg-[#A855F7]/10 rounded-full blur-lg animate-pulse delay-500 group-hover:scale-125 transition-all duration-700" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#A855F7]/10 flex items-center justify-center border border-[#8B5CF6]/20 group-hover:border-[#8B5CF6]/40 transition-all duration-500 group-hover:scale-110">
                  <Diamond className="w-5 h-5 text-[#8B5CF6] group-hover:rotate-12 transition-transform duration-500" />
                </div>
              </div>
              {!isCollapsed && (
                <div className="animate-fadeIn">
                  <h1 className="text-xl font-light text-white tracking-tight">
                    LUXE<span className="text-[#8B5CF6] font-medium">.</span>
                  </h1>
                  <span className="text-[8px] font-light text-white/20 tracking-[0.3em] uppercase block -mt-0.5">
                    Admin Panel
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ===== TOGGLE BUTTON ===== */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-full mb-5 p-2 rounded-xl bg-white/[0.015] border border-white/5 hover:border-[#8B5CF6]/20 transition-all duration-500 group hover:bg-[#8B5CF6]/5"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#8B5CF6] transition-colors duration-300 group-hover:scale-110" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white/20 group-hover:text-[#8B5CF6] transition-colors duration-300 group-hover:scale-110" />
            )}
          </button>

          {/* ===== MENU ITEMS ===== */}
          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-500 font-light tracking-wide group
                    ${isCollapsed ? 'justify-center px-2' : ''}
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]"
                        : "text-white/30 hover:text-white/70 hover:bg-white/[0.02] hover:border hover:border-white/5"
                    }
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#8B5CF6] to-[#A855F7] rounded-r-full" />
                  )}
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? "text-[#8B5CF6]" : "text-white/30 group-hover:text-white/60"} ${isActive ? "group-hover:scale-110" : "group-hover:scale-110"}`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                      <span className="text-[8px] text-[#8B5CF6]/40 font-light tracking-wider">Active</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ===== BOTTOM SECTION ===== */}
          <div className={`pt-5 border-t border-white/5 space-y-1.5 ${isCollapsed ? 'px-2' : ''}`}>
            {/* User Profile */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 ${isCollapsed ? 'justify-center px-2' : ''}`}>
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-[#A855F7]/10 flex items-center justify-center border border-[#8B5CF6]/20">
                  <UserCircle className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#12121A]">
                  <div className="absolute inset-0 bg-[#22C55E] rounded-full animate-ping opacity-60" />
                </div>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs font-light truncate">Administrator</p>
                  <p className="text-white/20 text-[8px] font-light truncate tracking-wider">admin@luxe.com</p>
                </div>
              )}
            </div>

            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/[0.02] hover:border hover:border-white/5 transition-all duration-500 font-light tracking-wide group
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
              title={isCollapsed ? 'Home' : ''}
            >
              <Home className={`w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} />
              {!isCollapsed && <span>Go to Store</span>}
              {!isCollapsed && (
                <span className="ml-auto text-[8px] text-white/10 tracking-wider">Visit</span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-500 font-light tracking-wide border border-transparent hover:border-red-500/20 group
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
              title={isCollapsed ? 'Logout' : ''}
            >
              <LogOut className={`w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform duration-500`} />
              {!isCollapsed && <span>Logout</span>}
              {!isCollapsed && (
                <span className="ml-auto text-[8px] text-white/10 group-hover:text-red-400/40 transition-colors duration-300">Exit</span>
              )}
            </button>

            {/* Version Badge */}
            {!isCollapsed && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-[7px] text-white/5 font-light tracking-[0.3em] uppercase">v2.0 • Premium</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8B5CF6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #A855F7;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-500 { transition-duration: 500ms; }
      `}</style>
    </>
  );
}