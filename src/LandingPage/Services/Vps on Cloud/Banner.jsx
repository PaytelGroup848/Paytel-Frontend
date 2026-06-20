import { useState, useEffect } from "react";
import BannerHero from "./BannerHero";
import BannerCard from "./BannerCard";
import BannerMobile from "./BannerMobile";

/**
 * 12‑hour countdown that restarts automatically.
 */
function useCountdown(hours = 12) {
  const [timeLeft, setTimeLeft] = useState(() => hours * 3600 * 1000);

  useEffect(() => {
    const start = Date.now();
    const end = start + hours * 3600 * 1000;

    const timer = setInterval(() => {
      const remaining = end - Date.now();
      if (remaining <= 0) {
        setTimeLeft(hours * 3600 * 1000);
      } else {
        setTimeLeft(remaining);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [hours]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return {
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
    isExpired: totalSeconds <= 0,
  };
}

export default function Banner() {
  const { hours, minutes, seconds } = useCountdown(12);

  return (
    <>
      {/* ── Purple Countdown Bar (single line, after navbar) ── */}
      <div className=" mt-5  relative z-10 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 shadow-md mt-14 sm:mt-16">
        <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center gap-3 whitespace-nowrap text-white">
          {/* "Limited Offer" label */}
          <span className="mt-5 text-[13px] sm:text-sm md:text-base font-semibold tracking-wide">
             Limited Offer
          </span>

          {/* Countdown digits */}
          <div className=" mt-5 flex items-center gap-1.5 sm:gap-2 font-mono text-[13px] sm:text-sm md:text-base font-bold tabular-nums">
            <span className="bg-white/15 backdrop-blur-sm rounded-md px-2 py-0.5">{hours}</span>
            <span className="text-white/70">:</span>
            <span className="bg-white/15 backdrop-blur-sm rounded-md px-2 py-0.5">{minutes}</span>
            <span className="text-white/70">:</span>
            <span className="bg-white/15 backdrop-blur-sm rounded-md px-2 py-0.5">{seconds}</span>
          </div>

          {/* Optional subtle text (hidden on tiny screens to keep single line) */}
          <span className="hidden xs:inline text-[11px] sm:text-xs text-white/80 ml-1">
            remaining
          </span>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="block sm:hidden">
        <BannerMobile />
      </div>

      {/* ── TABLET / DESKTOP ── */}
      <section
        className="relative hidden w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans antialiased sm:block"
        style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {/* decorative bg (unchanged) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-16 h-96 w-96 rounded-full bg-indigo-300/25 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-300/25 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-[80px]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

        {/* content grid – reduced top padding for tighter connection to countdown bar */}
        <div
          className={[
            "relative mx-auto w-full max-w-screen-2xl px-4",
            "py-4 sm:py-8 lg:py-12",           // lowered padding
            "grid grid-cols-1 gap-10",
            "sm:grid-cols-2 sm:items-start sm:gap-8",
            "lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:items-start",
          ].join(" ")}
        >
          <BannerHero />
          <div className="lg:sticky lg:top-6 lg:self-start min-w-0 lg:justify-self-end w-full">
            <BannerCard />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </section>
    </>
  );
}