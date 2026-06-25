import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
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

const DURATIONS = [
  { months: 48, label: "Best Value", save: "Save 64%" },
  { months: 24, label: "Popular", save: "Save 45%" },
  { months: 12, label: "Standard", save: "Save 20%" },
  { months: 1, label: "Monthly", save: "" },
];

export default function WordpressConfigurePage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const { data: backendPlans, isLoading: plansLoading } = useBillingPlans();
  const plan = backendPlans?.find(
    (p) => (p.id || p._id)?.toString() === planId,
  );

  const [duration, setDuration] = useState(12);

  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  const { data: profile } = useProfile({ enabled: !!user });

  const isProcessing = createOrder.isPending || verifyPayment.isPending;

  /* ── Restore pending order state after login redirect ── */
  useEffect(() => {
    const pending = getPendingOrder();
    if (!pending || pending.service !== "wordpress") return;
    if (pending.planId?.toString() !== planId) return;
    if (pending.duration) setDuration(pending.duration);
    clearPendingOrder();
  }, [planId]);

  const getMonthlyBase = (m) => {
    const basePrice = (plan?.monthly || plan?.price) / 100;
    if (m === 48) return basePrice;
    if (m === 24) return Math.round(basePrice * 1.25);
    if (m === 12) return Math.round(basePrice * 1.5);
    return Math.round(basePrice * 2.5);
  };

  const currentMonthlyBase = plan ? getMonthlyBase(duration) : 0;
  const subtotal = currentMonthlyBase * duration;
  const taxes = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxes;

  const handleBack = () =>
    navigate(isAuthenticated ? "/wordpress-hostings" : "/wordpress-hosting");

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      savePendingOrder({
        service: "wordpress",
        planId: plan.id || plan._id,
        planName: plan.name,
        duration,
        amount: grandTotal,
        returnPath: `/wordpress/configure/${planId}`,
      });
      toast("Please login to continue your order", { duration: 3000 });
      navigate("/register", {
        state: {
          from: `/wordpress/configure/${planId}`,
          pendingOrder: true,
          message: "Login to complete your WordPress order",
        },
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
        duration,
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
            navigate("/websites/wordpress/paid");
          } catch (err) {
            console.error("Verification error:", err);
          }
        },
        prefill: {
          name: profile
            ? `${profile.firstName} ${profile.lastName}`
            : user?.name || "User",
          email: user?.email || "",
          contact: profile?.phone || "",
        },
        theme: { color: "#6366F1" },
        modal: { ondismiss: () => toast.error("Payment cancelled") },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  /* ── Loading ── */
  if (plansLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-3 text-sm text-slate-400">Loading plan details...</p>
        </div>
      </div>
    );
  }

  /* ── Plan not found ── */
  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="font-bold text-lg text-slate-900">Plan not found</p>
          <button
            onClick={() => navigate("/wordpress")}
            className="mt-3 text-indigo-600 text-sm hover:underline"
          >
            Back to WordPress Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-8 px-4"
      style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif" }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          border: "1.5px solid #CBD5E1",
          borderRadius: 8,
          background: "#fff",
          color: "#64748B",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 8,
          alignSelf: "flex-start",
          transition: "all .15s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6C63FF";
          e.currentTarget.style.color = "#6C63FF";
          e.currentTarget.style.background = "#F5F3FF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#CBD5E1";
          e.currentTarget.style.color = "#64748B";
          e.currentTarget.style.background = "#fff";
        }}
      >
        <ArrowLeft size={13} />
        Back
      </button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/60 to-white">
          <div>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.18em] mb-0.5">
              Billing Configuration
            </p>
            <p className="text-sm font-bold text-slate-900">
              {plan.name}{" "}
              <span className="text-slate-400 font-medium">
                · {duration} months
              </span>
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Duration picker */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Select Tenure
            </p>
            {DURATIONS.map((item) => {
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
                        isSelected
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <Check
                          size={9}
                          className="text-white"
                          strokeWidth={4}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          isSelected ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {item.months} Month{item.months > 1 ? "s" : ""}
                      </p>
                      {item.save && (
                        <p className="text-[10px] font-black text-emerald-600">
                          {item.save}
                        </p>
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-sm font-black ${
                      isSelected ? "text-indigo-600" : "text-slate-800"
                    }`}
                  >
                    ₹{price.toLocaleString()}
                    <span className="text-[10px] font-medium opacity-40 ml-0.5">
                      /mo
                    </span>
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="md:col-span-2 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Summary
              </p>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Subtotal · {duration}mo</span>
                <span className="text-slate-900 font-bold">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>GST (18%)</span>
                <span className="text-slate-700 font-bold">
                  ₹{taxes.toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Total
                </span>
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
            className="w-full py-3.5 bg-gradient-to-r cursor-pointer from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-indigo-200/60 transition-all duration-300 hover:shadow-xl hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Processing...
              </span>
            ) : (
              <>
                Complete Checkout <ArrowRight size={15} />
              </>
            )}
          </motion.button>
          <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
            Secured by Razorpay · 256-bit SSL encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
}
