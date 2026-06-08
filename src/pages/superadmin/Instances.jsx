import { useMemo, useState } from "react";
import {
  useInstances,
  useSuspendInstance,
  useUnsuspendInstance,
} from "../../hooks/useWordPress";
import { Power, PowerOff, Loader2 } from "lucide-react";

export default function Instances() {
  const [status, setStatus] = useState("");
  const { data, isLoading, refetch } = useInstances({
    status: status || undefined,
  });
  const { mutate: suspend, isPending: isSuspending } = useSuspendInstance();
  const { mutate: unsuspend, isPending: isUnsuspending } =
    useUnsuspendInstance();

  const rows = useMemo(() => data?.items || [], [data]);

  const handleToggle = async (instance, isCurrentlySuspended) => {
    if (isCurrentlySuspended) {
      await unsuspend(instance.id || instance._id, {
        onSuccess: () => refetch(),
      });
    } else {
      if (
        window.confirm(`Are you sure you want to suspend ${instance.domain}?`)
      ) {
        await suspend(instance.id || instance._id, {
          onSuccess: () => refetch(),
        });
      }
    }
  };

  const isActionLoading = (instanceId) => {
    return isSuspending || isUnsuspending;
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All WordPress Instances</h1>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="pending_dns">Pending DNS</option>
          <option value="provisioning">Provisioning</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <Th>Domain</Th>
              <Th>User</Th>
              <Th>Server</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  className="px-4 py-6 text-center text-textMuted"
                  colSpan={6}
                >
                  Loading instances...
                </td>
              </tr>
            ) : (
              rows.map((instance) => {
                const isSuspended = instance.status === "suspended";
                const isLoadingAction = isActionLoading(
                  instance.id || instance._id,
                );

                return (
                  <tr
                    key={instance.id || instance._id}
                    className="border-t border-white/10"
                  >
                    <Td>{instance.domain}</Td>
                    <Td>{instance.userId || "-"}</Td>
                    <Td>{instance.serverIp || "-"}</Td>
                    <Td>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          instance.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : instance.status === "suspended"
                              ? "bg-red-500/20 text-red-400"
                              : instance.status === "provisioning"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : instance.status === "pending_dns"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            instance.status === "active"
                              ? "bg-green-400"
                              : instance.status === "suspended"
                                ? "bg-red-400"
                                : instance.status === "provisioning"
                                  ? "bg-yellow-400"
                                  : instance.status === "pending_dns"
                                    ? "bg-blue-400"
                                    : "bg-gray-400"
                          }`}
                        />
                        {instance.status}
                      </span>
                    </Td>
                    <Td>{new Date(instance.createdAt).toLocaleString()}</Td>
                    <Td>
                      <button
                        onClick={() => handleToggle(instance, isSuspended)}
                        disabled={isLoadingAction}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          isSuspended
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                        }`}
                      >
                        {isLoadingAction ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : isSuspended ? (
                          <Power size={14} />
                        ) : (
                          <PowerOff size={14} />
                        )}
                        {isSuspended ? "Unsuspend" : "Suspend"}
                      </button>
                    </Td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th className="text-left px-4 py-3 font-semibold">{children}</th>;
}

function Td({ children }) {
  return <td className="px-4 py-3">{children}</td>;
}
