import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/rahul.jpg", "/punit.png", "/rahul copy.png"];

export default function SuccessBanner() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  }, []);

  // 🔄 Smart Autoplay Effect (Pauses when user hovers)
  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const interval = setInterval(next, 4000); // Changes every 4 seconds
    return () => clearInterval(interval);
  }, [next, isHovered]);

  // ⌨️ Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (images.length === 0) return null;

  // Single Image State with Shorter Heights
  if (images.length <= 1) {
    return (
      <section className="w-full px-[1rem] py-[1.5rem] sm:py-[2.5rem]">
        <div className="mx-auto w-full max-w-[75rem] overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200/60 bg-slate-950 shadow-xl">
          <div className="relative w-full aspect-[16/7.5] sm:aspect-[16/5.2] lg:aspect-[16/4.2]">
            <img
              src={images[0]}
              alt="Success story"
              className="block w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-[1rem] py-[1.5rem] sm:py-[2.5rem]">
      <div
        className="group relative mx-auto w-full max-w-[75rem] overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200/60 bg-slate-950 shadow-2xl transition-all duration-500"
        role="region"
        aria-label="Success Stories Slider"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider Track with Sleek Dimensions */}
        <div className="relative w-full aspect-[16/7.5] sm:aspect-[16/5.2] lg:aspect-[16/4.2] overflow-hidden">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out ${
                index === current
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-[1.03] pointer-events-none"
              }`}
            >
              {/* Intelligent Blur Background for Contain Mode padding */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${src})` }}
              />

              {/* Main Banner Image */}
              <img
                src={src}
                alt={`Success story ${index + 1}`}
                className="relative z-10 h-full w-full object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}

          {/* Premium Bottom Ambient Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[4rem] bg-gradient-to-t from-black/30 to-transparent z-20" />
        </div>

        {/* Dynamic Navigation Controls (Fade-in on container hover) */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-[1rem] top-1/2 z-30 flex h-[2.6rem] w-[2.6rem] sm:h-[3.2rem] sm:w-[3.2rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <ChevronLeft className="w-[1.2rem] h-[1.2rem] sm:w-[1.5rem] sm:h-[1.5rem]" />
        </button>

        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-[1rem] top-1/2 z-30 flex h-[2.6rem] w-[2.6rem] sm:h-[3.2rem] sm:w-[3.2rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <ChevronRight className="w-[1.2rem] h-[1.2rem] sm:w-[1.5rem] sm:h-[1.5rem]" />
        </button>

        {/* Minimal Pill Indicators */}
        <div className="absolute bottom-[1rem] left-1/2 z-30 flex -translate-x-1/2 items-center gap-[0.5rem] rounded-full border border-white/10 bg-black/40 px-[0.8rem] py-[0.4rem] shadow-lg backdrop-blur-md">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[0.35rem] rounded-full transition-all duration-300 ${
                index === current
                  ? "w-[1.6rem] bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                  : "w-[0.35rem] bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}