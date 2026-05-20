import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Mail,
  Home,
  Calendar,
  Users,
  RefreshCw,
  ShoppingCart,
  ChevronRight,
  MoreHorizontal,
  Shield,
  AlertCircle,
  CheckCircle,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useEmailOrders, useDnsStatus } from '../../hooks/useEmailHosting';
import DkimVerificationModal from './DkimVerificationModal'; // ✅ Import the modal
import SkeletonList from '../../components/ui/skeletons/SkeletonList';

/* ============================================================
   Action Menu Component
   ============================================================ */
const ActionMenu = ({ emailOrderId, domain, isDnsVerified, onCheckDns, orderStatus }) => {
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
      zIndex: 99999,
    };
  };

  const isActive = orderStatus === 'active';

 

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
    </>
  );
};

/* ============================================================
   Order Row Component
   ============================================================ */
const OrderRow = ({ order, onCheckDns, refetchOrders }) => {
  const orderId = order.id || order._id || order.orderId;
  
  const { data: dnsStatus, refetch: refetchDnsStatus } = useDnsStatus(orderId);
  const isDnsVerified = dnsStatus?.allVerified === true;
  const orderStatus = order.status;
  const navigate = useNavigate();

  useEffect(() => {
    // Refetch DNS status every 30 seconds if not verified
    if (!isDnsVerified && orderStatus === 'pending_dns') {
      const interval = setInterval(() => {
        refetchDnsStatus();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isDnsVerified, orderStatus, refetchDnsStatus]);


const handleMailboxClick = () => {
  const orderId = order.id || order._id || order.orderId;
  if (isDnsVerified && orderStatus === 'active') {
    navigate(`/emails/mailbox/${orderId}`); // Fixed: include ID in route
  } else if (!isDnsVerified) {
    toast.error('Please verify DNS records first');
    onCheckDns(orderId, order.domain);
  } else if (orderStatus !== 'active') {
    toast.error('Order is not active yet');
  }
};

  // Get plan details
  const planName = order.planId?.name || 'Email Plan';
  const domain = order.domain;
  const expirationDate = order.expiresAt;
  const mailboxesUsed = order.mailboxesUsed || 0;
  const mailboxesTotal = order.planId?.maxMailboxes || 1;

  // Status badge
  const getStatusBadge = () => {
    if (orderStatus === 'active') {
      return { text: 'Active', color: 'bg-green-100 text-green-700', icon: <CheckCircle size={12} /> };
    } else if (orderStatus === 'pending_dns') {
      return { text: 'Pending DNS', color: 'bg-amber-100 text-amber-700', icon: <AlertCircle size={12} /> };
    } else if (orderStatus === 'pending_payment') {
      return { text: 'Pending Payment', color: 'bg-red-100 text-red-700', icon: <AlertCircle size={12} /> };
    }
    return { text: orderStatus, color: 'bg-slate-100 text-slate-700', icon: null };
  };

  const statusBadge = getStatusBadge();

  console.log("this my sattus =====>>>",statusBadge )
 

 

return (
  !["pending_payment", "failed"].includes(statusBadge.text) && (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-xl px-5 py-4 transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.05)]">
      
      {/* Plan Name and Status */}
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-slate-800 text-sm">
            {planName}
          </h3>

          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
          >
            {statusBadge.icon}
            {statusBadge.text}
          </span>
        </div>

        <p className="text-xs text-slate-500 font-mono mt-0.5">
          {domain}
        </p>
      </div>

      {/* Expiration Date */}
      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
        <Calendar size={14} className="text-slate-400" />

        <span className="whitespace-nowrap font-medium">
          {expirationDate
            ? new Date(expirationDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}
        </span>
      </div>

      {/* Mailboxes Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleMailboxClick}
          className={`group/mail flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 shadow-sm ${
            isDnsVerified && orderStatus === "active"
              ? "border-slate-200/80 bg-white/60 text-slate-700 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white hover:text-indigo-700 hover:shadow-md"
              : "border-slate-200/80 bg-slate-50 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Users
            size={16}
            className="text-slate-400 group-hover/mail:text-indigo-500 transition-colors"
          />

          <span className="text-sm font-semibold">
            {mailboxesUsed}/{mailboxesTotal}
          </span>

          <span className="text-sm text-slate-500">Mailboxes</span>
        </button>
      </div>

      {/* DNS Button */}
      <button
        onClick={() => onCheckDns(orderId, domain)}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 cursor-pointer text-xs sm:text-sm font-semibold border-2 border-indigo-400 text-indigo-600 rounded-xl hover:bg-indigo-100 hover:text-indigo-800 hover:border-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
        title="View DNS Records"
      >
        <Search size={14} className="sm:w-4 sm:h-4 w-3.5 h-3.5" />
        <span>View DNS</span>
      </button>
    </div>
  )
);
  
};


export default function EmailsPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, refetch: refetchOrders } = useEmailOrders();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showDnsModal, setShowDnsModal] = useState(false);
  const [search, setSearch] = useState('');

