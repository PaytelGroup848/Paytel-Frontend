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
  Sparkles,
} from "lucide-react";

const comparisonData = {
  companies: [
    {
      name: "Cloudedata",
      logo: "CD",
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
        appMigration: true,
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
        appMigration: false,
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
        appMigration: false,
      },
    },
  ],
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
    appMigration: "Application Migration (All apps)",
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
    <span className={`text-[13px] font-semibold ${status === "Free" ? "text-emerald-600" : "text-amber-600"}`}>
      {status}
    </span>
  );
};

export default function ComparisonTable() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50/40 via-white to-slate-50/40 py-5 md:py-10 px-4 sm:px-2 lg:px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-6xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* Header Section – reduced margins & font sizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold px-3 py-1 rounded-full  tracking-[0.1em] uppercase shadow-sm">
            <TrendingUp size={12} className="text-indigo-400" strokeWidth={2} />
            Compare &amp; Save
          </div>

          <h2
            className="text-[1.6rem] sm:text-3xl md:text-[2.25rem] text-slate-900 mb-3 leading-[1.12]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, letterSpacing: "-0.015em" }}
          >
            See why{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Cloudedata
              </span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-indigo-100/60 -z-0 rounded-full" />
            </span>{" "}
            stands out
          </h2>

          <p className="text-[13px] md:text-[15px] text-slate-500 leading-relaxed font-normal max-w-lg mx-auto">
            A side-by-side look at Cloudedata against leading hosting providers, so you can
            make a smarter, more informed choice.
          </p>
        </motion.div>

        {/* Desktop Comparison Table – compact padding & min‑width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="hidden lg:block relative rounded-[1.25rem] p-[1px] overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #e7e8ee 0%, #ffffff 30%, #f1f2f6 55%, #ffffff 80%, #e7e8ee 100%)",
            boxShadow: "0 24px 60px -18px rgba(30,32,46,0.18), 0 4px 14px -4px rgba(30,32,46,0.08)",
          }}
        >
          <div className="bg-white rounded-[1.2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "620px" }}>

                {/* Table Header – smaller padding & font */}
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="p-4 md:p-5 text-left w-[200px] align-bottom">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.18em]">
                        Features compared
                      </span>
                    </th>

                    {comparisonData.companies.map((company, idx) => (
                      <th
                        key={idx}
                        className={`p-4 md:p-5 text-center align-top border-l border-slate-100 transition-colors duration-300 ${
                          company.highlight ? "bg-indigo-50/25" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          {company.highlight && (
                            <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[9px] font-semibold px-3 py-[4px] rounded-full mb-2.5 tracking-[0.06em] shadow-md shadow-slate-900/20">
                        
                              RECOMMENDED
                            </div>
                          )}

                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-[14px] tracking-tight mb-2 ${
                              company.highlight
                                ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200"
                                : "bg-slate-100 text-slate-600"
                            }`}
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 560 }}
                          >
                            {company.logo}
                          </div>

                          <h3
                            className={`text-[14px] tracking-tight mb-0.5 ${
                              company.highlight ? "text-indigo-600" : "text-slate-800"
                            }`}
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 560 }}
                          >
                            {company.name}
                          </h3>

                          <p className="text-[10.5px] text-slate-500 font-normal mb-2">{company.tagline}</p>

                          <div className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Globe size={10} />
                            <span>{company.origin}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Pricing Section Header – compact */}
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <td colSpan={4} className="px-5 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center ring-1 ring-amber-100">
                          <span className="text-amber-500 text-[9px] font-semibold">₹</span>
                        </div>
                        <span className="text-[9.5px] font-semibold text-slate-500 uppercase tracking-[0.14em]">
                          Pricing Details
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Offer Price Row – smaller text */}
                  <tr className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-[13px] text-slate-700 font-medium">Introductory price</span>
                    </td>
                    {comparisonData.companies.map((company, idx) => (
                      <td key={idx} className={`px-5 py-3 text-center border-l border-slate-100 ${company.highlight ? "bg-indigo-50/15" : ""}`}>
                        <span
                          className={`text-[16px] tracking-tight ${
                            company.highlight ? "text-indigo-600 font-semibold" : "text-slate-900 font-semibold"
                          }`}
                        >
                          {company.price.offer}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Renewal Price Row */}
                  <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-[13px] text-slate-700 font-medium">Renewal price</span>
                    </td>
                    {comparisonData.companies.map((company, idx) => (
                      <td key={idx} className={`px-5 py-3 text-center border-l border-slate-100 ${company.highlight ? "bg-indigo-50/15" : ""}`}>
                        <div className="flex flex-col items-center gap-0.5">
                          <span
                            className={`text-[14px] tracking-tight ${
                              company.highlight
                                ? "text-indigo-600 font-semibold"
                                : company.price.increase
                                ? "text-red-600 font-semibold"
                                : "text-slate-800 font-semibold"
                            }`}
                          >
                            {company.price.renewal}
                          </span>
                          {company.price.renewalNote && (
                            <span
                              className={`text-[9.5px] font-medium flex items-center gap-1 ${
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

                  {/* Features Section Header – compact */}
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <td colSpan={4} className="px-5 py-2.5">
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-indigo-400" />
                        <span className="text-[9.5px] font-semibold text-slate-500 uppercase tracking-[0.14em]">
                          Feature Comparison
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Feature Rows – reduced padding */}
                  {Object.entries(comparisonData.featureLabels).map(([key, label], idx) => (
                    <tr
                      key={key}
                      className={`border-b border-slate-50 transition-colors duration-200 hover:bg-slate-50/40 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/20"
                      }`}
                    >
                      <td className="px-5 py-2.5">
                        <span className="text-[12.5px] text-slate-700 font-medium">{label}</span>
                      </td>
                      {comparisonData.companies.map((company, cIdx) => (
                        <td key={cIdx} className={`px-5 py-2.5 text-center border-l border-slate-100 ${company.highlight ? "bg-indigo-50/15" : ""}`}>
                          <div className="flex justify-center">
                            <FeatureIndicator status={company.features[key]} highlight={company.highlight} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* CTA Row – smaller button */}
                  <tr>
                    <td className="px-5 py-4"></td>
                    {comparisonData.companies.map((company, idx) => (
                      <td key={idx} className={`px-5 py-4 text-center border-l border-slate-100 ${company.highlight ? "bg-indigo-50/15" : ""}`}>
                        <button
                          onClick={() => (window.location.href = "/pricing")}
                          className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-[11.5px] font-medium tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${
                            company.highlight
                              ? "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          Get started
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Mobile / Tablet Cards – more compact spacing */}
        <div className="lg:hidden space-y-4">
          {comparisonData.companies.map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden ${
                company.highlight ? "shadow-xl shadow-indigo-100/40" : "shadow-md shadow-slate-200/40"
              }`}
              style={{
                border: company.highlight ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(226,232,240,1)",
              }}
            >
              {/* Company Header – smaller */}
              <div
                className={`px-4 py-3 flex items-center justify-between ${
                  company.highlight ? "bg-gradient-to-r from-slate-900 to-indigo-900" : "bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] ${
                      company.highlight ? "bg-white/15 text-white" : "bg-white text-slate-600"
                    }`}
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 560 }}
                  >
                    {company.logo}
                  </div>
                  <div>
                    <h3
                      className={`text-[13.5px] tracking-tight ${company.highlight ? "text-white" : "text-slate-800"}`}
                      style={{ fontFamily: "'Fraunces', serif", fontWeight: 560 }}
                    >
                      {company.name}
                    </h3>
                    <p className={`text-[10px] ${company.highlight ? "text-indigo-200" : "text-slate-400"}`}>
                      {company.tagline} · {company.origin}
                    </p>
                  </div>
                </div>
                {company.highlight && (
                  <div className="bg-white/15 rounded-full p-1">
                    <Star size={14} className="text-white" fill="white" />
                  </div>
                )}
              </div>

              {/* Pricing – compact grid */}
              <div className="px-4 py-3 bg-white border-b border-slate-100">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Intro price</p>
                    <p
                      className={`text-[15px] tracking-tight ${
                        company.highlight ? "text-indigo-600 font-semibold" : "text-slate-800 font-medium"
                      }`}
                    >
                      {company.price.offer}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Renewal</p>
                    <p
                      className={`text-[15px] tracking-tight ${
                        company.price.increase ? "text-red-500 font-medium" : "text-emerald-600 font-medium"
                      }`}
                    >
                      {company.price.renewal}
                    </p>
                    {company.price.renewalNote && (
                      <p className={`text-[9px] mt-0.5 ${company.price.increase ? "text-red-400" : "text-emerald-500"}`}>
                        {company.price.renewalNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Features – tighter spacing */}
              <div className="px-4 py-3 space-y-1.5 bg-white">
                {Object.entries(comparisonData.featureLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                    <span className="text-[12.5px] text-slate-700 font-medium">{label}</span>
                    <FeatureIndicator status={company.features[key]} highlight={company.highlight} />
                  </div>
                ))}
              </div>

              {/* CTA – smaller */}
              <div className="px-4 pb-4 pt-1 bg-white">
                <button
                  onClick={() => (window.location.href = "/pricing")}
                  className={`w-full py-2.5 rounded-xl text-[12.5px] font-medium tracking-tight transition-all ${
                    company.highlight
                      ? "bg-slate-900 hover:bg-slate-800 text-white shadow-md"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  Get started with {company.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Disclaimer – compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-start gap-2 bg-amber-50/70 border border-amber-100 rounded-xl px-3 py-2.5">
            <Info size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 text-left leading-relaxed font-normal">
              Prices are indicative and based on publicly available information at the time of comparison.
              Actual prices may vary depending on plan duration, offers, region, and applicable taxes.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}