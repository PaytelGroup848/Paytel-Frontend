import {
  CheckCircle2,
  Clock,
  MapPin,
  Activity,
  ArrowRight,
} from "lucide-react";

const vpsStats = [
  { value: "99.99%", label: "Uptime SLA", icon: Clock },
  { value: "40+", label: "Data Centers", icon: MapPin },
  { value: "10 Gbps", label: "Network", icon: Activity },
];

export default function BannerHero() {
  return (
    <>
      {/* Make sure DM Sans is loaded globally (add this to your _document.js or head) */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="relative min-w-0 text-slate-800 antialiased"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Accent line – a bit wider for presence */}
        <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />

        {/* Headline – bold & commanding */}
        <h1 className="max-w-7xl text-[clamp(2rem,5.5vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.03em] text-slate-900">
          Deploy VPS
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            in seconds.
          </span>
        </h1>

        {/* Sub‑copy – clear, readable, slightly larger */}
        <p className="mt-5 max-w-md text-[clamp(0.95rem,1.4vw,1.15rem)] font-normal leading-7 text-slate-600">
          Dedicated virtual servers with root access and global reach — built
          for web apps, SaaS, and enterprise workloads.
        </p>

        {/* Pricing strip – clean CTA */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-blue-50/60 p-5 shadow-sm max-w-lg">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Starting at
            </p>
            <p className="mt-1 text-[clamp(1.7rem,3vw,2.2rem)] font-bold tracking-[-0.03em] text-slate-900 leading-none">
              ₹699
              <span className="text-[14px] font-normal text-slate-400 tracking-normal ml-1">
                /mo
              </span>
            </p>
            <p className="mt-1.5 text-[12px] text-slate-500">
              2 vCPU · 4 GB RAM · 80 GB NVMe · 4 TB transfer
            </p>
          </div>
          <a
            href="/vps/configure/linux/6a01bdf24c30f29430edbef7"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3.5 text-[14px] font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-px hover:shadow-lg"
          >
            Buy Now
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Stats – crisp cards */}
        <div className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-md">
          <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {vpsStats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 px-6 py-5 text-center"
              >
                <Icon size={18} className="text-indigo-500" />
                <p className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-tight text-slate-900">
                  {value}
                </p>
                <p className="text-[12px] font-semibold uppercase tracking-widest text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
