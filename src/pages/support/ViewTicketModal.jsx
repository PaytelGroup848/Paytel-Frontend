import React, { useState, useEffect } from "react";
import { X, Send, Paperclip, ExternalLink } from "lucide-react";
import { useAddReply, useCloseTicket } from "../../hooks/useSupport";
import { getSocket } from "../../services/socket";
import toast from "react-hot-toast";

const ReplyBubble = ({ reply }) => {
  const isUser = reply.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-xs font-bold opacity-80 mb-1">
          {reply.senderName || (isUser ? "You" : "Support")}
        </p>
        <p className="text-sm whitespace-pre-wrap">{reply.text}</p>
        {reply.attachment?.url && (
          <a
            href={reply.attachment.url}
            target="_blank"
            rel="noreferrer"
            className={`text-xs underline mt-2 block ${isUser ? "text-indigo-100" : "text-indigo-600"}`}
          >
            📎 {reply.attachment.name || "View attachment"}
          </a>
        )}
        <span
          className={`text-[10px] block mt-2 ${isUser ? "text-indigo-200" : "text-gray-400"}`}
        >
          {new Date(reply.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const statusStyles = {
  Open: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Closed: "bg-green-100 text-green-700",
};

export default function ViewTicketModal({
  isOpen,
  onClose,
  ticket,
  onRefresh,
}) {
  const [replyText, setReplyText] = useState("");
  const [replyFile, setReplyFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [liveReplies, setLiveReplies] = useState([]);
  const [status, setStatus] = useState("");

  const replyMutation = useAddReply(ticket?.ticketId);
  const closeTicket = useCloseTicket();

  useEffect(() => {
    if (ticket?.status) setStatus(ticket.status);
  }, [ticket?.status]);

  useEffect(() => {
    if (!isOpen || !ticket?.ticketId) return;

    const socket = getSocket();
    socket.emit("join:ticket", ticket.ticketId);

    const onReply = ({ ticketId: id, reply }) => {
      if (id === ticket.ticketId) {
        setLiveReplies((prev) => {
          const key = reply.replyId || reply._id;
          if (prev.some((r) => (r.replyId || r._id) === key)) return prev;
          return [...prev, reply];
        });
        if (onRefresh) onRefresh();
      }
    };

    const onStatus = ({ ticketId: id, status: newStatus }) => {
      if (id === ticket.ticketId) setStatus(newStatus);
    };

    socket.on("ticket:reply", onReply);
    socket.on("ticket:status", onStatus);

    return () => {
      socket.off("ticket:reply", onReply);
      socket.off("ticket:status", onStatus);
      socket.emit("leave:ticket", ticket.ticketId);
    };
  }, [isOpen, ticket?.ticketId, onRefresh]);

  if (!isOpen || !ticket) return null;

  const mergedReplies = [...(ticket.replies || [])];
  liveReplies.forEach((lr) => {
    const key = lr.replyId || lr._id;
    if (!mergedReplies.some((r) => (r.replyId || r._id) === key))
      mergedReplies.push(lr);
  });

  const canReply = status === "Open" || status === "Pending";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    const fd = new FormData();
    fd.append("text", replyText);
    if (replyFile) fd.append("attachment", replyFile);

    await replyMutation.mutateAsync(fd);
    setReplyText("");
    setReplyFile(null);
    setFileName("");
    toast.success("Reply sent");
    if (onRefresh) onRefresh();
  };

  const handleClose = async () => {
    if (!window.confirm("Close this ticket?")) return;
    await closeTicket.mutateAsync(ticket.ticketId);
    setStatus("Closed");
    toast.success("Ticket closed");
    if (onRefresh) onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div>
            <p className="text-xs font-mono opacity-80">{ticket.ticketId}</p>
            <h2 className="text-xl font-bold">{ticket.subject}</h2>
            <p className="text-sm opacity-80 mt-1">
              {ticket.department} · {ticket.priority} priority
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}
            >
              {status}
            </span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Initial Message */}
        <div className="p-5 bg-gray-50 border-b">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Initial Message
          </p>
          <p className="text-gray-700">{ticket.message}</p>
          {ticket.attachment?.url && (
            <a
              href={ticket.attachment.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-indigo-600 text-sm hover:underline"
            >
              <ExternalLink size={14} />
              {ticket.attachment.name || "View attachment"}
            </a>
          )}
          <p className="text-xs text-gray-400 mt-3">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-5 min-h-[300px] max-h-[400px]">
          <h3 className="font-semibold text-gray-700 mb-4">Conversation</h3>
          {mergedReplies.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No replies yet. Support will respond soon.
            </p>
          ) : (
            mergedReplies.map((rep, idx) => (
              <ReplyBubble key={rep.replyId || rep._id || idx} reply={rep} />
            ))
          )}
        </div>

        {/* Reply Form */}
        {canReply && (
          <div className="p-5 border-t bg-gray-50">
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Reply
              </label>
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                placeholder="Type your message..."
              />
              <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors">
                    <Paperclip size={14} className="inline mr-1" />
                    Attach
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setReplyFile(file || null);
                        setFileName(file ? file.name : "");
                      }}
                      className="hidden"
                    />
                  </label>
                  {fileName && (
                    <span className="text-xs text-green-600 truncate max-w-[150px]">
                      {fileName}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    Close Ticket
                  </button>
                  <button
                    type="submit"
                    disabled={replyMutation.isPending || !replyText.trim()}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {replyMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={14} /> Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
