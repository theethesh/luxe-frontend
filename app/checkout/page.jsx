"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();

  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4006/api/getaddress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddress(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    sessionStorage.setItem("addressId", selectedAddress);

    router.push("/payment");
  };

  
 return (
  <div className="min-h-screen bg-[#0F1115] text-white">

    {/* Header */}
    <div className="border-b border-[#D4AF37]/20 bg-[#15181E]">
      <div className="max-w-6xl mx-auto px-5 py-12">

        <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
          📍 Select Delivery Address
        </h1>

        <p className="mt-3 text-gray-400">
          Choose where you want your order delivered.
        </p>

      </div>
    </div>

    <div className="max-w-6xl mx-auto px-5 py-10">

      {address.length === 0 ? (

        <div className="bg-[#1A1D23] border border-[#D4AF37]/20 rounded-2xl p-12 text-center shadow-xl">

          <div className="text-7xl mb-5">📦</div>

          <h2 className="text-3xl font-bold text-[#D4AF37]">
            No Address Found
          </h2>

          <p className="text-gray-400 mt-3">
            Add your first delivery address to continue.
          </p>

          <button
            onClick={() => router.push("/addaddress")}
            className="mt-8 bg-[#D4AF37] hover:bg-[#F5D76E] text-black px-8 py-3 rounded-xl font-bold transition-all duration-300"
          >
            + Add Address
          </button>

        </div>

      ) : (

        <>
          <div className="grid md:grid-cols-2 gap-6">

            {address.address.map((item) => (

              <label
                key={item._id}
                className={`cursor-pointer rounded-2xl border bg-[#1A1D23] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]
                ${
                  selectedAddress === item._id
                    ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                    : "border-[#D4AF37]/20"
                }`}
              >

                <div className="flex items-start gap-4">

                  <input
                    type="radio"
                    name="address"
                    value={item._id}
                    checked={selectedAddress === item._id}
                    onChange={(e) =>
                      setSelectedAddress(e.target.value)
                    }
                    className="mt-1 w-5 h-5 accent-[#D4AF37]"
                  />

                  <div className="flex-1">

                    <div className="flex justify-between items-center">

                      <h2 className="text-xl font-bold text-white">
                        {item.name}
                      </h2>

                      <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-sm border border-[#D4AF37]/30">
                        🚚 Free Delivery
                      </span>

                    </div>

                    <p className="mt-4 text-gray-300">
                      {item.doorno}, {item.streetname}
                    </p>

                    <p className="text-gray-300">
                      {item.city}, {item.district}
                    </p>

                    <p className="text-gray-300">
                      {item.state} - {item.pincode}
                    </p>

                    <p className="mt-3 font-semibold text-[#D4AF37]">
                      📞 {item.mobile}
                    </p>

                  </div>

                </div>

              </label>

            ))}

          </div>

          {/* Bottom Section */}

          <div className="mt-10 bg-[#1A1D23] border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-5">

            <button
              onClick={() => router.push("/addaddress")}
              className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              ➕ Add New Address
            </button>

            <div className="text-gray-400">
              🔒 Secure Checkout &nbsp;|&nbsp; 🚚 Fast Delivery
            </div>

            <button
              onClick={handleContinue}
              className="bg-[#D4AF37] hover:bg-[#F5D76E] text-black px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              Continue to Payment →
            </button>

          </div>

        </>

      )}

    </div>

  </div>
);

};

export default Checkout;