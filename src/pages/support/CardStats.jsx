import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle, Reply, Clock } from 'lucide-react';

/**
 * Animated counter hook – counts up to the target number
 */
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease‑out cubic
      setValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
}

// Stat card definitions – keep backend logic separate
const statsConfig = [
  {
    key: 'total',
    icon: Ticket,
    label: 'Total Tickets',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    key: 'closed',
    icon: CheckCircle,
    label: 'Closed',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    key: 'replied',
    icon: Reply,
    label: 'Replied (Support)',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    key: 'pending',
    icon: Clock,
    label: 'Pending',
    gradient: 'from-amber-500 to-orange-600',
  },
];

export default function CardStats({ tickets }) {
  // ----- Backend logic – completely unchanged -----
  const total = tickets.length;
  const closed = tickets.filter((t) => t.status === 'Closed').length;
  const replied = tickets.filter((t) =>
    t.replies?.some((r) => r.sender === 'support')
  ).length;
  const pending = tickets.filter((t) => t.status !== 'Closed').length;
  const values = { total, closed, replied, pending };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statsConfig.map(({ key, icon: Icon, label, gradient }, idx) => {
        const value = values[key];
        const animatedValue = useAnimatedNumber(value, 1200);

        return (
          <motion.div
            key={key}
            // Entrance animation
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            // Hover effect
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300`}
          >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />
            {/* Hover shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Card content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Icon & badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
                  <Icon size={24} className="text-white drop-shadow-md" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {key === 'replied' ? 'REPLIED' : key.toUpperCase().slice(0, 4)}
                </span>
              </div>

              {/* Value & label */}
              <div>
                <p className="text-4xl font-extrabold tracking-tight tabular-nums">
                  {animatedValue}
                </p>
                <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}