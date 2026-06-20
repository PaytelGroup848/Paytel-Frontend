import { CheckCircle2, Cloud, Cpu, HardDrive, Globe, Clock, MapPin, Activity, ArrowRight, Sparkles } from "lucide-react";

const benefits = [
  "Full root access – install any OS/software",
  "NVMe SSD storage – up to 3 GB/s throughput",
  "99.99% uptime SLA with automatic failover",
  "Free DDoS protection & SSL certificates",
];

const vpsStats = [
  { value: "99.99%", label: "Uptime SLA", icon: Clock },
  { value: "40+", label: "Data Centers", icon: MapPin },
  { value: "10 Gbps", label: "Network Speed", icon: Activity },
];

export default function BannerHero() {
  return (
    <div
      className="relative min-w-0 text-slate-800 font-sans antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* Improved background – animated gradient mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60" />
        <div className="absolute top-10 -left-20 w-72 h-65 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-3 sm:p-4 lg:p-5">
        {/* Responsive Headline */}
        <h1 className="max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900">
          Deploy VPS in seconds.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
            Scale in minutes.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-[clamp(0.9rem,1.5vw,1.15rem)] font-normal leading-relaxed tracking-normal text-slate-600">
          Get dedicated virtual servers with root access, high‑speed NVMe SSDs,
          and global data centers. Perfect for web apps, game servers, SaaS,
          and enterprise workloads.
        </p>

        {/* Benefits */}
        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {benefits.map((item) => (
            <div
              key={item}
              className="flex min-w-0 items-center gap-2 text-[clamp(0.82rem,1.3vw,0.95rem)] font-medium tracking-normal text-slate-700"
            >
              <CheckCircle2 size={17} className="shrink-0 text-indigo-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
          {vpsStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-1">
                <Icon size={20} className="text-indigo-500" />
              </div>
              <p className="text-[clamp(1.4rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-slate-800">
                {value}
              </p>
              <p className="text-[clamp(0.65rem,1.1vw,0.75rem)] font-medium text-slate-500 mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing card */}
        <div className="mt-8 max-w-md">
          <div className="rounded-2xl border border-indigo-200 bg-white/80 backdrop-blur p-5 shadow-lg shadow-indigo-100/60 ring-1 ring-slate-900/5 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium text-slate-500">
                  Starting at
                </p>
                <p className="mt-1 text-[clamp(1.5rem,3vw,1.875rem)] font-bold tracking-[-0.02em] text-slate-900">
                  ₹899
                  <span className="text-[clamp(0.8rem,1.3vw,1rem)] font-normal text-slate-500">
                    /mo
                  </span>
                </p>
              </div>
              <a
                href="/pricing"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-[clamp(0.8rem,1.2vw,0.875rem)] font-semibold tracking-normal text-white shadow-md shadow-indigo-200/50 transition hover:from-indigo-700 hover:to-blue-700"
              >
                View Plans
                <ArrowRight size={16} />
              </a>
            </div>
            <p className="mt-2 text-[clamp(0.7rem,1.1vw,0.75rem)] font-normal text-slate-500">
              Includes 2 vCPU, 4 GB RAM, 80 GB NVMe SSD, 4 TB transfer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}