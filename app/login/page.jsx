"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Gift,
  Star,
  Zap,
  Award,
  TrendingUp,
  Gem,
  Infinity
} from "lucide-react";
import { useApp } from "../contaxt/authcontaxt";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const router = useRouter();
  const { login, isLoading } = useApp();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.email || !user.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setSuccess(false);

    const result = await login(user.email, user.password);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        if (result.user?.roll === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }, 1500);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 pt-28 relative overflow-hidden">
      
      {/* ===== PREMIUM BACKGROUND EFFECTS ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#8B5CF6]/[0.025] rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-[#A855F7]/[0.015] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#8B5CF6]/[0.01] rounded-full blur-3xl" />
        
        <div className="absolute top-[10%] left-[5%] w-6 h-6 bg-[#8B5CF6]/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-[15%] right-[8%] w-6 h-6 bg-[#A855F7]/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-[30%] right-[12%] w-4 h-4 bg-[#8B5CF6]/15 rounded-full blur-lg animate-float-slow" />
        <div className="absolute bottom-[25%] left-[10%] w-4 h-4 bg-[#A855F7]/10 rounded-full blur-lg animate-float-slow-delayed" />
        <div className="absolute top-[50%] left-[50%] w-20 h-20 bg-[#8B5CF6]/5 rounded-full blur-2xl animate-pulse-slow" />
        
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8B5CF6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/10 to-transparent animate-pulse-slow delay-1000" />
      </div>

      <div className="grid lg:grid-cols-5 max-w-7xl w-full relative z-10 gap-0">
        
        {/* ===== MAIN CARD ===== */}
        <div className="lg:col-span-5 bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_100px_rgba(139,92,246,0.04)] animate-fadeInUp">
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent animate-gradient-flow" />
          
          <div className="grid lg:grid-cols-2">
            
            {/* ===== LEFT SIDE - BRANDING ===== */}
            <div className="hidden lg:flex flex-col justify-center items-center px-12 py-20 bg-gradient-to-br from-[#16162A] via-[#12121A] to-[#0E0E16] border-r border-white/5 relative overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 via-transparent to-[#A855F7]/5 animate-pulse-slow" />
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#A855F7]/5 rounded-full blur-3xl animate-pulse delay-1000" />
              
              <div className="absolute top-12 left-12 opacity-20 animate-float-slow">
                <Sparkles className="w-10 h-10 text-[#8B5CF6]" />
              </div>
              <div className="absolute bottom-12 right-12 opacity-20 animate-float-delayed">
                <Crown className="w-10 h-10 text-[#8B5CF6]" />
              </div>
              <div className="absolute top-1/3 right-8 opacity-15 animate-float-slow-delayed">
                <Star className="w-6 h-6 text-[#A855F7]" />
              </div>
              <div className="absolute bottom-1/3 left-8 opacity-15 animate-float">
                <Zap className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse group-hover:scale-150 transition-all duration-700" />
                  <div className="absolute inset-0 bg-[#A855F7]/10 rounded-full blur-2xl animate-pulse delay-500 group-hover:scale-125 transition-all duration-700" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-[#A855F7]/5 flex items-center justify-center border border-[#8B5CF6]/20 group-hover:border-[#8B5CF6]/30 transition-all duration-700 group-hover:scale-110">
                    <Diamond className="w-16 h-16 text-[#8B5CF6] animate-pulse-slow group-hover:rotate-12 transition-transform duration-700" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/5 to-[#A855F7]/0 animate-spin-slow" />
                  </div>
                </div>

                <h1 className="mt-10 text-6xl font-light text-white tracking-tight">
                  <span className="text-white">Welcome</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Back</span>
                </h1>

                <div className="w-20 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mx-auto mt-6 animate-pulse-slow" />

                <p className="mt-6 text-white/20 text-center text-lg leading-relaxed max-w-sm mx-auto font-light tracking-wide">
                  Login to continue your luxury shopping journey.
                </p>

                <div className="mt-12 space-y-3">
                  <div className="flex items-center justify-center gap-3 group hover:bg-white/[0.02] px-6 py-3 rounded-xl transition-all duration-500 cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#8B5CF6]/10">
                      <Shield className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div className="text-left">
                      <p className="text-white/60 text-sm font-light">Secure Login</p>
                      <p className="text-white/10 text-[10px] font-light">256-bit encryption</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 group hover:bg-white/[0.02] px-6 py-3 rounded-xl transition-all duration-500 cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-[#A855F7]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#A855F7]/10">
                      <Zap className="w-5 h-5 text-[#A855F7]" />
                    </div>
                    <div className="text-left">
                      <p className="text-white/60 text-sm font-light">Fast Checkout</p>
                      <p className="text-white/10 text-[10px] font-light">One-click ordering</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 group hover:bg-white/[0.02] px-6 py-3 rounded-xl transition-all duration-500 cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8B5CF6]/5 to-[#A855F7]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Award className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div className="text-left">
                      <p className="text-white/60 text-sm font-light">Premium Quality</p>
                      <p className="text-white/10 text-[10px] font-light">Curated collections</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#8B5CF6]/20" />
                    <span className="text-[9px] text-white/10 font-light tracking-[0.3em] uppercase">LUXE</span>
                  </div>
                  <div className="w-px h-4 bg-white/5" />
                  <div className="flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5 text-[#8B5CF6]/20" />
                    <span className="text-[9px] text-white/10 font-light tracking-[0.3em] uppercase">Premium</span>
                  </div>
                  <div className="w-px h-4 bg-white/5" />
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-[#8B5CF6]/20" />
                    <span className="text-[9px] text-white/10 font-light tracking-[0.3em] uppercase">4.9★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== RIGHT SIDE - LOGIN FORM ===== */}
            <div className="p-8 md:p-12 lg:p-16 relative">
              
              <div className="mb-10 animate-slideInRight">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                  <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Access</span>
                  <div className="w-8 h-px bg-gradient-to-r from-[#A855F7] to-transparent" />
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                  Sign <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">In</span>
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-4 animate-pulse-slow" />
                <p className="text-white/20 mt-4 flex items-center gap-2 font-light tracking-wide text-sm">
                  <User className="w-4 h-4 text-[#8B5CF6]" />
                  Sign in to your account
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl backdrop-blur-sm animate-slideDown">
                  <div className="flex items-center gap-3 text-[#22C55E]">
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                    <span className="text-white/60 text-sm font-light tracking-wide">Login successful! Redirecting...</span>
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
                
                {/* Email Field */}
                <div className="space-y-2 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                  <label htmlFor="email" className={`block text-xs font-light tracking-wide transition-all duration-300 ${isFocused.email ? 'text-[#8B5CF6]' : 'text-white/20'}`}>
                    Email Address
                  </label>
                  <div className={`relative group transition-all duration-300 ${isFocused.email ? 'scale-[1.01]' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Mail className={`w-4 h-4 transition-all duration-300 ${isFocused.email ? 'text-[#8B5CF6]' : 'text-white/10'}`} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={handleUser}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      disabled={isLoading || success}
                      className="w-full bg-white/[0.015] border rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/5 outline-none transition-all duration-300 disabled:opacity-50 font-light text-sm tracking-wide"
                      style={{
                        borderColor: isFocused.email ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isFocused.email ? '0 0 40px rgba(139,92,246,0.03)' : 'none'
                      }}
                      autoComplete="email"
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full transition-all duration-500 ${isFocused.email ? 'scale-x-100' : 'scale-x-0'}`} />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                  <label htmlFor="password" className={`block text-xs font-light tracking-wide transition-all duration-300 ${isFocused.password ? 'text-[#8B5CF6]' : 'text-white/20'}`}>
                    Password
                  </label>
                  <div className={`relative group transition-all duration-300 ${isFocused.password ? 'scale-[1.01]' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Lock className={`w-4 h-4 transition-all duration-300 ${isFocused.password ? 'text-[#8B5CF6]' : 'text-white/10'}`} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={user.password}
                      onChange={handleUser}
                      onFocus={() => handleFocus('password')}
                      onBlur={() => handleBlur('password')}
                      disabled={isLoading || success}
                      className="w-full bg-white/[0.015] border rounded-xl py-3.5 pl-11 pr-11 text-white placeholder-white/5 outline-none transition-all duration-300 disabled:opacity-50 font-light text-sm tracking-wide"
                      style={{
                        borderColor: isFocused.password ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isFocused.password ? '0 0 40px rgba(139,92,246,0.03)' : 'none'
                      }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/10 hover:text-[#8B5CF6] transition-all duration-300 hover:scale-110"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full transition-all duration-500 ${isFocused.password ? 'scale-x-100' : 'scale-x-0'}`} />
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-3.5 h-3.5 bg-white/[0.015] border border-white/5 rounded checked:bg-[#8B5CF6] checked:border-[#8B5CF6] focus:ring-[#8B5CF6] transition-all duration-300"
                    />
                    <label htmlFor="remember" className="text-[10px] text-white/10 font-light tracking-wide cursor-pointer hover:text-white/20 transition-colors duration-300">
                      Remember me
                    </label>
                  </div>
                  <Link 
                    href="/forgot-password" 
                    className="text-[10px] text-white/10 hover:text-[#8B5CF6] transition-all duration-300 font-light tracking-wide hover:scale-105"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(139,92,246,0.12)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border border-white/5 overflow-hidden relative animate-fadeInUp"
                  style={{ animationDelay: '400ms' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-light tracking-wide">Logging in...</span>
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-4 h-4 animate-bounce" />
                      <span className="font-light tracking-wide">Success!</span>
                    </>
                  ) : (
                    <>
                      <span className="font-light tracking-wide">Login</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:scale-110" />
                    </>
                  )}
                </button>

              </form>

              {/* Register Link */}
              <div className="mt-6 text-center animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                <p className="text-white/20 font-light tracking-wide text-sm">
                  Don't have an account?
                </p>
                <Link
                  href="/register"
                  className="mt-1 inline-block text-[#8B5CF6] font-light hover:text-[#A855F7] transition-all duration-300 hover:scale-105 tracking-wide group"
                >
                  Create Account 
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="mt-6 flex items-center gap-4 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <span className="text-[9px] text-white/5 font-light tracking-widest">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              {/* Demo Credentials */}
              <div className="mt-4 p-3.5 bg-white/[0.015] rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 hover:bg-[#8B5CF6]/5 group animate-fadeInUp" style={{ animationDelay: '700ms' }}>
                <div className="flex items-center justify-center gap-2.5">
                  <Gift className="w-3.5 h-3.5 text-[#8B5CF6]/30 group-hover:text-[#8B5CF6]/60 transition-colors duration-300" />
                  <p className="text-[10px] text-white/10 font-light tracking-wide group-hover:text-white/20 transition-colors duration-300">
                    Demo: <span className="text-[#8B5CF6]/40">admin@example.com</span> / <span className="text-[#8B5CF6]/40">password</span>
                  </p>
                </div>
              </div>

              {/* Premium Footer */}
              <div className="mt-4 flex items-center justify-center gap-2.5 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
                <Sparkles className="w-2.5 h-2.5 text-white/5 animate-pulse-slow" />
                <span className="text-[7px] text-white/5 font-light tracking-[0.4em] uppercase hover:text-white/10 transition-colors duration-300 cursor-default">LUXE • Premium Shopping</span>
                <Sparkles className="w-2.5 h-2.5 text-white/5 animate-pulse-slow delay-500" />
              </div>
            </div>
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
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
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes floatSlowDelayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-flow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s ease-out both; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out both; }
        .animate-slideDown { animation: slideDown 0.3s ease-out both; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 6s ease-in-out infinite 1.5s; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 8s ease-in-out infinite 2s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-gradient-flow { background: linear-gradient(90deg, transparent, #8B5CF6, #A855F7, transparent); background-size: 200% 100%; animation: gradient-flow 4s linear infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .duration-700 { transition-duration: 700ms; }
        .duration-1000 { transition-duration: 1000ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .scale-x-0 { transform: scaleX(0); }
        .scale-x-100 { transform: scaleX(1); }
        .-translate-x-full { transform: translateX(-100%); }
        .group-hover\\:translate-x-full:hover { transform: translateX(100%); }
      `}</style>
    </div>
  );
};

export default Login;