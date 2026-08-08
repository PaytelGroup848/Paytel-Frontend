import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Paperclip,
  Send,
  Loader2,
  LockKeyhole,
  User,
  Building2,
  AlertCircle,
  Calendar,
  MessageSquareReply,
  ChevronDown,
} from "lucide-react";
import {
  useAdminReply,
  useAdminTicket,
  useUpdateTicketStatus,
} from "../../hooks/useSupport";
import { getSocket } from "../../services/socket";

const ReplyBubble = ({ reply }) => {
  const isUser = reply.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200"
        }`}
      >
        <p
          className={`text-xs font-semibold mb-1 ${isUser ? "text-indigo-200" : "text-slate-500"}`}
        >
          {reply.senderEmail || reply.senderName || (isUser ? "User" : "Support")}
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
            {reply.attachment.name || "Attachment"}
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

const statusBadge = {
  Open: "bg-rose-50    text-rose-700    border border-rose-200",
  Pending: "bg-amber-50   text-amber-700   border border-amber-200",
  Closed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function AdminReplyModal({ ticketId, isOpen, onClose }) {
  const { data: ticket, refetch } = useAdminTicket(ticketId, isOpen);
  console.log("this is my reply ==>>", ticket);
  const replyMutation = useAdminReply(ticketId);
  const updateStatus = useUpdateTicketStatus();

  const [replyText, setReplyText] = useState("");
  const [replyFile, setReplyFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [status, setStatus] = useState("Open");
  const [liveReplies, setLiveReplies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (ticket?.status) setStatus(ticket.status);
  }, [ticket?.status]);

  useEffect(() => {
    if (!isOpen || !ticketId) return;
    const socket = getSocket();
    socket.emit("join:ticket", ticketId);

    const onReply = ({ ticketId: id, reply }) => {
      if (id === ticketId) {
        setLiveReplies((prev) => {
          const key = reply.replyId || reply._id;
          if (prev.some((r) => (r.replyId || r._id) === key)) return prev;
          return [...prev, reply];
        });
        refetch();
      }
    };
    const onStatus = ({ ticketId: id, status: s }) => {
      if (id === ticketId) setStatus(s);
    };

    socket.on("ticket:reply", onReply);
    socket.on("ticket:status", onStatus);
    return () => {
      socket.off("ticket:reply", onReply);
      socket.off("ticket:status", onStatus);
      socket.emit("leave:ticket", ticketId);
    };
  }, [isOpen, ticketId, refetch]);

  useEffect(() => {
    if (!isOpen) {
      setReplyText("");
      setReplyFile(null);
      setFilePreview("");
      setLiveReplies([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [liveReplies]);

  if (!isOpen) return null;

  const mergedReplies = [...(ticket?.replies || [])];
  liveReplies.forEach((lr) => {
    const key = lr.replyId || lr._id;
    if (!mergedReplies.some((r) => (r.replyId || r._id) === key))
      mergedReplies.push(lr);
  });

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateStatus.mutateAsync({ ticketId, status: newStatus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const fd = new FormData();
    fd.append("text", replyText);
    if (replyFile) fd.append("attachment", replyFile);
    await replyMutation.mutateAsync(fd);
    setReplyText("");
    setReplyFile(null);
    setFilePreview("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
              <MessageSquareReply size={17} className="text-indigo-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">
                  {ticket?.subject || ticketId}
                </h2>
                {status && (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${statusBadge[status] || "bg-slate-100 text-slate-600"}`}
                  >
                    {status}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                #{ticketId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0 flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <aside className="md:w-64 scrollbar-hide shrink-0 border-b md:border-b-0 md:border-r border-slate-100 p-4 space-y-4 overflow-y-auto bg-slate-50/60">
            {ticket ? (
              <>
                {/* User */}
                <div className="bg-white border border-slate-100 rounded-xl p-3 space-y-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <User size={12} className="text-slate-400" />
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      User
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {ticket.userName}
                  </p>
                  <p className="text-xs text-slate-500">{ticket.userEmail}</p>
                </div>

                {/* Meta */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building2 size={11} className="text-slate-400" />
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Department
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
                      {ticket.department}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertCircle size={11} className="text-slate-400" />
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Priority
                      </p>
                    </div>
                    <span className="text-sm font-medium text-slate-800">
                      {ticket.priority}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar size={11} className="text-slate-400" />
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Created
                      </p>
                    </div>
                    <p className="text-xs text-slate-600">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                    Change Status
                  </p>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      disabled={updateStatus.isPending}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition cursor-pointer"
                    >
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Closed</option>
                    </select>
                    <ChevronDown
                      size={13}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Original Message */}
                <div className="bg-white border border-slate-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                    Message
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ticket.message}
                  </p>
                  {ticket?.attachment?.url && (
                    <a
                      href={ticket.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 transition-all"
                    >
                      <Paperclip size={11} />
                      <span className="truncate max-w-[140px]">
                        {ticket.attachment.name}
                      </span>
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <div className="w-4 h-4 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                Loading...
              </div>
            )}
          </aside>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide"
            >
              {mergedReplies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 gap-2">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <MessageSquareReply size={18} className="text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-400">No replies yet</p>
                </div>
              ) : (
                mergedReplies.map((rep, idx) => (
                  <ReplyBubble
                    key={rep.replyId || rep._id || idx}
                    reply={rep}
                  />
                ))
              )}
            </div>

            {/* Reply Form */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 shrink-0">
              {status !== "Closed" ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your support reply..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition resize-none"
                  />

                  <label className="flex items-center gap-3 w-full border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl px-4 py-2.5 cursor-pointer transition-all group">
                    <Paperclip
                      size={14}
                      className="text-slate-400 group-hover:text-indigo-500 flex-shrink-0 transition-colors"
                    />
                    <span className="text-xs text-slate-400 group-hover:text-indigo-500 transition-colors truncate">
                      {filePreview || "Attach a file (image or PDF)"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setReplyFile(file || null);
                        setFilePreview(file ? file.name : "");
                      }}
                    />
                  </label>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={replyMutation.isPending || !replyText.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm"
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
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <LockKeyhole size={14} className="text-slate-400" />
                  <p className="text-sm text-slate-500">
                    This ticket is closed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
