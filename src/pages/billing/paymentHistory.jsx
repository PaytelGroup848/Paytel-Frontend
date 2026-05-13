import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Search, Eye, CheckCircle, AlertCircle, Clock, Filter, X, Download } from 'lucide-react';
import InvoiceDetailModal from './InvoiceDetailModal';
import { usePaymentsHistory, useInvoice } from "../../hooks/useBilling";


/* ============================================================
   Helper – format Indian Rupees
   ============================================================ */
const formatIndianCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const PaymentRow = ({ payment, onView }) => (
  <tr className="border-b border-slate-100 hover:bg-indigo-50/30 transition-all duration-200 group">
    <td className="py-4 px-3 font-mono text-xs text-slate-700">{payment.paymentId}</td>
    <td className="py-4 px-3 text-xs font-mono text-slate-500 truncate max-w-[110px]">{payment.subscriptionId}</td>
    <td className="py-4 px-3">
      <div className="text-sm font-semibold text-slate-800">{payment.service}</div>
      <div className="text-xs text-slate-400 mt-0.5">{payment.identifier}</div>
    </td>
    <td className="py-4 px-3 text-xs text-slate-600 whitespace-nowrap">{payment.paidAt}</td>
    <td className="py-4 px-3">
      {payment.status === 'Paid' ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle size={10} /> Paid</span>
      ) : payment.status === 'Unpaid' ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200"><AlertCircle size={10} /> Unpaid</span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200"><Clock size={10} /> {payment.status || 'Pending'}</span>
      )}
    </td>
    <td className="py-4 px-3 text-right text-sm font-bold text-slate-800 whitespace-nowrap">₹ {formatIndianCurrency(payment.amount)}</td>
    <td className="py-4 px-3 text-right">
      <button onClick={() => onView(payment.id)} className="p-2 rounded-xl cursor-pointer text-green-500 hover:text-green-600 hover:bg-green-50 transition-all" title="View invoice details"><Eye size={18} /></button>
    </td>
  </tr>
);

export default function PaymentHistoryPage() {
  const navigate = useNavigate();
  const { data: payments, isLoading } = usePaymentsHistory();
  const [activeTab, setActiveTab] = useState('payments');
  const [search, setSearch] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const { data: invoiceData } = useInvoice(selectedInvoiceId);

  const filteredPayments = useMemo(() => {
    let list = payments || [];
    if (activeTab === 'payments') list = list.filter(p => !p.status?.toLowerCase().includes('refund'));
    else list = list.filter(p => p.status?.toLowerCase().includes('refund'));
    if (statusFilter === 'Paid') list = list.filter(p => p.status === 'Paid');
    else if (statusFilter === 'Unpaid') list = list.filter(p => p.status === 'Unpaid');
    else if (statusFilter === 'Old') {
      const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      list = list.filter(p => new Date(p.paidAt) < thirtyDaysAgo);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(p => p.paymentId?.toLowerCase().includes(s) || p.subscriptionId?.toLowerCase().includes(s) || p.service?.toLowerCase().includes(s) || p.identifier?.toLowerCase().includes(s));
    }
    return list;
  }, [payments, activeTab, statusFilter, search]);

  const summary = useMemo(() => ({
    total: filteredPayments.length,
    paid: filteredPayments.filter(p => p.status === 'Paid').length,
    unpaid: filteredPayments.filter(p => p.status === 'Unpaid').length,
    totalAmount: filteredPayments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0),
  }), [filteredPayments]);

  const handleViewInvoice = (id) => setSelectedInvoiceId(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-slate-500 text-sm font-medium">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition flex items-center gap-1 font-medium"><Home size={16} /><span>Dashboard</span></button>
        <ChevronRight size={16} />
        <button onClick={() => navigate('/billing')} className="hover:text-indigo-600 transition font-medium">Billing</button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Payment History</span>
      </nav>

      <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 p-6 mb-8 ring-1 ring-white/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Payment History</h1>
            <p className="text-slate-500 mt-1 text-sm">View, filter, and download your payment invoices.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-xs font-semibold text-slate-600 shadow-sm">Total: <span className="text-slate-800">{summary.total}</span></div>
            <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-700 shadow-sm">Paid: <span className="text-emerald-800">{summary.paid}</span></div>
            {summary.unpaid > 0 && <div className="px-3 py-1.5 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-700 shadow-sm">Unpaid: <span className="text-red-800">{summary.unpaid}</span></div>}
            <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-700 shadow-sm">Total: ₹ {formatIndianCurrency(summary.totalAmount)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by ID, service, or identifier..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition placeholder:text-slate-400 shadow-sm" />
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            {['All', 'Paid', 'Unpaid', 'Old'].map(filter => (
              <button key={filter} onClick={() => setStatusFilter(filter)} className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all shadow-sm ${statusFilter === filter ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200'}`}>{filter}</button>
            ))}
            {statusFilter !== 'All' && (
              <button onClick={() => setStatusFilter('All')} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition" title="Clear filter"><X size={14} /></button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden ring-1 ring-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b-2 border-slate-200">
                <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Payment ID</th>
                <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Subscription ID</th>
                <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Paid at</th>
                <th className="py-4 px-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="py-4 px-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-20"><div className="flex flex-col items-center gap-3"><Search size={40} className="text-slate-300" /><p className="text-slate-500 font-medium">No payments found</p>{(search || statusFilter !== 'All') && (<button onClick={() => { setSearch(''); setStatusFilter('All'); }} className="text-xs text-indigo-600 hover:underline font-medium">Clear all filters</button>)}</div></td></tr>
              ) : (
                filteredPayments.map((payment) => (
                  <PaymentRow key={payment.paymentId} payment={payment} onView={handleViewInvoice} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {invoiceData && <InvoiceDetailModal invoiceData={invoiceData} onClose={() => setSelectedInvoiceId(null)} />}
    </div>
  );
}