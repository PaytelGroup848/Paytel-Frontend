import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, ArrowRight, Clock, Shield, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/* ============================================================
   Custom hook – fetch plans (with demo data)
   ============================================================ */
const useEmailPlansList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/email-plans');
        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || contentType.includes('text/html')) throw new Error();
        const json = await res.json();
        setPlans(Array.isArray(json) ? json : [json]);
      } catch {
        setPlans([
          {
            id: 'starter-business',
            name: 'Starter Business Email',
            tagline: 'For small businesses',
            description: 'Better security and more storage for your growing team.',
            popular: false,
            basePriceMonthly: 29,       // Monthly price for shortest billing cycle
            discountFactors: { 48: 0.7, 24: 0.85, 12: 1, 1: 1.5 },   // multiplier for base price to get monthly based on period
            renewPriceMonthly: 69,       // Renewal price per month for 48 months
            features: [
              '100 emails/day per mailbox',
              'Optional extra mailbox storage',
              'Spam & virus protection',
              'Mobile & web access',
            ],
            isWorkspace: false,
          },
          {
            id: 'premium-business',
            name: 'Premium Business Email',
            tagline: 'For scaling teams',
            description: 'Plenty of storage and advanced tools for collaboration.',
            popular: true,
            basePriceMonthly: 79,
            discountFactors: { 48: 0.7, 24: 0.85, 12: 1, 1: 1.5 },
            renewPriceMonthly: 109,
            features: [
              '300 emails/day per mailbox',
              '50 GB storage per mailbox',
              'Advanced anti‑spam',
              'Calendar & contacts sync',
              'Priority support',
            ],
            isWorkspace: false,
          },
          {
            id: 'starter-google-workspace',
            name: 'Starter Google Workspace',
            tagline: 'For entrepreneurs',
            description: 'Boost productivity with Google’s full suite of tools.',
            popular: false,
            basePriceMonthly: 609,   // fixed monthly price (only available for 12 months)
            discountFactors: { 12: 1 },  // only 12 months
            renewPriceMonthly: 60,      // unique renew price for 12 months
            features: [
              '30 GB Storage per mailbox',
              '30 GB Calendar',
              'Docs, Sheets, Slides',
              'Chat team messaging',
              'Meet video conferencing',
              'Security & management controls',
              '24/7 Google support',
            ],
            isWorkspace: true,
            workspaceAllowedPeriods: [12],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return { plans, loading };
};

/* ============================================================
   Billing period options
   ============================================================ */
const billingOptions = [
  { label: '48 months', months: 48, savePercent: 30 },
  { label: '24 months', months: 24, savePercent: 15 },
  { label: '12 months', months: 12, savePercent: 0 },
  { label: '1 month', months: 1, savePercent: -50 }, // negative means no saving, just display
];

/* ============================================================
   Helper – compute monthly price based on billing period
   ============================================================ */
const computePrice = (plan, periodMonths) => {
  if (!plan.discountFactors || !plan.discountFactors[periodMonths]) {
    return plan.basePriceMonthly; // fallback
  }
  return (plan.basePriceMonthly * plan.discountFactors[periodMonths]).toFixed(2);
};

/* ============================================================
   Plan Card – with memo for performance
   ============================================================ */
const PlanCard = React.memo(({ plan, billingPeriod, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const isWorkspace = plan.isWorkspace;
  const periodLabel = billingPeriod === 1 ? 'mo' : `${billingPeriod} mo`;

  // Check if plan is available for the chosen period
  const isDisabled = isWorkspace && plan.workspaceAllowedPeriods && !plan.workspaceAllowedPeriods.includes(billingPeriod);
  const monthlyPrice = useMemo(() => computePrice(plan, billingPeriod), [plan, billingPeriod]);

  const handleGetStarted = () => {
    if (!isDisabled) {
      onSelect(plan.id, billingPeriod);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white/80 backdrop-blur-md border rounded-3xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
        plan.popular ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100' : 'border-slate-200/80 hover:border-indigo-200'
      } ${isDisabled ? 'opacity-60 pointer-events-none' : ''}`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star size={14} /> Most Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">{plan.tagline}</p>
        <h3 className="text-2xl font-black text-slate-800">{plan.name}</h3>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900">₺ {monthlyPrice}</span>
          <span className="text-sm text-slate-500">/{periodLabel}</span>
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

      {/* Renewal note */}
      <div className="mb-6 bg-slate-50 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2">
        <Clock size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <span>
          {!isWorkspace ? (
            <>₺ {plan.renewPriceMonthly}/mo when you renew · Applies at {billingPeriod}-month purchase</>
          ) : (
            <>₺ {plan.renewPriceMonthly}/mo when you renew for 12 months</>
          )}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={handleGetStarted}
        disabled={isDisabled}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Get started
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
  const { plans, loading } = useEmailPlansList();
  const [billingPeriod, setBillingPeriod] = useState(48);

  const handleSelectPlan = useCallback((planId, period) => {
    toast.success(`Plan selected! Redirecting...`);
    // You could open a configuration popup or go to checkout
    navigate(`/checkout?plan=${planId}&period=${period}`);
  }, [navigate]);

  if (loading) {
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
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-indigo-500" />
            <span className="text-xs font-bold text-slate-600">30-day money‑back guarantee</span>
          </div>
        </div>

        {/* Billing period selector */}
        <div className="mb-12">
          <p className="text-sm font-bold text-slate-700 mb-4">Billing period</p>
          <div className="flex flex-wrap gap-3">
            {billingOptions.map((opt) => (
              <button
                key={opt.months}
                onClick={() => setBillingPeriod(opt.months)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                  billingPeriod === opt.months
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {opt.label}
                {opt.savePercent > 0 && (
                  <span className={`absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${billingPeriod === opt.months ? 'bg-amber-400 text-amber-900' : 'bg-emerald-100 text-emerald-700'}`}>
                    Save {opt.savePercent}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              isSelected={false}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-12">
          All prices are in Turkish Lira (₺). Taxes may apply. Renewal prices are subject to change.
        </p>
      </div>
    </div>
  );
}