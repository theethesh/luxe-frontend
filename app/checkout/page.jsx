"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  Plus, 
  CreditCard, 
  Truck, 
  Lock, 
  ChevronRight,
  Home,
  Phone,
  Map,
  Building2,
  Landmark,
  Mail,
  User,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Diamond,
  Sparkles,
  Crown,
  Shield,
  Gift,
  Star,
  Gem,
  Clock,
  Infinity,
  Zap
} from "lucide-react";

const Checkout = () => {
  const router = useRouter();

  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4006"}/api/getaddress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddress(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem("addressId", selectedAddress);

    setTimeout(() => {
      router.push("/payment");
    }, 500);
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Addresses</p>
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

      <div className="max-w-6xl mx-auto relative">
        
  
        <button
          onClick={() => router.back()}
          className="group mb-8 flex items-center gap-3 text-white/20 hover:text-[#8B5CF6] transition-all duration-500"
        >
          <div className="p-2 rounded-full bg-white/[0.015] border border-white/5 group-hover:border-[#8B5CF6]/20 group-hover:bg-[#8B5CF6]/5 transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] font-light uppercase">Back</span>
        </button>

        <div className="mb-10 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Delivery</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Select <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Address</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                <span>Choose where you want your order delivered</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/[0.015] px-5 py-3 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                <Home className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Addresses</p>
                <p className="text-white/60 text-lg font-light">{address?.address?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {address?.address?.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="bg-[#12121A] border border-white/5 rounded-3xl p-16 text-center transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-36 h-36 mx-auto bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-700 group-hover:border-[#8B5CF6]/20">
                <MapPin className="w-16 h-16 text-[#8B5CF6] opacity-30" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-white">
              No Address <span className="text-[#8B5CF6] font-medium">Found</span>
            </h2>
            <p className="text-white/20 text-sm font-light tracking-wide mt-3">Add your first delivery address to continue</p>
            <button
              onClick={() => router.push("/addaddress")}
              className="mt-8 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-10 py-4 rounded-full font-light tracking-wider hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>
        ) : (
          <>
      
            <div className="grid md:grid-cols-2 gap-4 animate-fadeInUp">
              {address.address.map((item, index) => {
                const isSelected = selectedAddress === item._id;
                
                return (
                  <label
                    key={item._id}
                    className={`group cursor-pointer rounded-xl border bg-[#12121A] p-5 transition-all duration-500 hover:-translate-y-0.5 relative overflow-hidden
                    ${
                      isSelected
                        ? "border-[#8B5CF6]/20 shadow-[0_20px_60px_rgba(139,92,246,0.03)]"
                        : "border-white/5 hover:border-[#8B5CF6]/15"
                    }`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                    )}
                    
                    <div className="flex items-start gap-4">
                    
                      <div className="mt-1 relative flex-shrink-0">
                        <input
                          type="radio"
                          name="address"
                          value={item._id}
                          checked={isSelected}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="w-4 h-4 accent-[#8B5CF6] cursor-pointer"
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1">
                            <CheckCircle className="w-4 h-4 text-[#8B5CF6] animate-bounce" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                              <User className="w-3 h-3 text-[#8B5CF6]" />
                            </div>
                            <h2 className="text-base font-light text-white group-hover:text-[#8B5CF6] transition-colors duration-300">
                              {item.name}
                            </h2>
                          </div>
                          <span className="bg-[#8B5CF6]/5 text-[#8B5CF6] px-2 py-0.5 rounded-full text-[7px] font-light border border-[#8B5CF6]/10 flex items-center gap-0.5">
                            <Truck className="w-2 h-2" />
                            Free
                          </span>
                        </div>

                        <div className="mt-2 space-y-1 text-white/20 text-xs font-light">
                          <p className="flex items-start gap-1.5">
                            <Home className="w-3 h-3 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                            <span>{item.doorno}, {item.streetname}</span>
                          </p>
                          <p className="flex items-start gap-1.5">
                            <MapPin className="w-3 h-3 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                            <span>{item.city}, {item.district}</span>
                          </p>
                          <p className="flex items-start gap-1.5">
                            <Landmark className="w-3 h-3 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                            <span>{item.state} - {item.pincode}</span>
                          </p>
                          <p className="flex items-start gap-1.5">
                            <Phone className="w-3 h-3 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                            <span className="text-[#8B5CF6]">{item.mobile}</span>
                          </p>
                        </div>

                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-[#8B5CF6]/10">
                            <div className="flex items-center gap-1.5 text-[10px] text-[#22C55E]/60 font-light">
                              <CheckCircle className="w-3 h-3" />
                              <span>Selected for delivery</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            
            <div className="mt-8 bg-[#12121A] border border-white/5 rounded-xl p-5 md:p-6 transition-all duration-500 hover:border-[#8B5CF6]/10 animate-fadeInUp">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
                <button
                  onClick={() => router.push("/addaddress")}
                  className="group flex items-center gap-2 border border-[#8B5CF6]/15 text-[#8B5CF6] hover:bg-[#8B5CF6]/5 px-5 py-2.5 rounded-lg font-light text-xs transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
                  Add New Address
                </button>

      
                <div className="flex items-center gap-3 text-white/15 text-[10px] font-light">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#8B5CF6]" />
                    <span>Secure</span>
                  </div>
                  <span className="text-white/5">|</span>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#8B5CF6]" />
                    <span>Fast</span>
                  </div>
                  <span className="text-white/5">|</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8B5CF6]" />
                    <span>24/7</span>
                  </div>
                </div>

    
                <button
                  onClick={handleContinue}
                  disabled={!selectedAddress || isSubmitting}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white px-7 py-2.5 rounded-lg font-light text-xs tracking-wide transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5 min-w-[160px] justify-center group border border-white/5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

    
              {selectedAddress && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] text-white/10 text-center font-light flex items-center justify-center gap-1.5">
                    <MapPin className="w-2.5 h-2.5 text-[#8B5CF6]" />
                    Delivery to: {address.address.find(a => a._id === selectedAddress)?.name} • 
                    {address.address.find(a => a._id === selectedAddress)?.city}, 
                    {address.address.find(a => a._id === selectedAddress)?.state}
                  </p>
                </div>
              )}
            </div>

  
            <div className="mt-6 flex items-center justify-center gap-2.5 animate-fadeInUp">
              <Shield className="w-2.5 h-2.5 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">Secure & Trusted</span>
              <div className="w-px h-2.5 bg-white/5" />
              <Sparkles className="w-2.5 h-2.5 text-white/5" />
              <span className="text-white/5 text-[7px] font-light tracking-[0.4em] uppercase">LUXE</span>
            </div>
          </>
        )}
      </div>
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
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out both; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out both; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out both; }
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

export default Checkout;