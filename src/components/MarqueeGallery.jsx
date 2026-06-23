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

const CARD_W = 340;
const CARD_H = 220;
const GAP    = 20;
const SPEED  = 38;

const marqueeKeyframes = `
@keyframes marquee-rtl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(calc(-${CARD_W + GAP}px * ${row1Images.length})); }
}
@keyframes marquee-ltr {
  0%   { transform: translateX(calc(-${CARD_W + GAP}px * ${row2Images.length})); }
  100% { transform: translateX(0); }
}
`;

function MarqueeRow({ images, direction = "rtl", zIndex = 10 }) {
  const animName = direction === "rtl" ? "marquee-rtl" : "marquee-ltr";

  return (
    <div className="relative w-full overflow-hidden" style={{ zIndex }}>
      <div
        className="flex"
        style={{
          gap: `${GAP}px`,
          width: "max-content",
          animation: `${animName} ${SPEED}s linear infinite`,
          willChange: "transform",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="group shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:ring-indigo-200 hover:scale-[1.02]"
            style={{ width: CARD_W, height: CARD_H }}
          >
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
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
      className="w-full overflow-hidden py-16 sm:py-24"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)",
        fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif",
      }}
    >
      <style>{marqueeKeyframes}</style>

      {/* ── Heading ── */}
      <div className="text-center mb-12 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] font-bold text-indigo-600 uppercase tracking-[0.13em] mb-4">
          ✦ Live Showcase
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Trusted by creators{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
            worldwide
          </span>
        </h2>
        <p className="mt-3 text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
          Real sites built and running on our platform every day.
        </p>
      </div>

      {/* ── Rows wrapper — gap between rows ── */}
      <div className="flex flex-col gap-5">
        {/* Row 1 — right to left, sits on top */}
        <MarqueeRow images={r1} direction="rtl" zIndex={20} />

        {/* Row 2 — left to right, sits below */}
        <MarqueeRow images={r2} direction="ltr" zIndex={10} />
      </div>

      {/* ── Edge fade masks ── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }}
      />
    </section>
  );
}