import React, { useState } from 'react';
import {
  useAdminInvoices,
  useUpdateInvoiceStatus,
  useDeleteInvoice,
  downloadInvoicePdf,
} from '../../hooks/useInvoices';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Modal from './Modal';
import {
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  Filter,
  FileText,
  Calendar,
  User,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Printer,
} from 'lucide-react';
import CreateInvoiceModal from './CreateInvoiceModal';

export default function Invoices() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [service, setService] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const params = {
    page,
    search,
    ...(status && { status }),
    ...(service && { service }),
  };

  const { data, isLoading } = useAdminInvoices(params);
  const deleteMutation = useDeleteInvoice();

  const handleDownload = (invoice) => {
    downloadInvoicePdf(invoice.id, invoice.invoiceNo);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      deleteMutation.mutate(id);
    }
  };

  const statusVariants = {
    paid: 'success',
    unpaid: 'danger',
    expire_soon: 'warning',
    renew: 'info',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Invoices</h1>
          <p className="text-textMuted text-sm">Manage billing and manual invoices</p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </Button>
      </div>

      <Card className="p-4 bg-white/5 border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
            <Input
              placeholder="Search by invoice no or client name..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
          >
            <option value="" className="bg-[#1a1a1a]">All Status</option>
            <option value="paid" className="bg-[#1a1a1a]">Paid</option>
            <option value="unpaid" className="bg-[#1a1a1a]">Unpaid</option>
            <option value="expire_soon" className="bg-[#1a1a1a]">Expire Soon</option>
            <option value="renew" className="bg-[#1a1a1a]">Renew</option>
          </select>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
          >
            <option value="" className="bg-[#1a1a1a]">All Services</option>
            <option value="vps" className="bg-[#1a1a1a]">VPS</option>
            <option value="wordpress" className="bg-[#1a1a1a]">WordPress</option>
            <option value="php" className="bg-[#1a1a1a]">PHP+HTML</option>
            <option value="email" className="bg-[#1a1a1a]">Email</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-textMuted text-sm">
              <tr>
                <th className="py-4 px-4 font-medium">Invoice No</th>
                <th className="py-4 px-4 font-medium">Client</th>
                <th className="py-4 px-4 font-medium">Service</th>
                <th className="py-4 px-4 font-medium">Amount</th>
                <th className="py-4 px-4 font-medium text-center">Status</th>
                <th className="py-4 px-4 font-medium text-center">Type</th>
                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <Spinner className="w-8 h-8 mx-auto" />
                  </td>
                </tr>
              ) : data?.items?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-textMuted">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                data?.items.map((inv) => (
                  <tr key={inv.id} className="text-sm hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-medium text-textPrimary">{inv.invoiceNo}</td>
                    <td className="py-4 px-4">
                      <div className="text-textPrimary">{inv.clientName}</div>
                      <div className="text-[11px] text-textMuted">{inv.clientEmail}</div>
                    </td>
                    <td className="py-4 px-4 capitalize">
                      <div className="text-textPrimary">{inv.service}</div>
                      <div className="text-[11px] text-textMuted">{inv.packageName}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-textPrimary">
                      ₹{(inv.total / 100).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={statusVariants[inv.status] || 'default'}>
                        {inv.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={inv.generatedType === 'auto' ? 'default' : 'info'}>
                        {inv.generatedType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(inv)}
                          className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data?.meta?.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-textMuted">
              Page {data.meta.page} of {data.meta.totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                disabled={page === data.meta.totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}

function InvoiceDetailModal({ invoice, isOpen, onClose }) {
  const statusVariants = {
    paid: 'success',
    unpaid: 'danger',
    expire_soon: 'warning',
    renew: 'info',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details">
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-black text-indigo-500 mb-1">CloudeData</div>
              <div className="text-sm text-textMuted">Premium Hosting Infrastructure</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-textPrimary">INVOICE</div>
              <div className="text-sm text-textMuted">#{invoice.invoiceNo}</div>
              <Badge variant={statusVariants[invoice.status]} className="mt-2">
                {invoice.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Billed To</div>
                <div className="text-textPrimary font-medium">{invoice.clientName}</div>
                <div className="text-sm text-textMuted">{invoice.clientEmail}</div>
                <div className="text-sm text-textMuted">{invoice.clientPhone}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Payment Method</div>
                <div className="text-sm text-textPrimary capitalize">{invoice.paymentMethod.replace('_', ' ')}</div>
              </div>
            </div>
            <div className="space-y-4 text-right">
              <div>
                <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Invoice Date</div>
                <div className="text-sm text-textPrimary">{new Date(invoice.createdAt).toLocaleDateString()}</div>
              </div>
              {invoice.renewalDate && (
                <div>
                  <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Renewal Date</div>
                  <div className="text-sm text-textPrimary">{new Date(invoice.renewalDate).toLocaleDateString()}</div>
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] text-[11px] font-bold text-textMuted uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                <tr>
                  <td className="py-4 px-4">
                    <div className="text-textPrimary font-medium uppercase">{invoice.service} Subscription</div>
                    <div className="text-textMuted text-xs mt-1">
                      Package: {invoice.packageName} ({invoice.packageType})
                      {invoice.specifications && Object.entries(invoice.specifications).map(([k, v]) => (
                        <span key={k}> • {k}: {v}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-textPrimary">
                    ₹{(invoice.subtotal / 100).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-textMuted">
                <span>Subtotal</span>
                <span className="font-mono">₹{(invoice.subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-textMuted">
                <span>GST (18%)</span>
                <span className="font-mono">₹{(invoice.gst / 100).toFixed(2)}</span>
              </div>
              <hr className="border-white/5" />
              <div className="flex justify-between text-lg font-bold text-textPrimary">
                <span>Total</span>
                <span className="text-indigo-500 font-mono">₹{(invoice.total / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <div className="text-[10px] text-textMuted italic">
              This is a computer-generated invoice. No signature required.
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/[0.02] border-t border-white/5 p-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
            onClick={() => downloadInvoicePdf(invoice.id, invoice.invoiceNo)}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
}
