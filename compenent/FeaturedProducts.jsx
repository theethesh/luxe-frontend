"use client";

import { API_URL } from "@/lib/api";
import axios from "axios";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/getproduct`
      );

      setProducts(res.data.data.slice(0, 8));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Our most popular products
          </p>

        </div>

      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group"
          >

            {/* Image */}

            <div className="relative overflow-hidden">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />

              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                SALE
              </span>

            </div>

            {/* Content */}

            <div className="p-5">

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <div className="flex items-center gap-1 mt-2">

                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span>
                  {item.rating}
                </span>

              </div>

              <div className="mt-3">

                <span className="text-2xl font-bold text-orange-500">
                  ₹{item.price}
                </span>

                <span className="line-through ml-3 text-gray-400">
                  ₹{Math.round(item.price * 1.25)}
                </span>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    router.push(`/viewcart/${item._id}`)
                  }
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                >
                  <Eye size={18} />
                  View
                </button>

                <button
                  onClick={() =>
                    router.push(`/viewcart/${item._id}`)
                  }
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default FeaturedProducts;