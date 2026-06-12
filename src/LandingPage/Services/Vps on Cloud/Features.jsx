import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Globe,
  Headphones,
  LockKeyhole,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const coreFeatures = [
  {
    icon: Cpu,
    title: 'High-Performance Compute',
    description:
      'Latest Intel & AMD multi-core processors, high-speed DDR4 memory, and enterprise NVMe/SSD storage for demanding workloads.',
    accent: 'indigo',
    points: ['10 Gbps network connectivity', 'Ultra-fast data transfer', 'Optimized for ERP/SaaS'],
  },
  {
    icon: LockKeyhole,
    title: 'Full Control & Security',
    description:
      'Complete root/administrator access, SSH & RDP, custom software installation, and API integrations—no restrictions.',
    accent: 'emerald',
    points: ['Dedicated IPv4 & IPv6', 'Anti-DDoS attack mitigation', 'High-bandwidth routing'],
  },
  {
    icon: Monitor,
    title: 'Deploy Any OS in Minutes',
    description:
      'Choose from Ubuntu, AlmaLinux, CentOS, Windows Server 2019/2022/2025, or bring your own custom ISO.',
    accent: 'amber',
    points: ['VNC GUI console access', 'One-click OS templates', 'Full virtualization support'],
  },
  {
    icon: ShieldCheck,
    title: 'KVM Virtualization',
    description:
      'True isolation with dedicated kernel per VPS, independent OS environment, and guaranteed resource allocation.',
    accent: 'purple',
    points: ['Dedicated kernel', 'Improved stability', 'No noisy neighbors'],
  },
  {
    icon: Globe,
    title: 'Advanced Network & Dedicated IP',
    description:
      'Dedicated IPv4 & IPv6 addresses with stable routing infrastructure and optimized global performance.',
    accent: 'rose',
    points: ['High-bandwidth connectivity', 'Low-latency routing', 'Global CDN ready'],
  },
  {
    icon: Zap,
    title: '99.95% Uptime with 24/7 Monitoring',
    description:
      'Proactive monitoring, automated alerts, and infrastructure redundancy backed by an SLA guarantee.',
    accent: 'cyan',
    points: ['Automated failover', 'Infrastructure redundancy', '24/7 expert support'],
  },
];

const quickBenefits = [
  'Full root/administrator access',
  'SSH & Remote Desktop access',
  'Custom ISO installation',
  'API integrations',
  'VNC GUI console',
  'Dedicated resources',
];

const statsRow = [
  { value: '10 Gbps', label: 'Network Speed', icon: Network },
  { value: 'Anti-DDoS', label: 'Attack Mitigation', icon: ShieldCheck },
  { value: '99.95%', label: 'Uptime SLA', icon: BarChart3 },
];

export default function Features() {
  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#f0f4ff_0%,#eef7f2_45%,#f9f6f0_100%)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200/90 bg-white/80 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.13)] backdrop-blur sm:p-6 lg:p-8">
          {/* Header block */}
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700 shadow-sm">
                <Server size={15} />
                VPS Cloud Features
              </div>

              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Power Your Digital Growth with Enterprise-Grade Cloud VPS Hosting
              </h2>
            </div>

            <div className="min-w-0">
              <p className="text-base leading-7 text-slate-600 sm:text-lg">
                Our next‑generation Cloud VPS platform is built for modern businesses that
                demand performance, flexibility, and total control. Scale on‑demand from a
                single server to a multi‑region cluster.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {quickBenefits.map((item) => (
                  <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/30 p-5 shadow-inner">
            {statsRow.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="mb-1 flex justify-center">
                  <Icon size={20} className="text-indigo-600" />
                </div>
                <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Main feature cards grid */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map(({ icon: Icon, title, description, points, accent }, index) => {
              const accentColorMap = {
                indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                amber: 'bg-amber-50 text-amber-700 border-amber-100',
                purple: 'bg-purple-50 text-purple-700 border-purple-100',
                rose: 'bg-rose-50 text-rose-700 border-rose-100',
                cyan: 'bg-cyan-50 text-cyan-700 border-cyan-100',
              };

              const iconContainerClass =
                accentColorMap[accent] ||
                accentColorMap['indigo']; // fallback

              return (
                <article
                  key={title}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_26px_60px_rgba(15,23,42,0.16)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm transition group-hover:scale-105 ${iconContainerClass}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-500 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}