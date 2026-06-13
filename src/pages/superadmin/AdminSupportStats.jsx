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
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    valueColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    key: "open",
    label: "Open",
    icon: FolderOpen,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    valueColor: "text-rose-600",
    border: "border-rose-100",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    valueColor: "text-amber-600",
    border: "border-amber-100",
  },
  {
    key: "closed",
    label: "Closed",
    icon: CheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    valueColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    key: "repliedBySupport",
    label: "Replied by Support",
    icon: MessageSquareReply,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    valueColor: "text-violet-600",
    border: "border-violet-100",
  },
];

const AdminSupportStats = () => {
  const { data: stats, isLoading } = useTicketStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-slate-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map(
        ({ key, label, icon: Icon, iconBg, iconColor, valueColor, border }) => (
          <div
            key={key}
            className={`bg-white border ${border} rounded-2xl p-4 hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}
              >
                <Icon size={17} className={iconColor} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {label}
              </span>
            </div>
            <p className={`text-3xl font-bold tabular-nums ${valueColor}`}>
              {stats?.[key] ?? 0}
            </p>
            <p className="text-xs text-slate-400 mt-1">{label}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default AdminSupportStats;
