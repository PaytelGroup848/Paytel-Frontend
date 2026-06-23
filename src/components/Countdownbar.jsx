import { useState, useEffect } from "react";
import { Zap, Tag, Gift } from "lucide-react";

function useCountdown(hours = 12) {
  const [timeLeft, setTimeLeft] = useState(() => hours * 3600 * 1000);

  useEffect(() => {
    const end = Date.now() + hours * 3600 * 1000;
    const timer = setInterval(() => {
      const remaining = end - Date.now();
      if (remaining <= 0) setTimeLeft(hours * 3600 * 1000);
      else setTimeLeft(remaining);
    }, 200);
    return () => clearInterval(timer);
  }, [hours]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return {
    hours:   String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-white/15 backdrop-blur-sm rounded-md px-2 py-0.5 font-mono text-xs sm:text-sm font-bold tabular-nums leading-tight">
        {value}
      </span>
      <span className="text-[8px] text-white/50 mt-0.5 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

export default function CountdownBar() {
  const { hours, minutes, seconds } = useCountdown(12);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 45%, #9333ea 100%)",
        fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif",
      }}
    >
      {/* Shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3.5s linear infinite",
        }}
      />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="relative max-w-screen-2xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between gap-2 text-white">

        {/* LEFT — offer pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
          <div className="flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-0.5">
            <Zap size={11} className="text-yellow-300 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wide whitespace-nowrap">
              Flash Sale
            </span>
          </div>

          <span className="hidden sm:block h-3 w-px bg-white/20" />

          <span className="text-[11px] sm:text-xs font-semibold text-white/90 whitespace-nowrap hidden xs:block">
            Up to{" "}
            <span className="text-yellow-300 font-extrabold">60% off</span>{" "}
            on all hosting plans
          </span>

          <div className="hidden sm:flex items-center gap-1 bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
            <Gift size={10} className="text-emerald-300 shrink-0" />
            <span className="text-[11px] font-semibold text-white/90 whitespace-nowrap">
              Free Domain
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
            <Tag size={10} className="text-pink-300 shrink-0" />
            <span className="text-[11px] font-semibold text-white/90 whitespace-nowrap">
              Use code{" "}
              <span className="font-extrabold text-pink-200 tracking-wider">CLOUD61</span>
            </span>
          </div>
        </div>

        {/* RIGHT — countdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] sm:text-[11px] text-white/60 font-medium hidden sm:block">
            Ends in
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <TimeBox value={hours}   label="hrs" />
            <span className="text-white/50 font-bold text-xs mb-3">:</span>
            <TimeBox value={minutes} label="min" />
            <span className="text-white/50 font-bold text-xs mb-3">:</span>
            <TimeBox value={seconds} label="sec" />
          </div>
        </div>

      </div>
    </div>
  );
}