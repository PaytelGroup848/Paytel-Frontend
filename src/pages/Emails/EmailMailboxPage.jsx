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
  Search,
  Shield,
  Server,
  Eye,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import EmailSidebar from './EmailSidebar';
import { useParams } from 'react-router-dom';
import { useEmailOrder, useMailboxes, useCreateMailbox, useDeleteMailbox, useEmailOrders } from '../../hooks/useEmailHosting';
import CreateMailboxModal from './CreateMailboxModal';

/* ============================================================
   Enhanced Plan Detail Card
   ============================================================ */
const PlanDetailCard = ({ order }) => (

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield size={24} className="text-indigo-500" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {order.planId?.name} Email
          </h2>
        </div>
        <p className="text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-lg inline-block">
          {order.domain}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
          order.status === 'active' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-emerald-100/50' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <Circle size={8} className="inline mr-1.5" fill="currentColor" />
          {order.status.toUpperCase()}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 flex items-center gap-3 border border-slate-100">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Calendar size={16} className="text-indigo-600" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Expires on</p>
          <p className="text-sm font-semibold text-slate-800">
            {new Date(order.expiresAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 flex items-center gap-3 border border-slate-100">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Server size={16} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Billing</p>
          <p className="text-sm font-semibold text-slate-800 capitalize">{order.billingTenure}</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 flex items-center gap-3 border border-slate-100">
        <div className="p-2 bg-violet-100 rounded-lg">
          <Users size={16} className="text-violet-600" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Mailboxes</p>
          <p className="text-sm font-semibold text-slate-800">
            Up to {order?.mailboxCount} Mailboxes
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ============================================================
   Enhanced Mailbox Table
   ============================================================ */
const MailboxTable = ({ domain, mailboxes, onDelete, onRefresh }) => {
  const { data: orders, isLoading, refetch: refetchOrders } = useEmailOrders();
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedField, setCopiedField] = useState('');

const copyToClipboard = async (text, fieldKey) => {
  try {
    await navigator.clipboard.writeText(text);

    setCopiedField(fieldKey);

    toast.success('Copied to clipboard');

    setTimeout(() => {
      setCopiedField('');
    }, 2000);
  } catch (err) {
    toast.error('Failed to copy');
  }
};

  const togglePassword = (email) => {
    setShowPasswords(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Mailboxes</h3>
          <p className="text-sm text-slate-500 mt-1">Manage your email accounts</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
          title="Refresh"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b-2 border-slate-200">
            <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="pb-4 pr-4">Email Address</th>
              <th className="pb-4 pr-4">Display Name</th>
              <th className="pb-4 pr-4">Password</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4 text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {mailboxes?.map((mb, idx) => (
                <motion.tr 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-4 pr-4">
  <div className="flex items-center gap-2">
    <Mail
      size={14}
      className="text-slate-400 group-hover:text-indigo-500 transition-colors"
    />

    <span className="font-medium text-slate-800">
      {mb.username}@{domain}
    </span>

    <button
      onClick={() =>
        copyToClipboard(
          `${mb.username}@${domain}`,
          `email-${idx}`
        )
      }
      className="p-1 cursor-pointer rounded-md hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
      title="Copy Email"
    >
      {copiedField === `email-${idx}` ? (
        <Check size={14} className="text-green-600" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  </div>
</td>
                  <td className="py-4 pr-4 text-slate-600">{mb.name || '—'}</td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
  <span className="text-sm font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 min-w-[100px] inline-block">
    {showPasswords[mb.email] ? mb.password : '••••••••'}
  </span>

  <button
    onClick={() => togglePassword(mb.email)}
    className="p-1 text-slate-400 cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
    title={showPasswords[mb.email] ? "Hide Password" : "Show Password"}
  >
    {showPasswords[mb.email] ? (
      <EyeOff size={14} />
    ) : (
      <Eye size={14} />
    )}
  </button>

  <button
    onClick={() =>
      copyToClipboard(
        mb.password,
        `password-${idx}`
      )
    }
    className="p-1 rounded-md cursor-pointer hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
    title="Copy Password"
  >
    {copiedField === `password-${idx}` ? (
      <Check size={14} className="text-green-600" />
    ) : (
      <Copy size={14} />
    )}
  </button>
</div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      mb.active === 1 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <Circle size={6} fill="currentColor" />
                      {mb.active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(`https://cloudewebmail.com`, '_blank')}
                      className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200"
                    >
                      <Globe size={12} /> Webmail
                    </motion.button>
                    <motion.button
                      
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(mb.username + '@' + domain)}
                      className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-all duration-200"
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

/* ============================================================
   Main Mailbox Page with Enhanced Styling
   ============================================================ */
export default function EmailMailboxPage({totalMailBox}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: order, isLoading: isOrderLoading, refetch: refetchOrder } = useEmailOrder(id);
  const { data: mailboxes, isLoading: isMailboxesLoading, refetch: refetchMailboxes } = useMailboxes(id);
  const deleteMailboxMutation = useDeleteMailbox(id);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDelete = async (email) => {
    if (window.confirm(`Are you sure you want to delete mailbox ${email}?`)) {
      try {
        await deleteMailboxMutation.mutateAsync(email);
        refetchMailboxes();
      } catch (error) {
        toast.error('Failed to delete mailbox', { id: 'delete' });
      }
    }
  };

  const handleRefresh = () => {
    refetchOrder();
    refetchMailboxes();
    toast.success('Refreshed successfully');
  };

  if (isOrderLoading || isMailboxesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading mailbox data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* Enhanced Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <motion.button 
            whileHover={{ x: -2 }}
            onClick={() => navigate('/')} 
            className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <Home size={16} className="group-hover:scale-105 transition-transform" />
            <span>Dashboard</span>
          </motion.button>
          <ChevronRight size={14} className="text-slate-300" />
          <motion.button 
            whileHover={{ x: -2 }}
            onClick={() => navigate('/emails')} 
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Emails
          </motion.button>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="font-semibold text-slate-800 bg-white px-3 py-1 rounded-lg shadow-sm">
            {order?.domain}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          {/* <div className="lg:w-64 flex-shrink-0">
            <EmailSidebar />
          </div> */}

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {!order ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12 bg-white rounded-2xl border-2 border-slate-200"
              >
                <Mail size={64} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 font-medium">Order not found</p>
                <button
                  onClick={() => navigate('/emails')}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Emails
                </button>
              </motion.div>
            ) : (
              <>
                <PlanDetailCard 
  order={order} 

/>                
                {/* Create Mailbox Button with Animation */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCreateModal(true)}
                    className="group cursor-pointer relative inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-600/40 transition-all duration-300 overflow-hidden"
                  >
                    <PlusCircle size={18} className="transition-transform group-hover:rotate-90 duration-300" />
                    <span>Create New Mailbox</span>
                    <span className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></span>
                    </span>
                  </motion.button>
                </motion.div>

                <AnimatePresence mode="wait">
                  {mailboxes && mailboxes.length > 0 ? (
                    <MailboxTable 
                      domain={order.domain} 
                      mailboxes={mailboxes} 
                      onDelete={handleDelete}
                      onRefresh={handleRefresh}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-slate-200"
                    >
                      <div className="max-w-sm mx-auto">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mail size={40} className="text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No mailboxes yet</h3>
                        <p className="text-slate-500 mb-6">
                          Create your first mailbox to start sending and receiving emails
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCreateModal(true)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-md"
                        >
                          <PlusCircle size={16} />
                          Create First Mailbox
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Create Mailbox Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateMailboxModal 
            isOpen={showCreateModal} 
            onClose={() => {
              setShowCreateModal(false);
              refetchMailboxes();
            }} 
            orderId={id}
            domain={order?.domain}
          />
        )}
      </AnimatePresence>
    </div>
  );
}