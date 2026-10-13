import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/rohan mishra.jpg", "/punit.jpg", "/rahul.jpg"];

export default function SuccessBanner() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  }, []);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, isHovered]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (!images.length) return null;

  return (
    <section className="w-full px-1 sm:px-2 sm:py-3 md:py-3 select-none">
      {/* Heading */}
      <div className="mx-auto  max-w-6xl text-center">
  
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
          Success {" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
             Stories
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Discover how businesses around the world are scaling faster with
          Cloudedata's reliable hosting infrastructure and expert support.
        </p>

      </div>

      {/* Slider */}
      <div
        className="group relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl"
        role="region"
        aria-label="Success Stories Slider"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
<div className="relative flex items-center justify-center h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] xl:h-[45vh]"> 
           {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                index === current
                  ? "opacity-100 scale-100"
                  : "pointer-events-none opacity-0 scale-105"
              }`}
            >
              <img
                src={src}
                alt={`Success Story ${index + 1}`}
                className="h-auto max-h-full w-full object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Previous */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black group-hover:opacity-100 max-md:opacity-100"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black group-hover:opacity-100 max-md:opacity-100"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}