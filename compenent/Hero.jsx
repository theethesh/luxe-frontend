"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const banners = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
];

const Hero = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative max-w-7xl mx-auto mt-6 px-4">

      <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">

        <img
          src={banners[current]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35 flex items-center">

          <div className="text-white ml-16 max-w-xl">

            <p className="text-orange-300 text-xl font-semibold">
              MEGA SALE
            </p>

            <h1 className="text-6xl font-bold mt-3 leading-tight">
              Up to 70% OFF
            </h1>

            <p className="mt-6 text-lg">
              Discover the latest fashion, electronics,
              accessories and much more.
            </p>

            <button
              onClick={() => router.push("/productpage")}
              className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Shop Now →
            </button>

          </div>

        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full"
        >
          <ChevronRight size={28} />
        </button>

      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">

        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full transition ${
              current === index
                ? "bg-orange-500"
                : "bg-gray-300"
            }`}
          />
        ))}

      </div>

    </section>
  );
};

export default Hero;