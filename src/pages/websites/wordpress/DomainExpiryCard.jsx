import { RotateCcw } from "lucide-react";
import { useDomainExpiry } from "../../../hooks/useWordpress";

const DomainExpiryCard = ({ siteData }) => {
  const {
    data: expiryData,
    isLoading: loading,
    error,
    refetch,
  } = useDomainExpiry(siteData?.id);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";

    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "expired":
        return "text-red-600";
      case "expiring_soon":
        return "text-orange-500";
      case "warning":
        return "text-yellow-500";
      case "healthy":
        return "text-green-500";
      default:
        return "text-slate-400";
    }
  };

  const getStatusLabel = (status, days) => {
    switch (status) {
      case "expired":
        return "Expired";
      case "expiring_soon":
      case "warning":
      case "healthy":
        return `${days} days left`;
      default:
        return "Unknown";
    }
  };

  return (
    <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 min-w-[120px]">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
        Domain Expiry
      </p>

      <div className="flex justify-between items-center gap-2">
        <div>
          <p
            className={`text-xs font-bold ${getStatusColor(expiryData?.status)}`}
          >
            {formatDate(expiryData?.expiryDate)}
          </p>

          <p className="text-[10px] text-slate-400">
            {getStatusLabel(expiryData?.status, expiryData?.daysUntilExpiry)}
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={loading}
          className="cursor-pointer hover:bg-slate-200 rounded-full p-1 transition-all"
        >
          <RotateCcw
            size={14}
            className={`${loading ? "animate-spin" : ""} text-slate-500`}
          />
        </button>
      </div>

      {error && (
        <p className="text-[8px] text-red-500 mt-1">
          Could not fetch expiry date
        </p>
      )}
    </div>
  );
};

export default DomainExpiryCard;
