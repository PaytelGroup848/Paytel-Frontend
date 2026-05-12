import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Search, Download, Eye, CheckCircle, AlertCircle, Clock, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';
import InvoiceDetailModal from './InvoiceDetailModal';

/* ============================================================
   Hook – fetch payment history (dynamic, with demo fallback)
   ============================================================ */
const usePaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('payments');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('/api/billing/payment-history');
        if (!res.ok) throw new Error();
        const json = await res.json();
        setPayments(Array.isArray(json) ? json : [json]);
      } catch {
        setPayments([
          { id: 1, paymentId: 'PFTPL/26-27/065', subscriptionId: 'AzqFUPVH2s54W4Wub', service: 'KVM 1', identifier: 'srv1569088.hstgr.cloud', paidAt: '7-May-26', amount: '999.00', currency: '₹', status: 'Paid', paymentMethod: 'Visa **** 4242', billingPeriod: '1 month', taxes: '180.00' },
          { id: 2, paymentId: 'PFTPL/26-27/066', subscriptionId: 'AzqGMPVGwwOgSzih', service: '.COM Domain', identifier: 'ramanelectricalcontrols.com', paidAt: '6-Apr-26', amount: '766.44', currency: '₹', status: 'Unpaid', paymentMethod: 'Netbanking', billingPeriod: '1 year', taxes: '138.00' },
          { id: 3, paymentId: 'PFTPL/26-27/067', subscriptionId: '16BgPOVGrABGx1Aot', service: 'Premium Web Hosting', identifier: 'kootospices.in', paidAt: '5-May-26', amount: '599.00', currency: '₹', status: 'Paid', paymentMethod: 'PayPal', billingPeriod: '1 month', taxes: '108.00' },
          { id: 4, paymentId: 'PFTPL/26-27/068', subscriptionId: 'XY9876543210', service: 'Business Email', identifier: 'cloudedata.info', paidAt: '1-Jan-26', amount: '299.00', currency: '₹', status: 'Paid', paymentMethod: 'UPI', billingPeriod: '1 month', taxes: '54.00' },
        ]);
      } finally { setLoading(false); }
    };
    fetchPayments();
  }, [activeTab]);

  return { payments, loading, activeTab, setActiveTab };
};

/* ============================================================
   Helper – format Indian Rupees
   ============================================================ */
const formatIndianCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/* ============================================================
   Complete Tax Invoice HTML (all sections) – used for both
   modal and combined download
   ============================================================ */
