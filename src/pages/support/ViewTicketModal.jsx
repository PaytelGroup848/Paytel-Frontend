import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Paperclip,
  ExternalLink,
  Loader2,
  LockKeyhole,
  MessageSquareReply,
  XCircle,
} from "lucide-react";
import { useAddReply, useCloseTicket } from "../../hooks/useSupport";
import { getSocket } from "../../services/socket";
import toast from "react-hot-toast";

const ReplyBubble = ({ reply }) => {
  const isUser = reply.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-slate-100 text-slate-800 rounded-bl-sm"
        }`}
      >
        <p
          className={`text-xs font-semibold mb-1 ${isUser ? "text-indigo-200" : "text-slate-400"}`}
        >
          {reply.senderEmail ||
            reply.senderName ||
            (isUser ? "You" : "Support")}
        </p>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {reply.text}
        </p>
        {reply.attachment?.url && (
          <a
            href={reply.attachment.url}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1 text-xs underline mt-2 ${isUser ? "text-indigo-200" : "text-indigo-500"}`}
          >
            <Paperclip size={11} />
            {reply.attachment.name || "View attachment"}
          </a>
        )}
        <span
          className={`text-[10px] block mt-1.5 ${isUser ? "text-indigo-300" : "text-slate-400"}`}
        >
          {new Date(reply.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const statusStyles = {
  Open: "bg-red-50 text-red-600 border border-red-100",
  Pending: "bg-amber-50 text-amber-600 border border-amber-100",
  Closed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
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
  const scrollRef = useRef(null);

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

  // Auto-scroll on new replies
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [liveReplies]);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquareReply size={17} className="text-indigo-600" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-semibold text-slate-800 truncate">
                  {ticket.subject}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold flex-shrink-0 ${statusStyles[status] || "bg-slate-50 text-slate-500 border border-slate-100"}`}
                >
                  {status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs font-mono text-slate-400">
                  #{ticket.ticketId}
                </span>
                <span className="text-slate-200 text-xs">·</span>
                <span className="text-xs text-slate-400">
                  {ticket.department}
                </span>
                <span className="text-slate-200 text-xs">·</span>
                <span className="text-xs text-slate-400">
                  {ticket.priority} priority
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 ml-2"
          >
            <X size={16} />
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 min-h-0"
        >
          <div className="px-6 pt-4 shrink-0 mb-5">
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                First Message
              </p>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {ticket.message}
              </p>
              {ticket.attachment?.url && (
                <a
                  href={ticket.attachment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs text-indigo-500 hover:text-indigo-700 hover:underline"
                >
                  <ExternalLink size={11} />
                  {ticket.attachment.name || "View attachment"}
                </a>
              )}
              <p className="text-xs text-slate-300 mt-2">
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {mergedReplies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-10 gap-2">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <MessageSquareReply size={18} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-400">No replies yet</p>
              <p className="text-xs text-slate-300">
                Support will respond soon
              </p>
            </div>
          ) : (
            mergedReplies.map((rep, idx) => (
              <ReplyBubble key={rep.replyId || rep._id || idx} reply={rep} />
            ))
          )}
        </div>

        {/* Reply Form / Closed */}
        <div className="px-6 pb-5 pt-3 border-t border-slate-100 shrink-0">
          {canReply ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none scrollbar-hide"
              />

              {/* File Upload */}
              <label className="flex items-center gap-3 w-full border border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 rounded-xl px-4 py-2.5 cursor-pointer transition-all group">
                <Paperclip
                  size={14}
                  className="text-slate-400 group-hover:text-indigo-500 flex-shrink-0 transition-colors"
                />
                <span className="text-xs text-slate-400 group-hover:text-indigo-500 transition-colors truncate">
                  {fileName || "Attach a file (image, PDF or doc)"}
                </span>
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

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-xl text-sm font-medium transition-all"
                >
                  <XCircle size={14} />
                  Close Ticket
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={replyMutation.isPending || !replyText.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
                  >
                    {replyMutation.isPending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-100 rounded-xl">
              <LockKeyhole size={14} className="text-slate-400" />
              <p className="text-sm text-slate-400">
                This ticket is closed and no longer accepts replies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
