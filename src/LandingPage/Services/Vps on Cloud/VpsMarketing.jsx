import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Cloud,
  Database,
  Globe,
  HardDrive,
  Monitor,
  Server,
  ShieldCheck,
  ShoppingCart,
  Users,
  Zap,
  Star,
} from 'lucide-react';

// ----- Sample review data (realistic avatars added) -----
const reviews = [
  {
    name: 'Amit Sharma',
    rating: 5,
    text: 'Switched to their VPS and saw 2x faster load times. Support is incredibly responsive.',
    avatarUrl: 'https://i.pravatar.cc/40?img=1',
  },
  {
    name: 'Priya Patel',
    rating: 5,
    text: 'Best hosting provider for our e‑commerce store. Zero downtime during Diwali sale!',
    avatarUrl: 'https://i.pravatar.cc/40?img=5',
  },
  {
    name: 'Rajesh Kumar',
    rating: 5,
    text: 'Migrated 12 websites without a hitch. The performance difference is night and day.',
    avatarUrl: 'https://i.pravatar.cc/40?img=3',
  },
  {
    name: 'Sneha Reddy',
    rating: 5,
    text: 'Their VPS handled our AI model training flawlessly. Genuinely impressed.',
    avatarUrl: 'https://i.pravatar.cc/40?img=4',
  },
  {
    name: 'Vikram Singh',
    rating: 5,
    text: 'Superb uptime and speed. Our customers noticed the improvement immediately.',
    avatarUrl: 'https://i.pravatar.cc/40?img=2',
  },
];

const marketingFeatures = [
  {
    icon: ShoppingCart,
    title: 'E‑Commerce Optimized',
    description: 'Built for modern online stores. Fast, secure, and stable — even during flash sales and high‑traffic events.',
    accent: 'indigo',
  },
  {
    icon: Globe,
    title: 'Host Multiple Domains',
    description: 'One powerful VPS to host unlimited websites, run multiple apps, and allocate resources as needed.',
    accent: 'emerald',
  },
  {
    icon: Database,
    title: 'Database‑Ready Infrastructure',
    description: 'Optimized for high I/O and fast query execution. Ideal for MySQL, PostgreSQL, ERP, CRM, and SaaS.',
    accent: 'amber',
  },
  {
    icon: Zap,
    title: 'Power‑Intensive Workloads',
    description: 'Game servers, video rendering, big data, AI/ML — get the computing power you need without limits.',
    accent: 'purple',
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
      {/* Container now 90vw wide */}
      <div className="mx-auto w-[95vw] max-w-none px-0">
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

          {/* Marketing feature cards grid */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketingFeatures.map(({ icon: Icon, title, description, accent }) => {
              const accentColorMap = {
                indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                amber: 'bg-amber-50 text-amber-700 border-amber-100',
                purple: 'bg-purple-50 text-purple-700 border-purple-100',
              };
              return (
                <article
                  key={title}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(15,23,42,0.16)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm transition group-hover:scale-105 ${accentColorMap[accent] || accentColorMap.indigo}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              );
            })}
          </div>

          {/* Dark CTA banner */}
          <div className="mt-10 grid gap-4 rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_62%,#134e4a_100%)] p-5 text-white shadow-[0_24px_68px_rgba(15,23,42,0.22)] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, text: 'Secure' },
                  { icon: Zap, text: 'Fast' },
                  { icon: Users, text: 'Scalable' },
                  { icon: Globe, text: 'Global' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100">
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

          {/* ---------- TRUSTED REVIEWS SECTION (REALISTIC & WIDER) ---------- */}
          <div className="mt-10 -mx-3 sm:-mx-5 lg:-mx-6">
            {/* Large heading with "1M+ users" */}
            <div className="px-3 sm:px-5 lg:px-6 mb-8 text-center">
              <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Trusted by 1M+ Users
              </h3>
              <p className="mt-2 text-lg text-slate-500">
                Recommended by industry leaders and loved by businesses worldwide.
              </p>
            </div>

            {/* Auto-scrolling review carousel */}
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex w-max gap-4 py-2"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 25,
                  ease: 'linear',
                }}
              >
                {[...reviews, ...reviews].map((review, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-72 sm:w-80 lg:w-96 rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:shadow-lg"
                  >
                    {/* Star rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-slate-600 leading-6">
                      “{review.text}”
                    </p>

                    {/* Real avatar + name + Google badge */}
                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={review.avatarUrl}
                        alt={review.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-sm font-semibold text-slate-800 block">
                          {review.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">
                            G
                          </span>
                          Reviewed on Google
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Featured use-cases summary banner */}
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