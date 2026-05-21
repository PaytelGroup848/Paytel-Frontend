
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const billingOptions = [
  { key: 'halfYearly', label: 'Half Yearly', months: 6, badge: 'Flexible billing' },
  { key: 'yearly', label: 'Yearly', months: 12, badge: 'Best value' },
];

const plans = [
  { processor: '2 Core', ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
  { processor: '4 Core', ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
  { processor: '6 Core', ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
  { processor: '8 Core', ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500, popular: true },
  { processor: '10 Core', ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
  { processor: '12 Core', ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
  { processor: '16 Core', ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
];

const includedFeatures = [
  'Marg-ready cloud server',
  'Secure remote access',
  'Multi-user performance',
  'Backup planning support',
  'Server resource guidance',
  'Setup and migration assistance',
];

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export default function MargPlans() {
  const [billingCycle, setBillingCycle] = useState('yearly');

  const selectedBilling = useMemo(() => {
    return billingOptions.find((option) => option.key === billingCycle) || billingOptions[1];
  }, [billingCycle]);

  return (
    <section
      id="plans"
      className="w-full overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#f4fbf8_48%,#fff7ed_100%)] py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fbff] p-3 sm:p-5 lg:p-6">
          <div className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#e0e7ff_0%,#dff7ef_52%,#fff0d6_100%)] p-4 sm:p-6 lg:p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700">
                  <Cloud size={15} />
                  Marg Cloud Plans
                </div>

                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-indigo-950 sm:text-4xl lg:text-5xl">
                  Power your business growth with the right Marg cloud plan
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
                  Get a cloud configuration designed for billing, inventory, reports and
                  multi-user Marg ERP operations without unnecessary barriers.
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-[#eef4ff] p-3">
                <div className="grid grid-cols-2 gap-2">
                  {billingOptions.map((option) => {
                    const isActive = billingCycle === option.key;

                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setBillingCycle(option.key)}
                        className={`min-h-14 rounded-xl border px-3 text-left transition ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-indigo-200 bg-[#f8fbff] text-slate-700 hover:bg-indigo-50'
                        }`}
                      >
                        <span className="block text-sm font-extrabold">{option.label}</span>
                        <span className={`mt-0.5 block text-xs ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {option.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plans.map((plan, index) => {
              const totalPrice = plan[billingCycle];
              const monthlyPrice = Math.round(totalPrice / selectedBilling.months);
              const cardTones = [
                'border-indigo-200 bg-indigo-50/70',
                'border-emerald-200 bg-emerald-50/70',
                'border-sky-200 bg-sky-50/70',
                'border-amber-200 bg-amber-50/70',
              ];

              return (
                <article
                  key={`${plan.processor}-${plan.users}`}
                  className={`group relative flex min-w-0 flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-indigo-500 bg-indigo-100/80 ring-2 ring-indigo-200'
                      : cardTones[index % cardTones.length]
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold uppercase text-white">
                      <Sparkles size={13} />
                      Popular
                    </div>
                  )}

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-100 text-indigo-700 transition group-hover:scale-105">
                    <Cpu size={22} />
                  </div>

                  <div className="mt-5">
                    <h3 className="text-xl font-extrabold text-slate-950">{plan.processor}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Recommended for up to {plan.users} users
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
                    <p className="text-xs font-bold uppercase text-slate-500">Monthly equivalent</p>
                    <div className="mt-1 flex flex-wrap items-end gap-1">
                      <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                        {formatPrice(monthlyPrice)}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-slate-500">/ month</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {formatPrice(totalPrice)} billed {selectedBilling.label.toLowerCase()}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                      <Cpu size={16} className="text-indigo-700" />
                      <p className="mt-2 text-xs font-bold text-slate-500">vCPU</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.processor}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                      <HardDrive size={16} className="text-emerald-700" />
                      <p className="mt-2 text-xs font-bold text-slate-500">RAM</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.ram} GB</p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <Database size={16} className="text-amber-700" />
                      <p className="mt-2 text-xs font-bold text-slate-500">Storage</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.storage} GB</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Users size={16} className="shrink-0 text-indigo-700" />
                      <span>{plan.users} users included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <ShieldCheck size={16} className="shrink-0 text-emerald-700" />
                      <span>Secure hosted access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <ServerCog size={16} className="shrink-0 text-slate-700" />
                      <span>Marg-ready cloud resources</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold transition ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-teal-700 text-white hover:bg-teal-800'
                    }`}
                  >
                    Buy Now
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-[#f8fbff] p-5 sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold text-indigo-950">View all features included</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Every Marg cloud plan is created for stable hosted access, daily billing,
                inventory work, reports, user access and growing business operations.
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

          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
            The displayed price is the monthly rate excluding applicable taxes. The total amount
            payable at checkout is calculated by multiplying the monthly rate by the selected billing
            period and adding applicable taxes.
          </p>
        </div>
      </div>
    </section>
  );
}
