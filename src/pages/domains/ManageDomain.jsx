import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import SkeletonTable from '../../components/ui/skeletons/SkeletonTable';

import { useDomain, useDNSRecords, useUpdateDNS } from '../../hooks/useDomains';

const badgeVariantByStatus = (status) => {
  if (status === 'active') return 'success';
  if (status === 'expired' || status === 'suspended') return 'danger';
  if (status === 'pending') return 'warning';
  return 'default';
};

export default function ManageDomain() {
  const { id } = useParams();

  const domain = useDomain(id);
  const dns = useDNSRecords(id);
  const updateDns = useUpdateDNS();

  const [form, setForm] = useState({ type: 'A', name: '@', value: '', ttl: 3600 });

  const records = useMemo(() => (Array.isArray(dns.data) ? dns.data : []), [dns.data]);

  const onSave = async () => {
    try {
      await updateDns.mutateAsync({
        id,
        record: {
          type: form.type,
          name: form.name,
          value: form.value,
          ttl: Number(form.ttl || 3600),
        },
      });
      setForm((s) => ({ ...s, value: '' }));
    } catch (_) {
      // toast handled in hook
    }
  };

  if (domain.isLoading) return <Card>Loading...</Card>;
  if (!domain.data) return <Card>Domain not found.</Card>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold">Manage Domain</div>
          <div className="text-sm text-textMuted mt-1">DNS records and domain details.</div>
        </div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">{domain.data.name}</div>
            <div className="text-sm text-textMuted mt-1">
              Expires: {domain.data.expiresAt ? new Date(domain.data.expiresAt).toLocaleDateString() : '—'}
            </div>
          </div>
          <Badge variant={badgeVariantByStatus(domain.data.status)}>{domain.data.status}</Badge>
        </div>
      </Card>

      <Card>
        <div className="text-lg font-semibold">Add / Update DNS Record</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Type</label>
            <select
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/50 px-3"
              value={form.type}
              onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
            >
              {['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Name"
            name="name"
            placeholder="@"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <Input
            label="Value"
            name="value"
            placeholder="1.2.3.4"
            value={form.value}
            onChange={(e) => setForm((s) => ({ ...s, value: e.target.value }))}
          />
          <Input
            label="TTL"
            name="ttl"
            type="number"
            placeholder="3600"
            value={form.ttl}
            onChange={(e) => setForm((s) => ({ ...s, ttl: e.target.value }))}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onSave} loading={updateDns.isPending} disabled={!form.value}>
            Save
          </Button>
        </div>
      </Card>

      {dns.isLoading ? (
        <SkeletonTable rows={5} cols={4} />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-textMuted">
                <tr>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Value</th>
                  <th className="text-left px-4 py-3">TTL</th>
                </tr>
              </thead>
              <tbody>
                {records.length ? (
                  records.map((r) => (
                    <tr key={r.id} className="border-t border-white/10">
                      <td className="px-4 py-3 font-semibold">{r.type}</td>
                      <td className="px-4 py-3 text-textPrimary/90">{r.name}</td>
                      <td className="px-4 py-3 text-textPrimary/90">{r.value}</td>
                      <td className="px-4 py-3 text-textPrimary/90">{r.ttl}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-10 text-center text-textMuted" colSpan={4}>
                      No DNS records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

