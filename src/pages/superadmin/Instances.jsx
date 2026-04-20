import { useMemo, useState } from 'react';

import { useInstances } from '../../hooks/useWordPress';

export default function Instances() {
  const [status, setStatus] = useState('');
  const { data, isLoading } = useInstances({ status: status || undefined });

  const rows = useMemo(() => data?.items || [], [data]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All WordPress Instances</h1>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="pending_dns">Pending DNS</option>
          <option value="provisioning">Provisioning</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <Th>Domain</Th>
              <Th>User</Th>
              <Th>Server</Th>
              <Th>Status</Th>
              <Th>Created</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-6 text-center text-textMuted" colSpan={5}>
                  Loading instances...
                </td>
              </tr>
            ) : (
              rows.map((instance) => (
                <tr key={instance.id || instance._id} className="border-t border-white/10">
                  <Td>{instance.domain}</Td>
                  <Td>{instance.userId || '-'}</Td>
                  <Td>{instance.serverIp || '-'}</Td>
                  <Td>{instance.status}</Td>
                  <Td>{new Date(instance.createdAt).toLocaleString()}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th className="text-left px-4 py-3 font-semibold">{children}</th>;
}

function Td({ children }) {
  return <td className="px-4 py-3">{children}</td>;
}
