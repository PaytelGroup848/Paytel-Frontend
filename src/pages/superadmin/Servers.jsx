import { useMemo, useState } from 'react';

import Modal from '../../components/ui/Modal';
import { useAddServer, useDeleteServer, useServers, useUpdateServer } from '../../hooks/useAdminServers';
import ServerStats from './ServerStats';

const initialForm = {
  ip: '',
  sshPassword: '',
};

export default function Servers() {
  const { data: servers = [], isLoading } = useServers();
  const addServer = useAddServer();
  const updateServer = useUpdateServer();
  const deleteServer = useDeleteServer();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statsServerId, setStatsServerId] = useState('');

  const openAdd = () => {
    setEditing(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (server) => {
    setEditing(server);
    setForm({
      ip: server.ip || '',
      sshPassword: '',
    });
    setIsModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editing?._id || editing?.id) {
      await updateServer.mutateAsync({ id: editing.id || editing._id, payload: form });
    } else {
      await addServer.mutateAsync(form);
    }
    setEditing(null);
    setForm(initialForm);
    setIsModalOpen(false);
  };

  const rows = useMemo(() => servers, [servers]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Server Management</h1>
        <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold">
          Add Server
        </button>
      </div>

      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <Th>Name</Th>
              <Th>IP</Th>
              <Th>Location</Th>
              <Th>Slots</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-textMuted">
                  Loading servers...
                </td>
              </tr>
            ) : (
              rows.map((s) => (
                <tr key={s.id || s._id} className="border-t border-white/10">
                  <Td>{s.name}</Td>
                  <Td>{s.ip}</Td>
                  <Td>{[s.location, s.region].filter(Boolean).join(', ') || '-'}</Td>
                  <Td>
                    {s.usedSlots}/{s.totalSlots}
                  </Td>
                  <Td>{s.isActive ? 'Active' : 'Inactive'}</Td>
                  <Td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="px-2 py-1 rounded bg-white/10">
                        Edit
                      </button>
                      <button
                        onClick={() => setStatsServerId(s.id || s._id)}
                        className="px-2 py-1 rounded bg-indigo-600/50"
                      >
                        View Stats
                      </button>
                      <button
                        disabled={(s.usedSlots || 0) > 0 || deleteServer.isPending}
                        onClick={() => deleteServer.mutate(s.id || s._id)}
                        className="px-2 py-1 rounded bg-red-600/70 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditing(null);
          setForm(initialForm);
        }}
        title={editing ? 'Edit Server' : 'Add Server'}
      >
        <form onSubmit={submit} className="space-y-3 text-sm max-w-md mx-auto">
          <Input
            label="Server IP"
            value={form.ip}
            placeholder="210.56.147.233"
            onChange={(v) => setForm((p) => ({ ...p, ip: v }))}
            required
          />
          <Input
            label="SSH Password"
            type="password"
            placeholder="Enter SSH root password"
            value={form.sshPassword}
            onChange={(v) => setForm((p) => ({ ...p, sshPassword: v }))}
            required
          />
          <button type="submit" className="mt-2 px-4 py-2 rounded bg-red-600 text-white text-sm font-semibold">
            {editing ? 'Update Server' : 'Add Server'}
          </button>
        </form>
      </Modal>

      <ServerStats serverId={statsServerId} isOpen={Boolean(statsServerId)} onClose={() => setStatsServerId('')} />
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <label className="block">
      <span className="text-xs text-textMuted">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2"
      />
    </label>
  );
}

function Th({ children }) {
  return <th className="text-left px-4 py-3 font-semibold">{children}</th>;
}

function Td({ children }) {
  return <td className="px-4 py-3">{children}</td>;
}
