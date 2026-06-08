import React from "react";
import {
  Ticket,
  FolderOpen,
  Clock,
  CheckCircle,
  MessageSquareReply,
} from "lucide-react";
import { useTicketStats } from "../../hooks/useSupport";

const cards = [
  {
    key: "total",
    label: "Total Tickets",
    icon: Ticket,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    valueColor: "text-blue-400",
  },
  {
    key: "open",
    label: "Open",
    icon: FolderOpen,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    valueColor: "text-red-400",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    valueColor: "text-amber-400",
  },
  {
    key: "closed",
    label: "Closed",
    icon: CheckCircle,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    valueColor: "text-emerald-400",
  },
  {
    key: "repliedBySupport",
    label: "Replied by Support",
    icon: MessageSquareReply,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    valueColor: "text-violet-400",
  },
];

const AdminSupportStats = () => {
  const { data: stats, isLoading } = useTicketStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map(
        ({ key, label, icon: Icon, iconBg, iconColor, valueColor }) => (
          <div
            key={key}
            className="bg-slate-800/60 border border-white/5 rounded-2xl p-4 hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}
              >
                <Icon size={17} className={iconColor} />
              </div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {label}
              </span>
            </div>
            <p className={`text-3xl font-bold tabular-nums ${valueColor}`}>
              {stats?.[key] ?? 0}
            </p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default AdminSupportStats;
