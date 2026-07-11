"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewCart = () => {
  const [cart, setcart] = useState([]);
  const router = useRouter()

  const getcart = async () => {
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

      setcart(res.data.cartdata);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getcart();
  }, []);

  const updateQuantity = async (id, action) => {
    try {
      const token = sessionStorage.getItem("token")
      const res = await axios.put(`http://localhost:4006/api/cartupdate/${id}`,
        { action, },

        {
          headers: {
            Authorization:
              `Bearer ${token}`

          }
        }
      )
      getcart()
    } catch (error) {
      console.log(error.message)
    }
  }

  const removecart = async (id) => {
    try {
      const token = sessionStorage.getItem("token")
      const res = await axios.delete(`http://localhost:4006/api/cartdelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )
      getcart()
    } catch (error) {
      console.log(error.message)
    }

  }
  const grandtotal = cart.reduce((total, item) => {
    return total + item.quantity * item.productid.price

  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">
              Shopping Cart
            </h1>

            <p className="text-gray-300 mt-2">
              {cart.length} Product{cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-gray-900 border border-yellow-500 rounded-3xl shadow-2xl p-10 md:p-16 text-center">
            <div className="text-7xl">🛒</div>

            <h2 className="text-3xl font-bold mt-5 text-yellow-400">
              Your Cart is Empty
            </h2>

            <p className="text-gray-400 mt-3">
              Looks like you haven't added anything yet.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-xl font-bold transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900 border border-yellow-500 rounded-3xl shadow-xl hover:shadow-yellow-500/30 transition duration-300 p-5 md:p-6 flex flex-col lg:flex-row gap-6"
                >
                  <img
                    src={
                      item.productid?.thumbnail
                        ? item.productid.thumbnail.startsWith("http")
                          ? item.productid.thumbnail
                          : `http://localhost:4006/${item.productid.thumbnail}`
                        : "/no-image.png"
                    }
                    alt={item.productid?.title}
                    className="w-[250px] h-[250px] object-contain hover:scale-105 transition duration-500"
                  />

                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <h2 className="text-2xl font-bold text-yellow-400">
                        {item.productid.title}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        Premium Quality Product
                      </p>

                      <p className="text-3xl font-bold text-yellow-500 mt-4">
                        ₹{item.productid.price.toLocaleString()}
                      </p>

                      <span className="inline-block mt-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        🚚 Free Delivery
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">

                      <div className="flex items-center border border-yellow-500 rounded-xl overflow-hidden">

                        <button
                          onClick={() => updateQuantity(item._id, "dec")}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
                        >
                          −
                        </button>

                        <span className="px-6 font-bold text-lg text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item._id, "inc")}
                          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black"
                        >
                          +
                        </button>

                      </div>

                      <div className="text-left sm:text-right">

                        <h3 className="text-2xl font-bold text-yellow-400">
                          ₹{(item.productid.price * item.quantity).toLocaleString()}
                        </h3>

                        <button
                          onClick={() => removecart(item._id)}
                          className="mt-3 text-red-500 hover:text-red-400 font-semibold"
                        >
                          🗑️ Remove
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 border border-yellow-500 rounded-3xl shadow-xl p-6 h-fit sticky top-8">

              <h2 className="text-2xl font-bold text-yellow-400 border-b border-yellow-500 pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mt-6 text-white">

                <div className="flex justify-between">
                  <span>Products</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-400 font-semibold">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-400">
                    ₹0
                  </span>
                </div>

              </div>

              <div className="border-t border-yellow-500 mt-6 pt-6 flex justify-between text-2xl font-bold text-white">

                <span>Total</span>

                <span className="text-yellow-400">
                  ₹{grandtotal.toLocaleString()}
                </span>

              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-xl text-lg font-bold transition"
              >
                Proceed to Checkout →
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );



};

export default ViewCart;




























