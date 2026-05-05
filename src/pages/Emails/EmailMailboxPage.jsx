import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Mail,
  Circle,
  RefreshCw,
  PlusCircle,
  Users,
  Calendar,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailSidebar from './EmailSidebar';
import { useEmailPlan } from './EmailPlanContext'; // <-- context hook

/* ============================================================
   Hook – fetch all plans & mailboxes (demo fallback)
   ============================================================ */
const useAllPlansAndMailboxes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/email-dashboard');
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        setData([
          {
            id: 1,
            planName: 'Premium Business Email',
            domain: '@cloudedata.info',
            expirationDate: '2026-06-19',
            autoRenewal: true,
            mailboxesUsed: 1,
            mailboxesTotal: 1,
            mailboxes: [
              { email: 'care@cloudedata.info', status: 'Active', usage: '0%' },
            ],
          },
          {
            id: 2,
            planName: 'Starter Newsletter',
            domain: '@news.cloudedata.info',
            expirationDate: '2025-12-10',
            autoRenewal: false,
            mailboxesUsed: 3,
            mailboxesTotal: 5,
            mailboxes: [
              { email: 'news@news.cloudedata.info', status: 'Active', usage: '1.2 MB' },
              { email: 'editor@news.cloudedata.info', status: 'Active', usage: '0%' },
            ],
          },
          {
            id: 3,
            planName: 'Enterprise Suite',
            domain: '@enterprise.cloudedata.info',
            expirationDate: '2027-03-01',
            autoRenewal: true,
            mailboxesUsed: 12,
            mailboxesTotal: 25,
            mailboxes: [
              { email: 'admin@enterprise.cloudedata.info', status: 'Active', usage: '4.3 MB' },
              { email: 'support@enterprise.cloudedata.info', status: 'Active', usage: '813.00 KB' },
              { email: 'info@enterprise.cloudedata.info', status: 'Suspended', usage: '0%' },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

/* ============================================================
   Plan Detail Card (unchanged)
   ============================================================ */
const PlanDetailCard = ({ plan, onToggleAutoRenew }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80"
  >
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{plan.planName}</h2>
        <p className="text-sm text-slate-500 font-mono mt-1">{plan.domain}</p>
      </div>
      <button
        onClick={() => toast.success('Domain refreshed!')}
        className="px-4 py-2 text-sm font-semibold border-2 border-slate-200 bg-white rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition flex items-center gap-2"
      >
        <RefreshCw size={15} /> Refresh domain
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
        <Calendar size={18} className="text-slate-400" />
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Expiration date</p>
          <p className="text-sm font-medium text-slate-800">
            {new Date(plan.expirationDate).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
        <RefreshCw size={18} className="text-slate-400" />
        <div className="flex-1">
          <p className="text-xs text-slate-500 uppercase font-bold">Auto‑renewal</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleAutoRenew(plan.id, !plan.autoRenewal)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                plan.autoRenewal ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  plan.autoRenewal ? 'translate-x-5' : ''
                }`}
              />
            </button>
            <span className="text-sm font-medium text-slate-700">{plan.autoRenewal ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
        <Users size={18} className="text-slate-400" />
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">Mailboxes</p>
          <p className="text-sm font-medium text-slate-800">
            {plan.mailboxesUsed}/{plan.mailboxesTotal} Mailboxes
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ============================================================
   Mailbox Table (unchanged)
   ============================================================ */
const MailboxTable = ({ domain, mailboxes }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80"
  >
    <h3 className="text-lg font-bold text-slate-800 mb-4">Mailboxes</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b-2 border-slate-200">
          <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
            <th className="pb-3 pr-4">Mailbox</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 pr-4">Usage</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-slate-100">
          {mailboxes.map((mb, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition">
              <td className="py-4 pr-4 font-medium text-slate-800">{mb.email}</td>
              <td className="py-4 pr-4">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
                    mb.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  <Circle size={8} fill="currentColor" /> {mb.status}
                </span>
              </td>
              <td className="py-4 pr-4 text-slate-700">{mb.usage}</td>
              <td className="py-4 text-right">
                <button
                  onClick={() => window.open(`https://webmail.${domain}/${mb.email.split('@')[0]}`, '_blank')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                >
                  <Globe size={14} />
                  Webmail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

/* ============================================================
   Main Mailbox Page
   ============================================================ */
export default function EmailMailboxPage() {
  const navigate = useNavigate();
  const { selectedPlanId } = useEmailPlan(); // <-- get plan from context
  const { data, loading } = useAllPlansAndMailboxes();

  const handleToggleAutoRenew = (pId, newValue) => {
    toast.success(`Auto‑renewal ${newValue ? 'enabled' : 'disabled'}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Find the selected plan using context ID
  const selectedPlan = selectedPlanId
    ? data.find((p) => p.id === selectedPlanId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition flex items-center gap-1">
          <Home size={16} />
          <span className="font-medium">Dashboard</span>
        </button>
        <ChevronRight size={16} />
        <button onClick={() => navigate('/emails')} className="hover:text-indigo-600 transition">
          {selectedPlan ? selectedPlan.domain : 'Emails'}
        </button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Mailboxes</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1 space-y-6">
          {!selectedPlan ? (
            /* No plan selected – show guidance */
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a plan</h3>
              <p className="text-sm text-slate-500 mb-4">
                Please choose an email plan to view its mailboxes.
              </p>
              <button
                onClick={() => navigate('/emails')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <ArrowLeft size={16} /> Go to Emails
              </button>
            </motion.div>
          ) : (
            /* Plan details + mailboxes */
            <>
              <PlanDetailCard plan={selectedPlan} onToggleAutoRenew={handleToggleAutoRenew} />
              {selectedPlan.mailboxes && selectedPlan.mailboxes.length > 0 ? (
                <MailboxTable domain={selectedPlan.domain} mailboxes={selectedPlan.mailboxes} />
              ) : (
                <div className="bg-white/90 rounded-2xl p-6 text-center border-2 border-slate-200">
                  <p className="text-slate-500">No mailboxes created yet.</p>
                  <button
                    onClick={() => toast('Add mailbox – coming soon')}
                    className="mt-2 inline-flex items-center gap-1 text-indigo-600 text-sm font-medium"
                  >
                    <PlusCircle size={14} /> Add mailbox
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}