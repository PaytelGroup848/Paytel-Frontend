import React, { useState } from 'react';
import { useBillingInvoices } from '../../hooks/useBilling';
import SkeletonTable from '../../components/ui/skeletons/SkeletonTable';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

function BillingHistory() {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const { data, isLoading, isError } = useBillingInvoices({ page, limit });

  if (isLoading) return <SkeletonTable rows={5} columns={4} />;
  if (isError) return <div className="p-4 text-red-500">Failed to load billing history.</div>;

  const invoices = data?.data || [];
  const meta = data?.meta || { total: 0 };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Billing History</h1>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Invoice ID</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Plan</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      #{invoice.invoiceNumber || invoice._id?.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {invoice.planName || 'Standard Plan'}
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900">
                      ₹{(invoice.amount / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={invoice.status === 'paid' ? 'success' : 'warning'}>
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta.total > limit && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, meta.total)} of {meta.total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page * limit >= meta.total}
                className="px-4 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default BillingHistory;