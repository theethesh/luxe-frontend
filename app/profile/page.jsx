"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  BadgeCheck, 
  Calendar,
  ArrowLeft,
  Loader2,
  Edit3,
  Crown,
  Sparkles,
  Shield,
  LogOut,
  Diamond,
  Gift,
  Star,
  Award,
  MapPin,
  Gem,
  Infinity,
  Zap,
  Clock
} from "lucide-react";
import { useApp } from "../contaxt/authcontaxt";

const Profile = () => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useApp();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Profile</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 pt-28">
        <div className="bg-[#12121A] border border-white/5 rounded-3xl p-12 text-center max-w-md">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-32 h-32 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
              <User className="w-16 h-16 text-[#8B5CF6] opacity-30" />
            </div>
          </div>
          <h2 className="text-3xl font-light text-white tracking-tight">
            Profile Not <span className="text-[#8B5CF6] font-medium">Found</span>
          </h2>
          <p className="text-white/20 text-sm font-light mt-3">Unable to load your profile details.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 bg-white/[0.02] hover:bg-white/5 text-white/40 hover:text-white px-10 py-3.5 rounded-xl text-sm font-light tracking-wider transition-all duration-500 border border-white/5 hover:border-white/15"
          >
            Go Home
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

      <div className="max-w-4xl mx-auto relative">
        
        {/* ===== BACK BUTTON ===== */}
        <button
          onClick={() => router.back()}
          className="group mb-8 flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
        >
          <div className="p-2 rounded-full bg-white/[0.015] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
        </button>

        {/* ===== MAIN CARD ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
          
          {/* ===== PROFILE HEADER ===== */}
          <div className="relative bg-gradient-to-br from-[#1A1A2E] to-[#12121A] border-b border-white/5 p-8 md:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 via-transparent to-transparent" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/10 to-[#A855F7]/0 animate-spin-slow" />
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#8B5CF6]/5 border-2 border-[#8B5CF6]/20 flex items-center justify-center hover:border-[#8B5CF6]/40 transition-all duration-500 group-hover:scale-105">
                    <User className="text-[#8B5CF6] w-14 h-14 md:w-16 md:h-16" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#22C55E] w-5 h-5 rounded-full border-2 border-[#12121A]">
                  <div className="absolute inset-0 bg-[#22C55E] rounded-full animate-ping opacity-60" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                    {user.name}
                  </h1>
                  <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-3 py-1 rounded-full text-[8px] font-light flex items-center gap-1.5 border border-white/5">
                    <Crown className="w-2.5 h-2.5" />
                    {user.roll || "User"}
                  </span>
                </div>
                
                <p className="text-white/20 text-sm font-light tracking-wider mt-2 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  Welcome Back
                </p>

                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1.5 text-[8px] text-white/20 bg-white/[0.015] px-3 py-1 rounded-full border border-white/5 font-light">
                    <Shield className="w-2.5 h-2.5 text-[#8B5CF6]" />
                    Verified
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[8px] text-white/20 bg-white/[0.015] px-3 py-1 rounded-full border border-white/5 font-light">
                    <Star className="w-2.5 h-2.5 text-[#8B5CF6]" />
                    Premium
                  </span>
                </div>
              </div>

              {/* Edit Button - Desktop */}
              <button className="hidden md:flex bg-white/[0.015] border border-white/5 hover:border-[#8B5CF6]/15 text-white/30 hover:text-white/60 px-6 py-2.5 rounded-xl font-light text-xs tracking-wide transition-all duration-500 hover:bg-[#8B5CF6]/5 items-center gap-2.5">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* ===== DETAILS GRID ===== */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid md:grid-cols-2 gap-3">
              
              {/* Email Card */}
              <div className="group bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#8B5CF6]/10">
                    <Mail className="text-[#8B5CF6] w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white/10 text-[8px] font-light tracking-wider uppercase">Email</p>
                    <p className="text-white/40 font-light text-sm truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Card */}
              <div className="group bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#8B5CF6]/10">
                    <Phone className="text-[#8B5CF6] w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white/10 text-[8px] font-light tracking-wider uppercase">Phone</p>
                    <p className="text-white/40 font-light text-sm">
                      {user.mobile}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Card */}
              <div className="group bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#8B5CF6]/10">
                    <BadgeCheck className="text-[#8B5CF6] w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white/10 text-[8px] font-light tracking-wider uppercase">Role</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 font-light text-sm capitalize">
                        {user.roll || "User"}
                      </span>
                      <span className={`text-[7px] px-2 py-0.5 rounded-full font-light border ${
                        user.roll === "admin" 
                          ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20" 
                          : "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                      }`}>
                        {user.roll === "admin" ? "Admin" : "Member"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Age Card */}
              <div className="group bg-white/[0.015] border border-white/5 rounded-xl p-4 hover:border-[#8B5CF6]/10 hover:bg-[#8B5CF6]/5 transition-all duration-500 hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#8B5CF6]/10">
                    <Calendar className="text-[#8B5CF6] w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white/10 text-[8px] font-light tracking-wider uppercase">Age</p>
                    <p className="text-white/40 font-light text-sm">
                      {user.age || "N/A"} years
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ===== FOOTER ACTIONS ===== */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white/10 text-[8px] font-light tracking-wider flex items-center gap-2">
                <div className="relative">
                  <div className="w-1 h-1 bg-[#22C55E] rounded-full" />
                  <div className="absolute inset-0 w-1 h-1 bg-[#22C55E] rounded-full animate-ping opacity-60" />
                </div>
                Active Account
              </div>
              
              <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none bg-white/[0.015] border border-white/5 hover:border-[#8B5CF6]/15 text-white/20 hover:text-white/40 px-5 py-2.5 rounded-lg font-light text-xs tracking-wide transition-all duration-500 hover:bg-[#8B5CF6]/5 flex items-center justify-center gap-2 md:hidden">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex-1 sm:flex-none bg-red-500/5 border border-red-500/10 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 font-light text-xs tracking-wide px-5 py-2.5 rounded-lg transition-all duration-500 hover:border-red-500/30 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>

            {/* ===== TRUST BADGE ===== */}
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <Shield className="w-2.5 h-2.5 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure & Protected</span>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-5 border-t border-white/5 animate-fadeInUp">
          <div className="flex items-center gap-1.5">
            <span className="text-white/5 text-xs">🔒</span>
            <p className="text-white/5 text-[7px] font-light tracking-wider">Your account is secure</p>
          </div>
          <div className="w-px h-2.5 bg-white/5" />
          <div className="flex items-center gap-1.5">
            <Gift className="w-2.5 h-2.5 text-white/5" />
            <span className="text-white/5 text-[7px] font-light tracking-wider">LUXE</span>
          </div>
          <div className="w-px h-2.5 bg-white/5" />
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5 text-white/5" />
            <span className="text-white/5 text-[7px] font-light tracking-wider">Premium</span>
          </div>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite 1s; }
        .animate-float-slow { animation: floatSlow 7s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 7s ease-in-out infinite 1.5s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
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

export default Profile;