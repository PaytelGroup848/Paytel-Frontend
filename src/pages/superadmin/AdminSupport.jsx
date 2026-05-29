import React, { useMemo, useState } from 'react';

import AdminReplyModal from './AdminReplyModal';
import AdminSupportStats from './AdminSupportStats';
import {
  useAdminTickets,
  useDeleteTicket,
  useUpdateTicketStatus,
} from '../../hooks/useSupport';

const priorityBadge = (priority) => {
  const map = {
    Low: 'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return map[priority] || 'bg-slate-500/20 text-slate-300';
};

const statusBadge = (status) => {
  const map = {
    Open: 'bg-red-500/20 text-red-300',
    Pending: 'bg-yellow-500/20 text-yellow-300',
    Closed: 'bg-green-500/20 text-green-300',
  };
  return map[status] || 'bg-slate-500/20 text-slate-300';
};

export default function AdminSupport() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [department, setDepartment] = useState('All');
  const [priority, setPriority] = useState('All');
  const [modalTicketId, setModalTicketId] = useState(null);

  const params = useMemo(
    () => ({
      page: 1,
      limit: 50,
      search: search.trim() || undefined,
      status: status !== 'All' ? status : undefined,
      department: department !== 'All' ? department : undefined,
      priority: priority !== 'All' ? priority : undefined,
    }),
    [search, status, department, priority]
  );

  const { data, isLoading } = useAdminTickets(params);
  const updateStatus = useUpdateTicketStatus();
  const deleteTicket = useDeleteTicket();

  const tickets = data?.items || [];

  const handleStatusChange = async (ticketId, newStatus) => {
    await updateStatus.mutateAsync({ ticketId, status: newStatus });
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm(`Delete ticket ${ticketId}?`)) return;
    await deleteTicket.mutateAsync(ticketId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Support Tickets</h1>
      <p className="text-slate-400 text-sm mb-6">Manage all customer support requests</p>

      <AdminSupportStats />

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="search"
          placeholder="Search ticket ID or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option>All</option>
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option>All</option>
          <option>General Enquiry</option>
          <option>Technical</option>
          <option>Other</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Ticket ID</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-center">Replies</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                  Loading tickets...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.ticketId} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-mono text-red-300">{ticket.ticketId}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{ticket.userName}</div>
                    <div className="text-slate-400 text-xs">{ticket.userEmail}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded border border-white/10 text-xs">{ticket.department}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded border text-xs ${priorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-300">{ticket.replies?.length || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setModalTicketId(ticket.ticketId)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
                      >
                        View / Reply
                      </button>
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.ticketId, e.target.value)}
                        className="bg-slate-800 border border-white/10 rounded px-2 py-1 text-xs text-white"
                      >
                        <option>Open</option>
                        <option>Pending</option>
                        <option>Closed</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDelete(ticket.ticketId)}
                        className="px-2 py-1.5 text-red-400 hover:bg-red-900/30 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminReplyModal
        ticketId={modalTicketId}
        isOpen={Boolean(modalTicketId)}
        onClose={() => setModalTicketId(null)}
      />
    </div>
  );
}
