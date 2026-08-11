import React, { useState, useMemo } from "react";
import { useAdminRenewals } from "../../hooks/useBilling";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS_RANGE_OPTIONS = [
  { label: "Next 30 days", value: 30 },
  { label: "Next 60 days", value: 60 },
  { label: "Next 90 days", value: 90 },
  { label: "Next 365 days", value: 365 },
];

const SERVICE_OPTIONS = [
  { label: "All Services", value: "" },
  { label: "VPS", value: "vps" },
  { label: "WordPress", value: "wordpress" },
  { label: "PHP+HTML", value: "php" },
  { label: "Email", value: "email" },
];

const formatRenewalDate = (date) => {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

const formatAmount = (amount) => {
  if (amount === null || amount === undefined) return "—";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "—";
  const display = num > 1000 ? num / 100 : num;
  return `₹${display.toLocaleString("en-IN")}`;
};

const calculateDaysLeft = (renewalDate) => {
  if (!renewalDate) return null;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(renewalDate);
    expiry.setHours(0, 0, 0, 0);
    const diffMs = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch {
    return null;
  }
};

const getClientDisplay = (item) => {
  const primary =
    item?.clientName ||
    item?.companyName ||
    item?.customerName ||
    (item?.userId && typeof item.userId === "object"
      ? [item.userId.firstName, item.userId.lastName]
          .filter(Boolean)
          .join(" ")
          .trim() || item.userId.email?.split("@")[0]
      : "") ||
    "N/A";

  const secondary =
    item?.clientEmail ||
    item?.clientPhone ||
    item?.contactPerson ||
    item?.billingName ||
    item?.clientContact ||
    (item?.userId && typeof item.userId === "object"
      ? item.userId.email
      : "") ||
    "";

  const phoneNumber =
    item?.clientPhone ||
    item?.contactPerson ||
    item?.billingName ||
    item?.clientContact ||
    (item?.userId && typeof item.userId === "object"
      ? item.userId.email
      : "") ||
    "";

  return { primary, secondary, phoneNumber };
};

export default function Renewals() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [daysRange, setDaysRange] = useState(365);
  const [service, setService] = useState("");

  const searchDebounced = useMemo(() => search, [search]);

  const params = {
    page,
    pageSize: 10,
    daysRange,
    ...(service && { service }),
    ...(searchDebounced.trim() && { search: searchDebounced.trim() }),
  };

  const { data, isLoading } = useAdminRenewals(params);

  const enrichedItems = useMemo(() => {
    const items = (data?.items || []).map((item) => {
      const daysLeft = calculateDaysLeft(
        item?.renewalDate || item?.expiresAt || item?.expirationDate,
      );
      const client = getClientDisplay(item);
      const billNo =
        item?.billNumber ||
        item?.invoiceNumber ||
        item?.invoiceNo ||
        item?.identifier ||
        item?.subscriptionId ||
        "—";
      const serviceName =
        item?.serviceName ||
        item?.packageName ||
        item?.service ||
        item?.planName ||
        item?.type ||
        "—";
      const amountVal =
        item?.amount ?? item?.totalAmount ?? item?.total ?? item?.price ?? null;

      return {
        ...item,
        _daysLeft: daysLeft,
        _client: client,
        _billNo: billNo,
        _serviceName: serviceName,
        _amount: amountVal,
        _renewalDate:
          item?.renewalDate || item?.expiresAt || item?.expirationDate,
      };
    });

    items.sort((a, b) => {
      const dA =
        a._daysLeft === null || isNaN(a._daysLeft) ? Infinity : a._daysLeft;
      const dB =
        b._daysLeft === null || isNaN(b._daysLeft) ? Infinity : b._daysLeft;
      return dA - dB;
    });

    return items;
  }, [data]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDaysRangeChange = (e) => {
    setDaysRange(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    setPage(1);
  };

  const renderDaysLeftBadge = (daysLeft) => {
    if (daysLeft === null || isNaN(daysLeft)) {
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 text-xs font-semibold">
          —
        </span>
      );
    }

    const isUrgent = daysLeft < 30;
    const isExpired = daysLeft < 0;

    if (isExpired) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-1 text-xs font-semibold">
          {Math.abs(daysLeft)} days overdue
        </span>
      );
    }

    if (isUrgent) {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-semibold">
          {daysLeft} {daysLeft === 1 ? "day" : "days"} left
        </span>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
        {daysLeft} days left
      </span>
    );
  };

  const totalPages = Math.max(1, data?.meta?.totalPages || 1);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-textPrimary">
          Upcoming Renewals
        </h1>
        <p className="text-textMuted text-sm mt-1">
          Track and manage all client renewals in one place
        </p>
      </div>

      <Card className="p-4 bg-surface border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-textMuted mb-2">
              Days Range
            </label>
            <select
              value={daysRange}
              onChange={handleDaysRangeChange}
              className="w-full h-11 rounded-xl bg-white border border-slate-300 text-textPrimary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/80 appearance-none cursor-pointer"
            >
              {DAYS_RANGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-textMuted mb-2">
              Service
            </label>
            <select
              value={service}
              onChange={handleServiceChange}
              className="w-full h-11 rounded-xl bg-white border border-slate-300 text-textPrimary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/80 appearance-none cursor-pointer"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-textMuted mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted pointer-events-none" />
              <input
                type="text"
                placeholder="Search clients or bills..."
                value={search}
                onChange={handleSearchChange}
                className="w-full h-11 rounded-xl bg-white border border-slate-300 text-textPrimary placeholder:text-textMuted pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/80 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-textMuted text-sm">
              <tr>
                <th className="py-4 px-5 font-semibold uppercase tracking-wider text-xs">
                  Bill
                </th>
                <th className="py-4 px-5 font-semibold uppercase tracking-wider text-xs">
                  Client
                </th>
                <th className=" font-semibold uppercase tracking-wider text-xs">
                  Domain
                </th>
                <th className=" font-semibold uppercase tracking-wider text-xs">
                  Service
                </th>

                <th className="py-4 px-5 font-semibold uppercase tracking-wider text-xs">
                  Amount
                </th>
                <th className="py-4 px-5 font-semibold uppercase tracking-wider text-xs">
                  Renewal Date
                </th>
                <th className="py-4 px-5 font-semibold uppercase tracking-wider text-xs">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <Spinner className="w-8 h-8 mx-auto" />
                    <p className="mt-3 text-sm text-textMuted">
                      Loading renewals...
                    </p>
                  </td>
                </tr>
              ) : enrichedItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-textMuted">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-2">
                        <Search className="w-7 h-7 text-slate-400" />
                      </div>
                      <p className="font-medium text-textPrimary">
                        No renewals found
                      </p>
                      <p className="text-sm">
                        Try adjusting the filters or search query
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                enrichedItems.map((item) => (
                  <tr
                    key={item._id || item.id || item._billNo + Math.random()}
                    className="text-sm hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-textPrimary">
                      {item._billNo}
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-textPrimary font-medium">
                        {item._client.primary}
                      </div>
                      {item._client?.secondary && (
                        <div className="text-xs text-textMuted mt-0.5">
                          {item._client.secondary}
                        </div>
                      )}

                      {item._client.phoneNumber && (
                        <div className="text-xs text-textMuted mt-0.5">
                          {item._client?.phoneNumber}
                        </div>
                      )}
                    </td>
                    <td className=" font-semibold text-gray-700 font-mono">
                      {console.log("this is domain", item)}
                      {item?.domain || "NA"}
                    </td>
                    <td className="capitalize">
                      <span className="text-textPrimary">
                        {typeof item._serviceName === "string"
                          ? item._serviceName.charAt(0).toUpperCase() +
                            item._serviceName.slice(1)
                          : item._serviceName}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-semibold text-textPrimary font-mono">
                      {item._amount}
                    </td>
                    <td className="py-4 px-5 text-textPrimary">
                      {formatRenewalDate(item._renewalDate)}
                    </td>
                    <td className="py-4 px-5">
                      {renderDaysLeftBadge(item._daysLeft)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-slate-200 gap-4">
            <div className="text-sm text-textMuted">
              Showing page {data?.meta?.page || page} of {totalPages}
              {data?.meta?.total !== undefined && (
                <span className="ml-2">
                  · {data.meta.total} total record
                  {data.meta.total === 1 ? "" : "s"}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border border-slate-300 bg-white hover:bg-slate-50 text-textPrimary"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="border border-slate-300 bg-white hover:bg-slate-50 text-textPrimary"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
