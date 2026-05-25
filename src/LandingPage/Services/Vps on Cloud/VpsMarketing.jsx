import {
  ArrowRight,
  BarChart3,
  Cloud,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Monitor,
  Server,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Zap,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const marketingFeatures = [
  {
    icon: ShoppingCart,
    title: 'E‑Commerce Optimized',
    description:
      'Built for modern online stores. Fast, secure, and stable — even during flash sales and high‑traffic events.',
    accent: 'indigo',
  },
  {
    icon: Globe,
    title: 'Host Multiple Domains',
    description:
      'One powerful VPS to host unlimited websites, run multiple apps, and allocate resources as needed.',
    accent: 'emerald',
  },
  {
    icon: Database,
    title: 'Database‑Ready Infrastructure',
    description:
      'Optimized for high I/O and fast query execution. Ideal for MySQL, PostgreSQL, ERP, CRM, and SaaS.',
    accent: 'amber',
  },
  {
    icon: Zap,
    title: 'Power‑Intensive Workloads',
    description:
      'Game servers, video rendering, big data, AI/ML — get the computing power you need without limits.',
    accent: 'purple',
  },
];

const productCards = [
  {
    icon: Server,
    title: 'Linux VPS',
    description:
      'Lightweight, affordable Linux VPS with LXC virtualization. Fast load times and efficient resource usage.',
    price: '₹500/month',
    href: '#linux-vps',
    color: 'indigo',
  },
  {
    icon: Monitor,
    title: 'Windows VPS',
    description:
      'Run Windows applications or remote desktops seamlessly. Stability, security, and scalability.',
    price: '₹1,500/month',
    href: '#windows-vps',
    color: 'emerald',
  },
  {
    icon: Cloud,
    title: 'Marg ERP on Cloud',
    description:
      'Run Marg ERP on our cloud VPS. Access invoices, GST, inventory, and collaborate anywhere.',
    price: '₹299/month',
    href: '#marg-erp',
    color: 'sky',
  },
  {
    icon: BarChart3,
    title: 'Tally on Cloud',
    description:
      'Host Tally accounting software for secure, anywhere‑access to accounts and data.',
    price: '₹299/month',
    href: '#tally-cloud',
    color: 'amber',
  },
  {
    icon: Server,
    title: 'Co‑Locations in India',
    description:
      'Place your hardware in our data centres with high‑speed connectivity, power, and security.',
    price: 'Custom Quote',
    href: '#co-location',
    color: 'rose',
  },
];

const reasons = [
  { icon: ShieldCheck, text: '99.95% uptime SLA' },
  { icon: Zap, text: 'SSD NVMe storage' },
  { icon: Users, text: '24/7 expert support' },
  { icon: HardDrive, text: 'Full root access' },
];

export default function VpsMarketing() {
  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#f4fbf8_48%,#fff7ed_100%)] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Outer card */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fbff] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-5 lg:p-6">
          {/* Header gradient card */}
          <div className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#e0e7ff_0%,#dff7ef_52%,#fff0d6_100%)] p-5 sm:p-7 lg:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700 shadow-sm">
              <Cloud size={15} />
              VPS Hosting
            </div>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-indigo-950 sm:text-4xl lg:text-5xl">
              Cloud VPS Hosting Built for Ambitious Businesses
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
              Not just another server. Our premium Cloud VPS hosting plans are packed with
              modern features, offering full control, easy customization, and consistently
              high performance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {reasons.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur-sm"
                >
                  <Icon size={14} className="text-indigo-700" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Marketing feature cards grid (4 cards) */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketingFeatures.map(({ icon: Icon, title, description, accent }, index) => {
              const accentColorMap = {
                indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                amber: 'bg-amber-50 text-amber-700 border-amber-100',
                purple: 'bg-purple-50 text-purple-700 border-purple-100',
              };
              const iconContainerClass =
                accentColorMap[accent] || accentColorMap.indigo;

              return (
                <article
                  key={title}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(15,23,42,0.16)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm transition group-hover:scale-105 ${iconContainerClass}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA banner (dark) */}
          <div className="mt-10 grid gap-4 rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_62%,#134e4a_100%)] p-5 text-white shadow-[0_24px_68px_rgba(15,23,42,0.22)] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, text: 'Secure' },
                  { icon: Zap, text: 'Fast' },
                  { icon: Users, text: 'Scalable' },
                  { icon: Globe, text: 'Global' },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100"
                  >
                    <Icon size={14} />
                    {text}
                  </span>
                ))}
              </div>
              <h3 className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">
                Don’t let slow hosting hold you back
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Upgrade to high‑performance VPS hosting built for demanding workloads, fast
                applications, and uninterrupted uptime.
              </p>
            </div>
            <a
              href="#vps-plans"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100 sm:w-auto"
            >
              View VPS Plans
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Product offerings cards */}
          <div className="mt-10">
            <h3 className="text-2xl font-extrabold text-indigo-950 sm:text-3xl">
              Explore high‑performance VPS hosting across India
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Fast, secure, and designed to scale with your business.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {productCards.map(({ icon: Icon, title, description, price, href, color }) => {
                const colorMap = {
                  indigo: 'border-indigo-200 bg-indigo-50/70',
                  emerald: 'border-emerald-200 bg-emerald-50/70',
                  sky: 'border-sky-200 bg-sky-50/70',
                  amber: 'border-amber-200 bg-amber-50/70',
                  rose: 'border-rose-200 bg-rose-50/70',
                };
                const cardBg = colorMap[color] || colorMap.indigo;

                return (
                  <article
                    key={title}
                    className={`group flex min-w-0 flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${cardBg}`}
                  >
                    <Icon size={24} className="text-slate-700" />
                    <h4 className="mt-3 text-lg font-extrabold text-slate-950">{title}</h4>
                    <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-700">
                      Starting at <span className="text-base">{price}</span>
                    </div>
                    <a
                      href={href}
                      className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-extrabold text-white transition hover:bg-slate-800"
                    >
                      Learn More
                      <ArrowRight size={14} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Featured use-cases summary banner (light) */}
          <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase text-indigo-700">
              Built for power‑intensive applications
            </p>
            <p className="mt-2 text-lg leading-7 text-slate-700">
              For tasks that demand serious computing power, you need more than standard
              hosting. Our high‑performance VPS handles game servers, video rendering, big
              data processing, AI & ML workloads — and grows with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}