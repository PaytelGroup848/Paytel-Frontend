import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, CreditCard, RefreshCw, Calendar, X, ArrowRight,
  TrendingUp, Globe, Server, Mail, CheckCircle, Shield, Clock, Tag,
  DollarSign, Hash, Zap, Layers, AlertCircle, Banknote
} from 'lucide-react';
import toast from 'react-hot-toast';
import {useSubscription} from "../../hooks/useBilling"



/* ============================================================
   Subscription Row – enhanced with shadow on border
   ============================================================ */
const SubscriptionRow = ({ subscription, onOpenDetail, index }) => {
  const typeIcons = { hosting: Globe, vps: Server, email: Mail, domain: Globe };
  const Icon = typeIcons[subscription.type] || CreditCard;
  const isExpired = subscription.status === 'Expired';
  const isActive = subscription.status === 'Active';

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`group relative border-b border-slate-100 transition-all duration-300 ${
        isExpired
          ? 'bg-red-50/30 hover:bg-red-50/60'
          : 'hover:bg-white hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.1)]'
      }`}
    >
      {/* Plan */}
      <td className="py-5 px-5">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${
            isExpired
              ? 'bg-red-100 text-red-500'
              : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
          }`}>
            <Icon size={20} />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-slate-800 text-sm truncate">{subscription.planName}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5 truncate">{subscription.identifier}</div>
          </div>
        </div>
      </td>
      {/* Status */}
      <td className="py-5 px-3">
        {isActive ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
          </span>
        ) : isExpired ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 shadow-sm">
            <AlertCircle size={12} /> Expired
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
            <Clock size={12} /> {subscription.status}
          </span>
        )}
      </td>
      {/* Expiration */}
      <td className="py-5 px-3 text-sm text-slate-700 whitespace-nowrap">
        <Calendar size={14} className="inline text-slate-400 mr-1.5" />
        {new Date(subscription.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
      {/* Price */}
      <td className="py-5 px-3 text-right whitespace-nowrap">
        {subscription.price ? (
          <div>
            <div className="text-sm font-bold text-slate-800">
              {subscription?.currency} {subscription?.price}
            </div>
            {/* <div className="text-[10px] text-slate-400">/{subscription.nextBillingPeriod || 'mo'}</div> */}
          </div>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        )}
      </td>
      {/* Actions */}
      <td className="py-5 px-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); toast.success(isExpired ? 'Reactivation initiated!' : 'Renewal initiated!'); }}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 shadow-sm whitespace-nowrap ${
              isExpired
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-200'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:shadow-md'
            }`}
          >
            {isExpired ? 'Reactivate' : 'Renew'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetail(subscription); }}
            className="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 group-hover:translate-x-0.5"
            aria-label="View details"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

/* ============================================================
   Subscription Detail Modal – unchanged
   ============================================================ */
