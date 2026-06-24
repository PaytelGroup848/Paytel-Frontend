import { motion } from "framer-motion";
import {
  Check,
  X,
  TrendingUp,
  Zap,
  Globe,
  ChevronRight,
  Star,
  Info,
  ArrowUp,
} from "lucide-react";

const comparisonData = {
  companies: [
    {
      logo: "CD",
      image: "/Cloudedata.svg",
      highlight: true,
      tagline: "Best Value in India",
      origin: "India",
      price: {
        offer: "₹129.00/mo",
        renewal: "₹129.00/mo",
        renewalNote: "Same price at renewal",
        increase: null,
      },
      features: {
        nvme: true,
        websites: "25 websites",
        wordpress: true,
        email: "Free",
        ssh: true,
        dailyBackups: true,
        fullMigration: true,
        emailMigration: true,
        dbMigration: true,
        // appMigration removed
      },
    },
    {
      name: "Hostinger",
      logo: "H",
      highlight: false,
      tagline: "Popular Alternative",
      origin: "Lithuania",
      price: {
        offer: "₹149.00/mo",
        renewal: "₹449.00/mo",
        renewalNote: "↑ 201% increase",
        increase: 201,
      },
      features: {
        nvme: true,
        websites: "3 websites",
        wordpress: true,
        email: "Paid",
        ssh: true,
        dailyBackups: false,
        fullMigration: false,
        emailMigration: false,
        dbMigration: true,
      },
    },
    {
      name: "GoDaddy",
      logo: "GD",
      highlight: false,
      tagline: "Global Brand",
      origin: "USA",
      price: {
        offer: "₹219.00/mo",
        renewal: "₹599.00/mo",
        renewalNote: "↑ 270% increase",
        increase: 270,
      },
      features: {
        nvme: false,
        websites: "1 website",
        wordpress: false,
        email: "Free",
        ssh: false,
        dailyBackups: false,
        fullMigration: false,
        emailMigration: false,
        dbMigration: false,
      },
    },
  ],
  // App migration row removed from featureLabels
  featureLabels: {
    nvme: "NVMe Servers",
    websites: "Website Hosting Limit",
    wordpress: "Advanced WordPress Optimization",
    email: "Email Accounts",
    ssh: "SSH Access",
    dailyBackups: "Daily Backups",
    fullMigration: "Full Website Migration",
    emailMigration: "Email Migration",
    dbMigration: "Database Migration",
  },
};

