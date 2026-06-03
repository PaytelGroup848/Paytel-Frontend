import { ShieldCheck, Lock, AlertCircle, Check, Clock } from "lucide-react";
import { useInstallSsl, useSslStatus } from "../../../hooks/useWordPress";

export const SslCard = ({ instanceId }) => {
  const { data: sslStatus, isLoading, refetch } = useSslStatus(instanceId);
  const { mutate: installSsl, isPending: isInstalling } =
    useInstallSsl(instanceId);

  const isSslEnabled = sslStatus?.enabled === true;
  const isRateLimited = sslStatus?.isRateLimited === true;
  const retryAfter = sslStatus?.retryAfter;

  // Format retry time to IST
  const getFormattedRetryTime = () => {
    if (retryAfter) {
      try {
        return new Date(retryAfter).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } catch (e) {
        console.error("Date parsing error:", e);
        return null;
      }
    }
    return null;
  };

  // Calculate hours remaining if retryAfter is provided
  const getHoursRemaining = () => {
    if (retryAfter) {
      try {
        const retryDate = new Date(retryAfter);
        const now = new Date();
        const diffMs = retryDate - now;
        if (diffMs > 0) {
          const hoursLeft = Math.ceil(diffMs / (1000 * 60 * 60));
          return `${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""}`;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const retryTimeIST = getFormattedRetryTime();
  const hoursRemaining = getHoursRemaining();

  console.log("Retry time (IST):", retryTimeIST);
  console.log("Hours remaining:", hoursRemaining);

  const handleInstallSsl = () => {
    if (isRateLimited) {
      const message = hoursRemaining
        ? `SSL cannot be installed due to Let's Encrypt rate limit.\n\nPlease try again after ${hoursRemaining} (at ${retryTimeIST}).`
        : `SSL cannot be installed due to Let's Encrypt rate limit.\n\nPlease try again after 24 hours.`;
      alert(message);
      return;
    }

    if (
      window.confirm(
        `Install SSL certificate for ${sslStatus?.domain}?\n\nThis will secure your website with HTTPS.`,
      )
    ) {
      installSsl(undefined, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const message = error?.response?.data?.message;
          if (message?.includes("rate limit")) {
            refetch(); // Refresh to show rate limit status
          }
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-20 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (isSslEnabled) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-xl shadow-sm relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full">
          <Check size={12} />
          Verified
        </div>

        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 mb-3">
          <ShieldCheck className="text-white" size={18} />
        </div>

        <h4 className="font-bold text-slate-800 text-[13px] tracking-tight">
          Security
        </h4>
        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
          SSL Active & Protected
        </p>
        {sslStatus?.expiryDate && (
          <p className="text-[9px] text-emerald-500 mt-1">
            Expires: {new Date(sslStatus.expiryDate).toLocaleDateString()}
          </p>
        )}
      </div>
    );
  }

  if (isRateLimited) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 p-4 rounded-xl shadow-sm relative cursor-not-allowed">
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/30 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full">
          <Clock size={12} />
          Limited
        </div>

        <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center shadow-lg shadow-red-200 mb-3">
          <AlertCircle className="text-white" size={18} />
        </div>

        <h4 className="font-bold text-slate-800 text-[13px] tracking-tight">
          SSL Rate Limited
        </h4>
        <p className="text-[11px] text-red-600 font-semibold mt-0.5">
          Let's Encrypt limit reached
        </p>
        {hoursRemaining ? (
          <p className="text-[14px] text-red-500 mt-1 font-medium">
            Retry after {hoursRemaining} ({retryTimeIST})
          </p>
        ) : retryTimeIST ? (
          <p className="text-[14px] text-red-500 mt-1">
            Try again after {retryTimeIST}
          </p>
        ) : (
          <p className="text-[14px] text-red-500 mt-1">
            Please wait 24 hours before retrying
          </p>
        )}
      </div>
    );
  }

  // SSL not installed
  return (
    <div
      onClick={handleInstallSsl}
      className={`bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl hover:border-amber-400 hover:shadow-amber-100 hover:shadow-md transition-all cursor-pointer group shadow-sm relative overflow-hidden ${isInstalling ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200/30 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />

      <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full">
        <AlertCircle size={12} />
        Not Active
      </div>

      <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform mb-3">
        {isInstalling ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Lock className="text-white" size={18} />
        )}
      </div>

      <h4 className="font-bold text-slate-800 text-[13px] tracking-tight">
        Security
      </h4>
      <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
        {isInstalling ? "Installing SSL..." : "Click to Install SSL"}
      </p>
      <p className="text-[9px] text-amber-500 mt-1">
        Secure your site with HTTPS
      </p>
    </div>
  );
};
