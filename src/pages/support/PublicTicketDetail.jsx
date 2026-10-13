import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Paperclip,
  X,
  Clock,
  RefreshCw,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const STATUS_CONFIG = {
  open: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
    label: "Open",
  },
  pending: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: RefreshCw,
    label: "Pending",
  },
  closed: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    label: "Closed",
  },
};

export default function PublicTicketDetail() {
  const { ticketId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const scrollRef = useRef(null);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyFile, setReplyFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Email is required");
      navigate("/public-support");
      return;
    }
    fetchTicket();
  }, [ticketId, email]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket?.replies]);

  const fetchTicket = async () => {
    try {
      const res = await api.get(`/public-support/tickets/${ticketId}`, {
        params: { email },
      });
      setTicket(res.data?.data);
    } catch {
      toast.error("Ticket not found");
      navigate("/public-support");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() && !replyFile) {
      toast.error("Please enter a reply or attach a file");
      return;
    }
    setSubmitting(true);
    const fd = new FormData();
    fd.append("text", replyText);
    fd.append("email", email);
    if (replyFile) fd.append("attachment", replyFile);
    try {
      await api.post(`/public-support/tickets/${ticketId}/reply`, fd);
      toast.success("Reply sent");
      setReplyText("");
      setReplyFile(null);
      fetchTicket();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!window.confirm("Close this ticket? You won't be able to reply after."))
      return;
    try {
      await api.put(`/public-support/tickets/${ticketId}/close`, { email });
      toast.success("Ticket closed");
      fetchTicket();
    } catch {
      toast.error("Failed to close ticket");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ticket) return null;

  const cfg = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
  const StatusIcon = cfg.icon;
  const canReply = ticket.status !== "closed";

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={() =>
            navigate(`/public-support?email=${encodeURIComponent(email)}`)
          }
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-600 transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to tickets
        </button>

        {/* Ticket header card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-semibold text-violet-600">
                  {ticket.ticketId}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border ${cfg.badge}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {cfg.label}
                </span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 leading-snug">
                {ticket.subject}
              </h1>
              <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(ticket.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {canReply && (
              <button
                onClick={handleCloseTicket}
                className="h-9 px-4 text-xs font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Close ticket
              </button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {ticket.message}
            </p>
            {ticket.attachment?.url && (
              <a
                href={ticket.attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-violet-600 hover:underline bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-100"
              >
                <Paperclip className="w-3.5 h-3.5" />
                {ticket.attachment.name}
              </a>
            )}
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-700">
              Conversation
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                ({ticket.replies?.length || 0})
              </span>
            </h2>
          </div>

          {!ticket.replies?.length ? (
            <div className="text-center py-8">
              <MessageCircle className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                No replies yet — we'll respond soon.
              </p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1"
            >
              {ticket.replies.map((reply, i) => {
                const isUser = reply.sender === "user";
                return (
                  <div
                    key={i}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-[10px] font-bold mr-2 mt-0.5 flex-shrink-0">
                        S
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${
                        isUser
                          ? "bg-violet-700 text-white rounded-tr-sm"
                          : "bg-gray-50 border border-gray-100 text-gray-800 rounded-tl-sm"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-1 ${isUser ? "justify-end" : ""}`}
                      >
                        <span
                          className={`text-[11px] font-semibold ${isUser ? "text-violet-200" : "text-gray-500"}`}
                        >
                          {isUser ? "You" : "Support Team"}
                        </span>
                        <span
                          className={`text-[10px] ${isUser ? "text-violet-300" : "text-gray-400"}`}
                        >
                          {new Date(reply.timestamp).toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {reply.text}
                      </p>
                      {reply.attachment?.url && (
                        <a
                          href={reply.attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-[11px] mt-2 underline ${isUser ? "text-violet-200" : "text-violet-500"}`}
                        >
                          <Paperclip className="w-3 h-3" />
                          {reply.attachment.name}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reply box */}
        {canReply && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Add a reply
            </h2>
            <form onSubmit={handleReply}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={3}
                placeholder="Type your message…"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
              />

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-100 flex items-center gap-1.5 transition-colors">
                    <Paperclip className="w-3.5 h-3.5" />
                    Attach file
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setReplyFile(e.target.files[0])}
                    />
                  </label>
                  {replyFile && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-lg">
                      <Paperclip className="w-3 h-3" />
                      {replyFile.name}
                      <button
                        type="button"
                        onClick={() => setReplyFile(null)}
                        className="text-emerald-400 hover:text-emerald-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || (!replyText.trim() && !replyFile)}
                  className="h-9 px-5 bg-violet-700 hover:bg-violet-800 disabled:opacity-40 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? "Sending…" : "Send reply"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Closed notice */}
        {!canReply && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Ticket resolved
              </p>
              <p className="text-xs text-emerald-500 mt-0.5">
                This ticket has been closed. Open a new ticket if you need
                further help.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
