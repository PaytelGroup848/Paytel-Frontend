import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  Monitor,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const linuxCycles = [
  { key: 'monthly', label: 'Monthly', months: 1 },
  { key: 'yearly', label: 'Yearly', months: 12 },
  { key: 'twoYearly', label: '2 Years', months: 24 },
  { key: 'threeYearly', label: '3 Years', months: 36 },
];

const windowsCycles = [
  { key: 'monthly', label: 'Monthly', months: 1 },
  { key: 'quarterly', label: 'Quarterly', months: 3 },
  { key: 'annually', label: 'Annually', months: 12 },
];

const linuxPlans = [
  {
    name: 'Starter',
    vcpu: 2,
    ram: 4,
    storage: 60,
    os: 'Linux',
    prices: { monthly: 899, yearly: 8988, twoYearly: 14376, threeYearly: 19764 },
  },
  {
    name: 'Business',
    vcpu: 4,
    ram: 8,
    storage: 100,
    os: 'Linux',
    prices: { monthly: 1299, yearly: 12996, twoYearly: 19992, threeYearly: 32364 },
  },
  {
    name: 'Pro',
    vcpu: 6,
    ram: 16,
    storage: 200,
    os: 'Linux',
    prices: { monthly: 2999, yearly: 26388, twoYearly: 45600, threeYearly: 64764 },
    popular: true,
  },
  {
    name: 'Enterprise',
    vcpu: 8,
    ram: 32,
    storage: 300,
    os: 'Linux',
    prices: { monthly: 3999, yearly: 45588, twoYearly: 71976, threeYearly: 97164 },
  },
  {
    name: 'Ultra',
    vcpu: 12,
    ram: 64,
    storage: 500,
    os: 'Linux',
    prices: { monthly: 7999, yearly: 81588, twoYearly: 119976, threeYearly: 161964 },
  },
];

const windowsPlans = [
  {
    name: 'Windows-Small 1',
    vcpu: 2,
    ram: 4,
    storage: 40,
    os: 'Windows',
    prices: { monthly: 1500, quarterly: 4500, annually: 18000 },
  },
  {
    name: 'Windows-Small 2',
    vcpu: 3,
    ram: 6,
    storage: 60,
    os: 'Windows',
    prices: { monthly: 2000, quarterly: 6000, annually: 24000 },
  },
  {
    name: 'Windows-Medium 1',
    vcpu: 4,
    ram: 8,
    storage: 80,
    os: 'Windows',
    prices: { monthly: 4200, quarterly: 12600, annually: 50400 },
  },
  {
    name: 'Windows-Medium 2',
    vcpu: 4,
    ram: 12,
    storage: 100,
    os: 'Windows',
    prices: { monthly: 5600, quarterly: 16800, annually: 67200 },
  },
  {
    name: 'Windows-Large 1',
    vcpu: 8,
    ram: 16,
    storage: 120,
    os: 'Windows',
    prices: { monthly: 11500, quarterly: 34500, annually: 138000 },
    popular: true,
  },
  {
    name: 'Windows-Large 2',
    vcpu: 8,
    ram: 32,
    storage: 200,
    os: 'Windows',
    prices: { monthly: 13000, quarterly: 39000, annually: 156000 },
  },
];