const handleCheckDns = useCallback((orderId, domain) => {
  console.log('EmailsPage: handleCheckDns called', { orderId, domain });
  setSelectedOrderId(orderId);
  setSelectedDomain(domain);
  setShowDnsModal(true);
  console.log('States after setting:', { showDnsModal: true, selectedOrderId: orderId });
}, []);

  const handleDnsVerified = () => {
    setShowDnsModal(false);
    refetchOrders();
    toast.success('DNS verified! Your email is now active.');
  };

  useEffect(() => {
    if (showDnsModal) {
      console.log('Modal is triggered for Order ID:', selectedOrderId);
    }
  }, [showDnsModal, selectedOrderId]);

  const filteredOrders = orders?.filter(order => 
    order.status !== 'pending_payment' && (
      order.domain?.toLowerCase().includes(search.toLowerCase()) ||
      order.planId?.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Email Hosting</h1>
              <p className="text-sm text-slate-500">Loading your orders...</p>
            </div>
          </div>
          <SkeletonList rows={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      {/* Header bar – breadcrumb + action button */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 backdrop-blur-sm bg-white/70 border border-slate-200/60 rounded-2xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800">Email Hosting</h1>
            <ChevronRight size={18} className="text-slate-400" />
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-white hover:text-indigo-600 transition-all"
            >
              <Home size={16} />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search domains..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl pl-4 pr-4 py-2.5 w-64 focus:outline-none focus:border-indigo-400 transition-all text-sm"
              />
            </div>
            <button
              onClick={() => navigate('/email/plan')}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <ShoppingCart size={16} /> Buy Email
            </button>
          </div>
        </div>

        {/* Column headers */}
        {filteredOrders && filteredOrders.length > 0 && (
          <div className="grid grid-cols-4 items-center px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/60 mb-2">
            <div>Plan & Domain</div>
            <div>Expiration</div>
            <div >Mailboxes</div>
            <div className="text-center">Actions</div>
          </div>
        )}

        {/* Order rows */}
        {!filteredOrders || filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm mt-6">
            <Mail size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">No email hosting orders found.</p>
            <button
              onClick={() => navigate('/email/plan')}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              Buy an Email Plan
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredOrders.map((order) => (
              <OrderRow 
                key={order.id} 
                order={order} 
                onCheckDns={handleCheckDns}
                refetchOrders={refetchOrders}
              />
            ))}
          </div>
        )}
      </div>
      

      {/* DNS Verification Modal */}
      {showDnsModal && selectedOrderId && (
  <DkimVerificationModal
    emailOrderId={selectedOrderId}
    isOpen={showDnsModal}
    onClose={() => {
      console.log('Closing modal');
      setShowDnsModal(false);
    }}
    onVerified={handleDnsVerified}
  />
)}
    </div>
  );
}