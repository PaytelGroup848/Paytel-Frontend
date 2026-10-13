// frontend/src/components/RenewModal.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RefreshCw,
  Calendar,
  Shield,
  ChevronRight,
  ArrowRight,
  Globe,
  Server,
  Cpu,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Loader2,
} from "lucide-react";
import {
  useRenewalDetails,
  useCreateRenewalOrder,
  useVerifyRenewalPayment,
} from "../hooks/useBilling";
import { useAuthStore } from "../store/authStore";
import { useProfile } from "../hooks/useProfile";
import toast from "react-hot-toast";

export default function RenewModal({ subscription, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [orderDataState, setOrderDataState] = useState(null);
  const { user } = useAuthStore();
  const { data: profile } = useProfile({ enabled: !!user });

  // ✅ Use backend API for renewal details
  const {
    data: renewalData,
    isLoading: isLoadingRenewal,
    error: renewalError,
  } = useRenewalDetails(subscription?.id || subscription?._id);

  const createRenewalOrder = useCreateRenewalOrder();
  const verifyRenewalPayment = useVerifyRenewalPayment();

  const isProcessing =
    createRenewalOrder.isPending || verifyRenewalPayment.isPending;

  if (!subscription) return null;

  // ✅ Set default selected option when data loads
  useEffect(() => {
    if (renewalData?.renewalOptions?.length > 0) {
      // Default to 1 Month or first option
      const defaultOption =
        renewalData.renewalOptions.find((opt) => opt.period === "1 Month") ||
        renewalData.renewalOptions[0];
      setSelectedOption(defaultOption);
    }
  }, [renewalData]);

  // Get data from subscription
  const planType = subscription.type || "wordpress";
  const isSuspended =
    subscription.status === "suspended" ||
    subscription.status === "Suspended" ||
    subscription.status === "Expired";
  const currentExpiry =
    subscription.expiresAt ||
    subscription.expirationDate ||
    subscription.endDate;

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // In RenewModal.jsx - handleRenew function

  const handleRenew = async () => {
    if (!window.Razorpay) {
      toast.error("Razorpay not loaded — please refresh");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select a renewal period");
      return;
    }

    try {
      const orderData = await createRenewalOrder.mutateAsync({
        subscriptionId: subscription.id || subscription._id,
        tenureMonths: selectedOption.months,
        selectedPeriod: selectedOption.period,
      });

      setOrderDataState(orderData);

      //  Use keyId from backend response
      const options = {
        key: orderData.keyId || process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: Math.round(orderData.amount * 100),
        currency: orderData.currency || "INR",
        name: "Paytel Hosting",
        description: `Renewal — ${subscription.planName || subscription.identifier} (${selectedOption.period})`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await verifyRenewalPayment.mutateAsync({
              subscriptionId: subscription.id || subscription._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              tenureMonths: selectedOption.months,
            });
            onClose();
          } catch (err) {
            console.error("Verify error:", err);
          }
        },
        prefill: {
          name: profile
            ? `${profile.firstName} ${profile.lastName}`
            : user?.name || "",
          email: user?.email || "",
          contact: profile?.phone || user?.phone || "",
        },
        theme: { color: "#4F46E5" },
        modal: { ondismiss: () => toast.error("Payment cancelled") },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Renewal error:", err);
    }
  };

  //  Loading state
  if (isLoadingRenewal) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          <Loader2 size={40} className="animate-spin text-indigo-600" />
          <p className="mt-4 text-slate-600 font-medium">
            Loading renewal details...
          </p>
        </div>
      </div>
    );
  }

  //  Error state
  if (renewalError) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
          <div className="text-center">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">
              Failed to load renewal
            </h3>
            <p className="text-slate-500 mt-2">
              {renewalError.message || "Please try again later"}
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  //  No data
  if (!renewalData) {
    return null;
  }

  const {
    subscription: subDetails,
    renewalOptions,
    bestValue,
    gstRate,
    currency,
  } = renewalData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
          className="relative z-10 w-full max-w-5xl lg:w-[70vw] max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-slate-400 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:text-slate-700 hover:bg-white"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
            {/* LEFT PANEL */}
            <div
              className={`relative px-6 py-8 sm:px-8 lg:py-10 ${
                isSuspended
                  ? "bg-gradient-to-br from-orange-50 via-white to-white"
                  : "bg-gradient-to-br from-indigo-50 via-violet-50/40 to-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${
                    isSuspended
                      ? "bg-orange-100 text-orange-600"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  <RefreshCw size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {isSuspended
                      ? "Reactivate your site"
                      : "Renew your hosting"}
                  </h2>
                  <p className="flex items-center gap-1.5 text-sm font-mono text-slate-500">
                    <Globe size={13} />
                    {subscription.domain ||
                      subscription.identifier ||
                      subDetails.planName}
                  </p>
                </div>
              </div>

              {isSuspended && (
                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-orange-200 bg-orange-50 p-3.5">
                  <AlertTriangle
                    size={16}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />
                  <p className="text-sm font-medium text-orange-800">
                    This site is currently suspended. Renewing restores access
                    immediately.
                  </p>
                </div>
              )}

              {/* Expiry timeline */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isSuspended
                    ? "New expiry after reactivation"
                    : "Your hosting timeline"}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-left">
                    <p className="text-[11px] font-medium text-slate-400">
                      {isSuspended ? "Suspended on" : "Current expiry"}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-slate-700">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(currentExpiry || subDetails.currentExpiry)}
                    </p>
                  </div>

                  <div className="flex flex-1 items-center px-2">
                    <div className="h-px w-full border-t-2 border-dashed border-slate-200" />
                    <ArrowRight
                      size={16}
                      className="mx-1 shrink-0 text-indigo-400"
                    />
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-medium text-emerald-500">
                      New expiry
                    </p>
                    <p className="mt-0.5 flex items-center justify-end gap-1.5 text-sm font-bold text-emerald-600">
                      <Calendar size={14} />
                      {selectedOption
                        ? formatDate(
                            new Date(
                              new Date(
                                currentExpiry ||
                                  subDetails.currentExpiry ||
                                  Date.now(),
                              ).setMonth(
                                new Date(
                                  currentExpiry ||
                                    subDetails.currentExpiry ||
                                    Date.now(),
                                ).getMonth() + selectedOption.months,
                              ),
                            ),
                          )
                        : "—"}
                    </p>
                  </div>
                </div>
                {selectedOption && (
                  <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-1.5 text-center text-xs font-semibold text-emerald-600">
                    +{selectedOption.months}{" "}
                    {selectedOption.months === 1 ? "month" : "months"} added
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  What's included
                </p>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {subscription.features?.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 ring-1 ring-slate-100"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                        <Server size={14} />
                      </span>
                      <span className="text-sm font-medium text-slate-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT PANEL - Pricing */}

            <div className="flex flex-col px-6 py-8 sm:px-8 lg:py-10">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose renewal period
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {renewalOptions.map((option) => {
                  const active = selectedOption?.months === option.months;
                  const isBestValue = option.period === "4 Years";

                  return (
                    <button
                      key={option.months}
                      onClick={() => setSelectedOption(option)}
                      className={`relative flex flex-col rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                        active
                          ? "border-indigo-500 bg-indigo-50/70 shadow-sm"
                          : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                      }`}
                    >
                      {isBestValue && (
                        <span
                          className={`absolute -top-2.5 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
                            active ? "bg-indigo-500" : "bg-emerald-500"
                          }`}
                        >
                          Best Value
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-bold ${active ? "text-indigo-700" : "text-slate-700"}`}
                        >
                          {option.period}
                        </span>
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                            active
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-slate-300"
                          }`}
                        >
                          {active && (
                            <CheckCircle2 size={12} className="text-white" />
                          )}
                        </span>
                      </div>

                      <div className="mt-2">
                        <span
                          className={`text-lg font-black ${active ? "text-indigo-600" : "text-slate-800"}`}
                        >
                          ₹{option.total.toLocaleString("en-IN")}
                        </span>
                        <div className="flex flex-col gap-0.5 mt-1">
                          <span className="text-[10px] text-slate-400">
                            Subtotal: ₹{option.subtotal.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            GST ({gstRate}%): ₹
                            {option.gst.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Price Summary */}
              {selectedOption && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₹{selectedOption.subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm text-slate-600">
                    <span>GST ({gstRate}%)</span>
                    <span className="font-semibold">
                      ₹{selectedOption.gst.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="text-sm font-bold text-slate-800">
                      Total due today
                    </span>
                    <span className="text-2xl font-black text-indigo-600">
                      ₹{selectedOption.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto pt-6">
                <motion.button
                  onClick={handleRenew}
                  disabled={isProcessing || !selectedOption}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                    isSuspended
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-200"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} />
                      {isSuspended ? "Reactivate now" : "Renew now"} —{" "}
                      {selectedOption
                        ? `₹${selectedOption.total.toLocaleString("en-IN")}`
                        : "Select a period"}
                      <ChevronRight size={15} />
                    </>
                  )}
                </motion.button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <Shield size={12} />
                  Secured by Razorpay · 256-bit SSL
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
