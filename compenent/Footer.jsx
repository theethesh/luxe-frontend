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
    <footer className="bg-gray-900 text-white mt-20">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>

          <h2 className="text-3xl font-bold text-orange-500">
            ShopEase
          </h2>

          <p className="mt-5 text-gray-400 leading-7">
            Shop the latest fashion, electronics,
            accessories and much more at the best prices.
          </p>

        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link href="/">Home</Link>

            <Link href="/productpage">Categories</Link>

            <Link href="/viewcart">Cart</Link>

            <Link href="/myorders">Orders</Link>

          </div>

        </div>

        {/* Customer Service */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Customer Service
          </h3>

          <div className="space-y-3 text-gray-400">

            <p>Help Center</p>

            <p>Shipping</p>

            <p>Returns</p>

            <p>Privacy Policy</p>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">

            <div className="flex gap-3">
              <MapPin size={18} />
              Chennai, Tamil Nadu
            </div>

            <div className="flex gap-3">
              <Phone size={18} />
              +91 9876543210
            </div>

            <div className="flex gap-3">
              <Mail size={18} />
              support@shopease.com
            </div>

          </div>

        </div>

      </div>

      {/* Social */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">
            © 2026 ShopEase. All Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">

            <Facebook className="hover:text-orange-500 cursor-pointer" />

            <Instagram className="hover:text-orange-500 cursor-pointer" />

            <Twitter className="hover:text-orange-500 cursor-pointer" />

            <Linkedin className="hover:text-orange-500 cursor-pointer" />

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;