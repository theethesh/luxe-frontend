"use client"
import React, { useState } from 'react'
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"


const login = () => {
  const [user, setuser] = useState({
    email: "",
    password: ""


  })
  const router = useRouter()


  const handleuser = (e) => {
    const { name, value } = e.target
    setuser((prev) => ({
      ...prev,
      [name]: value

    }))


  }
  const handlesubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4006/api/login", user)
      .then((res) => {
        console.log(res.data.user.roll);

        sessionStorage.setItem("token", res.data.data);

        if (res.data.user.roll === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      })
      .catch((err) => console.log(err.message))





  }




  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center p-6">

      <div className="grid lg:grid-cols-2 max-w-6xl w-full overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#1A1D23] shadow-[0_0_35px_rgba(212,175,55,0.15)]">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center items-center px-12 py-16 bg-gradient-to-br from-[#111317] to-[#1A1D23] border-r border-[#D4AF37]/20">

          <div className="w-24 h-24 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-5xl border border-[#D4AF37]/30">
            🛍️
          </div>

          <h1 className="mt-8 text-5xl font-bold text-[#D4AF37] text-center">
            Welcome Back
          </h1>

          <p className="mt-6 text-gray-400 text-center text-lg leading-8 max-w-md">
            Login to continue shopping and enjoy a premium shopping experience.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10 md:p-14">

          <h2 className="text-4xl font-bold text-[#D4AF37]">
            Login
          </h2>

          <p className="text-gray-400 mt-2 mb-8">
            Sign in to your account
          </p>

          <form
            onSubmit={handlesubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleuser}
                className="w-full bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
              />

            </div>

            <div>

              <label className="block mb-2 text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleuser}
                className="w-full bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#F5D76E] text-black py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              Login
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-400">
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block text-[#D4AF37] font-semibold hover:text-[#F5D76E] transition"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}


export default login
