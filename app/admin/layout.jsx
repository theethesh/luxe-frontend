"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../contaxt/authcontaxt";
import AdminSidebar from "../../compenent/AdminSidebar";
import { Diamond } from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, isLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user?.roll !== "admin" && user?.roll !== "superadmin") {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || (user && user.roll !== "admin" && user.roll !== "superadmin")) {
    return (
      <div className="min-h-screen bg-[#0B0B12] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-[#8B5CF6]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-2 border-[#8B5CF6] rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Diamond className="w-8 h-8 text-[#8B5CF6] animate-pulse" />
            </div>
          </div>
          <p className="text-[#8B5CF6] text-sm font-medium tracking-[0.3em] uppercase">
            Checking access
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B12] flex relative">
      <AdminSidebar />
      <div className="flex-1 relative z-10">{children}</div>
    </div>
  );
}
