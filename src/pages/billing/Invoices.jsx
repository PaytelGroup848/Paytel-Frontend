import { useMemo, useState } from 'react';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SkeletonTable from '../../components/ui/skeletons/SkeletonTable';

import { useInvoices } from '../../hooks/useBilling';

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toFixed(0)}`;

const badgeVariantByStatus = (status) => {
  if (status === 'paid') return 'success';
  if (status === 'failed') return 'danger';
  if (status === 'pending') return 'warning';
  return 'default';
};

export default function Invoices() {
  const invoices = useInvoices();
  const [page, setPage] = useState(1);
  const pageSize = 8;

  if (invoices.isLoading) return <SkeletonTable rows={6} cols={5} />;

  const rows = Array.isArray(invoices.data) ? invoices.data : [];
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageRows = useMemo(() => rows.slice((page - 1) * pageSize, page * pageSize), [rows, page]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold">Invoices</div>
          <div className="text-sm text-textMuted mt-1">Payment history and invoice status.</div>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-textMuted">
              <tr>
                <th className="text-left px-4 py-3">Invoice ID</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length ? (
                pageRows.map((inv) => (
                  <tr key={inv.id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold">
                      {inv.razorpayOrderId || inv.id}
                    </td>
                    <td className="px-4 py-3 text-textPrimary/90">
                      {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-textPrimary/90">{formatINR(inv.amount)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={badgeVariantByStatus(inv.status)}>{inv.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => {}}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-10 text-center text-textMuted" colSpan={5}>
                    No invoices yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
          <div className="text-xs text-textMuted">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

