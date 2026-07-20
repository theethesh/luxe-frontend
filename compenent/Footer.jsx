"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B12] text-white border-t border-white/5 mt-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8B5CF6]/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            LUXE<span className="text-[#8B5CF6]">.</span>
          </h2>

          <p className="mt-5 text-white/40 leading-7 font-light">
            Shop the latest fashion, electronics,
            accessories and much more at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5 tracking-tight">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-white/40 font-light">
            <Link href="/" className="hover:text-[#8B5CF6] transition-colors">Home</Link>
            <Link href="/search" className="hover:text-[#8B5CF6] transition-colors">Categories</Link>
            <Link href="/cart" className="hover:text-[#8B5CF6] transition-colors">Cart</Link>
            <Link href="/myorders" className="hover:text-[#8B5CF6] transition-colors">Orders</Link>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-5 tracking-tight">
            Customer Service
          </h3>

          <div className="space-y-3 text-white/40 font-light">
            <p>Help Center</p>
            <p>Shipping</p>
            <p>Returns</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5 tracking-tight">
            Contact
          </h3>

          <div className="space-y-3 text-white/40 font-light">
            <div className="flex gap-3 items-center">
              <MapPin size={18} className="text-[#8B5CF6]" />
              Chennai, Tamil Nadu
            </div>

            <div className="flex gap-3 items-center">
              <Phone size={18} className="text-[#8B5CF6]" />
              +91 9876543210
            </div>

            <div className="flex gap-3 items-center">
              <Mail size={18} className="text-[#8B5CF6]" />
              support@luxe.com
            </div>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/30 text-sm font-light">
            © 2026 LUXE. All Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <Facebook size={18} className="text-white/40 hover:text-[#8B5CF6] cursor-pointer transition-colors" />
            <Instagram size={18} className="text-white/40 hover:text-[#8B5CF6] cursor-pointer transition-colors" />
            <Twitter size={18} className="text-white/40 hover:text-[#8B5CF6] cursor-pointer transition-colors" />
            <Linkedin size={18} className="text-white/40 hover:text-[#8B5CF6] cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
