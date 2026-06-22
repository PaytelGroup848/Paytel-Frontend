import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, Shield, Star, ArrowRight, Zap, Globe, Lock, RefreshCw, Truck, Layout } from "lucide-react";
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

/* ─── Discount label per plan index ─── */
const discountLabels = ["20% off", "45% off", "64% off", "70% off"];

/* ══════════════════════════════════════════
   PlanModal — backend logic untouched
══════════════════════════════════════════ */
const PlanModal = ({ plan, onClose }) => {
  const [duration, setDuration] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;
    const pending = getPendingOrder();
    if (!pending || pending.service !== "wordpress") return;
    if (pending.duration) setDuration(pending.duration);
    clearPendingOrder();
  }, [isAuthenticated, plan]);

  const { data: profile } = useProfile({ enabled: !!user });

  const isProcessing = createOrder.isPending || verifyPayment.isPending;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      savePendingOrder({
        service: "wordpress",
        planId: plan.id || plan._id,
        planName: plan.name,
        duration: duration,
        amount: grandTotal,
      });
      navigate("/register", {
        state: { from: "/wordpress/domainEnter", pendingOrder: true },
      });
      return;
    }
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }
      metaPixel.initiateCheckout();
      const orderData = await createOrder.mutateAsync({
        planId: plan.id || plan._id,
        duration: duration,
        userEmail: user?.email,
      });
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CloudeData",
        description: `${plan.name} Plan - ${duration} Months`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await verifyPayment.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planType: "wordpress",
            });
            metaPixel.purchase(orderData.amount / 100, "INR");
            onClose();
            navigate("/websites/wordpress/paid");
          } catch (err) {
            console.error("Verification error:", err);
          }
        },
        prefill: {
          name: profile ? `${profile.firstName} ${profile.lastName}` : user?.name || "User",
          email: user?.email || "",
          contact: profile?.phone || "",
        },
        theme: { color: "#6366F1" },
        modal: { ondismiss: () => toast.error("Payment cancelled") },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const durations = [
    { months: 48, label: "Best Value", save: "Save 64%" },
    { months: 24, label: "Popular",    save: "Save 45%" },
    { months: 12, label: "Standard",   save: "Save 20%" },
    { months: 1,  label: "Monthly",    save: "" },
  ];

  if (!plan) return null;

  const getMonthlyBase = (m) => {
    const basePrice = (plan.monthly || plan.price) / 100;
    if (m === 48) return basePrice;
    if (m === 24) return Math.round(basePrice * 1.25);
    if (m === 12) return Math.round(basePrice * 1.5);
    return Math.round(basePrice * 2.5);
  };

  const currentMonthlyBase = getMonthlyBase(duration);
  const subtotal  = currentMonthlyBase * duration;
  const taxes     = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxes;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-16 sm:pt-20 p-4 bg-slate-900/50 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/60 to-white">
          <div>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.18em] mb-0.5">
              Billing Configuration
            </p>
            <p className="text-sm font-bold text-slate-900">
              {plan.name}{" "}
              <span className="text-slate-400 font-medium">· {duration} months</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
          >
            <X size={17} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Duration picker */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Select tenure
            </p>
            {durations.map((item) => {
              const price = getMonthlyBase(item.months);
              const isSelected = duration === item.months;
              return (
                <motion.div
                  key={item.months}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDuration(item.months)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/70 shadow-sm shadow-indigo-100"
                      : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                      }`}
                    >
                      {isSelected && <Check size={9} className="text-white" strokeWidth={4} />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.months} Month{item.months > 1 ? "s" : ""}
                      </p>
                      {item.save && (
                        <p className="text-[10px] font-black text-emerald-600">{item.save}</p>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm font-black ${isSelected ? "text-indigo-600" : "text-slate-800"}`}>
                    ₹{price.toLocaleString()}
                    <span className="text-[10px] font-medium opacity-40 ml-0.5">/mo</span>
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="md:col-span-2 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Summary</p>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Subtotal · {duration}mo</span>
                <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>GST (18%)</span>
                <span className="text-slate-700 font-bold">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 text-center font-medium">
              Includes GST · Billed once
            </p>
          </div>
        </div>

        {/* Checkout */}
        <div className="px-5 pb-5 pt-1">
          <motion.button
            onClick={handleCheckout}
            disabled={isProcessing}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-indigo-200/60 transition-all duration-300 hover:shadow-xl hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2"><Spinner size="sm" /> Processing...</span>
            ) : (
              <><ArrowRight size={15} /> Complete Checkout</>
            )}
          </motion.button>
          <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
            🔒 Secured by Razorpay · 256-bit SSL encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ══════════════════════════════════════════
   Main Plans component
