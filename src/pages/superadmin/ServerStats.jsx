import Modal from '../../components/ui/Modal';
import { useServerStats } from '../../hooks/useAdminServers';

export default function ServerStats({ serverId, isOpen, onClose }) {
  const { data, isLoading } = useServerStats(serverId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Live Server Stats">
      {isLoading ? (
        <div className="text-sm text-textMuted">Loading stats...</div>
      ) : (
        <div className="space-y-4 text-sm">
          <StatBlock title="CPU / Uptime" value={data?.uptime || 'N/A'} />
          <StatBlock title="RAM" value={data?.memory || 'N/A'} />
          <StatBlock title="Disk" value={data?.disk || 'N/A'} />
        </div>
      )}
    </Modal>
  );
}

function StatBlock({ title, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="text-xs uppercase text-textMuted mb-1">{title}</div>
      <pre className="text-xs whitespace-pre-wrap break-words text-textPrimary">{value}</pre>
    </div>
  );
}
