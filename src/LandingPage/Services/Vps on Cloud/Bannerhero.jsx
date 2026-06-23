import { CheckCircle2, Clock, MapPin, Activity, ArrowRight } from "lucide-react";

const vpsStats = [
  { value: "99.99%", label: "Uptime SLA", icon: Clock },
  { value: "40+", label: "Data Centers", icon: MapPin },
  { value: "10 Gbps", label: "Network", icon: Activity },
];

export default function BannerHero() {
  return (
    <div className="relative min-w-0 text-slate-800 antialiased">
      {/* Subtle gradient accent */}
      <div className="mb-6 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-400" />

      {/* Headline */}
      <h1
        className="max-w-5xl text-[clamp(1.9rem,5.5vw,3.6rem)] font-normal leading-[1.06] tracking-[-0.03em] text-slate-900"
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        Deploy VPS
        <br />
        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          in seconds.
        </span>
      </h1>

      {/* Sub‑copy */}
      <p
        className="mt-4 max-w-md text-[clamp(0.85rem,1.4vw,1.05rem)] font-normal leading-7 text-slate-500"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Dedicated virtual servers with root access and global reach — built for web
        apps, SaaS, and enterprise workloads.
      </p>

      {/* Stats row */}
      <div className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {vpsStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-6 py-4 text-center">
              <Icon size={16} className="text-indigo-400" />
              <p
                className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal tracking-tight text-slate-900"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                {value}
              </p>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest text-slate-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing strip */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-blue-50/60 p-5 shadow-sm max-w-lg">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Starting at
          </p>
          <p className="mt-1 text-[clamp(1.6rem,3vw,2.1rem)] font-bold tracking-[-0.03em] text-slate-900 leading-none">
            ₹899
            <span className="text-[14px] font-normal text-slate-400 tracking-normal ml-1">
              /mo
            </span>
          </p>
          <p className="mt-1.5 text-[11.5px] text-slate-500">
            2 vCPU · 4 GB RAM · 80 GB NVMe · 4 TB transfer
          </p>
        </div>
        <a
          href="/pricing"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-[13px] font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-px hover:shadow-lg"
        >
          View Plans
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}