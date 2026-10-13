import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Headphones,
  Plus,
  Clock,
  RefreshCw,
  CheckCircle,
  ChevronRight,
  MessageCircle,
  X,
  Send,
  ShieldCheck,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const STATUS_CONFIG = {
  open: {
    badge: "bg-amber-100 text-amber-700",
    icon: Clock,
    iconBg: "bg-amber-50 text-amber-500",
    label: "Open",
  },
  pending: {
    badge: "bg-blue-100 text-blue-700",
    icon: RefreshCw,
    iconBg: "bg-blue-50 text-blue-500",
    label: "Pending",
  },
  closed: {
    badge: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle,
    iconBg: "bg-emerald-50 text-emerald-500",
    label: "Closed",
  },
};

export default function PublicSupportPage() {
  const [email, setEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchTickets = async (emailToUse) => {
    const target = emailToUse || email;
    if (!target) return;
    setLoading(true);
    try {
      const response = await api.get("/public-support/tickets", {
        params: { email: target },
      });
      setTickets(response.data?.data || []);
    } catch {
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("support_email");
    if (saved) {
      setEmail(saved);
      setInputEmail(saved);
      fetchTickets(saved);
    }
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    localStorage.setItem("support_email", inputEmail.trim());
    setEmail(inputEmail.trim());
    fetchTickets(inputEmail.trim());
  };

  const handleLogout = () => {
    setEmail("");
    setInputEmail("");
    setTickets([]);
    localStorage.removeItem("support_email");
  };

  const initials = email.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back to login */}
        <div className="pt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>
        </div>

        {/* Hero */}
        <div className="text-center pt-4 pb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100 mb-4">
            <Headphones className="w-7 h-7 text-violet-700" />
          </div>
          <h1 className="text-3xl font-semibold text-[#1e1b4b] tracking-tight">
            Support center
          </h1>
          <p className="text-sm text-gray-400 mt-1.5">
            Track your tickets — no account needed
          </p>
        </div>

        {/* Email landing */}
        {!email ? (
          <>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
              <label className="block text-[11px] font-semibold text-violet-600 uppercase tracking-widest mb-2">
                Your email address
              </label>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="flex-1 h-11 px-4 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="h-11 px-5 bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5"
                >
                  View tickets
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Private",
                  desc: "Email is never stored publicly",
                },
                {
                  icon: Zap,
                  title: "Instant",
                  desc: "View status in real time",
                },
                {
                  icon: MessageCircle,
                  title: "Replies",
                  desc: "Chat with support directly",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white border border-gray-100 rounded-xl p-4 text-center"
                >
                  <Icon className="w-5 h-5 text-violet-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#1e1b4b]">
                    {title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Logged-in header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                  Logged in as
                </p>
                <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full py-1.5 pl-1.5 pr-3">
                  <div className="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-white text-[11px] font-semibold">
                    {initials}
                  </div>
                  <span className="text-sm text-gray-700 max-w-[160px] truncate">
                    {email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-violet-500 transition-colors ml-0.5"
                    title="Change email"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="h-10 px-4 bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> New ticket
              </button>
            </div>

            {/* Ticket section label */}
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Your tickets ({tickets.length})
            </p>

            {/* Tickets */}
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : tickets.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-50 mb-4">
                  <MessageCircle className="w-8 h-8 text-violet-300" />
                </div>
                <h3 className="text-base font-medium text-gray-600">
                  No tickets yet
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Create your first ticket and we'll get back to you soon.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-5 h-9 px-5 bg-violet-700 text-white text-sm rounded-lg hover:bg-violet-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create ticket
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {tickets.map((ticket) => {
                  const cfg =
                    STATUS_CONFIG[ticket.status] || STATUS_CONFIG.open;
                  const StatusIcon = cfg.icon;
                  return (
                    <Link
                      key={ticket.ticketId}
                      to={`/public-support/tickets/${ticket.ticketId}?email=${encodeURIComponent(email)}`}
                      className="group bg-white border border-gray-100 hover:border-violet-200 rounded-2xl p-4 flex items-start gap-3 transition-all hover:shadow-[0_2px_16px_rgba(109,40,217,0.08)]"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.iconBg}`}
                      >
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[11px] font-semibold text-violet-600">
                            {ticket.ticketId}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 truncate">
                          {ticket.subject}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          {ticket.message.substring(0, 90)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[11px] text-gray-300 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(ticket.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="text-[11px] text-gray-400 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {ticket.replies?.length || 0}{" "}
                            {ticket.replies?.length === 1 ? "reply" : "replies"}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-violet-400 flex-shrink-0 mt-3 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {showCreateModal && (
        <CreateTicketModal
          email={email}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            fetchTickets();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function CreateTicketModal({ email, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: email || "",
    department: "General Enquiry",
    priority: "Medium",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/public-support/tickets", form);
      toast.success("Ticket submitted!");
      onSuccess();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] z-50 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md border border-gray-100 shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <Plus className="w-4 h-4 text-violet-700" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              New support ticket
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-5 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={set("name")}
                className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={set("email")}
                className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={form.department}
                onChange={set("department")}
                className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all bg-white"
              >
                <option>General Enquiry</option>
                <option>Technical</option>
                <option>Billing</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={set("priority")}
                className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <input
              type="text"
              placeholder="Briefly describe your issue"
              value={form.subject}
              onChange={set("subject")}
              className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Describe your issue in detail…"
              value={form.message}
              onChange={set("message")}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
            />
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex gap-2.5 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-11 bg-violet-700 hover:bg-violet-800 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? "Submitting…" : "Submit ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}
