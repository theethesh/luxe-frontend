"use client";

import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

 return (
  <div className="min-h-screen bg-[#0F1115] text-white">

    {/* Header */}
    <div className="border-b border-[#D4AF37]/20 bg-[#15181E]">
      <div className="max-w-6xl mx-auto px-5 py-12">

        <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
          📦 My Orders
        </h1>

        <p className="mt-3 text-gray-400">
          View all your recent purchases and order history.
        </p>

      </div>
    </div>

    <div className="max-w-6xl mx-auto px-5 py-10">

      {orders.length === 0 ? (

        <div className="bg-[#1A1D23] border border-[#D4AF37]/20 rounded-2xl p-14 text-center shadow-xl">

          <div className="text-7xl mb-6">📦</div>

          <h2 className="text-3xl font-bold text-[#D4AF37]">
            No Orders Found
          </h2>

          <p className="text-gray-400 mt-4">
            You haven't placed any orders yet.
          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {orders.map((order, index) => (

            <div
              key={index}
              className="bg-[#1A1D23]
              border border-[#D4AF37]/20
              rounded-2xl
              p-6
              transition-all
              duration-300
              hover:border-[#D4AF37]
              hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-[#D4AF37]">
                  Order #{index + 1}
                </h2>

                <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full border border-[#D4AF37]/30 text-sm">
                  ✔ Delivered
                </span>

              </div>

              <div className="space-y-4">

                {order.items.map((item, i) => (

                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-4"
                  >

                    <div>

                      <h3 className="font-semibold text-lg text-white">
                        {item.title}
                      </h3>

                      <p className="text-gray-400 mt-1">
                        Quantity : {item.quantity}
                      </p>

                    </div>

                    <div className="text-xl font-bold text-[#D4AF37]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>

                  </div>

                ))}

              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#D4AF37]/20">

                <span className="text-xl font-bold">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-[#D4AF37]">
                  ₹{Number(order.total).toLocaleString()}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}