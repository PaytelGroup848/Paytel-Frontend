import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/rahul copy.png", "/punit copy.jpg", "/rahul.jpg"];

export default function SuccessBanner() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  }, []);

  // Auto-play
  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (images.length === 0) return null;

  // Single image – no slider needed
  if (images.length <= 1) {
    return (
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 bg-transparent select-none">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2.5rem] bg-transparent">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[16/5.5] lg:aspect-[16/4.5] xl:aspect-[16/4]">
            <img
              src={images[0]}
              alt="Success story"
              className="block w-full h-full relative z-10"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 py-8 sm:py-12 md:py-16 bg-transparent select-none">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight">
          Success Stories
        </h1>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />
      </div>

      {/* Slider Container – transparent, no overlay */}
      <div
        className="group relative mx-auto w-full max-w-7xl overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2.5rem] bg-transparent transition-all duration-500"
        role="region"
        aria-label="Success Stories Slider"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[16/5.5] lg:aspect-[16/4.5] xl:aspect-[16/4] overflow-hidden">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out ${
                index === current
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-[1.02] pointer-events-none"
              }`}
            >
              {/* ❌ Removed blur background */}
              {/* ❌ Removed gradient fade overlay */}
              <img
                src={src}
                alt={`Success story ${index + 1}`}
                className="relative z-10 h-full w-full"
                style={{ objectFit: "contain" }}
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
          {/* ❌ Removed gradient overlay from here */}
        </div>

        {/* Previous Button */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 sm:left-5 top-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-slate-950 focus:outline-none border-none"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 sm:right-5 top-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-slate-950 focus:outline-none border-none"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}