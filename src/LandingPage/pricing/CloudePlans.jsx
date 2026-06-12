import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Check, Sparkles, ArrowRight, Cpu, HardDrive, Users, Server,
} from "lucide-react";

/* ── Data (unchanged) ───────────────────────────── */
const pricingData = {
  "Linux VPS": {
    columns: ["Plan", "vCPU", "RAM (GB)", "Storage (GB)", "Monthly", "Yearly", "2 Yearly", "3 Yearly"],
    plans: [
      { name: "Starter", vCPU: 2, ram: 4, storage: 60, monthly: 899, yearly: 8988, twoYearly: 14376, threeYearly: 19764 },
      { name: "Business", vCPU: 4, ram: 8, storage: 100, monthly: 1299, yearly: 12996, twoYearly: 19992, threeYearly: 32364 },
      { name: "Pro", vCPU: 6, ram: 16, storage: 200, monthly: 2999, yearly: 26388, twoYearly: 45600, threeYearly: 64764 },
      { name: "Ultra", vCPU: 12, ram: 64, storage: 500, monthly: 7999, yearly: 81588, twoYearly: 119976, threeYearly: 161964 },
    ],
    formatPrice: (price) => `₹${price.toLocaleString()}/mo`,
    popular: 2,
  },
  "Windows VPS": {
    columns: ["Plan", "vCPU", "RAM (GB)", "Storage (GB)", "Monthly", "Quarterly", "Annually"],
    plans: [
      { name: "Windows-Small 1", vCPU: 2, ram: 4, storage: 40, monthly: 1500, quarterly: 4500, annually: 18000 },
      { name: "Windows-Small 2", vCPU: 3, ram: 6, storage: 60, monthly: 2000, quarterly: 6000, annually: 24000 },
      { name: "Windows-Medium 1", vCPU: 4, ram: 8, storage: 80, monthly: 4200, quarterly: 12600, annually: 50400 },
      { name: "Windows-Medium 2", vCPU: 4, ram: 12, storage: 100, monthly: 5600, quarterly: 16800, annually: 67200 },
      { name: "Windows-Large 1", vCPU: 8, ram: 16, storage: 120, monthly: 11500, quarterly: 34500, annually: 138000 },
      { name: "Windows-Large 2", vCPU: 8, ram: 32, storage: 200, monthly: 13000, quarterly: 39000, annually: 156000 },
    ],
    formatPrice: (price) => `₹${price.toLocaleString()}/mo`,
    popular: 3,
  },
  "Tally on Cloud": {
    columns: ["Processor(vCPU)", "RAM (GB)", "Storage (GB)", "User", "Half Yearly", "Yearly"],
    plans: [
      { vCPU: 2, ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
      { vCPU: 4, ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
      { vCPU: 6, ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
      { vCPU: 8, ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500 },
      { vCPU: 10, ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
      { vCPU: 12, ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
      { vCPU: 16, ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
    ],
    formatPrice: (price) => `₹${price.toLocaleString()}`,
    popular: 2,
  },
  "Busy on Cloud": {
    columns: ["Processor(vCPU)", "RAM (GB)", "Storage (GB)", "User", "Half Yearly", "Yearly"],
    plans: [
      { vCPU: 2, ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
      { vCPU: 4, ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
      { vCPU: 6, ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
      { vCPU: 8, ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500 },
      { vCPU: 10, ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
      { vCPU: 12, ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
      { vCPU: 16, ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
    ],
    formatPrice: (price) => `₹${price.toLocaleString()}`,
    popular: 2,
  },
  "Marg on Cloud": {
    columns: ["Processor(vCPU)", "RAM (GB)", "Storage (GB)", "User", "Half Yearly", "Yearly"],
    plans: [
      { vCPU: 2, ram: 4, storage: 40, users: 3, halfYearly: 6000, yearly: 10800 },
      { vCPU: 4, ram: 8, storage: 50, users: 6, halfYearly: 10200, yearly: 17500 },
      { vCPU: 6, ram: 12, storage: 60, users: 9, halfYearly: 15700, yearly: 28000 },
      { vCPU: 8, ram: 16, storage: 80, users: 12, halfYearly: 20900, yearly: 35500 },
      { vCPU: 10, ram: 20, storage: 90, users: 15, halfYearly: 26000, yearly: 45000 },
      { vCPU: 12, ram: 24, storage: 110, users: 18, halfYearly: 31600, yearly: 54000 },
      { vCPU: 16, ram: 32, storage: 150, users: 25, halfYearly: 42000, yearly: 75000 },
    ],
    formatPrice: (price) => `₹${price.toLocaleString()}`,
    popular: 2,
  },
};

/* ── Icon mapping for specs ─────────────────────── */
const specIcons = {
  vCPU: Cpu,
  ram: HardDrive,
  storage: Server,
  users: Users,
};

/* ── Tabs with subtle icon styling ──────────────── */
const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = Object.keys(pricingData);
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === tab
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30"
              : "bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

/* ── Plan Card (with icons and improved styling) ── */
const PlanCard = ({
  plan,
  index,
  formatPrice,
  isPopular,
  serviceType,
  onSelectPlan,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`relative group bg-white rounded-2xl border ${
        isPopular
          ? "border-blue-400 shadow-2xl shadow-blue-100/60 scale-[1.02]"
          : "border-slate-200 shadow-md hover:shadow-2xl hover:border-blue-300"
      } p-6 flex flex-col transition-all duration-300 hover:-translate-y-2`}
    >
      {/* Most Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xl shadow-indigo-300/50">
          Most Popular
        </div>
      )}

      {/* Plan header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-slate-800">
          {plan.name || `${plan.vCPU} Core`}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {serviceType.includes("VPS") ? "Virtual Private Server" : "Cloud ERP"}
        </p>
      </div>

      {/* Specs with icons */}
      <div className="space-y-4 mb-6 flex-1">
        {plan.vCPU && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Cpu size={16} className="text-blue-700" />
            </div>
            <span className="text-slate-500 flex-1">Processor</span>
            <span className="font-semibold text-slate-700">{plan.vCPU} vCPU</span>
          </div>
        )}
        {plan.ram && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <HardDrive size={16} className="text-indigo-700" />
            </div>
            <span className="text-slate-500 flex-1">Memory</span>
            <span className="font-semibold text-slate-700">{plan.ram} GB</span>
          </div>
        )}
        {plan.storage && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
              <Server size={16} className="text-cyan-700" />
            </div>
            <span className="text-slate-500 flex-1">Storage</span>
            <span className="font-semibold text-slate-700">{plan.storage} GB SSD</span>
          </div>
        )}
        {plan.users && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Users size={16} className="text-purple-700" />
            </div>
            <span className="text-slate-500 flex-1">Users</span>
            <span className="font-semibold text-slate-700">{plan.users}</span>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="border-t border-slate-100 pt-5 mb-5">
        {plan.monthly && (
          <div>
            <p className="text-3xl font-extrabold text-slate-900">
              {formatPrice(plan.monthly)}
            </p>
            <div className="space-y-0.5 mt-2">
              {plan.yearly && (
                <p className="text-xs text-slate-500">
                  Yearly: {formatPrice(plan.yearly)}
                </p>
              )}
              {plan.halfYearly && (
                <p className="text-xs text-slate-500">
                  Half Yearly: {formatPrice(plan.halfYearly)}
                </p>
              )}
              {plan.quarterly && (
                <p className="text-xs text-slate-500">
                  Quarterly: {formatPrice(plan.quarterly)}
                </p>
              )}
              {plan.twoYearly && (
                <p className="text-xs text-slate-500">
                  2 Years: {formatPrice(plan.twoYearly)}
                </p>
              )}
              {plan.threeYearly && (
                <p className="text-xs text-slate-500">
                  3 Years: {formatPrice(plan.threeYearly)}
                </p>
              )}
              {plan.annually && (
                <p className="text-xs text-slate-500">
                  Annually: {formatPrice(plan.annually)}
                </p>
              )}
            </div>
          </div>
        )}

        {!plan.monthly && (plan.yearly || plan.halfYearly) && (
          <div>
            <p className="text-3xl font-extrabold text-slate-900">
              {formatPrice(plan.yearly || plan.halfYearly)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {plan.yearly ? "Yearly billing" : "Half Yearly billing"}
            </p>
            {plan.halfYearly && plan.yearly && (
              <p className="text-xs text-slate-500">
                Half Yearly: {formatPrice(plan.halfYearly)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* CTA Button */}
     <button
  onClick={() => {
    if (
      serviceType === "Linux VPS" ||
      serviceType === "Windows VPS"
    ) {
      onSelectPlan(
        {
          id: `${serviceType}-${index}`,
          name: plan.name,
          vcpu: plan.vCPU,
          ram: `${plan.ram} GB`,
          storage: `${plan.storage} GB SSD`,
          priceMonthly: plan.monthly
            ? plan.monthly * 100
            : (plan.yearly || plan.halfYearly || 0) * 100,
          portSpeed: "1 Gbps",
          backups: "Included",
        },
        serviceType === "Linux VPS" ? "linux" : "windows"
      );
    }
  }}
  className={`mt-auto w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
    isPopular
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.03]"
      : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
  }`}
>
  {isPopular ? "Get Started Now" : "Buy Now"}
  <ArrowRight size={16} />
</button>
    </motion.div>
  );
};

/* ── Main Section ──────────────────────────────── */
export default function CloudePlans() {
  const [activeTab, setActiveTab] = useState("Linux VPS");
  const navigate = useNavigate();
  const currentData = pricingData[activeTab];

  return (
    <section className="relative w-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 py-10 px-4 overflow-hidden">
      {/* Decorative blur orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-80 h-80 bg-blue-300/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Cloude Plans
          </h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Flexible pricing for every business. Scale up anytime, transparent billing, no hidden costs.
          </p>
        </motion.div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentData.plans.map((plan, idx) => (
             <PlanCard
  key={idx}
  plan={plan}
  index={idx}
  formatPrice={currentData.formatPrice}
  isPopular={idx === currentData.popular}
  serviceType={activeTab}
  onSelectPlan={(planData, type) => {
    // If it's VPS, navigate to configure page
    if (activeTab.includes("VPS")) {
      // Need a way to get actual plan ID if possible, but these are static landing page plans
      // For now, using a slugified name as ID or a placeholder if actual ID isn't available
      // The VPS plans in landing page usually correspond to some backend plans
      // For landing page static plans, we might need to redirect to /vps first or have a mapping
      navigate(`/vps/configure/${type}/${planData.id}`);
    }
  }}
/>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}