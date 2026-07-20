"use client";

import { TbLogout2 } from "react-icons/tb";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, Diamond, Sparkles, Crown, Gem, UserCircle } from "lucide-react";
import { useApp } from "../app/contaxt/authcontaxt";

export default function Header() {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  // Read cartCount / wishlistCount straight from the global context.
  // AppProvider already fetches the cart & wishlist once on mount (via
  // checkAuth) and again right after login/every add/remove/update call,
  // so there is no need for this component to re-fetch or to mirror the
  // values into local state — that duplication (and the unstable
  // fetchCart/fetchWishlist function identities in the old effect's
  // dependency array) is what caused the badge to lag behind and, in some
  // cases, to re-render in a loop.
  const { user, isAuthenticated, logout, cartCount, wishlistCount } = useApp();

  const isAdmin = user?.roll === "admin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchProduct = async () => {
    if (!search.trim()) return;
    router.push(`/search?search=${search}`);
    setIsMobileMenuOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchProduct();
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled ? 'bg-[#09090B]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-[#8B5CF6]/5' : 'bg-gradient-to-b from-[#09090B]/80 via-[#09090B]/40 to-transparent'
    }`}>
      
      {/* ===== HEADER GLOW EFFECTS ===== */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent"></div>
        <div className="absolute -bottom-20 left-1/4 w-40 h-40 bg-[#8B5CF6]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-40 h-40 bg-[#A855F7]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* ===== LOGO ===== */}
          <Link 
            href={isAdmin ? "/admin/dashboard" : "/"} 
            className="flex items-center gap-3 group flex-shrink-0 relative"
          >
            <div className="absolute -inset-3 bg-[#8B5CF6]/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-full blur-md animate-pulse group-hover:scale-150 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-[#A855F7]/10 rounded-full blur-lg animate-pulse delay-500 group-hover:scale-125 transition-all duration-700"></div>
              <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#A855F7]/10 flex items-center justify-center border border-[#8B5CF6]/20 group-hover:border-[#8B5CF6]/40 transition-all duration-500">
                <Diamond className="w-5 h-5 md:w-6 md:h-6 text-[#8B5CF6] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              </div>
            </div>
            
            <div>
              <span className="font-cinzel text-xl md:text-2xl font-bold tracking-wider text-white group-hover:text-[#8B5CF6] transition-colors duration-300">
                LUXE<span className="text-[#8B5CF6]">.</span>
              </span>
              <span className={`absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] group-hover:w-full transition-all duration-700`}></span>
            </div>
          </Link>

          {/* ===== SEARCH - DESKTOP ===== */}
          {!isAdmin && (
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-6 bg-white/[0.02] border border-white/5 rounded-full overflow-hidden hover:border-[#8B5CF6]/20 transition-all duration-500 focus-within:border-[#8B5CF6]/30 focus-within:shadow-[0_0_60px_rgba(139,92,246,0.05)] group backdrop-blur-sm">
              <div className="pl-5 pr-2 text-white/20 group-focus-within:text-[#8B5CF6] transition-colors duration-300">
                <FaSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search luxury items..."
                className="flex-1 px-3 py-2.5 bg-transparent text-white/70 placeholder:text-white/10 outline-none text-sm font-light tracking-wide"
              />
              <button 
                onClick={searchProduct}
                className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:scale-105 text-white px-6 py-2.5 transition-all duration-500 flex items-center gap-2.5 font-light text-sm rounded-r-full group/btn"
              >
                <FaSearch className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                <span className="hidden lg:inline tracking-wider">Search</span>
              </button>
            </div>
          )}

          {/* ===== ADMIN DASHBOARD LINK ===== */}
          {isAdmin && (
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2.5 bg-[#8B5CF6]/5 text-[#8B5CF6] px-6 py-2.5 rounded-full border border-[#8B5CF6]/15 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]/30 transition-all duration-500 font-light tracking-wide group backdrop-blur-sm"
              >
                <LayoutDashboard className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                <span className="text-sm">Dashboard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse ml-1"></span>
              </Link>
            </div>
          )}

          {/* ===== RIGHT SIDE - DESKTOP ===== */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            
            {/* Profile / Login */}
            {isAuthenticated ? (
              <Link
                href={isAdmin ? "/admin/dashboard" : "/profile"}
                className="flex flex-col items-center text-white/40 hover:text-[#8B5CF6] transition-all duration-500 group"
              >
                <div className="relative w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/5 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]">
                  <CgProfile size={20} className="group-hover:scale-110 transition-transform duration-500" />
                  {isAdmin && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full border-2 border-[#09090B] shadow-[0_0_20px_rgba(139,92,246,0.3)] animate-pulse"></div>
                  )}
                </div>
                <span className="text-[9px] mt-1 font-light tracking-wider text-white/30 group-hover:text-[#8B5CF6] transition-colors duration-300">
                  {isAdmin ? "Admin" : user?.name?.split(' ')[0] || "Profile"}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center text-white/40 hover:text-[#8B5CF6] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/5 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]">
                  <CgProfile size={20} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[9px] mt-1 font-light tracking-wider text-white/30 group-hover:text-[#8B5CF6] transition-colors duration-300">Login</span>
              </Link>
            )}

            {/* Wishlist */}
            {!isAdmin && isAuthenticated && (
              <Link
                href="/wishlist"
                className="relative flex flex-col items-center text-white/40 hover:text-[#8B5CF6] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/5 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]">
                  <FaHeart size={18} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-[#09090B] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-[9px] mt-1 font-light tracking-wider text-white/30 group-hover:text-[#8B5CF6] transition-colors duration-300">Wishlist</span>
              </Link>
            )}

            {/* Orders */}
            {!isAdmin && isAuthenticated && (
              <Link
                href="/myorders"
                className="flex flex-col items-center text-white/40 hover:text-[#8B5CF6] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/5 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-[9px] mt-1 font-light tracking-wider text-white/30 group-hover:text-[#8B5CF6] transition-colors duration-300">Orders</span>
              </Link>
            )}

            {/* Cart */}
            {!isAdmin && isAuthenticated && (
              <Link
                href="/cart"
                className="relative flex flex-col items-center text-white/40 hover:text-[#8B5CF6] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/5 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]">
                  <FaShoppingCart size={18} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-[#09090B] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    {cartCount}
                  </span>
                )}
                <span className="text-[9px] mt-1 font-light tracking-wider text-white/30 group-hover:text-[#8B5CF6] transition-colors duration-300">Cart</span>
              </Link>
            )}

            {/* Logout */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 px-4 py-2 rounded-full transition-all duration-500 border border-red-500/10 hover:border-red-500/30 font-light text-xs tracking-wide group backdrop-blur-sm"
              >
                <TbLogout2 size={16} className="group-hover:rotate-12 transition-transform duration-500" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            )}

          </div>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/40 hover:text-white transition-colors p-2.5 relative group"
          >
            <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Menu className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            )}
          </button>

        </div>

        {/* ===== MOBILE MENU ===== */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/5 space-y-5 animate-[slideDown_0.4s_ease-out] bg-[#09090B]/95 backdrop-blur-xl rounded-2xl mt-2">
            
            {/* Mobile Search */}
            {!isAdmin && (
              <div className="flex items-center bg-white/[0.02] border border-white/5 rounded-full overflow-hidden focus-within:border-[#8B5CF6]/20 transition-all duration-300">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search Products..."
                  className="flex-1 px-5 py-3 bg-transparent text-white/70 placeholder:text-white/10 outline-none text-sm font-light tracking-wide"
                />
                <button 
                  onClick={searchProduct}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-5 py-3 hover:scale-105 transition-all duration-500"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Admin Dashboard Link in Mobile */}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 p-3.5 bg-[#8B5CF6]/5 text-[#8B5CF6] rounded-xl border border-[#8B5CF6]/15 font-light tracking-wide hover:bg-[#8B5CF6]/10 transition-all duration-500"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Mobile Navigation Grid */}
            <div className="grid grid-cols-3 gap-3">
              {isAuthenticated ? (
                <Link
                  href={isAdmin ? "/admin/dashboard" : "/profile"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/5 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-all duration-500 group-hover:scale-110">
                    <CgProfile size={24} className="text-[#8B5CF6]" />
                  </div>
                  <span className="text-[9px] font-light text-white/40 group-hover:text-[#8B5CF6] transition-colors duration-300">
                    {isAdmin ? "Admin" : "Profile"}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/5 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-all duration-500 group-hover:scale-110">
                    <CgProfile size={24} className="text-[#8B5CF6]" />
                  </div>
                  <span className="text-[9px] font-light text-white/40 group-hover:text-[#8B5CF6] transition-colors duration-300">Login</span>
                </Link>
              )}

              {/* Wishlist */}
              {!isAdmin && isAuthenticated && (
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 group relative"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/5 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-all duration-500 group-hover:scale-110">
                    <FaHeart size={24} className="text-[#8B5CF6]" />
                  </div>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#09090B] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="text-[9px] font-light text-white/40 group-hover:text-[#8B5CF6] transition-colors duration-300">Wishlist</span>
                </Link>
              )}

              {/* Orders */}
              {!isAdmin && isAuthenticated && (
                <Link
                  href="/myorders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/5 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-6 h-6 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-light text-white/40 group-hover:text-[#8B5CF6] transition-colors duration-300">Orders</span>
                </Link>
              )}

              {/* Cart */}
              {!isAdmin && isAuthenticated && (
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/5 transition-all duration-500 group relative"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/5 flex items-center justify-center group-hover:bg-[#8B5CF6]/15 transition-all duration-500 group-hover:scale-110">
                    <FaShoppingCart size={24} className="text-[#8B5CF6]" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#09090B] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-[9px] font-light text-white/40 group-hover:text-[#8B5CF6] transition-colors duration-300">Cart</span>
                </Link>
              )}
            </div>

            {/* Mobile Logout */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 py-3.5 rounded-xl transition-all duration-500 border border-red-500/10 hover:border-red-500/20 font-light tracking-wide group"
              >
                <TbLogout2 size={20} className="group-hover:rotate-12 transition-transform duration-500" />
                <span>Logout</span>
              </button>
            )}

            {/* LUXE Branding in Mobile */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <Sparkles className="w-3 h-3 text-white/5" />
              <span className="text-[7px] text-white/5 font-light tracking-[0.3em] uppercase">LUXE • Premium</span>
              <Sparkles className="w-3 h-3 text-white/5" />
            </div>
          </div>
        )}
      </div>

      {/* ===== CUSTOM STYLES ===== */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-500 { transition-duration: 500ms; }
      `}</style>
    </header>
  );
}