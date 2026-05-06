import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Home,
  Calendar,
  Users,
  RefreshCw,
  ShoppingCart,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useEmailPlan} from './EmailPlanContext'; // <-- import the context hook

/* ============================================================
   Hook – dynamic plans with demo fallback
   ============================================================ */
const useEmailPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/user/email-plans');
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setPlans(Array.isArray(json) ? json : [json]);
      } catch {
        // Demo data – remove when API is live
        setPlans([
          { id: 1, planName: 'Premium Business Email', domain: '@cloudedata.info', expirationDate: '2026-06-19', autoRenewal: true, mailboxesUsed: 1, mailboxesTotal: 1 },
          { id: 2, planName: 'Starter Newsletter', domain: '@news.cloudedata.info', expirationDate: '2025-12-10', autoRenewal: false, mailboxesUsed: 3, mailboxesTotal: 5 },
          { id: 3, planName: 'Enterprise Suite', domain: '@enterprise.cloudedata.info', expirationDate: '2027-03-01', autoRenewal: true, mailboxesUsed: 12, mailboxesTotal: 25 },
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
   3‑dot menu – portal‑based dropdown (never hidden)
   ============================================================ */
const ActionMenu = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const getDropdownStyle = () => {
    if (!buttonRef.current) return {};
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'absolute',
      top: rect.bottom + 8,
      left: rect.right,
      transform: 'translateX(-100%)',
      zIndex: 9999,
    };
  };

  const dropdown = open && (
    <div style={getDropdownStyle()} className="w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
      <button
        onClick={() => { setOpen(false); navigate('/email/plan'); }}
        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-indigo-50 flex items-center gap-2 transition-colors rounded-lg"
      >
        <RefreshCw size={14} /> Manage subscription
      </button>
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-white/80 backdrop-blur-sm transition-all"
        aria-label="More options"
      >
        <MoreHorizontal size={18} />
      </button>
      {ReactDOM.createPortal(dropdown, document.body)}
    </>
  );
};

/* ============================================================
   Plan Row – mailbox uses context to set selected plan
   ============================================================ */
const PlanRow = ({ plan }) => {
  const [autoRenew, setAutoRenew] = useState(plan.autoRenewal);
  const navigate = useNavigate();
  const { selectPlan } = useEmailPlan(); // <-- get the context setter

  useEffect(() => setAutoRenew(plan.autoRenewal), [plan.autoRenewal]);

  const toggle = () => {
    const next = !autoRenew;
    setAutoRenew(next);
    toast.success(`Auto-renewal ${next ? 'enabled' : 'disabled'}`);
  };

  const handleMailboxClick = () => {
    selectPlan(plan.id);           // remember which plan the user chose
    navigate('/emails/mailbox');   // navigate without query parameter
  };

  return (
    <div className="grid grid-cols-[3fr_2fr_2fr_3fr] items-center bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-xl px-5 py-4 transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.05)]">
      <div>
        <h3 className="font-semibold text-slate-800 text-sm">{plan.planName}</h3>
        <p className="text-xs text-slate-500 font-mono mt-0.5">{plan.domain}</p>
      </div>
      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
        <Calendar size={14} className="text-slate-400" />
        <span className="whitespace-nowrap font-medium">
          {new Date(plan.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className={`relative w-9 h-5 rounded-full transition-all duration-300 ${autoRenew ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-300'}`}
        >
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoRenew ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-slate-600 font-medium">{autoRenew ? 'On' : 'Off'}</span>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleMailboxClick}
          className="group/mail flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200/80 bg-white/60 backdrop-blur-sm text-slate-700 
                     hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white hover:text-indigo-700 
                     transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <Users size={16} className="text-slate-400 group-hover/mail:text-indigo-500 transition-colors" />
          <span className="text-sm font-semibold">{plan.mailboxesUsed}/{plan.mailboxesTotal}</span>
          <span className="text-sm text-slate-500">Mailboxes</span>
        </button>
        <ActionMenu />
      </div>
    </div>
  );
};

/* ============================================================
   Main Emails Page
   ============================================================ */
export default function EmailsPage() {
  const navigate = useNavigate();
  const { plans, loading } = useEmailPlans();

  if (loading)
    return (
      <div className="flex justify-center py-40">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-300 border-t-indigo-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      {/* Header bar – breadcrumb + action button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 backdrop-blur-sm bg-white/70 border border-slate-200/60 rounded-2xl px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/emails')} className="text-2xl font-bold text-slate-800">Emails</button>
          <ChevronRight size={18} className="text-slate-400" />
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-white hover:text-indigo-600 transition-all"
          >
            <Home size={16} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/email/plan')}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold text-sm
                     hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white hover:border-indigo-300 hover:text-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <ShoppingCart size={16} /> Buy email
        </button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[3fr_2fr_2fr_3fr] items-center px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/60 mb-2">
        <div>Plan name</div>
        <div>Expiration date</div>
        <div>Auto-renewal</div>
        <div className="text-right">Mailboxes</div>
      </div>

      {/* Plan rows */}
      {plans.length === 0 ? (
        <div className="text-center py-20 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm mt-6">
          <Mail size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No email plans found.</p>
          <button
            onClick={() => navigate('/email/plan')}
            className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
          >
            Get a plan
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {plans.map((plan) => (
            <PlanRow key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}