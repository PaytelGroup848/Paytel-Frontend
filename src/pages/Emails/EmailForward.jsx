import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  PlusCircle,
  MoreHorizontal,
  Trash2,
  Edit3,
  Circle,
  X,
  ShieldCheck,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailSidebar from './EmailSidebar';
import { useEmailPlan } from './EmailPlanContext';

/* ============================================================
   Hook – fetch forwarders for a plan (demo fallback)
   ============================================================ */
const useForwarders = (planId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/forwarders?planId=${planId}`);
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.includes('text/html')) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        // Demo data – replace with real API
        const allForwarders = [
          { id: 1, planId: 1, mailbox: 'care@cloudedata.info', forwardsTo: 'arun@cloudewebmail.com', usedCount: 1, maxCount: 50 },
          { id: 2, planId: 1, mailbox: 'care@cloudedata.info', forwardsTo: 'team@other.com', usedCount: 2, maxCount: 50 },
          { id: 3, planId: 2, mailbox: 'news@news.cloudedata.info', forwardsTo: 'editor@news.cloudedata.info', usedCount: 1, maxCount: 50 },
        ];
        const allMailboxes = {
          1: ['care@cloudedata.info', 'info@cloudedata.info'],
          2: ['news@news.cloudedata.info', 'editor@news.cloudedata.info'],
          3: ['admin@enterprise.cloudedata.info', 'support@enterprise.cloudedata.info'],
        };
        const domains = { 1: 'cloudedata.info', 2: 'news.cloudedata.info', 3: 'enterprise.cloudedata.info' };

        const planIdNum = planId ? parseInt(planId, 10) : null;
        if (!planIdNum) {
          setData({ domain: '', availableMailboxes: [], forwarders: [] });
        } else {
          setData({
            domain: domains[planIdNum] || '',
            availableMailboxes: allMailboxes[planIdNum] || [],
            forwarders: allForwarders.filter((f) => f.planId === planIdNum),
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
   Action Menu (3‑dot) for forwarder row
   ============================================================ */
const ForwarderActionMenu = ({ onEdit, onDelete }) => {
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
        <div className="absolute right-0 top-full mt-2 w-36 bg-white/95 backdrop-blur-md border border-slate-200/70 rounded-xl shadow-xl z-20 py-1 origin-top-right">
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors rounded-lg"
          >
            <Edit3 size={14} /> Edit
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded-lg"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   Create / Edit Forwarder Modal
   ============================================================ */
const ForwarderModal = ({ mode, initialValues, availableMailboxes, onClose, onSave }) => {
  const [sourceEmail, setSourceEmail] = useState(initialValues?.mailbox || availableMailboxes[0] || '');
  const [destination, setDestination] = useState(initialValues?.forwardsTo || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isEdit = mode === 'edit';
  const title = isEdit ? 'Edit forwarder' : 'Create forwarder';
  const subtitle = isEdit
    ? 'Update the forwarding destination.'
    : 'Redirect incoming emails from one address to another.';

  const handleSave = async () => {
    if (!sourceEmail) {
      setError('Select a source mailbox');
      return;
    }
    if (!destination.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination)) {
      setError('Enter a valid destination email');
      return;
    }
    setError('');
    setSaving(true);
    setTimeout(() => {
      onSave({ mailbox: sourceEmail, forwardsTo: destination.trim() });
      setSaving(false);
      toast.success(isEdit ? 'Forwarder updated' : 'Forwarder created');
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

          <h2 className="text-2xl font-black text-slate-800 mb-2">{title}</h2>
          <p className="text-sm text-slate-500 mb-6">{subtitle}</p>

          <div className="space-y-4">
            {/* Source mailbox */}
            {availableMailboxes.length > 1 || isEdit ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  From (email address)
                </label>
                <select
                  value={sourceEmail}
                  onChange={(e) => setSourceEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
                  disabled={isEdit}
                >
                  {availableMailboxes.map((email) => (
                    <option key={email} value={email}>{email}</option>
                  ))}
                </select>
                {isEdit && (
                  <p className="text-xs text-slate-400 mt-1">Source address cannot be changed.</p>
                )}
              </div>
            ) : null}

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Forwards to
              </label>
              <input
                type="email"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setError(''); }}
                placeholder="email@example.com"
                className={`w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 ${
                  error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-indigo-400'
                }`}
                autoFocus
              />
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
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <ShieldCheck size={18} />
              )}
              {saving ? 'Saving…' : isEdit ? 'Update forwarder' : 'Create forwarder'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

/* ============================================================
   Forwarders Page Component
   ============================================================ */
export default function ForwardersPage() {
  const navigate = useNavigate();
  const { selectedPlanId } = useEmailPlan();
  const { data, loading, setData } = useForwarders(selectedPlanId);
  const [showModal, setShowModal] = useState(false);
  const [editingForwarder, setEditingForwarder] = useState(null);

  const handleCreate = (newFwd) => {
    const nextId = data.forwarders.length ? Math.max(...data.forwarders.map((f) => f.id)) + 1 : 1;
    setData((prev) => ({
      ...prev,
      forwarders: [
        ...prev.forwarders,
        {
          id: nextId,
          mailbox: newFwd.mailbox,
          forwardsTo: newFwd.forwardsTo,
          usedCount: 1,
          maxCount: 50,
        },
      ],
    }));
  };

  const handleUpdate = (updatedFwd) => {
    setData((prev) => ({
      ...prev,
      forwarders: prev.forwarders.map((f) =>
        f.id === editingForwarder.id ? { ...f, forwardsTo: updatedFwd.forwardsTo } : f
      ),
    }));
    setEditingForwarder(null);
  };

  const handleDelete = (forwarder) => {
    if (window.confirm(`Delete forwarder for ${forwarder.mailbox}?`)) {
      setData((prev) => ({
        ...prev,
        forwarders: prev.forwarders.filter((f) => f.id !== forwarder.id),
      }));
      toast.success('Forwarder deleted');
    }
  };

  const openCreateModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setEditingForwarder(null);
  };

  const openEditModal = (fwd) => {
    setEditingForwarder(fwd);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const hasPlan = !!selectedPlanId;
  const { domain, availableMailboxes, forwarders } = data;

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
        <span className="font-bold text-slate-800">Forwarders</span>
      </div>

      <div className="flex gap-6">
        <EmailSidebar />
        <div className="flex-1">
          {!hasPlan ? (
            /* No plan selected – show guidance */
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-slate-200/80"
            >
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-2">Select a plan</h3>
              <p className="text-sm text-slate-500 mb-4">
                Please choose an email plan to manage its forwarders.
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
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Forwarders</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Email forwarders redirect incoming email messages to another mailbox.
                  </p>
                </div>
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition shadow-md"
                >
                  <PlusCircle size={16} /> Create forwarder
                </button>
              </div>

              {forwarders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <Mail size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-700 mb-2">Create your first forwarder</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Email forwarders redirect incoming email messages to another mailbox.
                  </p>
                  <button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
                  >
                    <PlusCircle size={18} /> Create forwarder
                  </button>
                </motion.div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b-2 border-slate-200">
                      <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="pb-3 pr-4">Email</th>
                        <th className="pb-3 pr-4">Forwards to</th>
                        <th className="pb-3 pr-4">Usage</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100">
                      {forwarders.map((fwd) => (
                        <tr key={fwd.id} className="hover:bg-slate-50/50 transition">
                          <td className="py-4 pr-4 font-medium text-slate-800">{fwd.mailbox}</td>
                          <td className="py-4 pr-4 text-slate-700">{fwd.forwardsTo}</td>
                          <td className="py-4 pr-4 text-slate-700">{fwd.usedCount}/{fwd.maxCount} used</td>
                          <td className="py-4 text-right">
                            <ForwarderActionMenu
                              onEdit={() => openEditModal(fwd)}
                              onDelete={() => handleDelete(fwd)}
                            />
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

      {showModal && (
        <ForwarderModal
          mode={editingForwarder ? 'edit' : 'create'}
          initialValues={editingForwarder}
          availableMailboxes={availableMailboxes}
          onClose={closeModal}
          onSave={editingForwarder ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
}