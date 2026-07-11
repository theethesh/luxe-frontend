"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Product = () => {
  const [product, setProduct] = useState([]);


  const router = useRouter()

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:4006/api/getproduct");
      console.log(res.data.data)
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();

  }, []);


  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
          Products
        </h1>

        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-3 rounded-lg transition" onClick={(() => router.push("/admin/addproduct"))}>
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-yellow-500">
        <table className="min-w-full">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="px-4 py-4 text-left">Image</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Category</th>
              <th className="px-4 py-4 text-left">Brand</th>
              <th className="px-4 py-4 text-left">Price</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {product.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-800 hover:bg-gray-900 transition"
              >
                <td className="px-4 py-4">
                 <img
  src={
    p.thumbnail
      ? p.thumbnail.startsWith("http")
        ? p.thumbnail
        : `http://localhost:4006/${p.thumbnail}`
      : "/no-image.png"
  }
  alt={p.title}
  className="w-16 h-16 rounded-lg object-cover border border-yellow-500"
/>
                </td>

                <td className="px-4 py-4 font-semibold">{p.title}</td>

                <td className="px-4 py-4">{p.category}</td>

                <td className="px-4 py-4">{p.brand}</td>

                <td className="px-4 py-4 text-yellow-400 font-bold">
                  ₹{p.price}
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-col md:flex-row gap-2 justify-center">
                    <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 font-semibold" onClick={(() => router.push(`/admin/addproduct?id=${p._id}`))}>
                      Update
                    </button>

                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 font-semibold">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {product.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;