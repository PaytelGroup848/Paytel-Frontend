import { Star, ArrowRight, Zap } from "lucide-react";

const plans = [
  {
    name: "Cloudedata Starter", // used only as a key, not displayed
    provider: "Cloudedata",
    price: 899,
    logo: "/Cloudedata.svg", // ← replace with your actual logo path
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
    logo: "", // no image for Hostinger
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
    logo: "", // no image for GoDaddy
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
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
          Compare VPS Plans
        </h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-slate-600 font-light max-w-xl mx-auto">
          More power, lower price. See why developers choose Cloudedata.
        </p>
      </div>

      {/* Table – always visible, scrolls horizontally on small screens */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xl shadow-slate-200/50 transition-shadow hover:shadow-2xl">
        <table className="w-full text-sm" style={{ minWidth: "650px" }}>
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-5 text-left font-semibold text-slate-700">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className={`p-5 min-w-[180px] relative ${
                    plan.highlighted
                      ? "bg-indigo-50/40 after:absolute after:inset-0 after:rounded-t-2xl after:ring-2 after:ring-indigo-200 after:pointer-events-none"
                      : ""
                  }`}
                >
                  <div className="relative z-10 flex flex-col items-start gap-2">
                    {/* Logo / Name */}
                    {plan.logo ? (
                      <img
                        src={plan.logo}
                        alt={plan.provider}
                        className="w-24 h-7 sm:w-28 sm:h-8 object-contain rounded"
                      />
                    ) : (
                      <span className="text-sm font-bold text-slate-800">
                        {plan.name}
                      </span>
                    )}
                    {plan.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 shadow-sm">
                        <Star size={10} fill="currentColor" /> {plan.badge}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold text-slate-900">
                      {formatINR(plan.price)}
                      <span className="text-sm font-normal text-slate-500">
                        /mo
                      </span>
                    </span>
                    {plan.highlighted && (
                      <span className="text-xs font-medium text-emerald-600">
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
                    href="/pricing"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-200
                      ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200/40 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-0.5"
                          : "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5"
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

      {/* Trust note */}
      <div className="flex justify-center items-center gap-2 mt-8 text-xs text-slate-400 font-light">
        <Zap size={14} className="text-indigo-400" />
        All plans include full root access, DDoS protection & 24/7 expert support.
      </div>
    </section>
  );
}