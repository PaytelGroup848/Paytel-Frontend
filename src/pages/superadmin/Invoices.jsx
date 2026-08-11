import React, { useState, useMemo, useEffect } from "react";
import {
  useAdminInvoices,
  useUpdateInvoiceStatus,
  useDeleteInvoice,
  downloadInvoicePdf,
} from "../../hooks/useInvoices";
import { useAdminUsers } from "../../hooks/useAdminUsers";
import { api } from "../../services/api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import Modal from "./Modal";
import {
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CreateInvoiceModal from "./CreateInvoiceModal";
import InvoiceDetailModal from "./InvoiceDetailModal";

const getClientName = (inv, userMap) => {
  if (inv?.clientName) return inv.clientName;
  if (inv?.userId && typeof inv.userId === "object" && inv.userId !== null) {
    const u = inv.userId;
    const fn = u.firstName || u.name || u.fullName || "";
    const ln = u.lastName || "";
    return `${fn} ${ln}`.trim() || u.email?.split("@")[0] || "N/A";
  }
  const uid = typeof inv?.userId === "string" ? inv.userId : inv?.userId?._id;
  if (uid && userMap[uid]) {
    const u = userMap[uid];
    const fn = u.firstName || u.name || u.fullName || "";
    const ln = u.lastName || "";
    return `${fn} ${ln}`.trim() || u.email?.split("@")[0] || "N/A";
  }
  return "N/A";
};

const getClientEmail = (inv, userMap) => {
  if (inv?.clientEmail) return inv.clientEmail;
  if (inv?.userId && typeof inv.userId === "object" && inv.userId !== null) {
    return inv.userId.email || "N/A";
  }
  const uid = typeof inv?.userId === "string" ? inv.userId : inv?.userId?._id;
  if (uid && userMap[uid]) return userMap[uid].email || "N/A";
  return "N/A";
};

const getClientPhone = (inv, userMap) => {
  if (inv?.clientPhone) return inv.clientPhone;
  if (inv?.userId && typeof inv.userId === "object" && inv.userId !== null) {
    return inv.userId.phone || inv.userId.mobile || "";
  }
  const uid = typeof inv?.userId === "string" ? inv.userId : inv?.userId?._id;
  if (uid && userMap[uid])
    return userMap[uid].phone || userMap[uid].mobile || "";
  return "";
};

export default function Invoices() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const params = {
    page,
    search,
    ...(status && { status }),
    ...(service && { service }),
  };

  const { data, isLoading } = useAdminInvoices(params);
  const { data: usersData } = useAdminUsers({
    page: 1,
    pageSize: 10000,
    limit: 10000,
    perPage: 10000,
    size: 10000,
  });
  const deleteMutation = useDeleteInvoice();
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersLoaded, setAllUsersLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const itemsOnPage1 = usersData?.items || [];
    const totalPages = Math.max(1, usersData?.meta?.totalPages || 1);

    setAllUsers((prev) => {
      const map = new Map();
      [...prev, ...itemsOnPage1].forEach((u) => {
        const id = u._id || u.id;
        if (id) map.set(id, u);
      });
      return Array.from(map.values());
    });

    const fetchRest = async () => {
      if (totalPages <= 1) {
        if (!cancelled) setAllUsersLoaded(true);
        return;
      }
      try {
        const pagePromises = [];
        for (let p = 2; p <= totalPages; p += 1) {
          pagePromises.push(
            api
              .get("/auth/admin/users", {
                params: {
                  page: p,
                  pageSize: 10000,
                  limit: 10000,
                  perPage: 10000,
                  size: 10000,
                },
              })
              .then((r) => r.data?.data || [])
              .catch(() => []),
          );
        }
        const results = await Promise.all(pagePromises);
        if (cancelled) return;
        setAllUsers((prev) => {
          const map = new Map();
          [...prev, ...itemsOnPage1, ...results.flat()].forEach((u) => {
            const id = u._id || u.id;
            if (id) map.set(id, u);
          });
          return Array.from(map.values());
        });
      } catch (err) {
        /* no-op */
      } finally {
        if (!cancelled) setAllUsersLoaded(true);
      }
    };

    fetchRest();
    return () => {
      cancelled = true;
    };
  }, [usersData]);

  const uniqueUserIdsInInvoices = useMemo(() => {
    const set = new Set();
    (data?.items || []).forEach((inv) => {
      const uid =
        typeof inv?.userId === "string"
          ? inv.userId
          : inv?.userId?._id || inv?.userId?.id;
      if (uid) set.add(uid);
    });
    return set;
  }, [data]);

  const userMap = useMemo(() => {
    const map = {};
    const source =
      allUsers && allUsers.length > 0 ? allUsers : usersData?.items || [];
    source.forEach((u) => {
      const id = u._id || u.id;
      if (id) map[id] = u;
    });
    return map;
  }, [usersData, allUsers]);

  const enrichedInvoices = useMemo(() => {
    return (data?.items || []).map((inv) => ({
      ...inv,
      clientName: getClientName(inv, userMap),
      clientEmail: getClientEmail(inv, userMap),
      clientPhone: getClientPhone(inv, userMap),
    }));
  }, [data, userMap]);

  const handleDownload = (invoice) => {
    downloadInvoicePdf(invoice.id, invoice.invoiceNumber);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteMutation.mutate(id);
    }
  };

  const statusVariants = {
    paid: "success",
    unpaid: "danger",
    expire_soon: "warning",
    renew: "info",
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Invoices</h1>
          <p className="text-textMuted text-sm">
            Manage billing and manual invoices
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </Button>
      </div>

      <Card className="p-4 bg-white/5 border-white/10">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
            <Input
              placeholder="Search by invoice no or client name..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white/5 border border-gray-300 rounded-xl px-4 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
          >
            <option value="" className="bg-[#fff]">
              All Status
            </option>
            <option value="paid" className="bg-[#ffff]">
              Paid
            </option>
            <option value="unpaid" className="bg-[#ffff]">
              Unpaid
            </option>
            <option value="expire_soon" className="bg-[#fff]">
              Expire Soon
            </option>
            <option value="renew" className="bg-[#fff]">
              Renew
            </option>
          </select>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-white/5 border border-gray-300 rounded-xl px-4 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
          >
            <option value="" className="bg-[#ffff]">
              All Services
            </option>
            <option value="vps" className="bg-[#ffff]">
              VPS
            </option>
            <option value="wordpress" className="bg-[#ffff]">
              WordPress
            </option>
            <option value="php" className="bg-[#ffff]">
              PHP+HTML
            </option>
            <option value="email" className="bg-[#ffff]">
              Email
            </option>
          </select>
        </div> */}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-textMuted text-sm">
              <tr>
                <th className="py-4 px-4 font-medium">Invoice No</th>
                <th className="py-4 px-4 font-medium">Client</th>
                <th className="py-4 px-4 font-medium">Service</th>
                <th className="py-4 px-4 font-medium">Amount</th>
                {/* <th className="py-4 px-4 font-medium text-center">Status</th> */}

                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <Spinner className="w-8 h-8 mx-auto" />
                  </td>
                </tr>
              ) : enrichedInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-textMuted">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                enrichedInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="text-sm hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-textPrimary">
                      {console.log("this is my invoice", inv)}

                      {inv?.invoiceNumber || inv?.invoiceNo}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-textPrimary">{inv.clientName}</div>
                      <div className="text-[11px] text-textMuted">
                        {inv.clientEmail}
                      </div>
                    </td>
                    <td className="py-4 px-4 capitalize">
                      <div className="text-textPrimary">
                        {inv?.serviceName || inv?.service}
                      </div>
                      <div className="text-[11px] text-textMuted">
                        {inv?.serviceModel}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-textPrimary">
                      ₹{(inv?.totalAmount / 100 || inv?.total / 100).toFixed(2)}
                    </td>
                    {/* <td className="py-4 px-4 text-center">
                      <Badge variant={statusVariants[inv.status] || "default"}>
                        {inv.status.replace("_", " ")}
                      </Badge>
                    </td> */}

                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* <button
                          onClick={() => handleDownload(inv)}
                          className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button> */}
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data?.meta?.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-textMuted">
              Page {data.meta.page} of {data.meta.totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(data.meta.totalPages, p + 1))
                }
                disabled={page === data.meta.totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