const FeatureIndicator = ({ status, highlight }) => {
  if (status === true) {
    return (
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
          highlight ? "bg-indigo-50 ring-1 ring-indigo-100" : "bg-emerald-50 ring-1 ring-emerald-100"
        }`}
      >
        <Check size={12} className={highlight ? "text-indigo-500" : "text-emerald-500"} strokeWidth={2.5} />
      </div>
    );
  }
  if (status === false) {
    return (
      <div className="w-6 h-6 rounded-lg bg-slate-50 ring-1 ring-slate-100 flex items-center justify-center">
        <X size={12} className="text-slate-300" strokeWidth={2} />
      </div>
    );
  }
  return (
    <span className={`text-sm font-semibold ${status === "Free" ? "text-emerald-600" : "text-amber-600"}`}>
      {status}
    </span>
  );
};

export default function ComparisonTable() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50/40 via-white to-slate-50/40 py-2 md:py-3 px-4 sm:px-2 lg:px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-3 md:mb-4"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1 rounded-full tracking-[0.1em] uppercase shadow-sm">
            <TrendingUp size={12} className="text-indigo-400" strokeWidth={2} />
            Compare &amp; Save
          </div>

          <h2
            className="text-[1.5rem] sm:text-3xl md:text-[2.25rem] text-slate-900 mb-1.5 leading-tight"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.015em" }}
          >
            See why{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Cloudedata
            </span>{" "}
            stands out
          </h2>

          <p className="text-[14px] md:text-[16px] text-slate-500 leading-relaxed font-normal max-w-lg mx-auto">
            A side-by-side look at Cloudedata against leading hosting providers, so you can make a smarter, more informed choice.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-[1.25rem] p-[1px] overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #e7e8ee 0%, #ffffff 30%, #f1f2f6 55%, #ffffff 80%, #e7e8ee 100%)",
            boxShadow: "0 24px 60px -18px rgba(30,32,46,0.18), 0 4px 14px -4px rgba(30,32,46,0.08)",
          }}
        >
          <div className="bg-white rounded-[1.2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "620px" }}>
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="p-2 md:p-2.5 text-left w-[200px] align-bottom">
                      {/* Increased font size for "Features compared" */}
                      <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-[0.18em]">
                        Features compared
                      </span>
                    </th>

                    {comparisonData.companies.map((company, idx) => (
                      <th
                        key={idx}
                        className={`p-2 md:p-2.5 text-center align-top border-l border-slate-100 transition-colors duration-300 ${
                          company.highlight ? "bg-indigo-50/25" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          {company.highlight && (
                            <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[11px] font-semibold px-3 py-[4px] rounded-full mb-1.5 tracking-[0.06em] shadow-md shadow-slate-900/20">
                              RECOMMENDED
                            </div>
                          )}

                          {company.image ? (
                            <img
                              src={company.image}
                              alt={company.name}
                              className="w-28 h-7 md:w-32 md:h-8 rounded-xl object-contain mb-1.5"
                            />
                          ) : (
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center text-[13px] tracking-tight mb-1.5 ${
                                company.highlight
                                  ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
                            >
                              {company.logo}
                            </div>
                          )}

                          {/* Company name increased to text-base */}
                          <h3
                            className={`text-base tracking-tight mb-0.5 ${
                              company.highlight ? "text-indigo-600" : "text-slate-800"
                            }`}
                            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
                          >
                            {company.name}
                          </h3>

                          {/* Tagline increased to text-xs */}
                          <p className="text-xs text-slate-500 font-normal mb-1">{company.tagline}</p>

                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Globe size={12} />
                            <span>{company.origin}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Pricing Section Header */}
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <td colSpan={4} className="px-2.5 py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center ring-1 ring-amber-100">
                          <span className="text-amber-500 text-[11px] font-semibold">₹</span>
                        </div>
                        {/* Pricing header text increased */}
                        <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.14em]">
                          Pricing Details
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Offer Price Row */}
                  <tr className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <td className="px-2.5 py-1">
                      <span className="text-[14px] text-slate-700 font-medium">Introductory price</span>
                    </td>
                    {comparisonData.companies.map((company, idx) => (
                      <td
                        key={idx}
                        className={`px-2.5 py-1 text-center border-l border-slate-100 ${
                          company.highlight ? "bg-indigo-50/15" : ""
                        }`}
                      >
                        {/* Offer price increased to text-xl */}
                        <span
                          className={`text-xl md:text-2xl font-bold ${
                            company.highlight ? "text-indigo-600" : "text-slate-900"
                          }`}
                        >
                          {company.price.offer}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Renewal Price Row */}
                  <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                    <td className="px-2.5 py-1">
                      <span className="text-[14px] text-slate-700 font-medium">Renewal price</span>
                    </td>
                    {comparisonData.companies.map((company, idx) => (
                      <td
                        key={idx}
                        className={`px-2.5 py-1 text-center border-l border-slate-100 ${
                          company.highlight ? "bg-indigo-50/15" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center gap-0.5">
                          {/* Renewal price increased to text-lg */}
                          <span
                            className={`text-lg font-semibold ${
                              company.highlight
                                ? "text-indigo-600"
                                : company.price.increase
                                ? "text-red-600"
                                : "text-slate-800"
                            }`}
                          >
                            {company.price.renewal}
                          </span>
                          {company.price.renewalNote && (
                            <span
                              className={`text-[11px] font-medium flex items-center gap-1 ${
                                company.price.increase ? "text-red-500" : "text-emerald-600"
                              }`}
                            >
                              {company.price.increase ? <ArrowUp size={9} /> : <Check size={9} strokeWidth={3} />}
                              {company.price.renewalNote}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features Section Header */}
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <td colSpan={4} className="px-2.5 py-1">
                      <div className="flex items-center gap-2">
                        <Zap size={13} className="text-indigo-400" />
                        {/* Feature header increased */}
                        <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.14em]">
                          Feature Comparison
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Feature Rows (appMigration removed) */}
                  {Object.entries(comparisonData.featureLabels).map(([key, label], idx) => (
                    <tr
                      key={key}
                      className={`border-b border-slate-50 transition-colors duration-200 hover:bg-slate-50/40 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/20"
                      }`}
                    >
                      <td className="px-2.5 py-1">
                        {/* Feature label font increased to text-sm */}
                        <span className="text-sm text-slate-700 font-medium">{label}</span>
                      </td>
                      {comparisonData.companies.map((company, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-2.5 py-1 text-center border-l border-slate-100 ${
                            company.highlight ? "bg-indigo-50/15" : ""
                          }`}
                        >
                          <div className="flex justify-center">
                            <FeatureIndicator status={company.features[key]} highlight={company.highlight} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* CTA Row */}
                  <tr>
                    <td className="px-2.5 py-1.5"></td>
                    {comparisonData.companies.map((company, idx) => (
                      <td
                        key={idx}
                        className={`px-2.5 py-1.5 text-center border-l border-slate-100 ${
                          company.highlight ? "bg-indigo-50/15" : ""
                        }`}
                      >
                        <button
                          onClick={() => (window.location.href = "/pricing")}
                          className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${
                            company.highlight
                              ? "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          Get started
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Footer Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-4 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-start gap-2 bg-amber-50/70 border border-amber-100 rounded-xl px-3 py-2">
            <Info size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-700 text-left leading-relaxed font-normal">
              Prices are indicative and based on publicly available information at the time of comparison.
              Actual prices may vary depending on plan duration, offers, region, and applicable taxes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}