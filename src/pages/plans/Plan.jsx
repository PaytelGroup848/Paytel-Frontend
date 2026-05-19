import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Check, Sparkles, Shield, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateOrder, useVerifyPayment, useBillingPlans } from "../../hooks/useBilling";
import { useMe } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { loadRazorpay } from "../../utils/razorpay";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { metaPixel } from "../../utils/metaPixel";

const TAX_RATE = 0.18;

/* ────────────────────────────── PlanModal (compact & professional) ────────────────────────────── */
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
              planType: 'wordpress'
            });
            metaPixel.purchase(orderData.amount / 100, 'INR');
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
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-20 sm:pt-24 p-4 bg-slate-900/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl border border-white/60 overflow-hidden flex flex-col"
      >
        {/* Header – smaller padding */}
        <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-white via-indigo-50/40 to-white">
          <div>
            <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-0.5">
              Billing Configuration
            </p>
            <p className="text-sm font-bold text-slate-900">
              {plan.name} <span className="text-slate-400 font-medium">· {duration} months</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition text-slate-400 hover:text-slate-900"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body – reduced padding and gap */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Duration options (3/5) */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Select tenure</p>
            {durations.map((item) => {
              const price = getMonthlyBase(item.months);
              const isSelected = duration === item.months;
              return (
                <motion.div
                  key={item.months}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDuration(item.months)}
                  className={`group p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-100/40"
                      : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-slate-200 group-hover:border-indigo-300"
                      }`}
                    >
                      {isSelected && <Check size={10} className="text-white" strokeWidth={4} />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.months} Months
                      </p>
                      {item.save && (
                        <p className="text-[10px] font-black text-emerald-600 tracking-tight">{item.save}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-black tracking-tight ${isSelected ? "text-indigo-600" : "text-slate-900"}`}>
                      ₹{price.toLocaleString()}
                      <span className="text-[10px] font-medium ml-0.5 opacity-40">/mo</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing summary (2/5) – compact */}
          <div className="md:col-span-2 bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-inner flex flex-col justify-center">
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Subtotal · {duration} months</span>
                <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>GST (18%)</span>
                <span className="text-emerald-600 font-bold">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button – smaller */}
        <div className="px-5 pb-5">
          <motion.button
            onClick={handleCheckout}
            disabled={isProcessing}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Processing...
              </span>
            ) : (
              <>
                Complete Checkout
                <ArrowRight size={14} />
              </>
            )}
          </motion.button>
          <p className="text-center text-[9px] text-slate-400 mt-2 font-medium">
            Secured by Razorpay · 256-bit SSL
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* ────────────────────────────── Main Plans (unchanged) ────────────────────────────── */
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
    <div className="relative min-h-screen bg-gradient-to-b from-white to-indigo-50/20 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[35rem] h-[35rem] bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 left-1/3 w-[30rem] h-[30rem] bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur-sm border border-indigo-200 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-widest shadow-sm mb-5">
            Pricing Plans
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05]">
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">website</span>.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            No hidden fees. Start building with confidence.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.name || index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="relative group"
              >
                {/* Gradient border wrapper */}
                <div
                  className={`absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-r opacity-75 group-hover:opacity-100 transition duration-300 blur-sm ${
                    isPopular
                      ? "from-indigo-500 via-purple-500 to-pink-500"
                      : "from-slate-300 to-slate-400 group-hover:from-indigo-300 group-hover:to-purple-400"
                  }`}
                />
                {/* Card content */}
                <div className="relative bg-white rounded-[2.4rem] p-8 h-full flex flex-col shadow-xl">
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black px-6 py-1.5 rounded-full shadow-xl shadow-indigo-300/50">
                        <Star size={14} className="text-amber-300" fill="currentColor" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{plan.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">Ideal for growing projects</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-black text-slate-900">
                      ₹{(plan.monthly || plan.price / 100).toLocaleString()}
                    </span>
                    <span className="text-slate-400 font-medium text-sm">/month</span>
                  </div>

                  <ul className="space-y-5 mb-10 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className={`p-1 rounded-full ${isPopular ? "bg-indigo-100" : "bg-slate-100"}`}>
                          <Check size={16} className="text-emerald-500 flex-shrink-0" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                    <li className="h-4" />
                  </ul>

                  <motion.button
                    onClick={() => setSelectedPlan(plan)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2
                      ${isPopular
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-400/50"
                        : "bg-slate-900 text-white shadow-md hover:bg-indigo-600 hover:shadow-lg"
                      }
                    `}
                  >
                    Choose {plan.name}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-20 text-center">
          <p className="inline-flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wider bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-200">
            <Shield size={14} className="text-emerald-500" />
            All plans include secure payments • No hidden fees
          </p>
        </div>
      </div>

      {/* PlanModal */}
      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  );
}