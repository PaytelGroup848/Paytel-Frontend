import React from 'react';

const TicketTable = ({ tickets, onReplyClick, onRaiseTicketClick }) => {
  const hasSupportReply = (ticket) => ticket.replies?.some(r => r.sender === "support");

  const statusBadge = (status) => {
    const styles = {
      Open: "bg-red-100 text-red-700",
      Closed: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700"
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-list-ul text-indigo-500 mr-2"></i>Your Tickets
        </h2>
        <button
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
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ticket ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-400">No tickets yet. Click "Raise Ticket" to create one. </td></tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono font-medium text-gray-800">{ticket.id}</span>
                    <div className="text-xs text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {hasSupportReply(ticket) ? (
                      <button onClick={() => onReplyClick(ticket)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto">
                        <i className="fas fa-reply-all"></i> Reply
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm flex items-center justify-center gap-1">
                        <i className="fas fa-comment-slash"></i> No reply
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;