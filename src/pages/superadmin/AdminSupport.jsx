import React, { useMemo, useState } from "react";
import { Search, ChevronDown, Eye, Trash2, Inbox } from "lucide-react";
import AdminReplyModal from "./AdminReplyModal";
import AdminSupportStats from "./AdminSupportStats";
import {
  useAdminTickets,
  useDeleteTicket,
  useUpdateTicketStatus,
} from "../../hooks/useSupport";

const priorityBadge = (priority) => {
  const map = {
    Low: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Medium: "bg-amber-50  text-amber-700  border border-amber-200",
    High: "bg-rose-50   text-rose-700   border border-rose-200",
  };
  return map[priority] || "bg-slate-100 text-slate-600 border border-slate-200";
};

const statusBadge = (status) => {
  const map = {
    Open: "bg-rose-50    text-rose-700    border border-rose-200",
    Pending: "bg-amber-50   text-amber-700   border border-amber-200",
    Closed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };
  return map[status] || "bg-slate-100 text-slate-600 border border-slate-200";
};

export default function AdminSupport() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [priority, setPriority] = useState("All");
  const [modalTicketId, setModalTicketId] = useState(null);

  const params = useMemo(
    () => ({
      page: 1,
      limit: 50,
      search: search.trim() || undefined,
      status: status !== "All" ? status : undefined,
      department: department !== "All" ? department : undefined,
      priority: priority !== "All" ? priority : undefined,
    }),
    [search, status, department, priority],
  );

  const { data, isLoading } = useAdminTickets(params);
  const updateStatus = useUpdateTicketStatus();
  const deleteTicket = useDeleteTicket();
  const tickets = data?.items || [];

  const handleStatusChange = async (ticketId, newStatus) =>
    await updateStatus.mutateAsync({ ticketId, status: newStatus });

  const handleDelete = async (ticketId) => {
    if (!window.confirm(`Delete ticket ${ticketId}?`)) return;
    await deleteTicket.mutateAsync(ticketId);
  };

  const selectCls =
    "bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition appearance-none cursor-pointer";

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Manage all customer support requests
        </p>
      </div>

      <AdminSupportStats />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Search ticket ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
        </div>

        {[
          {
            value: status,
            setter: setStatus,
            options: ["All", "Open", "Pending", "Closed"],
            placeholder: "Statu",
          },
          {
            value: department,
            setter: setDepartment,
            options: [
              "All",
              "Tally On Cloud",
              "Jewellery On Cloud",
              "Marg On Cloud",
              "Busy On Cloud",
              "Vps Enquiry",
              "Wordpress Enquiry",
              "Php+Mysql Enquiry",
              "Other",
            ],
            placeholder: "Department",
          },
          // {
          //   value: priority,
          //   setter: setPriority,
          //   options: ["All", "Low", "Medium", "High"],
          //   placeholder: "Priority",
          // },
        ].map(({ value, setter, options, placeholder }) => (
          <div key={placeholder} className="relative">
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              className={selectCls}
            >
              {options.map((o) => (
                <option key={o} value={o}>
                  {o === "All" ? `All ${placeholder}s` : o}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Ticket ID",
                  "User",
                  "Department",
                  "Priority",
                  "Status",
                  "Created",
                  "Replies",
                  "Actions",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${
                      i === 7
                        ? "text-right"
                        : i === 6
                          ? "text-center"
                          : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <div className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
                      Loading tickets...
                    </div>
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                        <Inbox size={18} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-400">No tickets found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket.ticketId}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* Ticket ID */}
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-indigo-600">
                        {ticket.ticketId}
                      </span>
                    </td>

                    {/* User */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900 text-sm">
                        {ticket.userName}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {ticket.userEmail}
                      </p>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600">
                        {ticket.department}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${priorityBadge(ticket.priority)}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusBadge(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>

                    {/* Replies */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-slate-700">
                        {ticket.replies?.length || 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setModalTicketId(ticket.ticketId)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-semibold transition-all"
                        >
                          <Eye size={12} /> View
                        </button>

                        <div className="relative">
                          <select
                            value={ticket.status}
                            onChange={(e) =>
                              handleStatusChange(
                                ticket.ticketId,
                                e.target.value,
                              )
                            }
                            className="bg-white border border-slate-200 rounded-lg pl-2.5 pr-6 py-1.5 text-xs text-slate-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                          >
                            <option>Open</option>
                            <option>Pending</option>
                            <option>Closed</option>
                          </select>
                          <ChevronDown
                            size={11}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(ticket.ticketId)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-lg text-xs font-semibold transition-all"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminReplyModal
        ticketId={modalTicketId}
        isOpen={Boolean(modalTicketId)}
        onClose={() => setModalTicketId(null)}
      />
    </div>
  );
}
