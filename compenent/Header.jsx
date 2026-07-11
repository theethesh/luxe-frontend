"use client";

import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  const [logged, setLogged] = useState(false);
  const [count, setCount] = useState(0);
  const [search,setsearch]=useState("")

  const router=useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setLogged(false);
      setCount(0);
      return;
    }

    setLogged(true);

    const cartcount = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4006/api/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCount(res.data.count);
      } catch (err) {
        console.log(err.message);
      }
    };

    cartcount();
  }, [logged]);


  const searchproduct=async()=>{
    if(!search.trim())return;
    router.push(`/search?search=${search}`)
    
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0F1115] border-b border-[#D4AF37]/30 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-extrabold tracking-wider text-[#D4AF37] hover:text-yellow-300 transition duration-300 cursor-pointer">
            THEETHESHSUBHA
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center w-[450px] bg-[#1A1D23] border border-[#D4AF37]/20 rounded-full overflow-hidden">

          <input
            type="text" value={search} onChange={(e)=>setsearch(e.target.value)}
            placeholder="Search Premium Products..."
          
            className="flex-1 px-5 py-3 bg-transparent text-white placeholder:text-gray-500 outline-none"
          />

          <button className="bg-[#D4AF37] hover:bg-yellow-400 text-black px-6 py-4 transition" onClick={searchproduct}>
            <FaSearch />
          </button>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">

          {logged ? (
            <Link
              href="/profile"
              className="flex flex-col items-center text-gray-300 hover:text-[#D4AF37] transition"
            >
              <div className="w-11 h-11 rounded-full bg-[#1A1D23] border border-[#D4AF37]/30 flex items-center justify-center">
                <CgProfile size={24} />
              </div>

              <span className="text-sm mt-1">
                Profile
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center text-gray-300 hover:text-[#D4AF37] transition"
            >
              <div className="w-11 h-11 rounded-full bg-[#1A1D23] border border-[#D4AF37]/30 flex items-center justify-center">
                <CgProfile size={24} />
              </div>

              <span className="text-sm mt-1">
                Login
              </span>
            </Link>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex flex-col items-center text-gray-300 hover:text-[#D4AF37] transition"
          >
            <div className="w-11 h-11 rounded-full bg-[#1A1D23] border border-[#D4AF37]/30 flex items-center justify-center">
              <FaShoppingCart size={22} />
            </div>

            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}

            <span className="text-sm mt-1">
              Cart
            </span>
          </Link>

        </div>

      </div>

    </header>
  );
}