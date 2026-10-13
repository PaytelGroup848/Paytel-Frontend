import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import SkeletonTable from '../../components/ui/skeletons/SkeletonTable';

import { useInstances, useTerminateInstance } from '../../hooks/useHosting';

const badgeVariantByStatus = (status) => {
  if (status === 'active') return 'success';
  if (status === 'terminated' || status === 'failed' || status === 'suspended') return 'danger';
  if (status === 'provisioning' || status === 'pending') return 'warning';
  return 'default';
};

export default function ManageHosting() {
  const navigate = useNavigate();
  const instances = useInstances();
  const terminate = useTerminateInstance();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const rows = useMemo(() => (Array.isArray(instances.data) ? instances.data : []), [instances.data]);

  const onAskTerminate = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const onConfirmTerminate = async () => {
    try {
      await terminate.mutateAsync(selectedId);
    } catch (_) {
      // toast handled in hook
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  if (instances.isLoading) return <SkeletonTable rows={5} cols={6} />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold">Manage Hosting</div>
          <div className="text-sm text-textMuted mt-1">View and manage your hosting instances.</div>
        </div>
        <Button variant="secondary" onClick={() => navigate('/hosting/plans')}>
          Add New Hosting
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-textMuted">
              <tr>
                <th className="text-left px-4 py-3">Domain</th>
                <th className="text-left px-4 py-3">Plan</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Server IP</th>
                <th className="text-left px-4 py-3">Expiry</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((row) => (
                  <tr key={row.id} className="border-t border-white/10">
                    <td className="px-4 py-3 text-textPrimary">{row.domain || '—'}</td>
                    <td className="px-4 py-3 text-textPrimary/90">{row.planId || '—'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={badgeVariantByStatus(row.status)}>{row.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-textPrimary/90">{row.serverIp || '—'}</td>
                    <td className="px-4 py-3 text-textPrimary/90">
                      {row.expiresAt ? new Date(row.expiresAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/hosting/${row.id}`)}>
                          View
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => onAskTerminate(row.id)} loading={terminate.isPending}>
                          Terminate
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-10 text-center text-textMuted" colSpan={6}>
                    No instances yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Terminate instance?">
        <div className="text-sm text-textMuted">
          This will terminate the hosting instance. This action can’t be undone.
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirmTerminate} loading={terminate.isPending}>
            Terminate
          </Button>
        </div>
      </Modal>
    </div>
  );
}