const buildTaxInvoiceHTML = (inv) => {
  const fmt = formatIndianCurrency;
  const items = inv.items || [];
  const itemsHTML = items.map((item, idx) => {
    const sl = item.slNo || idx + 1;
    const desc = item.description || '';
    const sub = (item.subDetails || []).map(line => `<div style="font-size:10px; margin-top:2px;">${line}</div>`).join('');
    const hsn = item.hsnSac || '';
    const qty = item.qty || 0;
    const unit = item.unit || '';
    const rateEx = item.rateExclusive || item.rate || 0;
    const rateIn = item.rateInclusive ? fmt(item.rateInclusive) : '';
    const amt = item.amount || 0;
    return `<tr><td class="text-center">${sl}</td><td><strong>${desc}</strong>${sub}</td><td class="text-center">${hsn}</td><td class="text-center">${qty} ${unit}</td><td class="text-right">${fmt(rateEx)}</td><td class="text-right">${rateIn}</td><td class="text-right">${fmt(amt)}</td></tr>`;
  }).join('');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Tax Invoice ${inv.invoiceNo || ''}</title>
<style>body{font-family:Arial,sans-serif;margin:20px;font-size:11px;color:#000;background:#fff;}table{width:100%;border-collapse:collapse;}td,th{border:1px solid black;padding:4px;}.text-right{text-align:right;}.text-center{text-align:center;}.font-bold{font-weight:bold;}.mt-2{margin-top:8px;}.mt-4{margin-top:16px;}.header-table td{border:none;}.bg-gray{background-color:#f3f4f6;}.page-break{page-break-after:always;}</style></head><body>
<h2 style="text-align:center;margin-bottom:10px;">Tax Invoice</h2>
<table class="header-table"><tr><td style="width:60%"><strong>${inv.companyName || ''}</strong>${inv.companyName?'<br/>':''}${inv.addressLine1?inv.addressLine1+(inv.addressLine2?', '+inv.addressLine2:''):''}${inv.addressLine1?'<br/>':''}${inv.cityPincode?inv.cityPincode+'<br/>':''}${inv.gstin?'GSTIN: '+inv.gstin+'<br/>':''}${(inv.stateName||inv.stateCode)?`State Name : ${inv.stateName||''}${inv.stateCode?', Code : '+inv.stateCode:''}<br/>`:''}${inv.cin?'CIN: '+inv.cin+'<br/>':''}${inv.email?'E-Mail : '+inv.email+'<br/>':''}${inv.website||''}</td><td style="width:40%" class="text-right">${inv.invoiceNo?`<strong>Invoice No.</strong> ${inv.invoiceNo}<br/>`:''}${inv.date?`<strong>Dated:</strong> ${inv.date}<br/>`:''}${inv.referenceNo?`<strong>Reference No:</strong> ${inv.referenceNo}<br/>`:''}</td></tr></table>
${inv.buyerName?`<table class="header-table mt-2"><tr><td style="width:50%"><strong>Buyer (Bill to)</strong><br/><strong>${inv.buyerName}</strong><br/>${inv.buyerAddress?inv.buyerAddress+'<br/>':''}${inv.buyerGstin?'GSTIN/UIN : '+inv.buyerGstin+'<br/>':''}${(inv.buyerStateName||inv.buyerStateCode)?`State Name : ${inv.buyerStateName||''}${inv.buyerStateCode?', Code : '+inv.buyerStateCode:''}<br/>`:''}${inv.buyerContactPerson?'Contact person : '+inv.buyerContactPerson+'<br/>':''}${inv.buyerContact?'Contact : '+inv.buyerContact+'<br/>':''}${inv.buyerEmail?'E-Mail : '+inv.buyerEmail+'<br/>':''}</td></tr></table>`:''}
<table class="mt-2"><thead><tr class="bg-gray"><th class="text-center" style="width:6%">Sl No</th><th style="width:32%">Description of Services</th><th class="text-center" style="width:12%">HSN/SAC</th><th class="text-center" style="width:10%">Quantity</th><th class="text-right" style="width:16%">Rate (Ind. of Tax)</th><th class="text-right" style="width:12%">Rate per</th><th class="text-right" style="width:12%">Amount</th></tr></thead><tbody>${itemsHTML}</tbody></table>
<table class="mt-2"><tr><td><strong>${inv.taxType||'IGST'}${inv.taxRate?' Output-'+inv.taxRate+'%':''}${inv.stateName?' ('+inv.stateName+')':''}</strong></td></tr></table>
<div class="mt-2"><strong>Amount Chargable (in words)</strong><br/><strong>${inv.amountInWords||''}</strong></div>
<table class="mt-2"><tr><td class="font-bold">HSN/SAC</td><td class="font-bold">Taxable Value</td><td class="font-bold">GST Value</td><td class="font-bold">Total Amount</td></tr><tr><td>${items.map(i=>i.hsnSac).join(', ')}</td><td class="text-right">${fmt(inv.taxableValue)}</td><td class="text-right">${fmt(inv.taxAmount)}</td><td class="text-right">${fmt(inv.totalAmount)}</td></tr></table>
<div class="mt-2"><strong>Tax Amount (in words) : ${inv.taxAmountInWords||''}</strong></div>
<div class="mt-2"><strong>Company's PAN</strong> : ${inv.pan||''}</div>
<div class="mt-4"><strong>Declaration</strong><br/><strong>Terms & Conditions:</strong><br/>${(inv.declarationTerms||[]).map(t=>`${t}<br/>`).join('')}<p>${inv.governmentLaw||''}</p></div>
<div class="mt-4"><strong>Company's Bank Details</strong><br/><table class="header-table"><tr><td>Account Holder</td><td>: ${inv.bankAccountHolder||''}</td></tr><tr><td>Bank Name</td><td>: ${inv.bankName||''}</td></tr><tr><td>Account Number</td><td>: ${inv.bankAccountNumber||''}</td></tr><tr><td>Branch & IFSC Code</td><td>: ${inv.bankBranch||''} & ${inv.bankIFSC||''}</td></tr></table></div>
<div class="mt-4 text-right"><strong>for ${inv.companyName||''}</strong><br/><br/><br/><p><strong>Authorised Signatory</strong></p></div>
<div class="mt-4" style="text-align:center;"><strong>SUBJECT TO ${inv.jurisdiction||'DELHI'} JURISDICTION</strong><br/><p>This is a Computer Generated Invoice</p></div>`;
};

/* ============================================================
   Payment Table Row
   ============================================================ */
const PaymentRow = ({ payment, isSelected, onSelect, onView }) => (
  <tr className="border-b border-slate-100 hover:bg-indigo-50/30 transition-all duration-200 group">
    <td className="py-4 px-3">
      <input type="checkbox" checked={isSelected} onChange={() => onSelect(payment.paymentId)} className="accent-indigo-600 w-4 h-4 rounded cursor-pointer" />
    </td>
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
      <button onClick={() => onView(payment)} className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="View invoice details"><Eye size={16} /></button>
    </td>
  </tr>
);

/* ============================================================
   Main Payment History Page
   ============================================================ */
export default function PaymentHistoryPage() {
  const navigate = useNavigate();
  const { payments, loading, activeTab, setActiveTab } = usePaymentHistory();
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPayments = useMemo(() => {
    let list = payments;
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
      list = list.filter(p => p.paymentId.toLowerCase().includes(s) || p.subscriptionId.toLowerCase().includes(s) || p.service.toLowerCase().includes(s) || p.identifier.toLowerCase().includes(s));
    }
    return list;
  }, [payments, activeTab, statusFilter, search]);

  const summary = useMemo(() => ({
    total: filteredPayments.length,
    paid: filteredPayments.filter(p => p.status === 'Paid').length,
    unpaid: filteredPayments.filter(p => p.status === 'Unpaid').length,
    totalAmount: filteredPayments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0),
  }), [filteredPayments]);

  const toggleSelect = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleSelectAll = () => selectedIds.length === filteredPayments.length ? setSelectedIds([]) : setSelectedIds(filteredPayments.map(p => p.paymentId));

  const mapPaymentToInvoiceData = (payment) => {
    const taxAmt = parseFloat(payment.taxes || 0);
    const totalAmt = parseFloat(payment.amount);
    const beforeTax = totalAmt - taxAmt;
    return {
      companyName: 'PayTel Financial Technologies Pvt Ltd.(Delhi)', addressLine1: 'A-212, 1st Floor, Phase-3', addressLine2: 'Okhla Industrial Area', cityPincode: 'New Delhi-110020', gstin: '07AAALCP30083C124N', stateName: 'Delhi', stateCode: '07', cin: 'U749690L2020PTC267460', email: 'customercare@codexdata.com', website: 'www.codexdata.com', pan: 'AALCP3083C',
      buyerName: payment.service, buyerAddress: payment.identifier, buyerGstin: '', buyerStateName: '', buyerStateCode: '', buyerContactPerson: '', buyerContact: '', buyerEmail: '',
      invoiceNo: payment.paymentId, date: payment.paidAt, referenceNo: '', otherRef: '',
      items: [{ slNo: 1, description: `${payment.service} (${payment.identifier}) – ${payment.billingPeriod}`, subDetails: [], hsnSac: '9985', qty: 1, unit: 'No.', rate: beforeTax, rateExclusive: beforeTax, rateInclusive: parseFloat(payment.amount), amount: beforeTax }],
      taxType: 'CGST+SGST', taxRate: 18, taxableValue: beforeTax, taxAmount: taxAmt, totalAmount: totalAmt,
      amountInWords: `INR ${formatIndianCurrency(totalAmt)} Only`, taxAmountInWords: `INR ${formatIndianCurrency(taxAmt)} Only`,
      bankAccountHolder: 'PAYTEL FINANCIAL TECHNOLOGIES PVT. LTD.', bankName: 'Yes Bank Ltd.', bankAccountNumber: '02986190004141', bankBranch: 'Okhla Industrial Estate-3', bankIFSC: 'YES80003236',
      declarationTerms: ['Support Other Than Cloud Services will not be Provided.', 'For Software related query, Kindly Contact to the respected Software Company only.'],
      governmentLaw: 'This Agreement shall be governed by the laws of India, and any disputes shall fall under the exclusive jurisdiction of the courts at New Delhi.',
      jurisdiction: 'DELHI',
    };
  };

  const handleViewInvoice = (payment) => setInvoiceData(mapPaymentToInvoiceData(payment));

  /* ============================================================
     BULK DOWNLOAD – combine all selected invoices into one page
     with page breaks, then open a single print window.
     ============================================================ */
  const handleDownloadSelected = () => {
    if (selectedIds.length === 0) { toast.error('No invoice selected'); return; }

    const selectedPayments = payments.filter(p => selectedIds.includes(p.paymentId));
    const htmlParts = selectedPayments.map(payment => {
      const invData = mapPaymentToInvoiceData(payment);
      return buildTaxInvoiceHTML(invData);
    });

    // Wrap each invoice in a page-break div (except the last one)
    const combinedHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Invoices</title>
<style>
  body { font-family: Arial, sans-serif; margin: 0; background: #fff; }
  .invoice-container { padding: 20px; page-break-after: always; }
  .invoice-container:last-child { page-break-after: auto; }
  @media print {
    .invoice-container { page-break-after: always; }
    .invoice-container:last-child { page-break-after: auto; }
  }
</style></head><body>
${htmlParts.map(html => `<div class="invoice-container">${html}</div>`).join('')}
</body></html>`;

    const w = window.open('', '_blank');
    if (w) {
      w.document.write(combinedHTML);
      w.document.close();
      w.focus();
      w.print();
    } else {
      toast.error('Pop-up blocked! Please allow pop-ups for this site.');
    }
    toast.success(`Prepared ${selectedIds.length} invoice(s) for download`);
  };

  if (loading) {
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
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition flex items-center gap-1 font-medium"><Home size={16} /><span>Dashboard</span></button>
        <ChevronRight size={16} />
        <button onClick={() => navigate('/billing')} className="hover:text-indigo-600 transition font-medium">Billing</button>
        <ChevronRight size={16} />
        <span className="font-bold text-slate-800">Payment History</span>
      </nav>

      {/* Header Card – enhanced with softer shadow and subtle gradient border */}
      <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 p-6 mb-8 ring-1 ring-white/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Payment History</h1>
            <p className="text-slate-500 mt-1 text-sm">View, filter, and download your payment invoices.</p>
          </div>
          {/* Summary chips – refined pill styles */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-xs font-semibold text-slate-600 shadow-sm">Total: <span className="text-slate-800">{summary.total}</span></div>
            <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-700 shadow-sm">Paid: <span className="text-emerald-800">{summary.paid}</span></div>
            {summary.unpaid > 0 && <div className="px-3 py-1.5 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-700 shadow-sm">Unpaid: <span className="text-red-800">{summary.unpaid}</span></div>}
            <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-semibold text-indigo-700 shadow-sm">Total: ₹ {formatIndianCurrency(summary.totalAmount)}</div>
          </div>
        </div>
      </div>

      {/* Tabs + Status Filter */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex border-b border-slate-200">
          <button onClick={() => { setActiveTab('payments'); setSelectedIds([]); setStatusFilter('All'); }} className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'payments' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Payment History</button>
          <button onClick={() => { setActiveTab('refunds'); setSelectedIds([]); setStatusFilter('All'); }} className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'refunds' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Refund History</button>
        </div>
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

      {/* Search & Bulk Download */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by ID, service, or identifier..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition placeholder:text-slate-400 shadow-sm" />
        </div>
        <button onClick={handleDownloadSelected} disabled={selectedIds.length === 0} className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2 whitespace-nowrap">
          <Download size={16} /> Download Selected ({selectedIds.length})
        </button>
      </div>

      {/* Table – enhanced with softer shadow and hover effects */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden ring-1 ring-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b-2 border-slate-200">
                <th className="py-4 px-3 w-10"><input type="checkbox" checked={filteredPayments.length > 0 && selectedIds.length === filteredPayments.length} onChange={toggleSelectAll} className="accent-indigo-600 w-4 h-4 rounded cursor-pointer" /></th>
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
                <tr>
                  <td colSpan={8} className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-slate-300" />
                      <p className="text-slate-500 font-medium">No {activeTab === 'refunds' ? 'refunds' : 'payments'} found</p>
                      {(search || statusFilter !== 'All') && (
                        <button onClick={() => { setSearch(''); setStatusFilter('All'); }} className="text-xs text-indigo-600 hover:underline font-medium">Clear all filters</button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <PaymentRow key={payment.paymentId} payment={payment} isSelected={selectedIds.includes(payment.paymentId)} onSelect={toggleSelect} onView={handleViewInvoice} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected count footer */}
      {selectedIds.length > 0 && (
        <div className="mt-4 px-4 py-3 bg-indigo-50/80 backdrop-blur-sm border border-indigo-200 rounded-xl flex items-center justify-between text-sm shadow-sm">
          <span className="font-medium text-indigo-700">{selectedIds.length} invoice(s) selected</span>
          <button onClick={() => setSelectedIds([])} className="text-xs text-indigo-600 hover:underline font-medium">Clear selection</button>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceData && <InvoiceDetailModal invoiceData={invoiceData} onClose={() => setInvoiceData(null)} />}
    </div>
  );
}