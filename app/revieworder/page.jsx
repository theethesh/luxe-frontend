"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReviewOrder = () => {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressId, setAddressId] = useState("");

  // Get sessionStorage values after component mounts
  useEffect(() => {
    const payment = sessionStorage.getItem("paymentMethod");
    const id = sessionStorage.getItem("addressId");

    setPaymentMethod(payment || "");
    setAddressId(id || "");

    getCart();
  }, []);

  // Fetch address only after addressId is available
  useEffect(() => {
    if (addressId) {
      getAddress();
    }
  }, [addressId]);

  const getCart = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4006/api/viewcart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backend returns { cartdata }
      setCart(res.data.cartdata || []);
    } catch (error) {
      console.log(error);
    }
  };

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

      const selected = res.data.address.find(
        (item) => item._id === addressId
      );

      setAddress(selected);
    } catch (error) {
      console.log(error);
    }
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.productid.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4006/api/placeorder",
        {
          addressId,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      router.push("/ordersuccess");
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">

      {/* Header */}
      <div className="bg-[#15181E] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
            🧾 Review Your Order
          </h1>

          <p className="mt-3 text-gray-400">
            Please verify your details before placing your order.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

        {/* Left */}
        <div className="lg:col-span-2 space-y-8">

          {/* Address */}
          <div className="bg-[#1A1D23] border border-[#D4AF37]/20 rounded-3xl p-6 hover:border-[#D4AF37] transition">

            <h2 className="text-2xl font-bold text-[#D4AF37] mb-5">
              📍 Delivery Address
            </h2>

            {address ? (
              <div className="space-y-2 text-gray-300">

                <h3 className="text-xl font-bold text-white">
                  {address.name}
                </h3>

                <p>📞 {address.mobile}</p>

                <p>
                  {address.doorno}, {address.streetname}
                </p>

                <p>
                  {address.city}, {address.district}
                </p>

                <p>
                  {address.state} - {address.pincode}
                </p>

              </div>
            ) : (
              <p className="text-gray-500">
                No Address Selected
              </p>
            )}

          </div>

          {/* Products */}
          <div className="bg-[#1A1D23] border border-[#D4AF37]/20 rounded-3xl p-6">

            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
              🛍 Products
            </h2>

            {cart.length > 0 ? (
              cart.map((item) => (

                <div
                  key={item._id}
                  className="flex flex-col md:flex-row justify-between items-center border-b border-[#D4AF37]/10 py-5 gap-5"
                >

                  <div className="flex items-center gap-5">
                    <img
                      src={
                        item.productid?.thumbnail
                          ? item.productid.thumbnail.startsWith("http")
                            ? item.productid.thumbnail
                            : `http://localhost:4006/${item.productid.thumbnail}`
                          : "/no-image.png"
                      }
                      alt={item.productid?.title}
                      className="w-24 h-24 rounded-2xl object-cover border border-[#D4AF37]/20"
                    />

                    <div>

                      <h3 className="text-lg font-bold text-white">
                        {item.productid.title}
                      </h3>

                      <p className="text-gray-400 mt-2">
                        Quantity : {item.quantity}
                      </p>

                      <p className="text-[#D4AF37] font-bold mt-2">
                        ₹ {item.productid.price}
                      </p>

                    </div>

                  </div>

                  <div className="text-2xl font-bold text-[#D4AF37]">
                    ₹ {item.productid.price * item.quantity}
                  </div>

                </div>

              ))
            ) : (
              <p className="text-gray-500">
                Your Cart is Empty
              </p>
            )}

          </div>

        </div>

        {/* Right */}
        <div>

          <div className="sticky top-8 bg-[#1A1D23] border border-[#D4AF37]/20 rounded-3xl p-7 shadow-[0_0_25px_rgba(212,175,55,0.12)]">

            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-300">

              <div className="flex justify-between">
                <span>Products</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment</span>
                <span className="text-white">
                  {paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-400 font-semibold">
                  FREE
                </span>
              </div>

            </div>

            <div className="border-t border-[#D4AF37]/20 mt-6 pt-6 flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span className="text-[#D4AF37]">
                ₹ {grandTotal}
              </span>

            </div>

            <div className="mt-6 rounded-2xl border border-[#D4AF37]/20 bg-[#111317] p-4 text-[#D4AF37]">
              🔒 Secure Checkout • Premium Protection
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-[#D4AF37] hover:bg-[#F5D76E] text-black py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.02]"
            >
              🚀 Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReviewOrder;