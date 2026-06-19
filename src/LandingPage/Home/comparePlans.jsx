import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  Award,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Star,
  Info,
  ArrowUp,
  Sparkles,
  Cloud
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
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
        highlight 
          ? 'bg-indigo-50 ring-1 ring-indigo-200' 
          : 'bg-emerald-50 ring-1 ring-emerald-200'
      }`}>
        <Check size={14} className={highlight ? 'text-indigo-600' : 'text-emerald-600'} strokeWidth={2.5} />
      </div>
    );
  }
  if (status === false) {
    return (
      <div className="w-7 h-7 rounded-lg bg-slate-100 ring-1 ring-slate-300 flex items-center justify-center">
        <X size={14} className="text-slate-400" strokeWidth={2} />
      </div>
    );
  }
  return (
    <span className={`text-sm font-medium tracking-tight ${
      status === "Free" ? 'text-emerald-600' : 'text-amber-600'
    }`}>
      {status}
    </span>
  );
};

export default function ComparisonTable() {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/40 py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Purple shiny background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide shadow-lg shadow-purple-100/50">
            <TrendingUp size={13} className="text-purple-500" />
            Compare & Save
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-slate-900 mb-5 tracking-tight leading-[1.15] font-medium">
            See why{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Cloudedata
              </span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-purple-200/60 -z-0 rounded-full" />
            </span>{" "}
            stands out
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            We've compared Cloudedata with leading hosting providers to help you 
            make the smarter, more informed choice for your business.
          </p>
        </motion.div>

        {/* Desktop Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="hidden lg:block bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-purple-200/30 border-2 border-slate-300 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b-2 border-slate-400">
                  <th className="p-7 md:p-9 text-left w-[280px] align-bottom bg-slate-50/50">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-[0.2em]">
                      Features compared
                    </span>
                  </th>
                  
                  {comparisonData.companies.map((company, idx) => (
                    <th key={idx} className={`p-7 md:p-9 text-center align-top transition-colors duration-300 border-l-2 border-slate-300 ${
                      company.highlight ? 'bg-purple-50/30' : 'bg-slate-50/30'
                    }`}>
                      <div className="flex flex-col items-center">
                        {/* Best Value Badge */}
                        {company.highlight && (
                          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-semibold px-3.5 py-1 rounded-full mb-4 shadow-lg shadow-purple-300/40">
                            <Sparkles size={11} />
                            RECOMMENDED
                          </div>
                        )}
                        
                        {/* Logo */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold tracking-tight mb-3 transition-all ${
                          company.highlight 
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-300/30' 
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {company.logo}
                        </div>
                        
                        {/* Company Name */}
                        <h3 className={`text-lg tracking-tight mb-1 ${
                          company.highlight ? 'text-purple-700 font-semibold' : 'text-slate-800 font-medium'
                        }`}>
                          {company.name}
                        </h3>
                        
                        {/* Tagline */}
                        <p className="text-xs text-slate-500 font-normal mb-3">
                          {company.tagline}
                        </p>
                        
                        {/* Origin */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Globe size={11} />
                          <span>{company.origin}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Pricing Section Header */}
                <tr className="border-b-2 border-slate-400 bg-slate-100/80">
                  <td colSpan={4} className="px-9 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center ring-1 ring-amber-300">
                        <span className="text-amber-700 text-xs font-semibold">₹</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-[0.15em]">
                        Pricing Details
                      </span>
                    </div>
                  </td>
                </tr>

                {/* Offer Price Row */}
                <tr className="border-b-2 border-slate-300 hover:bg-slate-50/50 transition-colors">
                  <td className="px-9 py-5 border-r-2 border-slate-200">
                    <span className="text-sm text-slate-700 font-medium">Introductory price</span>
                  </td>
                  {comparisonData.companies.map((company, idx) => (
                    <td key={idx} className={`px-9 py-5 text-center border-l-2 border-slate-200 ${company.highlight ? 'bg-purple-50/20' : ''}`}>
                      <span className={`text-xl tracking-tight ${
                        company.highlight ? 'text-purple-700 font-semibold' : 'text-slate-800 font-medium'
                      }`}>
                        {company.price.offer}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Renewal Price Row */}
                <tr className="border-b-2 border-slate-400 hover:bg-slate-50/50 transition-colors">
                  <td className="px-9 py-5 border-r-2 border-slate-200">
                    <span className="text-sm text-slate-700 font-medium">Renewal price</span>
                  </td>
                  {comparisonData.companies.map((company, idx) => (
                    <td key={idx} className={`px-9 py-5 text-center border-l-2 border-slate-200 ${company.highlight ? 'bg-purple-50/20' : ''}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-base tracking-tight ${
                          company.highlight 
                            ? 'text-purple-700 font-semibold' 
                            : company.price.increase ? 'text-red-600 font-semibold' : 'text-slate-800 font-medium'
                        }`}>
                          {company.price.renewal}
                        </span>
                        {company.price.renewalNote && (
                          <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                            company.price.increase ? 'text-red-500' : 'text-emerald-600'
                          }`}>
                            {company.price.increase ? (
                              <ArrowUp size={10} />
                            ) : (
                              <Check size={10} strokeWidth={3} />
                            )}
                            {company.price.renewalNote}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Features Section Header */}
                <tr className="border-b-2 border-slate-400 bg-slate-100/80">
                  <td colSpan={4} className="px-9 py-4">
                    <div className="flex items-center gap-2.5">
                      <Zap size={14} className="text-purple-600" />
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-[0.15em]">
                        Feature Comparison
                      </span>
                    </div>
                  </td>
                </tr>

                {/* Feature Rows */}
                {Object.entries(comparisonData.featureLabels).map(([key, label], idx) => (
                  <tr 
                    key={key} 
                    className={`border-b-2 border-slate-200 transition-colors duration-200 hover:bg-slate-50/70 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="px-9 py-4 border-r-2 border-slate-200">
                      <span className="text-sm text-slate-700 font-medium">{label}</span>
                    </td>
                    {comparisonData.companies.map((company, cIdx) => (
                      <td key={cIdx} className={`px-9 py-4 text-center border-l-2 border-slate-200 ${company.highlight ? 'bg-purple-50/20' : ''}`}>
                        <div className="flex justify-center">
                          <FeatureIndicator 
                            status={company.features[key]} 
                            highlight={company.highlight}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* CTA Row */}
                <tr>
                  <td className="px-9 py-6 border-r-2 border-slate-200"></td>
                  {comparisonData.companies.map((company, idx) => (
                    <td key={idx} className={`px-9 py-6 text-center border-l-2 border-slate-200 ${company.highlight ? 'bg-purple-50/20' : ''}`}>
                      <button
                        onClick={() => window.location.href = "/pricing"}
                        className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${
                          company.highlight
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-300/50'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-900 shadow-sm'
                        }`}
                      >
                        Get started
                        <ChevronRight size={15} />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {comparisonData.companies.map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 overflow-hidden transition-all ${
                company.highlight 
                  ? 'border-purple-300 shadow-purple-200/30 ring-1 ring-purple-200' 
                  : 'border-slate-300'
              }`}
            >
              {/* Company Header */}
              <div className={`p-5 flex items-center justify-between ${
                company.highlight ? 'bg-gradient-to-r from-purple-50 to-indigo-50' : 'bg-slate-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-semibold ${
                    company.highlight ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {company.logo}
                  </div>
                  <div>
                    <h3 className={`text-base tracking-tight ${
                      company.highlight ? 'text-purple-700 font-semibold' : 'text-slate-800 font-medium'
                    }`}>
                      {company.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {company.tagline} · {company.origin}
                    </p>
                  </div>
                </div>
                {company.highlight && (
                  <div className="bg-purple-100 rounded-full p-1.5">
                    <Star size={16} className="text-purple-600" fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="p-5 border-b-2 border-slate-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 font-medium mb-1">Intro price</p>
                    <p className={`text-lg tracking-tight ${company.highlight ? 'text-purple-700 font-semibold' : 'text-slate-800 font-medium'}`}>
                      {company.price.offer}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium mb-1">Renewal</p>
                    <p className={`text-lg tracking-tight ${company.price.increase ? 'text-red-600 font-semibold' : 'text-emerald-600 font-semibold'}`}>
                      {company.price.renewal}
                    </p>
                    {company.price.renewalNote && (
                      <p className={`text-[11px] mt-0.5 font-semibold ${company.price.increase ? 'text-red-500' : 'text-emerald-600'}`}>
                        {company.price.renewalNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="p-5 space-y-3">
                {Object.entries(comparisonData.featureLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b-2 border-slate-200 last:border-0">
                    <span className="text-sm text-slate-700 font-medium">{label}</span>
                    <FeatureIndicator status={company.features[key]} highlight={company.highlight} />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => window.location.href = "/pricing"}
                  className={`w-full py-3 rounded-xl text-sm font-semibold tracking-tight transition-all ${
                    company.highlight
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-300/30'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  Get started with {company.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-start gap-2.5 bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-xl px-5 py-3.5 shadow-lg shadow-amber-100/30">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 text-left leading-relaxed font-medium">
              Prices are indicative and based on publicly available information at the time of comparison. 
              Actual prices may vary depending on plan duration, offers, region, and applicable taxes.
            </p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}