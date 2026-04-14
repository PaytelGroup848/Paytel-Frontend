import { useNavigate } from 'react-router-dom';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SkeletonTable from '../../components/ui/skeletons/SkeletonTable';

import { useDomains } from '../../hooks/useDomains';

const badgeVariantByStatus = (status) => {
  if (status === 'active') return 'success';
  if (status === 'expired' || status === 'suspended') return 'danger';
  if (status === 'pending') return 'warning';
  return 'default';
};

export default function Domains() {
  const navigate = useNavigate();
  const domains = useDomains();

  if (domains.isLoading) return <SkeletonTable rows={5} cols={5} />;

  const rows = Array.isArray(domains.data) ? domains.data : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold">Domains</div>
          <div className="text-sm text-textMuted mt-1">Manage your registered domains.</div>
        </div>
        <Button variant="secondary" onClick={() => navigate('/domains/search')}>
          Register New Domain
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-textMuted">
              <tr>
                <th className="text-left px-4 py-3">Domain</th>
                <th className="text-left px-4 py-3">Extension</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Expires</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold">{row.name}</td>
                    <td className="px-4 py-3 text-textPrimary/90">{row.extension}</td>
                    <td className="px-4 py-3">
                      <Badge variant={badgeVariantByStatus(row.status)}>{row.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-textPrimary/90">
                      {row.expiresAt ? new Date(row.expiresAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/domains/${row.id}`)}>
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-10 text-center text-textMuted" colSpan={5}>
                    No domains yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