══════════════════════════════════════════ */
export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: backendPlans, isLoading } = useBillingPlans();

  const plans = useMemo(() => {
    if (backendPlans && backendPlans.length > 0) return backendPlans;
    return [
      {
        id: "661d4a8e2f3a1c001f8e4a01",
        name: "Starter",
        monthly: 199,
        features: ["1 Domain Instance", "Standard Network", "Cloud Backup", "24/7 Access"],
      },
      {
        id: "661d4a8e2f3a1c001f8e4a02",
        name: "Pro",
        monthly: 399,
        features: ["10 Domain Instances", "High-Speed Network", "Daily Snapshots", "Priority Support", "Auto-Scaling"],
        popular: true,
      },
      {
        id: "661d4a8e2f3a1c001f8e4a03",
        name: "Business",
        monthly: 699,
        features: ["Unlimited Instances", "Dedicated Infrastructure", "Hourly Backups", "VIP Support", "Custom Security"],
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
    <div
      id="plans"
      className="relative min-h-screen bg-white font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900"
      style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,-apple-system,sans-serif" }}
    >
      {/* Subtle top gradient wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-slate-50 to-white" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] font-bold text-indigo-600 uppercase tracking-[0.14em] mb-5">
            WordPress Hosting Plans
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.06] mb-4">
            Pick the plan that fits{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              your growth
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-normal">
            All plans include free SSL, daily backups &amp; 24/7 support. No hidden charges.
          </p>
        </motion.div>

        {/* ── Plans grid — full width, 90vw-ish via max-w-[1400px] ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            const monthlyPrice = (plan.monthly || plan.price / 100);
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
                {/* Popular ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center z-20">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-bold px-5 py-1 rounded-full shadow-lg shadow-indigo-300/50 tracking-wide">
                      <Star size={12} fill="currentColor" className="text-amber-300" />
                      MOST POPULAR
                    </span>
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
                  {/* Top colour strip for popular */}
                  {isPopular && (
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                  )}

                  <div className="flex flex-col flex-1 p-6">
                    {/* Plan name + discount badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
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
                        <span className="text-[13px] font-semibold text-slate-400">₹</span>
                        <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                          {monthlyPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-400 font-medium">/mo</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Billed annually · incl. taxes
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mb-5" />

                    {/* Features */}
                    <ul className="flex-1 space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                            style={{ background: isPopular ? "#eef2ff" : "#f0fdf4" }}
                          >
                            <Check
                              size={10}
                              strokeWidth={3.5}
                              style={{ color: isPopular ? "#6366f1" : "#22c55e" }}
                            />
                          </span>
                          <span className="text-[13px] text-slate-600 font-medium leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      onClick={() => setSelectedPlan(plan)}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3 rounded-xl text-[13px] font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                        isPopular
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200/60 hover:shadow-xl hover:from-indigo-700 hover:to-violet-700"
                          : "bg-slate-900 text-white hover:bg-indigo-600"
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

        {/* Money-back strip */}
        <div className="mt-10 flex justify-center">
          <p className="inline-flex items-center gap-2 text-[12px] text-slate-500 font-medium bg-slate-50 border border-slate-200 rounded-full px-5 py-2">
            <Shield size={14} className="text-emerald-500" />
            30-day money-back guarantee · No hidden fees · Cancel anytime
          </p>
        </div>

        {/* ══════════════════════════════════════
             What You Get — common features
        ══════════════════════════════════════ */}
        <div className="mt-10">
          {/* Section label */}
          <div className="text-center mb-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Everything you need,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                out of the box
              </span>
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-lg mx-auto">
              Every WordPress plan comes loaded with tools that save you time and keep your sites running perfectly.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {commonFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                  <feat.icon size={19} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-slate-900 mb-1">{feat.title}</h4>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed font-normal">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* PlanModal — untouched logic */}
      <AnimatePresence>
        {selectedPlan && (
          <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}