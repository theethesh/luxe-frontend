"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaPhone, FaUserTag, FaBirthdayCake } from "react-icons/fa";

const Page = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    axios
      .get("http://localhost:4006/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-[#0F1115] py-10 px-5">

    <div className="max-w-5xl mx-auto bg-[#1A1D23] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)]">

      {/* Header */}
      <div className="bg-[#15181E] border-b border-[#D4AF37]/20 p-10 flex flex-col md:flex-row items-center gap-6">

        <div className="w-28 h-28 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
          <FaUserCircle className="text-[#D4AF37]" size={90} />
        </div>

        <div>

          <h1 className="text-4xl font-bold text-[#D4AF37]">
            {profile.name}
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome Back 👋
          </p>

        </div>

      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6 p-8">

        <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">

          <div className="flex items-center gap-4">

            <FaEnvelope className="text-[#D4AF37] text-2xl" />

            <div>

              <p className="text-gray-400">
                Email
              </p>

              <h2 className="text-white font-semibold text-lg">
                {profile.email}
              </h2>

            </div>

          </div>

        </div>

        <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">

          <div className="flex items-center gap-4">

            <FaPhone className="text-[#D4AF37] text-2xl" />

            <div>

              <p className="text-gray-400">
                Mobile
              </p>

              <h2 className="text-white font-semibold text-lg">
                {profile.mobile}
              </h2>

            </div>

          </div>

        </div>

        <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">

          <div className="flex items-center gap-4">

            <FaUserTag className="text-[#D4AF37] text-2xl" />

            <div>

              <p className="text-gray-400">
                Role
              </p>

              <h2 className="text-white font-semibold text-lg capitalize">
                {profile.role}
              </h2>

            </div>

          </div>

        </div>

        <div className="bg-[#111317] border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">

          <div className="flex items-center gap-4">

            <FaBirthdayCake className="text-[#D4AF37] text-2xl" />

            <div>

              <p className="text-gray-400">
                Age
              </p>

              <h2 className="text-white font-semibold text-lg">
                {profile.age}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-[#D4AF37]/20 p-8 flex justify-end">

        <button className="bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
          Edit Profile
        </button>

      </div>

    </div>

  </div>
);
};

export default Page;