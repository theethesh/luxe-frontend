"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  User, 
  Phone, 
  Home, 
  Map, 
  Building2, 
  Landmark, 
  Mail, 
  ArrowLeft, 
  CheckCircle,
  Loader2,
  AlertCircle,
  Diamond,
  Sparkles,
  Shield,
  Crown,
  Gift,
  Gem,
  Star,
  Clock,
  Infinity,
  Zap
} from "lucide-react";

const AddAddress = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDraftRestore, setShowDraftRestore] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    doorno: "",
    streetname: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem("addressDraft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        const hasData = Object.values(parsed).some(v => v.trim());
        if (hasData) {
          setShowDraftRestore(true);
        }
      } catch (e) {
        console.error("Failed to parse draft");
      }
    }
  }, []);

  const restoreDraft = () => {
    const savedDraft = localStorage.getItem("addressDraft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setForm(parsed);
        setShowDraftRestore(false);
      } catch (e) {
        console.error("Failed to restore draft");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasData = Object.values(form).some(v => v.trim());
      if (hasData) {
        localStorage.setItem("addressDraft", JSON.stringify(form));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [form]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case "mobile":
        return !/^[6-9]\d{9}$/.test(value) ? "Enter a valid 10-digit mobile number" : "";
      case "pincode":
        return !/^\d{6}$/.test(value) ? "Enter a valid 6-digit pincode" : "";
      case "city":
      case "district":
      case "state":
        return value.trim().length < 2 ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : "";
      default:
        return "";
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstError = document.querySelector(".error-input");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/addaddress`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSuccess(true);
      localStorage.removeItem("addressDraft");
      
      setTimeout(() => {
        router.push("/checkout");
      }, 1500);
    } catch (err) {
      console.error("Address save error:", err);
      const errorMessage = err.response?.data?.message || "Failed to save address";
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem("addressDraft");
    setShowDraftRestore(false);
    setForm({
      name: "",
      mobile: "",
      doorno: "",
      streetname: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    });
  };

  const inputFields = [
    { name: "name", placeholder: "Full Name", icon: User, type: "text" },
    { name: "mobile", placeholder: "Mobile Number", icon: Phone, type: "tel", maxLength: 10 },
    { name: "doorno", placeholder: "Door / Flat No", icon: Home, type: "text" },
    { name: "streetname", placeholder: "Street / Locality", icon: Map, type: "text" },
    { name: "city", placeholder: "City", icon: Building2, type: "text" },
    { name: "district", placeholder: "District", icon: MapPin, type: "text" },
    { name: "state", placeholder: "State", icon: Landmark, type: "text" },
    { name: "pincode", placeholder: "Pincode", icon: Mail, type: "text", maxLength: 6 },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-start justify-center relative">
      
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-1/3 -right-1/3 w-[600px] h-[600px] bg-[#8B5CF6]/[0.03] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/3 -left-1/3 w-[600px] h-[600px] bg-[#A855F7]/[0.02] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/[0.015] rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-[#8B5CF6]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-[#A855F7]/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#8B5CF6]/15 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#A855F7]/10 rounded-full blur-lg animate-float-slow-delayed"></div>
        
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8B5CF6 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        
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

        {/* ===== DRAFT RESTORE BANNER ===== */}
        {showDraftRestore && (
          <div className="mb-6 p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-xl backdrop-blur-sm animate-slideDown">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 text-[#8B5CF6]">
                <div className="p-1.5 rounded-lg bg-[#8B5CF6]/10">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-white/60 text-sm font-light tracking-wide">You have a saved draft</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={restoreDraft}
                  className="px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-light text-xs tracking-wider rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 hover:scale-[1.02]"
                >
                  Restore
                </button>
                <button
                  onClick={clearDraft}
                  className="px-5 py-2 bg-white/[0.02] text-white/30 font-light text-xs tracking-wider rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/5"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== MAIN CARD ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/15 hover:shadow-[0_30px_100px_rgba(139,92,246,0.05)]">
          
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
          
          {/* ===== HEADER ===== */}
          <div className="relative bg-gradient-to-br from-[#1A1A2E] to-[#12121A] border-b border-white/5 px-8 md:px-10 py-8 md:py-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/[0.03] via-transparent to-[#8B5CF6]/[0.03]" />
            
            <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                  <span className="text-[#8B5CF6] text-[9px] tracking-[0.3em] uppercase font-light">Secure Delivery</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                  Delivery <span className="text-[#8B5CF6] font-medium">Address</span>
                </h1>
                <div className="w-12 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3" />
                <p className="text-white/30 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Enter your shipping details for secure delivery</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-14 h-14 bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
                    <Diamond className="w-6 h-6 text-[#8B5CF6] opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== FORM BODY ===== */}
          <div className="p-6 md:p-8 lg:p-10">
            
            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-xl backdrop-blur-sm animate-slideDown">
                <div className="flex items-center gap-3 text-[#22C55E]">
                  <CheckCircle className="w-5 h-5 animate-bounce" />
                  <span className="font-light tracking-wide text-white/80">Address saved successfully!</span>
                </div>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl backdrop-blur-sm animate-shake">
                <div className="flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-light tracking-wide text-white/80">{errors.submit}</span>
                </div>
              </div>
            )}

            {/* ===== FORM GRID ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inputFields.map((field, index) => {
                const Icon = field.icon;
                const hasError = !!errors[field.name];
                const isFocused = focusedField === field.name;
                const value = form[field.name];

                return (
                  <div 
                    key={field.name}
                    className="relative group"
                  >
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${
                          isFocused ? 'text-[#8B5CF6]' : 'text-white/20 group-hover:text-[#8B5CF6]'
                        }`} />
                      </div>

                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={value}
                        maxLength={field.maxLength}
                        onChange={handleUser}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => {
                          setFocusedField(null);
                          const error = validateField(field.name, value);
                          setErrors(prev => ({
                            ...prev,
                            [field.name]: error
                          }));
                        }}
                        className={`w-full bg-white/[0.02] text-white border rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-300 font-light text-sm tracking-wide
                          ${hasError ? 'border-red-500/30 focus:border-red-500/50' : 
                            isFocused ? 'border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.05)]' : 
                            'border-white/5 hover:border-[#8B5CF6]/15'
                          }
                          placeholder:text-white/10
                          disabled:opacity-50
                        `}
                        disabled={isSuccess}
                      />

                      {hasError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
                        </div>
                      )}
                    </div>

                    {hasError && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5 animate-slideDown font-light">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading || isSuccess}
                className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-light tracking-wider py-3.5 rounded-xl text-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span>Save Address</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("addressDraft");
                  router.back();
                }}
                className="flex-1 bg-white/[0.02] text-white/40 font-light tracking-wider py-3.5 rounded-xl text-sm hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-[#8B5CF6]/15 hover:text-white/60"
              >
                Cancel
              </button>
            </div>

            {/* ===== AUTO-SAVE INDICATOR ===== */}
            {Object.values(form).some(v => v.trim()) && !isSuccess && (
              <div className="mt-5 flex items-center justify-center gap-2.5">
                <div className="relative">
                  <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-ping opacity-60" />
                </div>
                <span className="text-white/10 text-[10px] font-light tracking-wider">Auto-saving</span>
              </div>
            )}

            {/* ===== PROGRESS ===== */}
            {Object.values(form).some(v => v.trim()) && (
              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-white/20 font-light tracking-wide mb-1">
                  <span>Completion</span>
                  <span className="text-[#8B5CF6]">
                    {Math.round((Object.values(form).filter(v => v.trim()).length / 8) * 100)}%
                  </span>
                </div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full transition-all duration-700"
                    style={{ width: `${(Object.values(form).filter(v => v.trim()).length / 8) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-5 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-white/10" />
            <span className="text-white/10 text-[8px] font-light tracking-wider">Encrypted & Secure</span>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-white/10" />
            <span className="text-white/10 text-[8px] font-light tracking-wider">LUXE</span>
          </div>
          <div className="w-px h-3 bg-white/5" />
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-white/10" />
            <span className="text-white/10 text-[8px] font-light tracking-wider">24/7 Support</span>
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
        .animate-slideDown { animation: slideDown 0.3s ease-out both; }
        .animate-shake { animation: shake 0.4s ease-out; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite 1s; }
        .animate-float-slow { animation: floatSlow 7s ease-in-out infinite 0.5s; }
        .animate-float-slow-delayed { animation: floatSlowDelayed 7s ease-in-out infinite 1.5s; }
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

export default AddAddress;