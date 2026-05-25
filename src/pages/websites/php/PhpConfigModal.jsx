import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Shield, Star, ArrowRight, Calendar, Clock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder, useVerifyPayment } from '../../../hooks/useBilling';
import { useCreatePhpOrder, useVerifyPhpPayment } from '../../../hooks/usePhpHosting';
import { useAuthStore } from '../../../store/authStore';
import { useProfile } from '../../../hooks/useProfile';
import { loadRazorpay } from '../../../utils/razorpay';
import toast from 'react-hot-toast';
import Spinner from '../../../components/ui/Spinner';

const TAX_RATE = 0.18;

export default function PhpConfigModal({ plan, onClose }) {
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: profile } = useProfile({ enabled: !!user });
  
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const isProcessing = createOrder.isPending || verifyPayment.isPending;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderData = await createOrder.mutateAsync({ 
        planId: plan._id,
        duration: duration,
        planType: 'php'
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'CloudeData',
        description: `Hosting: ${plan.name} - ${duration} Months`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await verifyPayment.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planType: 'php'
            });
            toast.success('Payment successful!');
            onClose();
            navigate('/php-hosting/paid');
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: profile ? `${profile.firstName} ${profile.lastName}` : (user?.name || "User"),
          email: user?.email || "",
          contact: profile?.phone || "",
        },
        theme: { color: '#6366F1' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  const durations = [
    { months: 12, label: "Standard", save: "Save 20%" },
    { months: 1, label: "Monthly", save: "" },
  ];

  const getMonthlyBase = (m) => {
    const basePrice = plan.price / 100;
    if (m === 12) return Math.round(basePrice * 0.8);
    return basePrice;
  };

  const currentMonthlyBase = getMonthlyBase(duration);
  const subtotal = currentMonthlyBase * duration;
  const taxes = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxes;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gradient-to-br from-slate-900/60 via-indigo-900/40 to-purple-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white/95 backdrop-blur-sm w-full max-w-4xl rounded-3xl shadow-2xl shadow-indigo-500/20 border border-white/80 overflow-hidden"
      >
        {/* Premium gradient top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Header */}
        <div className="px-8 pt-6 pb-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-white via-indigo-50/30 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-0.5">
                Configure Your Plan
              </p>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                {plan.name}
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                  PHP Hosting
                </span>
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-400 hover:text-slate-900"
          >
            <X size={20} strokeWidth={2} />
          </motion.button>
        </div>

        {/* Body */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - Duration selector */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-indigo-500" />
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select tenure</p>
            </div>
            <div className="space-y-3">
              {durations.map((item) => {
                const price = getMonthlyBase(item.months);
                const isSelected = duration === item.months;
                return (
                  <motion.div
                    key={item.months}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setDuration(item.months)}
                    className={`group relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? "border-indigo-500 bg-gradient-to-r from-indigo-50/80 to-white shadow-lg shadow-indigo-100/50"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="selectedGlow"
                        className="absolute inset-0 rounded-2xl bg-indigo-500/5 pointer-events-none"
                      />
                    )}
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-300 group-hover:border-indigo-400"
                      }`}>
                        {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                          {item.months} {item.months === 1 ? 'Month' : 'Months'}
                        </p>
                        {item.save && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star size={10} className="text-emerald-500 fill-emerald-500" />
                            <p className="text-[10px] font-black text-emerald-600 tracking-tight">{item.save}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black tracking-tight ${isSelected ? "text-indigo-600" : "text-slate-800"}`}>
                        ₹{price.toLocaleString()}
                        <span className="text-[11px] font-medium ml-0.5 text-slate-400">/mo</span>
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional info: what's included hint */}
            <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <Shield size={14} className="text-indigo-400" />
              <p className="text-[10px] font-medium text-slate-500">
                Free SSL • Daily Backups • 99.9% Uptime • 24/7 Support
              </p>
            </div>
          </div>

          {/* Right - Price summary card (premium glassmorphism) */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200 shadow-lg shadow-slate-200/50 sticky top-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                <CreditCard size={16} className="text-indigo-500" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Summary</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-medium text-slate-800">{plan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-medium text-slate-800">{duration} month(s)</span>
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">GST (18%)</span>
                  <span className="font-semibold text-emerald-600">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="pt-3 mt-2 border-t-2 border-dashed border-slate-200 flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Extra security badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-[9px] text-slate-400">
                <Shield size={10} />
                <span>256-bit SSL encrypted</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full mx-1" />
                <span>Razorpay secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="px-8 pb-8 pt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={isProcessing}
            className="relative w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 transition-all duration-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group"
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Processing...
              </span>
            ) : (
              <>
                Proceed to Payment
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Clock size={10} className="text-slate-300" />
            <p className="text-[9px] text-slate-400 font-medium">
              Secure checkout • No hidden charges • Instant provisioning
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}