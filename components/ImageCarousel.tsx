"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel() {
  const images = [
    "/udaipurwid1.png",
    "/jaislmer1.png",
    "/hawamahalwide.jpg",
    "/jalmahal.png",
    "/amerwid.png",
    "/jagmandir.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 👇 Left button logic
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 👇 Right button logic
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 👇 Auto slide every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4 seconds

    return () => clearInterval(interval); // cleanup
  }, [images.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-500">
      <div
        className="w-full h-[485px] md:h-[350px] bg-cover bg-center relative transition-all duration-700"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 
                     bg-pink-500 hover:bg-pink-600 rounded-full p-3 shadow-lg transition-colors z-50"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 
                     bg-pink-500 hover:bg-pink-600 rounded-full p-3 shadow-lg transition-colors z-50"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}