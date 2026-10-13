import { useParams } from 'react-router-dom';

import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';

import { useInstance } from '../../hooks/useHosting';

const badgeVariantByStatus = (status) => {
  if (status === 'active') return 'success';
  if (status === 'terminated' || status === 'failed' || status === 'suspended') return 'danger';
  if (status === 'provisioning' || status === 'pending') return 'warning';
  return 'default';
};

export default function HostingDetails() {
  const { id } = useParams();
  const instance = useInstance(id);

  if (instance.isLoading) return <SkeletonCard height={220} />;
  if (!instance.data) return <Card>Instance not found.</Card>;

  const data = instance.data;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <div className="text-2xl font-bold">Hosting Details</div>
        <div className="text-sm text-textMuted mt-1">Instance overview and SSH details.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-textMuted">Status</div>
              <div className="mt-2">
                <Badge variant={badgeVariantByStatus(data.status)}>{data.status}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-textMuted">Created</div>
              <div className="mt-2 text-sm font-semibold">
                {data.createdAt ? new Date(data.createdAt).toLocaleString() : '—'}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-textMuted">Domain</div>
              <div className="mt-1 font-semibold">{data.domain || '—'}</div>
            </div>
            <div>
              <div className="text-textMuted">Plan</div>
              <div className="mt-1 font-semibold">{data.planId || '—'}</div>
            </div>
            <div>
              <div className="text-textMuted">Server IP</div>
              <div className="mt-1 font-semibold">{data.serverIp || '—'}</div>
            </div>
            <div>
              <div className="text-textMuted">Username</div>
              <div className="mt-1 font-semibold">{data.username || '—'}</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-lg font-semibold">SSH Details</div>
          <div className="text-sm text-textMuted mt-1">
            Use these details to connect to your server (once active).
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-textMuted">Server IP</div>
              <div className="mt-1 font-semibold">{data.serverIp || '—'}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-textMuted">Username</div>
              <div className="mt-1 font-semibold">{data.username || '—'}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

