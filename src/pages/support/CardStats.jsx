import React, { useEffect, useState } from "react";
import { Ticket, CheckCircle, Reply, Clock } from "lucide-react";

function useAnimatedNumber(target, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
}

const statsConfig = [
  {
    key: "total",
    icon: Ticket,
    label: "Total Tickets",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    valuColor: "text-indigo-600",
  },
  {
    key: "closed",
    icon: CheckCircle,
    label: "Closed",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    valuColor: "text-emerald-600",
  },
  {
    key: "replied",
    icon: Reply,
    label: "Replied by Support",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    valuColor: "text-violet-600",
  },
  {
    key: "pending",
    icon: Clock,
    label: "Pending",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    valuColor: "text-amber-600",
  },
];

function StatCard({ config, value }) {
  const { icon: Icon, label, iconBg, iconColor, valuColor } = config;
  const animatedValue = useAnimatedNumber(value, 1200);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          <Icon size={18} className={iconColor} />
        </div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p
        className={`text-3xl font-bold tabular-nums tracking-tight ${valuColor}`}
      >
        {animatedValue}
      </p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}

export default function CardStats({ tickets }) {
  const total = tickets.length;
  const closed = tickets.filter((t) => t.status === "Closed").length;
  const replied = tickets.filter((t) =>
    t.replies?.some((r) => r.sender === "support"),
  ).length;
  const pending = tickets.filter((t) => t.status !== "Closed").length;
  const values = { total, closed, replied, pending };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsConfig.map((config) => (
        <StatCard key={config.key} config={config} value={values[config.key]} />
      ))}
    </div>
  );
}
