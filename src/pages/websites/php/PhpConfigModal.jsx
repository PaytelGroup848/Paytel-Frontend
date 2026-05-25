import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Shield, Star, ArrowRight } from 'lucide-react';
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

      // Use billing service createOrder
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
            // Use billing service verifyPayment
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
    if (m === 12) return Math.round(basePrice * 0.8); // 20% discount for yearly
    return basePrice;
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
        className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl border border-white/60 overflow-hidden flex flex-col"
      >
        {/* Header */}
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

        {/* Body */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="md:col-span-3 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Select tenure</p>
            {durations.map((item) => {
              const price = getMonthlyBase(item.months);
              const isSelected = duration === item.months;
              return (
                <motion.div
                  key={item.months}
                  onClick={() => setDuration(item.months)}
                  className={`group p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/60 shadow-md shadow-indigo-100/40"
                      : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-200 group-hover:border-indigo-300"
                      }`}>
                      {isSelected && <Check size={10} className="text-white" strokeWidth={4} />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {item.months} Months
                      </p>
                      {item.save && <p className="text-[10px] font-black text-emerald-600 tracking-tight">{item.save}</p>}
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

        {/* Action button */}
        <div className="px-5 pb-5">
          <motion.button
            onClick={handleCheckout}
            disabled={isProcessing}
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
}
