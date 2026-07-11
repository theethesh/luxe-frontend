"use client"
import React, { useState } from 'react'
import axios from "axios"
import Link from 'next/link'
import { useRouter } from "next/navigation"



const Register = () => {
  const [data, setdata] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
    roll: ""

  })
  const router=useRouter()

  const handleuser = (e) => {
    
    const { name,value} = e.target
    setdata((prev) => ({
      ...prev,
      [name]:value

    }))
  }
  const handlesubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:4006/api/create",data)
    .then((res)=>{console.log(res.data)
    router.push("/login")
    })
  }



return (
  <div className="min-h-screen bg-[#0F1115] flex items-center justify-center p-6">

    <div className="grid lg:grid-cols-2 max-w-6xl w-full overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#1A1D23] shadow-[0_0_35px_rgba(212,175,55,0.15)]">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center items-center px-12 py-16 bg-gradient-to-br from-[#111317] to-[#1A1D23] border-r border-[#D4AF37]/20">

        <div className="w-24 h-24 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-5xl">
          🛍️
        </div>

        <h1 className="mt-8 text-5xl font-bold text-[#D4AF37] text-center">
          Join Our Store
        </h1>

        <p className="mt-6 text-center text-gray-400 text-lg leading-8 max-w-md">
          Create your account and enjoy premium shopping,
          secure checkout and exclusive offers.
        </p>

      </div>

      {/* Right Side */}

      <div className="p-10 md:p-12">

        <h2 className="text-4xl font-bold text-[#D4AF37]">
          Create Account
        </h2>

        <p className="text-gray-400 mt-2 mb-8">
          Fill in your details to get started.
        </p>

        <form
          onSubmit={handlesubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleuser}
            className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleuser}
            className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <input
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={handleuser}
            className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleuser}
            className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <input
            type="number"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleuser}
            className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleuser}
            className="bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <input
            type="text"
            name="roll"
            placeholder="Role"
            onChange={handleuser}
            className="md:col-span-2 bg-[#111317] border border-[#D4AF37]/20 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black py-4 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02]"
          >
            Create Account
          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-gray-400">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="inline-block mt-2 text-[#D4AF37] font-semibold hover:text-[#F5D76E] transition"
          >
            Login Here
          </Link>

        </div>

      </div>

    </div>

  </div>
);
}

export default Register
