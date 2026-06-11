import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, ArrowRight, Clock, Shield, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailConfigModal from './EmailConfigModal';
import { useAuthStore } from '../../store/authStore';
import { getPendingOrder } from '../../utils/pendingOrder';

import { useEmailPlans } from '../../hooks/useEmailHosting';

/* ============================================================
   Plan Card – with memo for performance
   ============================================================ */
const PlanCard = React.memo(({ plan, billingPeriod, onSelect }) => {
  const monthlyPrice =  Math.floor(plan.price / 100);
  const displayPrice = monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white/80 backdrop-blur-md border rounded-3xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
        plan.slug === 'business' ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100' : 'border-slate-200/80 hover:border-indigo-200'
      }`}
    >
      {/* Popular badge */}
      {plan.slug === 'business' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star size={14} /> Most Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">{plan.name} Email</p>
        <h3 className="text-2xl font-black text-slate-800">{plan.name}</h3>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900">₹ {displayPrice}</span>
          <span className="text-sm text-slate-500">/mo</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Price per mailbox</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feat, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
            <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => onSelect(plan)}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
      >
        Select Plan
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
});

/* ============================================================
   Main Plan Selection Page
   ============================================================ */
export default function EmailPlanPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: plans, isLoading } = useEmailPlans();
  const [billingPeriod, setBillingPeriod] = useState(12); // Default to yearly for 15% discount
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !plans) return;
    const pending = getPendingOrder();
    if (!pending || pending.service !== 'email') return;

    if (pending.planId) {
      const plan = plans.find(p => (p.id || p._id) === pending.planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, [isAuthenticated, plans]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top bar + breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <button onClick={() => navigate('/emails')} className="hover:text-indigo-600 transition">Emails</button>
              <ChevronRight size={16} />
              <span className="font-medium text-slate-800">Select Plan</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">Choose your email plan</h1>
            <p className="text-slate-500 mt-2">Pick the perfect plan for your business. Upgrade anytime.</p>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans?.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              onSelect={setSelectedPlan}
            />
          ))}
        </div>

        {selectedPlan && (
          <EmailConfigModal
            plan={selectedPlan}
            isOpen={!!selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </div>
    </div>
  );
}