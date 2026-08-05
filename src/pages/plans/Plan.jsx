import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Sparkles,
  Shield,
  Star,
  ArrowRight,
  Zap,
  Globe,
  Lock,
  RefreshCw,
  Truck,
  Layout,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateOrder,
  useVerifyPayment,
  useBillingPlans,
} from "../../hooks/useBilling";
import { useProfile } from "../../hooks/useProfile";
import { loadRazorpay } from "../../utils/razorpay";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { metaPixel } from "../../utils/metaPixel";
import { useAuthStore } from "../../store/authStore";
import {
  savePendingOrder,
  getPendingOrder,
  clearPendingOrder,
} from "../../utils/pendingOrder";

const TAX_RATE = 0.18;

/* ─── What You Get — common features shown below cards ─── */
const commonFeatures = [
  {
    icon: Layout,
    title: "Drag-and-drop website builder",
    desc: "Build pages visually without writing a single line of code.",
  },
  {
    icon: Lock,
    title: "Free SSL on every site",
    desc: "Keep every site safe with automatic HTTPS and browser trust badges.",
  },
  {
    icon: RefreshCw,
    title: "Weekly auto backups",
    desc: "Automatic weekly snapshots so you can restore in one click.",
  },
  {
    icon: Truck,
    title: "Free site migration",
    desc: "We migrate your existing site for free with zero downtime.",
  },
  {
    icon: Zap,
    title: "WordPress maintained for you",
    desc: "Core updates, plugin patches and security checks — handled.",
  },
  {
    icon: Globe,
    title: "Global CDN included",
    desc: "Content delivered fast from 30+ edge locations worldwide.",
  },
];

const discountLabels = ["20% off", "45% off", "64% off", "70% off"];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: backendPlans, isLoading } = useBillingPlans();
  const navigate = useNavigate();

  const plans = useMemo(() => {
    if (backendPlans && backendPlans.length > 0) return backendPlans;
    return [
      {
        id: "661d4a8e2f3a1c001f8e4a01",
        name: "Starter",
        monthly: 199,
        features: [
          "1 Domain Instance",
          "Standard Network",
          "Cloud Backup",
          "24/7 Access",
        ],
      },
      {
        id: "661d4a8e2f3a1c001f8e4a02",
        name: "Pro",
        monthly: 399,
        features: [
          "10 Domain Instances",
          "High-Speed Network",
          "Daily Snapshots",
          "Priority Support",
          "Auto-Scaling",
        ],
      },
      {
        id: "661d4a8e2f3a1c001f8e4a03",
        name: "Business",
        monthly: 699,
        features: [
          "Unlimited Instances",
          "Dedicated Infrastructure",
          "Hourly Backups",
          "VIP Support",
          "Custom Security",
        ],
      },
    ];
  }, [backendPlans]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="relative z-10  px-4 sm:px-6 lg:px-10 py-5 md:py-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center mb-14"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.06] mb-1">
          Pick the plan that fits{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
            your growth
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-normal">
          All plans include free SSL, daily backups &amp; 24/7 support.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
        {plans.map((plan, index) => {
          const isPopular = plan.name === "Standard";
          const monthlyPrice = plan.monthly || plan.price / 100;
          const discountLabel = discountLabels[index] || "20% off";

          return (
            <motion.div
              key={plan.name || index}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative group flex flex-col"
            >
              {isPopular && (
                <div className="absolute -top-px left-0 right-0 z-20 flex justify-center">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-5 py-1 rounded-b-xl flex items-center gap-1.5 shadow-md">
                    <Star className="w-3 h-3" fill="currentColor" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isPopular
                    ? "border-indigo-400 shadow-xl shadow-indigo-100/60 bg-white"
                    : "border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 bg-white"
                }`}
              >
                <div
                  className={`h-1 w-full ${
                    isPopular
                      ? "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"
                      : "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                  }`}
                />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                        WordPress Hosting
                      </p>
                    </div>
                    <span
                      className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
                      style={{
                        background: isPopular ? "#eef2ff" : "#f0fdf4",
                        color: isPopular ? "#4f46e5" : "#16a34a",
                      }}
                    >
                      {discountLabel}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[13px] font-semibold text-slate-400">
                        ₹
                      </span>
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-400 font-medium">
                        /mo
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Billed annually · incl. taxes
                    </p>
                  </div>

                  <div className="h-px bg-slate-100 mb-5" />

                  <ul className="flex-1 space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{
                            background: isPopular ? "#eef2ff" : "#f0fdf4",
                          }}
                        >
                          <Check
                            size={10}
                            strokeWidth={3.5}
                            style={{
                              color: isPopular ? "#6366f1" : "#22c55e",
                            }}
                          />
                        </span>
                        <span className="text-[13px] text-slate-600 font-medium leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() =>
                      navigate(`/wordpress/configure/${plan.id || plan._id}`)
                    }
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                          flex items-center justify-center gap-2 group-hover:gap-3
                          ${
                            isPopular
                              ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300"
                              : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
                          }`}
                  >
                    Get {plan.name}
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
