"use client";

import { API_URL } from "@/lib/api";
import React, { useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Calendar, 
  Users, 
  BadgeCheck,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ShoppingBag,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Gift,
  Star,
  ArrowLeft,
  Gem,
  Infinity,
  Zap
} from "lucide-react";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
    roll: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.name || !data.email || !data.mobile || !data.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (data.name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!validateEmail(data.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validateMobile(data.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!validatePassword(data.password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/api/create`,
        data
      );
      
      setSuccess(true);
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: "name", placeholder: "Full Name", icon: User, type: "text", required: true },
    { name: "age", placeholder: "Age", icon: Calendar, type: "number" },
    { name: "gender", placeholder: "Gender", icon: Users, type: "text" },
    { name: "email", placeholder: "Email Address", icon: Mail, type: "email", required: true },
    { name: "mobile", placeholder: "Mobile Number", icon: Phone, type: "tel", required: true, maxLength: 10 },
    { name: "roll", placeholder: "Role (e.g., user, admin)", icon: BadgeCheck, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      
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

      <div className="grid lg:grid-cols-2 max-w-6xl w-full relative z-10">
        
        {/* ===== MAIN CARD ===== */}
        <div className="lg:col-span-2 bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
          
          <div className="grid lg:grid-cols-2">
            
            {/* ===== LEFT SIDE - BRANDING ===== */}
            <div className="hidden lg:flex flex-col justify-center items-center px-12 py-16 bg-gradient-to-br from-[#1A1A2E] to-[#12121A] border-r border-white/5 relative overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 via-transparent to-transparent" />
              
              <div className="absolute top-10 left-10 opacity-20 animate-float-slow">
                <Sparkles className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <div className="absolute bottom-10 right-10 opacity-20 animate-float-delayed">
                <Crown className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-24 h-24 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center border border-[#8B5CF6]/20 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <Diamond className="w-12 h-12 text-[#8B5CF6] animate-pulse-slow" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/10 to-[#A855F7]/0 animate-spin-slow" />
                  </div>
                </div>

                <h1 className="mt-8 text-5xl font-light text-white tracking-tight">
                  Join <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">LUXE</span>
                </h1>

                <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mx-auto mt-4" />

                <p className="mt-6 text-white/20 text-center text-lg leading-8 max-w-md font-light tracking-wide">
                  Create your account and enjoy premium shopping, secure checkout and exclusive offers.
                </p>

                <div className="mt-10 flex flex-col gap-3 text-sm text-white/20">
                  <div className="flex items-center justify-center gap-2 group hover:text-white/40 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:animate-pulse" />
                    <span className="font-light tracking-wide">Free Registration</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 group hover:text-white/40 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:animate-pulse" />
                    <span className="font-light tracking-wide">Secure Account</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 group hover:text-white/40 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:animate-pulse" />
                    <span className="font-light tracking-wide">Exclusive Offers</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#8B5CF6]/20" />
                  <span className="text-[9px] text-white/10 font-light tracking-[0.3em] uppercase">Premium Store</span>
                </div>
              </div>
            </div>

            {/* ===== RIGHT SIDE - REGISTER FORM ===== */}
            <div className="p-8 md:p-12 lg:p-14">
              
              <div className="mb-8 animate-slideInRight">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-[#8B5CF6]"></div>
                  <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-medium">Register</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Create <span className="text-[#8B5CF6] font-medium">Account</span>
                </h2>
                <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3" />
                <p className="text-white/20 mt-3 flex items-center gap-2 font-light tracking-wide text-sm">
                  <User className="w-4 h-4 text-[#8B5CF6]" />
                  Fill in your details to get started
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl backdrop-blur-sm animate-slideDown">
                  <div className="flex items-center gap-3 text-[#22C55E]">
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                    <span className="text-white/60 text-sm font-light tracking-wide">Registration successful! Redirecting...</span>
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

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
                
                {inputFields.map((field, index) => {
                  const Icon = field.icon;
                  const isFocused = focusedField === field.name;
                  const value = data[field.name] || "";

                  return (
                    <div 
                      key={field.name}
                      className={field.name === "roll" ? "md:col-span-2" : ""}
                    >
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Icon className={`w-4 h-4 transition-colors duration-300 ${
                            isFocused ? 'text-[#8B5CF6]' : 'text-white/10 group-hover:text-[#8B5CF6]'
                          }`} />
                        </div>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={value}
                          onChange={handleUser}
                          maxLength={field.maxLength}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          required={field.required}
                          disabled={isLoading || success}
                          className={`w-full bg-white/[0.015] text-white border rounded-xl py-3.5 pl-11 pr-4 placeholder-white/5 outline-none transition-all duration-300 font-light text-sm tracking-wide
                            ${isFocused ? 'border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.03)]' : 'border-white/5 hover:border-[#8B5CF6]/15'}
                            disabled:opacity-50
                          `}
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

                {/* Password Field */}
                <div className="md:col-span-2">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Lock className={`w-4 h-4 transition-colors duration-300 ${
                        focusedField === 'password' ? 'text-[#8B5CF6]' : 'text-white/10 group-hover:text-[#8B5CF6]'
                      }`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password (min 6 characters)"
                      value={data.password}
                      onChange={handleUser}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      required
                      disabled={isLoading || success}
                      className={`w-full bg-white/[0.015] text-white border rounded-xl py-3.5 pl-11 pr-12 placeholder-white/5 outline-none transition-all duration-300 font-light text-sm tracking-wide
                        ${focusedField === 'password' ? 'border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.03)]' : 'border-white/5 hover:border-[#8B5CF6]/15'}
                        disabled:opacity-50
                      `}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/10 hover:text-[#8B5CF6] transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="md:col-span-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white py-3.5 rounded-xl font-light text-sm tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border border-white/5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Registered!</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

              </form>

              {/* Login Link */}
              <div className="mt-5 text-center animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                <p className="text-white/20 font-light tracking-wide text-sm">
                  Already have an account?
                </p>
                <Link
                  href="/login"
                  className="mt-1 inline-block text-[#8B5CF6] font-light hover:text-[#A855F7] transition-all duration-300 hover:scale-105 tracking-wide"
                >
                  Login Here →
                </Link>
              </div>

              {/* Divider */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[9px] text-white/5 font-light tracking-wider">Secure Registration</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Benefits */}
              <div className="mt-3 flex flex-wrap justify-center gap-3 text-[9px] text-white/10 font-light tracking-wide">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  Free
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  Secure
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  Fast
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  Premium
                </span>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <Gift className="w-2.5 h-2.5 text-white/5" />
                <span className="text-[6px] text-white/5 font-light tracking-[0.4em] uppercase">LUXE • Premium Shopping</span>
              </div>
            </div>
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
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
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
        .animate-slideInRight { animation: slideInRight 0.6s ease-out both; }
        .animate-slideDown { animation: slideDown 0.3s ease-out both; }
        .animate-shake { animation: shake 0.4s ease-out; }
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

export default Register;