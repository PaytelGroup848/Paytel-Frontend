import React from "react";

const row1Images = [
  "/web/Screenshot_26.png",
  "/web/Screenshot_18.png",
  "/web/Screenshot_27.png",
  "/web/Screenshot_32.png",
  "/web/Screenshot_20.png",
  "/web/Screenshot_42.png",
  "/web/Screenshot_41.png",
  "/web/Screenshot_40.png",
  "/web/Screenshot_39.png",
];

const row2Images = [
  "/web/Screenshot_38.png",
  "/web/Screenshot_37.png",
  "/web/Screenshot_36.png",
  "/web/Screenshot_35.png",
  "/web/Screenshot_34.png",
  "/web/Screenshot_33.png",
  "/web/Screenshot_32.png",
  "/web/Screenshot_31.png",
];

// Repeating images to ensure a smooth infinite loop
const r1 = [...row1Images, ...row1Images, ...row1Images];
const r2 = [...row2Images, ...row2Images, ...row2Images];

const marqueeKeyframes = `
@keyframes marquee-rtl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(calc(-1 * (var(--card-w) + var(--gap)) * var(--item-count))); }
}

@keyframes marquee-ltr {
  0%   { transform: translateX(calc(-1 * (var(--card-w) + var(--gap)) * var(--item-count))); }
  100% { transform: translateX(0); }
}

/* Pause animation on hover for better user experience */
.pause-on-hover:hover > div {
  animation-play-state: paused !important;
}
`;

function MarqueeRow({ images, direction = "rtl", zIndex = 10, speed = 40 }) {
  const animName = direction === "rtl" ? "marquee-rtl" : "marquee-ltr";

  return (
    <div className="relative w-full overflow-hidden pause-on-hover py-4" style={{ zIndex }}>
      <div
        className="flex items-center"
        style={{
          gap: "var(--gap)",
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="group relative shrink-0 overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white shadow-lg ring-1 ring-slate-900/5 transition-all duration-500 ease-out hover:z-50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 hover:ring-indigo-500/40"
            style={{
              width: "var(--card-w)",
              height: "var(--card-h)",
            }}
          >
            {/* Subtle overlay gradient on hover for a premium look */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <img
              src={src}
              alt={`Website showcase ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeGallery() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-32"
      style={{
        // Upgraded width and height for larger cards
        "--card-w": "clamp(260px, 60vw, 440px)",
        "--card-h": "clamp(160px, 40vw, 280px)",
        // Increased gap between individual cards
        "--gap": "clamp(16px, 4vw, 32px)",
        "--item-count": row1Images.length,
        // Premium radial gradient background
        background: "radial-gradient(ellipse at top, #ffffff 0%, #f1f5f9 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      }}
    >
      <style>{marqueeKeyframes}</style>

      <div className="mb-8 px-4 text-center sm:mb-18 relative z-20">

        <h2 className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Trusted by creators{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            worldwide
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-base font-medium text-slate-500 sm:text-lg">
          Real sites built, launched, and thriving on our platform every single day.
        </p>
      </div>

      {/* Increased the gap between the two rows here (gap-6 sm:gap-10) */}
      <div className="flex flex-col gap-6 sm:gap-10">
        <MarqueeRow
          images={r1}
          direction="rtl"
          zIndex={20}
          speed={45} // Slightly slower so larger cards are easier to look at
        />

        <MarqueeRow
          images={r2}
          direction="ltr"
          zIndex={10}
          speed={50}
        />
      </div>

    </section>
  );
}