"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Package,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const logout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">

        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-orange-500">
          ShopEase
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center w-[450px] border rounded-full overflow-hidden">

          <input
            type="text"
            placeholder="Search Products..."
            className="flex-1 px-5 py-3 outline-none"
          />

          <button className="bg-orange-500 text-white px-5 py-3">
            <Search size={20} />
          </button>

        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">

          <Link
            href="/"
            className="hover:text-orange-500 font-medium"
          >
            Home
          </Link>

          <Link
            href="/productpage"
            className="hover:text-orange-500 font-medium"
          >
            Categories
          </Link>

          <Link
            href="/viewcart"
            className="hover:text-orange-500 flex items-center gap-1"
          >
            <ShoppingCart size={20} />
            Cart
          </Link>

          <Link
            href="/myorders"
            className="hover:text-orange-500 flex items-center gap-1"
          >
            <Package size={20} />
            Orders
          </Link>

          {isLogin ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <User size={18} />
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">

          <div className="flex flex-col p-5 gap-5">

            <Link href="/">Home</Link>

            <Link href="/productpage">Categories</Link>

            <Link href="/viewcart">Cart</Link>

            <Link href="/myorders">Orders</Link>

            {isLogin ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white rounded-lg py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-orange-500 text-white rounded-lg py-2 text-center"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;