import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/storie1.webp", "/rahul.jpg" ,"/punit.png","/rahul copy.png"];

export default function SuccessBanner() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (images.length <= 1) {
    return (
      <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <img
            src={images[0]}
            alt="Success story"
            className="block w-full h-auto object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div
        className="group relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/80"
        role="region"
        aria-label="Success Stories Slider"
        tabIndex={0}
      >
        <div className="relative w-full bg-slate-50">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/6.5]">
            {images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Success story ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-contain p-2 sm:p-3 transition-opacity duration-700 ease-in-out ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/18 to-transparent" />
        </div>

        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-800 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-800 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 shadow-md backdrop-blur-md">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? "w-6 bg-indigo-600"
                  : "w-2 bg-slate-400/70 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}