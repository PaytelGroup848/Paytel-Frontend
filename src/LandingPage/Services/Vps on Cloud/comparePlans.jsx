import { Star, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Cloudedata Starter",
    provider: "Cloudedata",
    price: 899,
    features: {
      vCPU: "2 Cores",
      RAM: "4 GB",
      Storage: "60 GB NVMe",
      Speed: "1 Gbps",
      Backup: "Monthly",
    },
    highlighted: true,
    badge: "Best Value",
  },
  {
    name: "Hostinger VPS 2",
    provider: "Hostinger",
    price: 999,
    features: {
      vCPU: "2 Cores",
      RAM: "4 GB",
      Storage: "50 GB NVMe",
      Speed: "1 Gbps",
      Backup: "Weekly",
    },
    highlighted: false,
  },
  {
    name: "GoDaddy Basic VPS",
    provider: "GoDaddy",
    price: 1099,
    features: {
      vCPU: "2 Cores",
      RAM: "4 GB",
      Storage: "80 GB SATA",
      Speed: "400 Mbps",
      Backup: "Additional Cost",
    },
    highlighted: false,
  },
];

const featureRows = [
  { key: "vCPU", label: "vCPU" },
  { key: "RAM", label: "RAM" },
  { key: "Storage", label: "Storage" },
  { key: "Speed", label: "Network" },
  { key: "Backup", label: "Backup" },
];

const formatINR = (paise) =>
  `₹${(Number(paise)).toLocaleString()}`;

export default function VpsComparison() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Compare VPS Plans
        </h2>
        <p className="mt-3 text-lg text-slate-600 font-light">
          More power, lower price. See why developers choose Cloudedata.
        </p>
      </div>

      {/* Desktop Table (md+) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl shadow-slate-200/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-5 text-left font-semibold text-slate-700">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className={`p-5 min-w-[200px] relative ${
                    plan.highlighted
                      ? "bg-indigo-50/40 after:absolute after:inset-0 after:rounded-t-2xl after:ring-2 after:ring-indigo-200 after:pointer-events-none"
                      : ""
                  }`}
                >
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-sm font-bold text-slate-800">
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        <Star size={10} fill="currentColor" /> {plan.badge}
                      </span>
                    )}
                    <span className="mt-2 text-2xl font-extrabold text-slate-900">
                      {formatINR(plan.price)}
                      <span className="text-sm font-normal text-slate-500">
                        /mo
                      </span>
                    </span>
                    {plan.highlighted && (
                      <span className="mt-1 text-xs font-medium text-emerald-600">
                        Save 11% vs Hostinger
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureRows.map(({ key, label }) => (
              <tr
                key={key}
                className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
              >
                <td className="p-5 font-medium text-slate-700">{label}</td>
                {plans.map((plan) => (
                  <td
                    key={`${plan.name}-${key}`}
                    className={`p-5 font-medium ${
                      plan.highlighted
                        ? "bg-indigo-50/30 text-slate-900"
                        : "text-slate-600"
                    }`}
                  >
                    {plan.features[key]}
                  </td>
                ))}
              </tr>
            ))}
            {/* CTA row */}
            <tr>
              <td className="p-5"></td>
              {plans.map((plan) => (
                <td
                  key={`cta-${plan.name}`}
                  className={`p-5 ${
                    plan.highlighted ? "bg-indigo-50/30" : ""
                  }`}
                >
                  <a
                    href="#pricing"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition
                      ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200/40 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700"
                          : "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                      }`}
                  >
                    {plan.provider === "Cloudedata"
                      ? "Deploy Now"
                      : "Visit Site"}
                    <ArrowRight size={14} />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 backdrop-blur-sm transition hover:shadow-lg ${
              plan.highlighted
                ? "border-indigo-300 bg-white shadow-xl shadow-indigo-100/70 ring-2 ring-indigo-200"
                : "border-slate-200 bg-white shadow-md"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-[10px] font-bold text-amber-700 shadow-sm">
                <Star size={10} fill="currentColor" /> {plan.badge}
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">
                {plan.name}
              </h3>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatINR(plan.price)}
                </span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {featureRows.map(({ key, label }) => (
                <li
                  key={key}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-800">
                    {plan.features[key]}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#pricing"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wide transition
                ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200/50 hover:shadow-xl"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
            >
              {plan.provider === "Cloudedata" ? "Deploy Now" : "Visit Site"}
              <ArrowRight size={14} />
            </a>
            {plan.highlighted && (
              <p className="text-center text-xs text-emerald-600 mt-3 font-medium">
                Save 11% vs Hostinger
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Trust note */}
      <div className="flex justify-center items-center gap-2 mt-8 text-xs text-slate-400 font-light">
        <Zap size={14} className="text-indigo-400" />
        All plans include full root access, DDoS protection & 24/7 expert support.
      </div>
    </section>
  );
}