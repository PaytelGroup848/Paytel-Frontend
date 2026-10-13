import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Mail,
  X,
  ShieldCheck,
  Edit3,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailSidebar from './EmailSidebar';


/* ============================================================
   Hook – fetch auto‑reply settings for a plan (demo fallback)
   ============================================================ */
const useAutoReplies = (planId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/auto-replies?planId=${planId}`);
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        const planIdNum = planId ? parseInt(planId, 10) : null;
        if (!planIdNum) {
          setData({ domain: '', mailboxes: [] });
        } else {
          const allMailboxes = {
            1: [
              {
                email: 'care@cloudedata.info',
                autoReply: {
                  subject: 'greetings',
                  message: 'Hello, I am currently unavailable.',
                  startImmediately: false,
                  neverEnd: true,
                  startDate: '2026-05-05',
                  endDate: '',
                  usePlainText: false,
                },
              },
            ],
            2: [
              { email: 'news@news.cloudedata.info', autoReply: null },
              { email: 'editor@news.cloudedata.info', autoReply: null },
            ],
            3: [
              { email: 'admin@enterprise.cloudedata.info', autoReply: null },
              { email: 'support@enterprise.cloudedata.info', autoReply: null },
            ],
          };
          const domains = { 1: 'cloudedata.info', 2: 'news.cloudedata.info', 3: 'enterprise.cloudedata.info' };
          setData({
            domain: domains[planIdNum] || '',
            mailboxes: allMailboxes[planIdNum] || [],
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [planId]);

  return { data, loading, setData };
};

/* ============================================================
   Auto Reply Modal – full form (unchanged from previous)
   ============================================================ */
const AutoReplyModal = ({ mailbox, onClose, onSave }) => {
  const existing = mailbox.autoReply || {};
  const [subject, setSubject] = useState(existing.subject || '');
  const [message, setMessage] = useState(existing.message || '');
  const [startImmediately, setStartImmediately] = useState(existing.startImmediately !== false);
  const [neverEnd, setNeverEnd] = useState(existing.neverEnd || false);
  const [startDate, setStartDate] = useState(existing.startDate || '');
  const [endDate, setEndDate] = useState(existing.endDate || '');
  const [usePlainText, setUsePlainText] = useState(existing.usePlainText || false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isEdit = !!existing.subject;

  const handleSave = () => {
    if (!subject.trim()) {
      setError('Subject is required');
      return;
    }
    if (!message.trim()) {
      setError('Message is required');
      return;
    }
    if (!startImmediately && !startDate) {
      setError('Start date is required if not starting immediately');
      return;
    }
    if (!neverEnd && !endDate) {
      setError('End date is required if not never ending');
      return;
    }
    setError('');
    setSaving(true);
    setTimeout(() => {
      const reply = {
        subject: subject.trim(),
        message: message.trim(),
        startImmediately,
        neverEnd,
        startDate: startImmediately ? '' : startDate,
        endDate: neverEnd ? '' : endDate,
        usePlainText,
      };
      onSave(mailbox.email, reply);
      setSaving(false);
      toast.success(isEdit ? 'Auto‑reply updated' : 'Auto‑reply created');
      onClose();
    }, 600);
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white border-2 border-slate-200 rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-black text-slate-800 mb-2">
            {isEdit ? 'Edit' : 'Set'} Automatic Reply
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Mailbox: <span className="font-semibold text-slate-700">{mailbox.email}</span>
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email *
              </label>
              <input
                type="email"
                value={mailbox.email}
                disabled
                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Out of Office Reply"
                className={`w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 ${
                  error && !subject ? 'border-red-300' : 'border-slate-200'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Start date *
                </label>
                <input
                  type="date"
                  value={startImmediately ? '' : startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={startImmediately}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  End date *
                </label>
                <input
                  type="date"
                  value={neverEnd ? '' : endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={neverEnd}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={startImmediately}
                  onChange={() => setStartImmediately(!startImmediately)}
                  className="accent-indigo-600"
                />
                Start immediately
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={neverEnd}
                  onChange={() => setNeverEnd(!neverEnd)}
                  className="accent-indigo-600"
                />
                Never end
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Type your automatic reply…"
                className={`w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none ${
                  error && !message ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePlainText}
                    onChange={() => setUsePlainText(!usePlainText)}
                    className="accent-indigo-600"
                  />
                  Use plain text
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  {showPreview ? 'Hide' : 'HTML'} preview
                </button>
              </div>
              {showPreview && (
                <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
                  {usePlainText ? (
                    <pre className="font-sans whitespace-pre-wrap">{message}</pre>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: message }} />
                  )}
                </div>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <X size={12} /> {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-slate-200 bg-white text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <ShieldCheck size={18} />
              )}
              {saving ? 'Saving…' : 'Create'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

/* ============================================================
   Automatic Reply Page Component
   ============================================================ */
export default function AutoReplyPage() {
  const navigate = useNavigate();
  const { selectedPlanId } = useEmailPlan();
  const { data, loading, setData } = useAutoReplies(selectedPlanId);
  const [editingMailbox, setEditingMailbox] = useState(null);

  const handleSaveReply = (email, reply) => {
    setData((prev) => ({
      ...prev,
      mailboxes: prev.mailboxes.map((mb) =>
        mb.email === email ? { ...mb, autoReply: reply } : mb
      ),
    }));
  };

  const handleDeleteReply = (email) => {
    if (window.confirm('Delete this auto‑reply?')) {
      setData((prev) => ({
        ...prev,
        mailboxes: prev.mailboxes.map((mb) =>
          mb.email === email ? { ...mb, autoReply: null } : mb
        ),
      }));
      toast.success('Auto‑reply deleted');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const hasPlan = !!selectedPlanId;
  const { domain, mailboxes } = data;

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
          {hasPlan ? domain : 'Emails'}
        </button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Automatic Reply</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1">
          {!hasPlan ? (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a plan</h3>
              <p className="text-sm text-slate-500 mb-4">
                Please choose an email plan to manage automatic replies.
              </p>
              <button
                onClick={() => navigate('/emails')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <ArrowLeft size={16} /> Go to Emails
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80"
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Automatic Reply</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Setup automatic reply while you're on vacation and keep your clients up to date!  
                  Only 1 automatic reply is sent to the same recipient in 24 hours.
                </p>
              </div>

              {mailboxes.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
                  <Mail size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">No mailboxes found</h3>
                  <p className="text-sm text-slate-500">This plan has no mailboxes yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b-2 border-slate-200">
                      <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="pb-3 pr-4">Email</th>
                        <th className="pb-3 pr-4">Subject</th>
                        <th className="pb-3 pr-4">Start</th>
                        <th className="pb-3 pr-4">Stop</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100">
                      {mailboxes.map((mb) => (
                        <tr key={mb.email} className="hover:bg-slate-50/50 transition">
                          <td className="py-4 pr-4 font-medium text-slate-800">{mb.email}</td>
                          <td className="py-4 pr-4 text-slate-700">
                            {mb.autoReply ? mb.autoReply.subject : '—'}
                          </td>
                          <td className="py-4 pr-4 text-slate-700">
                            {mb.autoReply
                              ? mb.autoReply.startImmediately
                                ? 'Immediately'
                                : mb.autoReply.startDate
                              : '—'}
                          </td>
                          <td className="py-4 pr-4 text-slate-700">
                            {mb.autoReply
                              ? mb.autoReply.neverEnd
                                ? 'Never'
                                : mb.autoReply.endDate
                              : '—'}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* If auto-reply exists → "Edit" button, otherwise "Set Reply" (disabled state when reply exists) */}
                              <button
                                onClick={() => setEditingMailbox(mb)}
                                disabled={!!mb.autoReply && !mb.autoReply?.subject} // disable only when reply exists? Actually we want to always allow edit if exists.
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                  mb.autoReply
                                    ? 'text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100'
                                    : 'text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200'
                                }`}
                                title={mb.autoReply ? 'Edit auto‑reply' : 'Set auto‑reply'}
                              >
                                <Edit3 size={14} />
                                {mb.autoReply ? 'Edit' : 'Set Reply'}
                              </button>
                              {mb.autoReply && (
                                <button
                                  onClick={() => handleDeleteReply(mb.email)}
                                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                  title="Delete auto‑reply"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {editingMailbox && (
        <AutoReplyModal
          mailbox={editingMailbox}
          onClose={() => setEditingMailbox(null)}
          onSave={handleSaveReply}
        />
      )}
    </div>
  );
}