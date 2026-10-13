import React from "react";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  RotateCcw,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

const MobilePlansList = ({ plans, type, popularIdx, onNavigate }) => {
  if (!plans || plans.length === 0) return null;

  return (
    <div className="space-y-5 px-1">
      {plans.map((plan, idx) => {
        const isPopular = idx === popularIdx;
        return (
          <motion.div
            key={plan.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`relative w-full bg-white rounded-2xl overflow-hidden border transition-shadow duration-300
              hover:shadow-xl
              ${
                isPopular
                  ? "border-amber-300 ring-2 ring-amber-200 shadow-md"
                  : "border-slate-100 shadow-sm"
              }`}
          >
            {/* Popular badge */}
            {isPopular && (
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-5 py-1 rounded-b-xl flex items-center gap-1.5 shadow-md">
                  <Star className="w-3 h-3" fill="currentColor" />
                  MOST POPULAR
                </div>
              </div>
            )}

            {/* Colored top bar */}
            <div
              className={`h-1 w-full ${
                isPopular
                  ? "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"
                  : "bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
              }`}
            />

            {/* Card body */}
            <div className={`p-5 ${isPopular ? "pt-7" : "pt-5"}`}>
              {/* Plan name + badge */}
              <div className="mb-3">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">
                  {plan.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    Global Deploy
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    {formatINR(plan.priceMonthly)}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">/mo</span>
                </div>
              </div>

              {/* Specs – 2 columns on small screens */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                {[
                  { icon: Cpu, label: "vCPU", value: `${plan.vcpu} Cores` },
                  { icon: MemoryStick, label: "RAM", value: plan.ram },
                  { icon: HardDrive, label: "NVMe", value: plan.storage },
                  { icon: Wifi, label: "Speed", value: plan.portSpeed },
                  { icon: RotateCcw, label: "Backup", value: plan.backups },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-md ${
                        isPopular
                          ? "bg-amber-50 text-amber-600"
                          : "bg-indigo-50 text-indigo-500"
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                        {label}
                      </span>
                      <span className="text-xs font-bold text-slate-700 truncate">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <button
                onClick={() =>
                  onNavigate(`/vps/configure/${type}/${plan.id || plan._id}`)
                }
                className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                  flex items-center justify-center gap-2
                  ${
                    isPopular
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-200 active:shadow-lg"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 active:shadow-lg"
                  }`}
              >
                Deploy
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobilePlansList;