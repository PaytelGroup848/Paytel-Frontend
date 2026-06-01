import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const TicketTable = ({
  tickets,
  onViewClick,
  onReplyClick,
  onRaiseTicketClick,
  onCloseTicket,
}) => {
  const navigate = useNavigate(); // Add this

  const statusBadge = (status) => {
    const styles = {
      Open: "bg-red-100 text-red-700",
      Closed: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const ticketKey = (ticket) => ticket.ticketId || ticket.id;

  const handleViewTicket = (ticketId) => {
    console.log("Viewing ticket:", ticketId);
    navigate(`/support/tickets/${ticketId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-list-ul text-indigo-500 mr-2"></i>
          Your Tickets
        </h2>
        <button
          type="button"
          onClick={onRaiseTicketClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-md transition flex items-center gap-2 text-sm font-semibold"
        >
          <i className="fas fa-plus-circle"></i> Raise Ticket
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Ticket ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Subject
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No tickets yet. Click &quot;Raise Ticket&quot; to create one.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => {
                const id = ticketKey(ticket);
                const canClose =
                  ticket.status === "Open" || ticket.status === "Pending";
                console.log("Ticket ID:", id); // Debug log
                return (
                  <tr key={id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewTicket(id)}
                        className="font-mono font-medium text-indigo-600 hover:underline cursor-pointer text-left"
                      >
                        {id || "No ID"}
                      </button>
                      <div className="text-xs text-gray-400">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-700">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ticket.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => onViewClick(ticket)}
                          className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                        >
                          View
                        </button>
                        {canClose && (
                          <button
                            type="button"
                            onClick={() => onReplyClick(ticket)}
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                          >
                            <i className="fas fa-reply-all mr-1"></i>
                            Reply
                          </button>
                        )}
                        {canClose && (
                          <button
                            onClick={() => onCloseTicket(ticketKey(ticket))}
                            className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
