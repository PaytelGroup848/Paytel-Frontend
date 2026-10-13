import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTallyPlans,
  useCreateTallyOrder,
  useVerifyTallyPayment,
} from "../../hooks/useTally";
import { useAuthStore } from "../../store/authStore";
import { useProfile } from "../../hooks/useProfile";
import { savePendingOrder } from "../../utils/pendingOrder";
import toast from "react-hot-toast";
import {
  Users,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Shield,
  ChevronRight,
  Zap,
} from "lucide-react";

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

// ─────────────────────────────────────────────────────────
// TENURE CONFIG — edit values here anytime, no schema change needed.
// plan.priceMonthly in DB = QUARTERLY price (in paise).
// quarters = how many quarters to multiply the quarterly price by.
// flatDiscount = flat amount (in paise) subtracted from that total.
//
// Current DB example: priceMonthly = 1100000 (₹11,000/quarter)
//   quarterly   -> 1100000 * 1 - 0        = ₹11,000
//   half_yearly -> 1100000 * 2 - 0        = ₹22,000
//   yearly      -> 1100000 * 4 - 1400000  = ₹30,000
// ─────────────────────────────────────────────────────────
const TENURE_OPTIONS = [
  {
    key: "quarterly",
    label: "Quarterly",
    months: 3,
    quarters: 1,
    flatDiscount: 0,
  },
  {
    key: "half_yearly",
    label: "Half Yearly",
    months: 6,
    quarters: 2,
    flatDiscount: 0,
  },
  {
    key: "yearly",
    label: "Yearly",
    months: 12,
    quarters: 4,
    flatDiscount: 1400000,
  },
];

// Calculate price for a plan + tenure (mirrors backend logic exactly)
const calcPrice = (plan, tenure) => {
  const quarterlyPrice = plan.priceMonthly || 0; // priceMonthly stores quarterly price
  const base = quarterlyPrice * tenure.quarters;
  const total = Math.max(0, Math.round(base - (tenure.flatDiscount || 0)));
  return total;
};

export default function TallyOnCloud() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { data: profile } = useProfile({ enabled: !!user });
  const { data: plans, isLoading } = useTallyPlans();
  const createOrderMutation = useCreateTallyOrder();
  const verifyMutation = useVerifyTallyPayment();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedTenure, setSelectedTenure] = useState(TENURE_OPTIONS[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = async (plan) => {
    if (!isAuthenticated) {
      savePendingOrder({
        service: "tally",
        planId: plan.id || plan._id,
        planName: plan.name,
        tenure: selectedTenure.key,
        returnPath: "/tally-on-cloud",
      });
      toast("Please login to continue", { duration: 3000 });
      navigate("/login", {
        state: { from: "/tally-on-cloud", pendingOrder: true },
      });
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay not loaded. Please refresh.");
      return;
    }

    setIsProcessing(true);
    setSelectedPlan(plan);

    try {
      const orderData = await createOrderMutation.mutateAsync({
        planId: plan.id || plan._id,
        tenure: selectedTenure.key, // "quarterly" | "half_yearly" | "yearly"
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "CloudeData — ERP On Cloud",
        description: `${plan.name} — ${plan.maxUsers || 10} Users — ${selectedTenure.label}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await verifyMutation.mutateAsync({
              instanceId: orderData.instanceId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment successful! ERP subscription activated.");
            navigate("/payment-history");
          } catch (err) {
            console.error("Verify error:", err);
          } finally {
            setIsProcessing(false);
            setSelectedPlan(null);
          }
        },
        prefill: {
          name: profile
            ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
            : user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: { color: "#2563EB" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setSelectedPlan(null);
            toast.error("Payment cancelled");
          },
        },
        notes: {
          swift_bic: "YESBINBBXXX",
          service: "ERP on Cloud",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Order error:", err);
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading ERP plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            ERP&nbsp;
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              On Cloud
            </span>
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Fully managed Tally, Busy, Marg hosted solution. Multi-user access,
            Windows Server, enterprise-grade infrastructure.
          </p>
        </div>

        {/* Tenure Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm flex gap-1">
            {TENURE_OPTIONS.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTenure(t)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedTenure.key === t.key
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {t.label}
                {t.flatDiscount > 0 && (
                  <span
                    className={`ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                      selectedTenure.key === t.key
                        ? "bg-white/20 text-white"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    SAVE {formatINR(t.flatDiscount)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        {!plans || plans.length === 0 ? (
          <div className="text-center py-20">
            <Server size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No ERP plans available</p>
            <p className="text-slate-400 text-sm mt-1">
              Please contact support for pricing.
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              plans.length === 1
                ? "max-w-sm mx-auto"
                : plans.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {plans.map((plan, idx) => {
              const totalPrice = calcPrice(plan, selectedTenure);
              const naiveTotal =
                (plan.priceMonthly || 0) * selectedTenure.quarters;
              const savings = Math.max(0, naiveTotal - totalPrice);
              const isThisProcessing =
                isProcessing && selectedPlan?._id === (plan.id || plan._id);
              const isPopular = idx === 0 && plans.length > 1;

              return (
                <div
                  key={plan.id || plan._id}
                  className={`relative bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-xl ${
                    isPopular
                      ? "border-blue-300 shadow-lg shadow-blue-100/70 ring-2 ring-blue-200"
                      : "border-slate-200 shadow-md hover:border-blue-200"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-5 py-1 rounded-b-xl">
                        RECOMMENDED
                      </div>
                    </div>
                  )}

                  <div
                    className={`h-1 w-full ${isPopular ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-slate-200 to-slate-300"}`}
                  />

                  <div className={`p-6 ${isPopular ? "pt-8" : "pt-6"}`}>
                    {/* Plan name + badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-black text-slate-800">
                          {plan.name}
                        </h3>
                        {plan.description && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {plan.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900">
                          {formatINR(totalPrice)}
                        </span>
                        <span className="text-slate-400 text-sm">
                          / {selectedTenure.label.toLowerCase()}
                        </span>
                      </div>
                      {savings > 0 && (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          You save {formatINR(savings)} vs quarterly billing
                        </p>
                      )}
                    </div>

                    {/* Specs */}
                    <div className="space-y-3 mb-6">
                      {[
                        {
                          icon: Users,
                          label: "Concurrent Users",
                          value: `${plan.maxUsers || 10} Users`,
                        },
                        {
                          icon: Cpu,
                          label: "vCPU",
                          value: `${plan.vcpu} Cores`,
                        },
                        { icon: MemoryStick, label: "RAM", value: plan.ram },
                        {
                          icon: HardDrive,
                          label: "NVMe Storage",
                          value: plan.storage,
                        },
                        // {
                        //   icon: Server,
                        //   label: "OS",
                        //   value: "Windows Server 2019",
                        // },
                        {
                          icon: Shield,
                          label: "Backups",
                          value: plan.backups || "Weekly",
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="p-1 rounded-md bg-blue-50 text-blue-600 flex-shrink-0">
                              <Icon size={11} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                              {label}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleBuyNow(plan)}
                      disabled={
                        isThisProcessing ||
                        (isProcessing &&
                          selectedPlan?._id !== (plan.id || plan._id))
                      }
                      className={`w-full py-3 cursor-pointer rounded-xl text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isPopular
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl"
                          : "bg-green-800 text-white hover:bg-grren-700 shadow-md"
                      }`}
                    >
                      {isThisProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Buy Now
                          <ChevronRight size={14} />
                        </>
                      )}
                    </button>

                    {/* No GST note */}
                    <p className="text-center text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                      <Zap size={10} />
                      No GST · International billing · SWIFT: YESBINBBXXX
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
