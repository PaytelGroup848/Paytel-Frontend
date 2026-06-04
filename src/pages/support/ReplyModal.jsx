import React, { useEffect, useRef, useState } from "react";
import {
  X,
  MessageSquareReply,
  Paperclip,
  Loader2,
  Send,
  LockKeyhole,
} from "lucide-react";
import { useAddReply, useTicket } from "../../hooks/useSupport";
import { getSocket } from "../../services/socket";

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
          {reply.senderName || (isUser ? "You" : "Support")}
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

const ReplyModal = ({ isOpen, onClose, ticket: initialTicket }) => {
  const ticketId = initialTicket?.ticketId || initialTicket?.id;
  const { data: ticketData } = useTicket(ticketId);
  const ticket = ticketData || initialTicket;
  const replyMutation = useAddReply(ticketId);

  const [replyText, setReplyText] = useState("");
  const [replyFile, setReplyFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [liveReplies, setLiveReplies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !ticketId) return undefined;
    const socket = getSocket();
    socket.emit("join:ticket", ticketId);

    const onReply = ({ ticketId: id, reply }) => {
      if (id === ticketId) {
        setLiveReplies((prev) => {
          const key = reply.replyId || reply._id;
          if (prev.some((r) => (r.replyId || r._id) === key)) return prev;
          return [...prev, reply];
        });
      }
    };

    socket.on("ticket:reply", onReply);
    return () => {
      socket.off("ticket:reply", onReply);
      socket.emit("leave:ticket", ticketId);
    };
  }, [isOpen, ticketId]);

  useEffect(() => {
    if (!isOpen) {
      setReplyText("");
      setReplyFile(null);
      setFileName("");
      setLiveReplies([]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new replies arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [liveReplies]);

  if (!isOpen || !ticket) return null;

  const baseReplies = ticket.replies || [];
  const mergedReplies = [...baseReplies];
  liveReplies.forEach((lr) => {
    const key = lr.replyId || lr._id;
    if (!mergedReplies.some((r) => (r.replyId || r._id) === key)) {
      mergedReplies.push(lr);
    }
  });

  const canReply = ticket.status === "Open" || ticket.status === "Pending";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return alert("Please type your reply");
    const fd = new FormData();
    fd.append("text", replyText);
    if (replyFile) fd.append("attachment", replyFile);
    await replyMutation.mutateAsync(fd);
    setReplyText("");
    setReplyFile(null);
    setFileName("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
              <MessageSquareReply size={17} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800">
                Ticket #{ticket.ticketId || ticket.id}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[220px]">
                {ticket.subject}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Original Message */}

        {/* Replies */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 min-h-0"
        >
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
              First Message
            </p>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {ticket.message}
            </p>
          </div>

          {mergedReplies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 gap-2">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <MessageSquareReply size={18} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-400">No replies yet</p>
              <p className="text-xs text-slate-300">Be the first to reply</p>
            </div>
          ) : (
            mergedReplies.map((rep, idx) => (
              <ReplyBubble key={rep.replyId || rep._id || idx} reply={rep} />
            ))
          )}
        </div>

        {/* Reply Form / Closed Notice */}
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
                  {fileName || "Attach a file (image or PDF)"}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setReplyFile(file || null);
                    setFileName(file ? file.name : "");
                  }}
                  className="hidden"
                />
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replyMutation.isPending}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  {replyMutation.isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Sending...
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
};

export default ReplyModal;
