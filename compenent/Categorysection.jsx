"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategorySection = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4006/api/getproduct"
      );

      const unique = [
        ...new Map(
          res.data.data.map((item) => [
            item.category,
            {
              category: item.category,
              image: item.thumbnail,
            },
          ])
        ).values(),
      ];

      setCategories(unique);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-4xl font-bold">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-2">
            Find products from your favourite categories
          </p>
        </div>

      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

        {categories.map((item) => (

          <div
            key={item.category}
            onClick={() =>
              router.push(`/categorywise/${item.category}`)
            }
            className="cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
          >

            <div className="p-4">

              <img
                src={item.image}
                alt={item.category}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-orange-100 group-hover:scale-110 transition duration-500"
              />

            </div>

            <div className="pb-5 text-center">

              <h3 className="text-lg font-bold capitalize">
                {item.category}
              </h3>

              <p className="text-orange-500 text-sm mt-2">
                Explore →
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default CategorySection;