const SubscriptionDetailModal = ({ subscription, onClose }) => {
  const [autoRenew, setAutoRenew] = useState(subscription?.autoRenewal);
  if (!subscription) return null;

  const typeIcons = { hosting: Globe, vps: Server, email: Mail, domain: Globe };
  const Icon = typeIcons[subscription.type] || CreditCard;
  const isExpired = subscription.status === 'Expired';

  const handleToggleAutoRenew = () => {
    const next = !autoRenew;
    setAutoRenew(next);
    toast.success(`Auto‑renewal ${next ? 'enabled' : 'disabled'}`);
  };

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden z-10 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 flex justify-between items-start ${isExpired ? 'bg-gradient-to-r from-red-50 to-orange-50' : 'bg-gradient-to-r from-indigo-50 to-purple-50'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl shadow-md border flex items-center justify-center ${isExpired ? 'bg-red-100 text-red-500 border-red-200' : 'bg-white text-indigo-600 border-slate-200'}`}>
              <Icon size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{subscription.planName}</h2>
              <p className="text-sm text-slate-500 font-mono mt-0.5">{subscription.identifier}</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border mt-1.5 ${isExpired ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isExpired ? 'bg-red-500' : 'bg-emerald-500'}`} /> {subscription.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white/80 transition"><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><Clock size={14} /> Expiration</div>
              <p className="text-base font-bold text-slate-800">{new Date(subscription.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><CreditCard size={14} /> Payment</div>
              <p className="text-base font-semibold text-slate-800">{subscription.paymentMethod || '—'}</p>
            </div>
          </div>

          {subscription.price && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><Tag size={14} /> Renewal price</div>
                <p className="text-base font-bold text-slate-800">{subscription?.currency} {subscription?.price}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><Banknote size={14} /> Subscription ID</div>
                <p className="text-sm font-mono text-slate-700 truncate">{subscription.subscriptionId}</p>
              </div>
              {/* <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><Banknote size={14} /> Taxes & fees</div>
                <p className="text-base font-semibold text-slate-800">{subscription.currency} {subscription.taxes || '0'}</p>
              </div> */}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {/* {subscription.subscriptionId && (
              <div className="col-span-3 bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><Hash size={14} /> Subscription ID</div>
                <p className="text-sm font-mono text-slate-700 truncate">{subscription.subscriptionId}</p>
              </div>
            )} */}
            {/* <div className={`${subscription.subscriptionId ? 'col-span-2' : 'col-span-5'} bg-slate-50 rounded-2xl p-4 flex items-center justify-between`}>
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><RefreshCw size={14} /> Auto‑renewal</div>
                <p className="text-sm font-semibold text-slate-800">{autoRenew ? 'Enabled' : 'Disabled'}</p>
              </div>
              <button onClick={handleToggleAutoRenew} className={`relative w-12 h-6 rounded-full transition-colors ${autoRenew ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoRenew ? 'translate-x-6' : ''}`} />
              </button>
            </div> */}
          </div>

          {subscription.nextBillingPeriod && (
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-1.5"><Calendar size={14} /> Next billing</div>
              <p className="text-sm font-semibold text-slate-800">{subscription.nextBillingPeriod}</p>
            </div>
          )}

          {subscription.resources && (
            <div>
              {/* <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Plan Resources</h4> */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(subscription.resources).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-sm font-medium text-slate-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subscription.type === 'email' && (
            <div className="space-y-2">
              <button className="w-full py-3 text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition"><TrendingUp size={16} className="inline mr-1" /> Upgrade to a higher plan</button>
              <button className="w-full py-3 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition"><TrendingUp size={16} className="inline mr-1 rotate-180" /> Downgrade your plan</button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-2">
          {subscription.price && (
            <button onClick={() => toast.success(isExpired ? 'Reactivation started' : 'Renewal started')} className={`w-full py-3.5 font-bold rounded-xl transition shadow-md text-white ${isExpired ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}`}>
              {isExpired ? 'Reactivate now' : 'Renew now'}
            </button>
          )}
          <button onClick={onClose} className="w-full py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition">Close</button>
        </div>
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(<AnimatePresence>{modal}</AnimatePresence>, document.body);
};

/* ============================================================
   Main Subscriptions Page
   ============================================================ */
export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const { data: subscriptions, isLoading } = useSubscription();
  console.log("this is subs", subscriptions)
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const summary = {
    total: subscriptions?.length || 0,
    active: subscriptions?.filter(s => s.status === 'Active')?.length || 0,
    expired: subscriptions?.filter(s => s.status === 'Expired')?.length || 0,
    totalMonthly: subscriptions?.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0) || 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-indigo-200 border-t-indigo-600" />
          <p className="text-slate-500 text-sm font-medium">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition flex items-center gap-1 font-medium"><Home size={16} /><span>Dashboard</span></button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Subscriptions</span>
      </nav>

      {/* Header + Summary – enhanced card */}
      <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 p-6 mb-8 ring-1 ring-white/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Subscriptions</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage your active plans, renewals, and plan resources.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl text-sm font-semibold text-slate-600 shadow-sm flex items-center gap-2">
              <Layers size={16} className="text-slate-400" /> Total: <span className="text-slate-800">{summary.total}</span>
            </div>
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm font-semibold text-emerald-700 shadow-sm flex items-center gap-2">
              <Shield size={16} /> Active: <span>{summary.active}</span>
            </div>
            {summary.expired > 0 && (
              <div className="px-4 py-2.5 bg-red-50 border border-red-100 rounded-2xl text-sm font-semibold text-red-700 shadow-sm flex items-center gap-2">
                <AlertCircle size={16} /> Expired: <span>{summary.expired}</span>
              </div>
            )}
           
          </div>
        </div>
      </div>

      {/* Table – refined with shadow and hover */}
      {subscriptions?.length === 0 ? (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center py-20 bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-lg shadow-slate-200/50">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <CreditCard size={36} className="text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No active subscriptions</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">You don't have any subscriptions yet. Browse our plans to get started.</p>
          <button onClick={() => navigate('/store')} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-200">Browse Plans</button>
        </motion.div>
      ) : (
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden ring-1 ring-white/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b-2 border-slate-200">
                  <th className="py-4 px-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Expiration</th>
                  <th className="py-4 px-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="py-4 px-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions?.map((sub, idx) => (
                  <SubscriptionRow key={sub.id} subscription={sub} onOpenDetail={setSelectedSubscription} index={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedSubscription && <SubscriptionDetailModal subscription={selectedSubscription} onClose={() => setSelectedSubscription(null)} />}
    </div>
  );
}