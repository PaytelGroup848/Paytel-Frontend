import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const billingOptions = [
  { key: 'halfYearly', label: 'Half Yearly', months: 6, badge: 'Flexible' },
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
  'ERP and Tally-ready cloud server',
  'Secure remote access',
  'Daily backup support',
  'Multi-user performance',
  'Server monitoring',
  'Setup assistance',
];

const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export default function TallyPlans() {
  const [billingCycle, setBillingCycle] = useState('yearly');

  const selectedBilling = useMemo(() => {
    return billingOptions.find((option) => option.key === billingCycle) || billingOptions[1];
  }, [billingCycle]);

  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#dbe5f3_0%,#f8fafc_48%,#eef2f7_100%)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-300/80 bg-white/75 p-3 shadow-[0_28px_90px_rgba(15,23,42,0.16)] backdrop-blur sm:p-5 lg:p-6">
          <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/70" />

          <div className="relative rounded-[24px] border border-slate-800 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_48%,#312e81_100%)] p-5 shadow-[0_22px_70px_rgba(15,23,42,0.38)] sm:p-7 lg:p-8">
            <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase text-indigo-100 shadow-sm backdrop-blur">
                  <Cloud size={15} />
                  ERP on Cloud Plans
                </div>

                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Move your business forward with secure, high-performance ERP on Cloud
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
                  Experience secure access to your ERP software anytime, anywhere, on any device.
                  These plans are designed to keep your business connected, agile and productive.
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_45px_rgba(15,23,42,0.28)] backdrop-blur">
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
                            ? 'border-emerald-400 bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/20'
                            : 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                        }`}
                      >
                        <span className="block text-sm font-extrabold">{option.label}</span>
                        <span className={`mt-0.5 block text-xs ${isActive ? 'text-slate-700' : 'text-slate-300'}`}>
                          {option.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plans.map((plan) => {
              const totalPrice = plan[billingCycle];
              const monthlyPrice = Math.round(totalPrice / selectedBilling.months);

              return (
                <article
                  key={`${plan.processor}-${plan.users}`}
                  className={`group relative flex min-w-0 flex-col rounded-2xl border bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] transition duration-300 [transform-style:preserve-3d] hover:-translate-y-2 hover:shadow-[0_26px_58px_rgba(15,23,42,0.18)] ${
                    plan.popular
                      ? 'border-indigo-500 ring-4 ring-indigo-100'
                      : 'border-slate-200/90 hover:border-indigo-200'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                  {plan.popular && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold uppercase text-white shadow-lg shadow-indigo-200">
                      Popular
                    </div>
                  )}

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_12px_24px_rgba(15,23,42,0.22)] transition group-hover:scale-105">
                    <Cpu size={23} />
                  </div>

                  <div className="mt-5">
                    <h3 className="text-xl font-extrabold text-slate-950">{plan.processor}</h3>
                    <p className="mt-1 text-sm text-slate-500">Best for up to {plan.users} active users</p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
                    <p className="text-xs font-bold uppercase text-slate-500">Monthly equivalent</p>
                    <div className="mt-1 flex flex-wrap items-end gap-1">
                      <span className="text-3xl font-extrabold text-slate-950">{formatPrice(monthlyPrice)}</span>
                      <span className="pb-1 text-sm font-semibold text-slate-500">/ month</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {formatPrice(totalPrice)} billed {selectedBilling.label.toLowerCase()}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                      <Cpu size={16} className="text-indigo-600" />
                      <p className="mt-2 text-xs font-semibold text-slate-500">vCPU</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.processor}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                      <HardDrive size={16} className="text-emerald-600" />
                      <p className="mt-2 text-xs font-semibold text-slate-500">RAM</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.ram} GB</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                      <Database size={16} className="text-amber-600" />
                      <p className="mt-2 text-xs font-semibold text-slate-500">Storage</p>
                      <p className="text-sm font-extrabold text-slate-950">{plan.storage} GB</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Users size={16} className="text-indigo-600" />
                      <span>{plan.users} users included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      <span>Secure access and backup support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <IndianRupee size={16} className="text-amber-600" />
                      <span>Taxes calculated at checkout</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold shadow-lg transition ${
                      plan.popular
                        ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'
                        : 'bg-slate-950 text-white shadow-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    Buy Now
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_42px_rgba(15,23,42,0.08)] sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:p-8">
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold text-slate-950">View all features included</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Every plan is built for reliable ERP access with practical support for daily accounting,
                billing, GST work, reporting and branch operations.
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

          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800 shadow-sm">
            The displayed price is the monthly rate excluding applicable taxes. The total amount
            payable at checkout is calculated by multiplying the monthly rate by the selected billing
            period and adding applicable taxes.
          </p>
        </div>
      </div>
    </section>
  );
}