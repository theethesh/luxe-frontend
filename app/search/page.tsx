"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [product, setProduct] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;

    axios
      .get(`http://localhost:4006/api/search?search=${search}`)
      .then((res) => setProduct(res.data))
      .catch((error) => console.log(error.message));
  }, [search]);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-10">

      {/* Heading */}
      <div className="text-center mb-10">

        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Search Results
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Showing results for{" "}
          <span className="text-yellow-400 font-semibold">
            "{search}"
          </span>
        </p>

        <p className="mt-2 text-gray-500">
          {product.length} Result{product.length !== 1 ? "s" : ""} Found
        </p>

      </div>

      {product.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">

          <div className="text-8xl">🔍</div>

          <h2 className="text-3xl font-bold mt-6 text-yellow-400">
            No Products Found
          </h2>

          <p className="text-gray-400 mt-3">
            Try searching with another keyword.
          </p>

        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {product.map((p) => (

            <div
              key={p._id}
              className="bg-zinc-900 border border-yellow-500/30 rounded-2xl overflow-hidden hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.35)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              onClick={() => router.push(`/viewcart/${p._id}`)}
            >

              {/* Image */}
              <div className="overflow-hidden">

                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              {/* Details */}
              <div className="p-5">

                <div className="flex justify-between items-center">

                  <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full capitalize">
                    {p.category}
                  </span>

                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    In Stock
                  </span>

                </div>

                <h2 className="text-xl font-bold mt-4 line-clamp-2">
                  {p.title}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  Brand :
                  <span className="text-yellow-400 ml-1 font-semibold">
                    {p.brand}
                  </span>
                </p>

                <p className="text-gray-400 mt-3 text-sm line-clamp-3">
                  {p.description}
                </p>

                <div className="flex items-center justify-between mt-6">

                  <span className="text-3xl font-bold text-yellow-400">
                    ₹{p.price}
                  </span>

                  <span className="text-sm text-green-400">
                    🚚 Free Delivery
                  </span>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/viewcart/${p._id}`);
                  }}
                  className="w-full mt-6 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
                >
                  View Product
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Search;