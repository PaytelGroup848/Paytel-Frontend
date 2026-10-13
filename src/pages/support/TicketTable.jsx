import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  Eye,
  MessageSquareReply,
  XCircle,
  Plus,
  Inbox,
} from "lucide-react";

const TicketTable = ({
  tickets,
  onViewClick,
  onReplyClick,
  onRaiseTicketClick,
  onCloseTicket,
}) => {
  const navigate = useNavigate();

  const statusBadge = (status) => {
    const styles = {
      Open: "bg-red-50 text-red-600 border border-red-100",
      Closed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      Pending: "bg-amber-50 text-amber-600 border border-amber-100",
    };
    return (
      styles[status] || "bg-slate-50 text-slate-600 border border-slate-100"
    );
  };

  const ticketKey = (ticket) => ticket.ticketId || ticket.id;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
            <Ticket size={15} className="text-indigo-600" />
          </div>
          <h2 className="text-base font-semibold text-slate-800">
            Your Tickets
          </h2>
          {tickets.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-medium rounded-full">
              {tickets.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onRaiseTicketClick}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus size={15} />
          Raise Ticket
        </button>
      </div>

      {/* Empty State */}
      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 gap-3">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center">
            <Inbox size={22} className="text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-500">No tickets yet</p>
          <p className="text-xs text-slate-400">
            Click "Raise Ticket" to create your first one
          </p>
          <button
            onClick={onRaiseTicketClick}
            className="mt-1 flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Plus size={14} />
            Raise Ticket
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                  Department
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map((ticket) => {
                const id = ticketKey(ticket);
                const canClose =
                  ticket.status === "Open" || ticket.status === "Pending";

                return (
                  <tr
                    key={id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Ticket ID */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/support/tickets/${id}`)}
                        className="font-mono text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {id || "—"}
                      </button>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Subject */}
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-sm text-slate-700 truncate">
                        {ticket.subject}
                      </p>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className="text-sm text-slate-500">
                        {ticket.department}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-lg ${statusBadge(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => onViewClick(ticket)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-all"
                        >
                          <Eye size={13} />
                          View
                        </button>
                        {canClose && (
                          <button
                            onClick={() => onReplyClick(ticket)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-600 rounded-lg text-xs font-medium transition-all"
                          >
                            <MessageSquareReply size={13} />
                            Reply
                          </button>
                        )}
                        {canClose && (
                          <button
                            onClick={() => onCloseTicket(ticketKey(ticket))}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg text-xs font-medium transition-all"
                          >
                            <XCircle size={13} />
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
