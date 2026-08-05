import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Globe,
  Activity,
  Clock,
  ArrowRight,
  ExternalLink,
  Server,
  Database,
  Code2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  usePhpInstances,
  useDeletePhpInstance,
} from "../../../hooks/usePhpHosting";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------
// Enhanced StatusBadge with dot indicator and better styling
// ----------------------------------------------------------------------
const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      label: "Active",
    },
    provisioning: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500 animate-pulse",
      label: "Installing...",
    },
    pending_dns: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-500",
      label: "Pending DNS",
    },
    pending_setup: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      dot: "bg-indigo-500",
      label: "Setup Required",
    },
    failed: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
      label: "Failed",
    },
    suspended: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
      dot: "bg-slate-400",
      label: "Suspended",
    },
  };
  const config = statusConfig[status] || statusConfig.suspended;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </div>
  );
};

// ----------------------------------------------------------------------
// TypeBadge with icon + label (unchanged style but refined)
// ----------------------------------------------------------------------
const TypeBadge = ({ type }) => {
  const icons = {
    html: <Code2 size={12} />,
    php: <Server size={12} />,
    mysql: <Database size={12} />,
  };
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider border border-slate-200 shadow-sm">
      {icons[type]}
      {type}
    </div>
  );
};

// ----------------------------------------------------------------------
// Shimmer loading skeleton (MNC style)
// ----------------------------------------------------------------------
const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-100 p-6 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-slate-200 rounded-lg animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-28 bg-slate-200 rounded-xl animate-pulse" />
            <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse" />
          </div>
        </div>
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    ))}
    <style>{`
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
    `}</style>
  </div>
);

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
export default function MyPhpSites() {
  const navigate = useNavigate();
  const { data, isLoading } = usePhpInstances();
  const deleteInstance = useDeletePhpInstance();

  const handleDelete = async (id, domain) => {
    if (
      window.confirm(
        `Delete "${domain || "this site"}"? All files and data will be permanently removed.`,
      )
    ) {
      try {
        await deleteInstance.mutateAsync(id);
        toast.success("Site deleted successfully");
      } catch (err) {
        toast.error("Failed to delete site");
      }
    }
  };

  const handleAction = (instance) => {
    if (
      instance.status === "pending_setup" ||
      instance.status === "pending_dns" ||
      instance.status === "provisioning"
    ) {
      navigate(`/php-hosting/dns/${instance.id}`);
    } else if (instance.status === "active") {
      navigate(`/php-hosting/dashboard/${instance.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with gradient underline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              My PHP Hosting
            </h1>
            <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
              <Activity size={14} className="text-indigo-400" />
              Manage your PHP and HTML websites from one unified control panel.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate("/php-hosting")}
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white"
            >
              <Plus
                size={18}
                strokeWidth={2.5}
                className="inline-block align-middle"
              />
              <span className="inline-block align-middle leading-none">
                &nbsp;NEW SITE
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSkeleton />
          ) : data?.items?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-5"
            >
              {data.items.map((instance, idx) => (
                <motion.div
                  key={instance.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 hover:border-indigo-200 shadow-md hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient border line on top (premium touch) */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Left - Icon + Info */}
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-105 transition-transform duration-200">
                          <Globe size={32} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                              {instance.domain || "No domain set"}
                              {instance.domain && (
                                <ExternalLink
                                  size={14}
                                  className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
                                  onClick={() =>
                                    window.open(
                                      `http://${instance.domain}`,
                                      "_blank",
                                    )
                                  }
                                />
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <TypeBadge type={instance.siteType} />
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <StatusBadge status={instance.status} />
                          </div>
                        </div>
                      </div>

                      {/* Right - Expiry + Actions */}
                      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1">
                            <Clock size={10} /> Expires On
                          </p>
                          <p className="text-sm font-black text-slate-800 mt-0.5">
                            {new Date(instance.expiresAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={() => handleAction(instance)}
                              className={`h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md ${
                                instance.status === "active"
                                  ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 hover:border-transparent"
                                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-300"
                              }`}
                            >
                              {instance.status === "active"
                                ? "Dashboard"
                                : instance.status === "pending_setup"
                                  ? "Setup Domain"
                                  : "Verify DNS"}
                              <ArrowRight size={14} className="ml-2" />
                            </Button>
                          </motion.div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleDelete(instance.id, instance.domain)
                            }
                            className="w-12 h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-200 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-red-200"
                            aria-label="Delete site"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white/70 backdrop-blur-sm rounded-[3rem] p-16 text-center border border-dashed border-slate-300 shadow-xl overflow-hidden"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20" />

              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-indigo-50 rounded-3xl flex items-center justify-center text-slate-400 mx-auto mb-6 shadow-inner">
                  <Server size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  No Active Sites
                </h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto mt-3 mb-10">
                  You haven't created any PHP or HTML hosting instances yet.
                  Start by choosing a plan that fits your needs.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => navigate("/php-hosting")}
                    className="h-14 px-10 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200"
                  >
                    Choose a Plan
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
