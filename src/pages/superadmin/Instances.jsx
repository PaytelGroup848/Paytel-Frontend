import { useEffect, useMemo, useState } from "react";
import {
  useInstances,
  useSuspendInstance,
  useUnsuspendInstance,
} from "../../hooks/useWordPress";
import {
  Power,
  PowerOff,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe,
  Server,
  Calendar,
  User,
  Tag,
  X,
  Search,
} from "lucide-react";

const STATUS_STYLES = {
  active: {
    badge: "bg-green-100 text-green-700 border border-green-200",
    dot: "bg-green-500",
  },
  suspended: {
    badge: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-500",
  },
  provisioning: {
    badge: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    dot: "bg-yellow-500",
  },
  pending_dns: {
    badge: "bg-blue-100 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
  failed: {
    badge: "bg-gray-100 text-gray-500 border border-gray-200",
    dot: "bg-gray-400",
  },
};

export default function Instances() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, refetch } = useInstances({
    status: status || undefined,
    search: debouncedSearch || undefined,
    page,
    limit,
  });

  const { mutate: suspend, isPending: isSuspending } = useSuspendInstance();
  const { mutate: unsuspend, isPending: isUnsuspending } =
    useUnsuspendInstance();

  const rows = useMemo(() => data?.items || [], [data]);
  const meta = useMemo(
    () => data?.meta || { page: 1, limit, total: 0, totalPages: 1 },
    [data],
  );

  const handleToggle = (instance, isCurrentlySuspended) => {
    if (isCurrentlySuspended) {
      unsuspend(instance.id || instance._id, { onSuccess: () => refetch() });
    } else {
      if (window.confirm(`Suspend ${instance.domain}?`)) {
        suspend(instance.id || instance._id, { onSuccess: () => refetch() });
      }
    }
  };

  const isActionLoading = () => isSuspending || isUnsuspending;

  const handleStatusChange = (val) => {
    setStatus(val);
    setPage(1);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            WordPress Instances
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage all hosted WordPress sites
          </p>
        </div>

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="pending_dns">Pending DNS</option>
          <option value="provisioning">Provisioning</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Search input */}
      <div className="relative mb-5">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search domain, email..."
          className="bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 w-84"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {[
                  "Domain",
                  "User ID",

                  "Server IP",
                  "Status",
                  "Created",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    <Loader2 size={20} className="animate-spin inline mr-2" />
                    Loading instances...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    No instances found
                  </td>
                </tr>
              ) : (
                rows.map((instance) => {
                  const isSuspended = instance.status === "suspended";
                  const style =
                    STATUS_STYLES[instance.status] || STATUS_STYLES.failed;
                  const canToggle =
                    instance.status === "active" ||
                    instance.status === "suspended";

                  return (
                    <tr
                      key={instance.id || instance._id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      {/* Domain */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <Globe
                            size={13}
                            className="text-slate-400 shrink-0"
                          />
                          {instance.domain}
                        </div>
                      </td>

                      {/* User */}
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          <User size={10} />
                          {instance.userId || "-"}
                        </span>
                      </td>

                      {/* Plan */}
                      {/* <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100 px-2 py-1 rounded capitalize">
                          <Tag size={10} />
                          {instance.planType || "-"}
                        </span>
                      </td> */}

                      {/* Server IP */}
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-600">
                          <Server size={11} className="text-slate-400" />
                          {instance.publicServerIp || instance.serverIp || "-"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                          />
                          {instance.status.replace("_", " ")}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
                          <Calendar size={11} className="text-slate-400" />
                          {new Date(instance.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        {canToggle ? (
                          <button
                            onClick={() => handleToggle(instance, isSuspended)}
                            disabled={isActionLoading()}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-50 ${
                              isSuspended
                                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            }`}
                          >
                            {isActionLoading() ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : isSuspended ? (
                              <Power size={12} />
                            ) : (
                              <PowerOff size={12} />
                            )}
                            {isSuspended ? "Unsuspend" : "Suspend"}
                          </button>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && meta.total > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/60">
            <span className="text-xs text-slate-500">
              Showing {(meta.page - 1) * meta.limit + 1}–
              {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
              instances
            </span>
            <div className="flex items-center gap-1">
              <PagBtn
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft size={13} />
              </PagBtn>
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <PagBtn
                    key={p}
                    active={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PagBtn>
                ),
              )}
              <PagBtn
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= meta.totalPages}
              >
                <ChevronRight size={13} />
              </PagBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PagBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 rounded-lg text-xs font-medium border flex items-center justify-center transition-all
        ${
          active
            ? "bg-blue-500 border-blue-500 text-white"
            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
    >
      {children}
    </button>
  );
}
