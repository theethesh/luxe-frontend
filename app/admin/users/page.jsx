"use client";

import { API_URL } from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Loader2,
  AlertCircle,
  Shield,
  Crown,
  Diamond,
  Sparkles,
  UserCheck,
  UserX,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  RefreshCw,
  Gem,
  Infinity,
  Gift,
  Zap
} from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login to continue");
        setTimeout(() => router.push("/login"), 1500);
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/getuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data && res.data.users) {
        setUsers(res.data.users);
      } else if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
        setError("No users found");
      }
    } catch (error) {
      console.log("Error fetching users:", error.message);
      
      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => router.push("/login"), 2000);
      } else if (error.response?.status === 404) {
        setError("Users API not found. Please check your backend.");
      } else if (error.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (error.code === "ERR_NETWORK") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(error.response?.data?.message || "Failed to load users");
      }
      
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.name?.toLowerCase() || "").includes(searchLower) ||
      (user.email?.toLowerCase() || "").includes(searchLower) ||
      (user.roll?.toLowerCase() || "").includes(searchLower) ||
      (user.mobile || "").includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return {
        color: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
        icon: Crown,
        label: "Admin"
      };
    }
    return {
      color: "bg-white/5 text-white/60 border-white/10",
      icon: UserCheck,
      label: "User"
    };
  };

  const handleRetry = () => {
    getUsers();
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
          <p className="text-[#8B5CF6] text-xs tracking-[0.3em] uppercase font-light">Loading Users</p>
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
                <span className="text-[#8B5CF6] text-[8px] tracking-[0.4em] uppercase font-light">Manage Users</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent font-medium">Users</span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] mt-3 animate-pulse-slow" />
              <p className="text-white/20 text-sm font-light tracking-wider mt-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8B5CF6]" />
                <span>Manage and view all registered users</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/[0.015] px-5 py-3 rounded-xl border border-white/5 hover:border-[#8B5CF6]/10 transition-all duration-500 animate-slideInRight group">
              <div className="p-1.5 rounded-lg bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-white/10 text-[8px] tracking-[0.2em] uppercase font-light">Total</p>
                <p className="text-white/60 text-lg font-light">{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ERROR MESSAGE ===== */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl backdrop-blur-sm animate-shake">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-white/60 text-sm font-light tracking-wide">{error}</span>
              </div>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 text-[#8B5CF6] hover:text-[#A855F7] transition-colors duration-300 text-sm font-light"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* ===== SEARCH BAR ===== */}
        <div className="mb-6 animate-fadeInUp">
          <div className="relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15 group-focus-within:text-[#8B5CF6] transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search by name, email or role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.015] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/5 outline-none focus:border-[#8B5CF6]/20 focus:shadow-[0_0_30px_rgba(139,92,246,0.03)] transition-all duration-300 font-light text-sm tracking-wide"
            />
          </div>
        </div>

        {/* ===== USERS TABLE ===== */}
        <div className="bg-[#12121A] border border-white/5 rounded-2xl overflow-hidden transition-all duration-700 hover:border-[#8B5CF6]/10 hover:shadow-[0_30px_80px_rgba(139,92,246,0.03)] animate-fadeInUp">
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/[0.015] border-b border-white/5">
                <tr>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">User</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Email</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Phone</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Role</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Joined</th>
                  <th className="px-4 py-4 text-left text-[8px] font-light text-white/15 uppercase tracking-[0.3em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-[#8B5CF6]/5 rounded-full flex items-center justify-center border border-[#8B5CF6]/10">
                          <Users className="w-10 h-10 text-[#8B5CF6] opacity-30" />
                        </div>
                        <p className="text-white/40 text-base font-light tracking-wide">
                          {searchTerm ? "No users match your search" : "No Users Found"}
                        </p>
                        <p className="text-white/10 text-sm font-light">
                          {searchTerm ? "Try a different search term" : "Users will appear here once they register"}
                        </p>
                        {!searchTerm && (
                          <button
                            onClick={handleRetry}
                            className="mt-2 flex items-center gap-2 text-[#8B5CF6] hover:text-[#A855F7] transition-colors duration-300 text-sm font-light"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => {
                    const role = getRoleBadge(user.roll);
                    const RoleIcon = role.icon;
                    
                    return (
                      <tr key={user._id || index} className="hover:bg-white/[0.015] transition-colors duration-300 group animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-[#A855F7]/10 flex items-center justify-center border border-[#8B5CF6]/20 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-[#8B5CF6] font-light text-sm">
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <span className="text-white/50 text-sm font-light group-hover:text-white/80 transition-colors duration-300">
                              {user.name || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-white/10" />
                            <span className="text-white/30 text-sm font-light">
                              {user.email || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-white/10" />
                            <span className="text-white/20 text-sm font-light">
                              {user.mobile || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-light border ${role.color}`}>
                            <RoleIcon className="w-2.5 h-2.5" />
                            {role.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-white/10" />
                            <span className="text-white/20 text-sm font-light">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              }) : 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[8px] font-light bg-[#22C55E]/5 text-[#22C55E] border border-[#22C55E]/10">
                            <span className="w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ===== PAGINATION ===== */}
          {filteredUsers.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-white/5">
              <div className="text-sm text-white/15 font-light">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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
              <Users className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <span className="text-white/20 text-sm font-light">
              Total Users: <span className="text-[#8B5CF6] font-light">{users.length}</span>
              {searchTerm && ` (Filtered: ${filteredUsers.length})`}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[8px] font-light tracking-wider">
            <span className="flex items-center gap-1.5 text-[#8B5CF6]/40">
              <Crown className="w-2.5 h-2.5 text-[#8B5CF6]" />
              Admins: <span className="text-white/40">{users.filter(u => u.roll === "admin").length}</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/15">
              <UserCheck className="w-2.5 h-2.5" />
              Users: <span className="text-white/20">{users.filter(u => u.roll !== "admin").length}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#22C55E]/40">
              <span className="w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
              Active
            </span>
          </div>
        </div>

        {/* ===== TRUST BADGE ===== */}
        <div className="mt-6 flex items-center justify-center gap-3 animate-fadeInUp">
          <Shield className="w-3 h-3 text-white/5" />
          <span className="text-white/5 text-[8px] font-light tracking-[0.3em] uppercase">Secure User Management</span>
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