const includedFeatures = [
  'Full root / admin access',
  'Dedicated IP included',
  'DDoS protection',
  '99.95% uptime SLA',
  '24/7 technical support',
  'Instant provisioning',
  'KVM virtualization',
  'Free SSL certificates',
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function VpsPlans() {
  const [activeTab, setActiveTab] = useState('linux'); // 'linux' | 'windows'
  const [linuxCycle, setLinuxCycle] = useState('yearly');
  const [windowsCycle, setWindowsCycle] = useState('annually');

  // Active data based on tab
  const isLinux = activeTab === 'linux';
  const plans = isLinux ? linuxPlans : windowsPlans;
  const cycles = isLinux ? linuxCycles : windowsCycles;
  const cycleKey = isLinux ? linuxCycle : windowsCycle;
  const setCycle = isLinux ? setLinuxCycle : setWindowsCycle;

  const selectedCycle = useMemo(
    () => cycles.find((c) => c.key === cycleKey) || cycles[0],
    [cycles, cycleKey]
  );

  // Predefined card accent tones (cycling)
  const cardTones = [
    'border-indigo-200 bg-indigo-50/70',
    'border-emerald-200 bg-emerald-50/70',
    'border-sky-200 bg-sky-50/70',
    'border-amber-200 bg-amber-50/70',
    'border-purple-200 bg-purple-50/70',
    'border-rose-200 bg-rose-50/70',
  ];

  return (
    <section
      id="vps-plans"
      className="w-full overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#f4fbf8_48%,#fff7ed_100%)] py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Outer card container */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fbff] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-5 lg:p-6">
          {/* Header gradient card */}
          <div className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#e0e7ff_0%,#dff7ef_52%,#fff0d6_100%)] p-4 sm:p-6 lg:p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700 shadow-sm">
                  <Cloud size={15} />
                  Cloud VPS Plans
                </div>
                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-indigo-950 sm:text-4xl lg:text-5xl">
                  Boost Your Performance with Our Powerful Cloud VPS
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                  Enjoy lightning‑fast performance with multi‑core CPUs, expandable RAM, and
                  SSD storage that keeps your apps running smoothly.
                </p>
              </div>

              {/* Tab selector + cycle toggle */}
              <div className="space-y-3">
                {/* OS Tabs */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-indigo-200 bg-[#eef4ff] p-2">
                  {[
                    { key: 'linux', label: 'Linux VPS', icon: Server },
                    { key: 'windows', label: 'Windows VPS', icon: Monitor },
                  ].map(({ key, label, icon: Icon }) => {
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-transparent text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                        }`}
                      >
                        <Icon size={16} />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Billing cycle toggles */}
                <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-4">
                  {cycles.map((cycle) => {
                    const isActive = cycleKey === cycle.key;
                    return (
                      <button
                        key={cycle.key}
                        onClick={() => setCycle(cycle.key)}
                        className={`rounded-lg px-1.5 py-2 text-xs font-bold transition ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-white/80 text-slate-600 hover:bg-white hover:text-indigo-700 border border-slate-200'
                        }`}
                      >
                        {cycle.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Plans grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plans.map((plan, index) => {
              const totalPrice = plan.prices[cycleKey];
              const monthlyEquivalent =
                selectedCycle.months > 1
                  ? Math.round(totalPrice / selectedCycle.months)
                  : totalPrice;

              return (
                <article
                  key={plan.name}
                  className={`group relative flex min-w-0 flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-indigo-500 bg-indigo-100/80 ring-2 ring-indigo-200 shadow-lg'
                      : cardTones[index % cardTones.length]
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold uppercase text-white shadow">
                    
                      Popular
                    </div>
                  )}

                  {/* OS icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-100 text-indigo-700 shadow-sm transition group-hover:scale-105">
                    {plan.os === 'Windows' ? (
                      <Monitor size={22} />
                    ) : (
                      <Server size={22} />
                    )}
                  </div>

                  {/* Plan name */}
                  <h3 className="mt-4 text-xl font-extrabold text-slate-950">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {plan.os === 'Windows' ? 'Windows Server' : 'Linux'} VPS
                  </p>

                  {/* Price block */}
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner">
                    {selectedCycle.months > 1 ? (
                      <>
                        <p className="text-xs font-bold uppercase text-slate-500">
                          Effective monthly
                        </p>
                        <div className="mt-1 flex flex-wrap items-end gap-1">
                          <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                            {formatPrice(monthlyEquivalent)}
                          </span>
                          <span className="pb-1 text-sm font-semibold text-slate-500">/mo</span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {formatPrice(totalPrice)} billed {selectedCycle.label.toLowerCase()}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-bold uppercase text-slate-500">Monthly price</p>
                        <div className="mt-1 flex flex-wrap items-end gap-1">
                          <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                            {formatPrice(totalPrice)}
                          </span>
                          <span className="pb-1 text-sm font-semibold text-slate-500">/mo</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Specs mini cards */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-center">
                      <Cpu size={16} className="mx-auto text-indigo-700" />
                      <p className="mt-1 text-xs font-bold text-slate-500">vCPU</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.vcpu}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                      <HardDrive size={16} className="mx-auto text-emerald-700" />
                      <p className="mt-1 text-xs font-bold text-slate-500">RAM</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.ram} GB</p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
                      <Database size={16} className="mx-auto text-amber-700" />
                      <p className="mt-1 text-xs font-bold text-slate-500">Storage</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.storage} GB</p>
                    </div>
                  </div>

                  {/* Additional feature bullets */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
                      <span>DDoS Protection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Users size={16} className="shrink-0 text-indigo-600" />
                      <span>1 Dedicated IP</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Monitor size={16} className="shrink-0 text-slate-600" />
                      <span>Full Root Access</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold transition-all ${
                      plan.popular
                        ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg'
                        : 'bg-teal-700 text-white shadow hover:bg-teal-800 hover:shadow-md'
                    }`}
                  >
                    Buy Now
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>

          {/* Included features bottom section */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-[#f8fbff] p-5 sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold text-indigo-950">All plans include</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Every Cloud VPS comes with enterprise‑grade features to keep your applications
                secure, fast, and always online.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {includedFeatures.map((feature) => (
                <div key={feature} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tax / disclaimer note */}
          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
            Prices shown are before applicable taxes. The final amount will be calculated at
            checkout based on your billing cycle and may vary slightly due to rounding.
          </p>
        </div>
      </div>
    </section>
  );
}