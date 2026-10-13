import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  PlusCircle,
  MoreHorizontal,
  Trash2,
  Circle,
  X,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailSidebar from './EmailSidebar';

/* ============================================================
   Hook – fetch mailboxes and aliases (demo fallback)
   ============================================================ */
const useAliases = (planId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/aliases?planId=${planId}`);
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        setData({
          domain: 'cloudedata.info',
          availableMailboxes: ['care@cloudedata.info', 'support@cloudedata.info', 'info@cloudedata.info'],
          aliases: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [planId]);

  return { data, loading, setData };
};

/* ============================================================
   Action Menu (3‑dot) for alias row – delete only
   ============================================================ */
const AliasActionMenu = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-white/80 backdrop-blur-sm transition-all"
        aria-label="More options"
      >
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md border border-slate-200/70 rounded-xl shadow-xl z-20 py-1 origin-top-right">
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded-lg"
          >
            <Trash2 size={14} /> Delete alias
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   Create Alias Modal – improved with domain auto‑append
   ============================================================ */
const CreateAliasModal = ({ availableMailboxes, domain, onClose, onCreate }) => {
  const [selectedMailbox, setSelectedMailbox] = useState(availableMailboxes[0] || '');
  const [aliasName, setAliasName] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!selectedMailbox) {
      setError('Select a mailbox');
      return;
    }
    if (!aliasName.trim()) {
      setError('Alias name cannot be empty');
      return;
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(aliasName)) {
      setError('Alias name contains invalid characters');
      return;
    }
    setError('');
    setSaving(true);

    const fullAlias = `${aliasName.trim()}@${domain}`;

    setTimeout(() => {
      onCreate({ mailbox: selectedMailbox, alias: fullAlias });
      setSaving(false);
      toast.success('Alias created');
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
          className="relative bg-white border-2 border-slate-200 rounded-3xl shadow-2xl w-full max-w-md p-8 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-black text-slate-800 mb-2">Create alias</h2>
          <p className="text-sm text-slate-500 mb-6">
            An email alias is a secondary address for your main mailbox. It delivers to your primary inbox.
          </p>

          <div className="space-y-4">
            {availableMailboxes.length > 1 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email (mailbox)
                </label>
                <select
                  value={selectedMailbox}
                  onChange={(e) => setSelectedMailbox(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
                >
                  {availableMailboxes.map((email) => (
                    <option key={email} value={email}>{email}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Alias
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-400">
                <input
                  type="text"
                  value={aliasName}
                  onChange={(e) => { setAliasName(e.target.value); setError(''); }}
                  placeholder="alias"
                  className="flex-1 p-3 bg-transparent outline-none text-sm"
                  autoFocus
                />
                <span className="px-3 py-2 text-slate-500 font-mono text-sm bg-slate-100 border-l border-slate-200 rounded-r-xl">
                  @{domain}
                </span>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs flex items-center gap-1"><X size={12} /> {error}</p>}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-slate-200 bg-white text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={saving}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <ShieldCheck size={18} />
              )}
              {saving ? 'Creating…' : 'Create alias'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

/* ============================================================
   Aliases Page Component
   ============================================================ */
export default function AliasesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || '1';
  const { data, loading, setData } = useAliases(planId);
  const [showModal, setShowModal] = useState(false);

  const handleCreateAlias = (newAlias) => {
    const nextId = data.aliases.length ? Math.max(...data.aliases.map((a) => a.id)) + 1 : 1;
    setData((prev) => ({
      ...prev,
      aliases: [
        ...prev.aliases,
        {
          id: nextId,
          mailbox: newAlias.mailbox,
          alias: newAlias.alias,
          usedCount: 1,
          maxCount: 50,
        },
      ],
    }));
  };

  const handleDeleteAlias = (aliasId) => {
    setData((prev) => ({
      ...prev,
      aliases: prev.aliases.filter((a) => a.id !== aliasId),
    }));
    toast.success('Alias deleted');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const { domain, availableMailboxes, aliases } = data;

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
          {domain}
        </button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Email Aliases</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border-2 border-slate-200/80 hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Email Aliases</h1>
                <p className="text-sm text-slate-500 mt-1">
                  An email alias is a secondary address that delivers to your primary mailbox.
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <PlusCircle size={16} /> Create alias
              </button>
            </div>

            {aliases.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200"
              >
                <Mail size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-2">Create your first alias</h3>
                <p className="text-sm text-slate-500 mb-4">
                  An email alias is a secondary address for your main mailbox.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
                >
                  <PlusCircle size={18} /> Create alias
                </button>
              </motion.div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-slate-200">
                    <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Email</th>
                      <th className="pb-3 pr-4">Aliases</th>
                      <th className="pb-3 pr-4">Usage</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-100">
                    {aliases.map((alias) => (
                      <tr key={alias.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 pr-4 font-medium text-slate-800">{alias.mailbox}</td>
                        <td className="py-4 pr-4 text-slate-700">{alias.alias}</td>
                        <td className="py-4 pr-4 text-slate-700">{alias.usedCount}/{alias.maxCount} used</td>
                        <td className="py-4 text-right">
                          <AliasActionMenu onDelete={() => handleDeleteAlias(alias.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {showModal && (
        <CreateAliasModal
          availableMailboxes={availableMailboxes}
          domain={domain}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateAlias}
        />
      )}
    </div>
  );
}