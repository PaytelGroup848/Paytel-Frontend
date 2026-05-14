import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Check, Sparkles, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateOrder, useVerifyPayment, useBillingPlans } from "../../hooks/useBilling";
import { useMe } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { loadRazorpay } from "../../utils/razorpay";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";

const TAX_RATE = 0.18;

// ---------- PlanModal ----------
const PlanModal = ({ plan, onClose }) => {
  const [duration, setDuration] = useState(12);
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  const { data: user } = useMe();
  const { data: profile } = useProfile();

  const isProcessing = createOrder.isPending || verifyPayment.isPending;

const handleCheckout = async () => {
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      //  Send WordPress-specific data
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
              planType: 'wordpress'
            });
            onClose();
            navigate("/websites/wordpress/paid");
          } catch (err) {
            console.error('Verification error:', err);
          }
        },
        prefill: {
          name: profile ? `${profile.firstName} ${profile.lastName}` : (user?.name || "User"),
          email: user?.email || "",
          contact: profile?.phone || "",
        },
        theme: { color: "#6366F1" },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  const durations = [
    { months: 48, label: "Best Value", save: "Save 64%" },
    { months: 24, label: "Popular", save: "Save 45%" },
    { months: 12, label: "Standard", save: "Save 20%" },
    { months: 1, label: "Monthly", save: "" },
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
  const subtotal = currentMonthlyBase * duration;
  const taxes = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxes;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-24 sm:pt-28 p-4 bg-slate-900/30 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-white/50 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-white via-indigo-50/30 to-white">
          <div>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
              Billing Configuration
            </p>
            <p className="text-base font-bold text-slate-900">
              {plan.name}{" "}
              <span className="text-slate-400 font-medium">Subscription</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-slate-900"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body – two columns, no internal scroll */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-5 ">
          {/* Duration selection (3/5) */}
          <div className="md:col-span-3 space-y-3">
            {durations.map((item) => {
              const price = getMonthlyBase(item.months);
              const isSelected = duration === item.months;
              return (
                <motion.div
                  key={item.months}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDuration(item.months)}
                  className={`group p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/50 shadow-[0_10px_25px_-5px_rgba(79,70,229,0.15)]"
                      : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-slate-200 group-hover:border-indigo-300"
                      }`}
                    >
                      {isSelected && (
                        <Check size={12} className="text-white" strokeWidth={4} />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.months} Months
                      </p>
                      {item.save && (
                        <p className="text-[11px] font-black text-indigo-600 tracking-tight">
                          {item.save}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-black tracking-tight ${isSelected ? "text-indigo-600" : "text-slate-900"}`}>
                      ₹{price.toLocaleString()}
                      <span className="text-[11px] font-medium ml-0.5 opacity-40">/mo</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing summary (2/5) */}
          <div className="md:col-span-2 bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Base subtotal</span>
                <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Govt. GST (18%)</span>
                <span className="text-emerald-600 font-bold">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="px-8 pb-8">
          <motion.button
            onClick={handleCheckout}
            disabled={isProcessing}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                Complete Checkout
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// ---------- Main Plans component ----------
export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: backendPlans, isLoading } = useBillingPlans();

  const plans = useMemo(() => {
    if (backendPlans && backendPlans.length > 0) {
      return backendPlans;
    }
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
        features: [
          "10 Domain Instances",
          "High-Speed Network",
          "Daily Snapshots",
          "Priority Support",
          "Auto-Scaling",
        ],
        popular: true,
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
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-4">
            
            Pricing
          </span>

          <h3 className="text-3x1 md:text-4xl font-black tracking-tighter text-slate-900 mb-4">
            Simple pricing.
            <br />
            <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              Serious performance.
            </span>
          </h3>

          <p className="text-md text-slate-500 max-w-md mx-auto">
            Choose the plan that fits your needs.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className={`relative bg-white rounded-3xl p-10 border transition-all duration-500 group ${
                plan.popular
                  ? "border-indigo-200 shadow-2xl shadow-indigo-100/70 scale-[1.02]"
                  : "border-slate-100 hover:border-slate-200 hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black px-8 py-2 rounded-full shadow-xl shadow-indigo-500/30 tracking-widest flex items-center gap-2">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-sm font-bold tracking-widest text-slate-400 mb-3 uppercase">
                  {plan.name}
                </h3>

                <div className="flex items-baseline">
                  <span className="text-6xl font-black tracking-tighter text-slate-900">
                    ₹{(plan.monthly || plan.price / 100).toLocaleString()}
                  </span>
                  <span className="text-slate-400 ml-2 font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 text-emerald-500 flex-shrink-0"
                      strokeWidth={3}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => setSelectedPlan(plan)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/40 hover:brightness-110"
                    : "bg-slate-900 text-white hover:bg-black"
                }`}
              >
                Choose {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xs text-slate-400 font-medium tracking-widest flex items-center justify-center gap-2">
            <Shield size={14} />
            ✓ All plans include secure payments • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>

      {/* PlanModal rendered only when a plan is selected */}
      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  );
}