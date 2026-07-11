"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddAddress = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    doorno: "",
    streetname: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  const handleUser = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4006/api/addaddress",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      router.push("/checkout");
    } catch (err) {
      console.log(err);
      alert("Failed to Save Address");
    }
  };

 return (
  <div className="min-h-screen bg-[#0f1115] flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-5xl bg-[#1a1d23] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-[#111827] border-b border-[#D4AF37]/30 px-8 py-8">
        <h1 className="text-4xl font-bold text-[#D4AF37]">
          Delivery Address
        </h1>
        <p className="text-gray-400 mt-2">
          Enter your shipping address for secure delivery.
        </p>
      </div>

      {/* Form */}
      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="doorno"
            placeholder="Door No"
            value={form.doorno}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="streetname"
            placeholder="Street Name"
            value={form.streetname}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleUser}
            className="w-full bg-[#111827] text-white border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-[#D4AF37] text-black font-bold py-4 rounded-xl text-lg hover:bg-[#c59b2a] hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          Save Address
        </button>

      </div>
    </div>
  </div>
);
};

export default AddAddress;