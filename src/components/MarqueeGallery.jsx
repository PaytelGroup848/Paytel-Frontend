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

const r1 = [...row1Images, ...row1Images, ...row1Images];
const r2 = [...row2Images, ...row2Images, ...row2Images];

const SPEED = 38;

const marqueeKeyframes = `
@keyframes marquee-rtl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(calc(-1 * (var(--card-w) + var(--gap)) * var(--item-count))); }
}

@keyframes marquee-ltr {
  0%   { transform: translateX(calc(-1 * (var(--card-w) + var(--gap)) * var(--item-count))); }
  100% { transform: translateX(0); }
}
`;

function MarqueeRow({ images, itemCount, direction = "rtl", zIndex = 10, speed = SPEED }) {
  const animName = direction === "rtl" ? "marquee-rtl" : "marquee-ltr";

  return (
    <div className="relative w-full overflow-hidden" style={{ zIndex }}>
      <div
        className="flex"
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
            className="group shrink-0 overflow-hidden rounded-xl sm:rounded-2xl shadow-md ring-1 ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:ring-indigo-200 hover:scale-[1.02]"
            style={{
              width: "var(--card-w)",
              height: "var(--card-h)",
            }}
          >
            <img
              src={src}
              alt={`Website showcase ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      className="relative w-full overflow-hidden py-10 sm:py-16 lg:py-24"
      style={{
        "--card-w": "clamp(210px, 72vw, 340px)",
        "--card-h": "clamp(136px, 46vw, 220px)",
        "--gap": "clamp(12px, 3vw, 20px)",
        "--item-count": row1Images.length,
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)",
        fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif",
      }}
    >
      <style>{marqueeKeyframes}</style>

      <div className="mb-8 px-4 text-center sm:mb-12">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-indigo-600 sm:mb-4 sm:px-4 sm:text-[11px]">
          Live Showcase
        </span>

        <h2 className="mx-auto max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Trusted by creators{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            worldwide
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm font-normal text-slate-500 sm:text-base">
          Real sites built and running on our platform every day.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-5">
        <MarqueeRow
          images={r1}
          itemCount={row1Images.length}
          direction="rtl"
          zIndex={20}
          speed={38}
        />

        <MarqueeRow
          images={r2}
          itemCount={row2Images.length}
          direction="ltr"
          zIndex={10}
          speed={42}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 lg:w-40"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 lg:w-40"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }}
      />
    </section>
  );
}