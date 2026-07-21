import { Suspense } from "react";
import { Diamond, Loader2 } from "lucide-react";
import AddProduct from "./addproduct";

function PremiumLoader() {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-[#A855F7]/10 rounded-full blur-3xl animate-ping"></div>

      {/* Glass Card */}
      <div className="relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl px-14 py-12 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
        <div className="flex flex-col items-center">

          <div className="relative">
            <div className="w-24 h-24 rounded-full border border-[#8B5CF6]/20"></div>

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#8B5CF6] animate-spin"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Diamond className="w-10 h-10 text-[#8B5CF6] animate-pulse" />
            </div>
          </div>

          <h2 className="mt-8 text-3xl font-light text-white tracking-[0.25em]">
            LUXE
          </h2>

          <p className="mt-2 text-[#8B5CF6] text-xs uppercase tracking-[0.45em]">
            Premium Collection
          </p>

          <div className="flex items-center gap-3 mt-8 text-white/60">
            <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />
            <span className="text-sm tracking-widest">
              Preparing Experience...
            </span>
          </div>

          <div className="w-56 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] animate-[loading_2s_linear_infinite]"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PremiumLoader />}>
      <AddProduct />
    </Suspense>
  );
}