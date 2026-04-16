import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateOrder, useVerifyPayment, useBillingPlans } from "../../hooks/useBilling";
import { loadRazorpay } from "../../utils/razorpay";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";

const TAX_RATE = 0.18;

const PlanModal = ({ plan, onClose }) => {
  const [duration, setDuration] = useState(48);
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const isProcessing = createOrder.isPending || verifyPayment.isPending;

  const handleCheckout = async () => {
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const orderData = await createOrder.mutateAsync({
        planId: plan.id,
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Paytel SaaS",
        description: `${plan.name} Plan - ${duration} Months`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await verifyPayment.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            onClose();
            navigate("/billing");
          } catch (err) {
            // Error handled by mutation onError
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      // Error handled by mutation onError
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Modal Header with Subtle Gradient */}
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-white to-slate-50">
          <div>
            <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Billing Configuration</h2>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {plan.name} <span className="text-slate-400 font-medium">Subscription</span>
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all text-slate-400 hover:text-slate-900">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {/* Duration Selection */}
          <div className="space-y-3">
            {durations.map((item) => {
              const price = getMonthlyBase(item.months);
              const isSelected = duration === item.months;
              return (
                <div 
                  key={item.months}
                  onClick={() => setDuration(item.months)}
                  className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? "border-indigo-500 bg-white shadow-[0_10px_25px_-5px_rgba(79,70,229,0.1)]" 
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-indigo-600" : "border-slate-200"}`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-in zoom-in duration-200" />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.months} Months
                      </p>
                      {item.save && <p className="text-[10px] font-black text-indigo-600 tracking-tight">{item.save}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                     <p className={`text-sm font-black tracking-tight ${isSelected ? "text-indigo-600" : "text-slate-900"}`}>
                        ₹{price.toLocaleString()}
                        <span className="text-[10px] font-medium ml-0.5 opacity-40">/mo</span>
                     </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Summary Breakdown */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner">
             <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                   <span>Base subtotal</span>
                   <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                   <span>Govt. GST (18%)</span>
                   <span className="text-green-600 font-bold">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="pt-4 mt-1 border-t border-slate-200 flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
                   <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      ₹{grandTotal.toLocaleString()}
                   </span>
                </div>
             </div>
          </div>
        </div>

        {/* Action Button with Gradient */}
        <div className="p-8 bg-white border-t border-slate-50">
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Complete Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-white font-sans antialiased">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.125em] mb-4">
            Pricing
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-4">
            Simple pricing.<br />
            <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              Serious performance.
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-md mx-auto">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {console.log("this is my plans",plans)}
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
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black px-8 py-2 rounded-full shadow-xl shadow-indigo-500/30 tracking-widest">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-12">
                <h3 className="text-sm font-bold tracking-widest text-slate-400 mb-3">{plan.name}</h3>
              
                <div className="flex items-baseline">
                  <span className="text-6xl font-black tracking-tighter text-slate-900">
  ₹{(plan.price / 100).toLocaleString()}
</span>
                  {console.log("this is my plan",plan)}
                  <span className="text-slate-400 ml-2 font-medium">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
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
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/40 hover:brightness-105"
                    : "bg-slate-900 text-white hover:bg-black"
                }`}
              >
                Choose {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xs text-slate-400 font-medium tracking-widest">
            ✓ All plans include secure payments • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>

      <PlanModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
}