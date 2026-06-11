import React, { useState } from "react";
import { useVpsPlans, useUpdateVpsPlan } from "../../hooks/useVps";
import { usePhpPlans, useUpdatePhpPlan } from "../../hooks/usePhpHosting";
import { useEmailPlans, useUpdateEmailPlan } from "../../hooks/useEmailHosting";
import { useUpdateWpPlan } from "../../hooks/useWordPress";
import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/ui/Modal"; // your custom Modal
import { Edit2, Cloud, Globe, Mail, Code } from "lucide-react";

export default function Products() {
  const [activeTab, setActiveTab] = useState("vps");
  const [editingPlan, setEditingPlan] = useState(null);

  const tabs = [
    { id: "vps", label: "VPS Plans", icon: Cloud },
    { id: "wordpress", label: "WordPress Plans", icon: Globe },
    { id: "php", label: "PHP/HTML Plans", icon: Code },
    { id: "email", label: "Email Plans", icon: Mail },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Product Management
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Configure pricing and specifications for all services
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === "vps" && <VpsPlansTable onEdit={setEditingPlan} />}
        {activeTab === "wordpress" && (
          <WordPressPlansTable onEdit={setEditingPlan} />
        )}
        {activeTab === "php" && <PhpPlansTable onEdit={setEditingPlan} />}
        {activeTab === "email" && <EmailPlansTable onEdit={setEditingPlan} />}
      </div>

      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          type={activeTab}
          isOpen={!!editingPlan}
          onClose={() => setEditingPlan(null)}
        />
      )}
    </div>
  );
}

/* ─── Shared table shell ─────────────────────────────────────────────────── */

function TableHead({ cols }) {
  return (
    <thead className="bg-slate-50 border-b border-slate-100">
      <tr>
        {cols.map((col, i) => (
          <th
            key={col}
            className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
              i === cols.length - 1 ? "text-right" : "text-left"
            }`}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function EditBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
    >
      <Edit2 className="w-4 h-4" />
    </button>
  );
}

function TypeBadge({ value, variant }) {
  const colors = {
    linux: "bg-sky-50 text-sky-700 border-sky-200",
    windows: "bg-amber-50 text-amber-700 border-amber-200",
    default: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const cls = colors[value?.toLowerCase()] ?? colors.default;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}
    >
      {value?.toUpperCase()}
    </span>
  );
}

/* ─── VPS ────────────────────────────────────────────────────────────────── */

function VpsPlansTable({ onEdit }) {
  const { data: linuxPlans, isLoading: loadingLinux } = useVpsPlans("linux");
  const { data: windowsPlans, isLoading: loadingWindows } =
    useVpsPlans("windows");

  if (loadingLinux || loadingWindows) return <TableSkeleton />;

  const allPlans = [...(linuxPlans || []), ...(windowsPlans || [])];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <TableHead
          cols={[
            "Plan Name",
            "Type",
            "Price / mo",
            "Specifications",
            "Actions",
          ]}
        />
        <tbody className="divide-y divide-slate-100">
          {allPlans.map((plan) => (
            <tr
              key={plan.id}
              className="text-sm hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {plan.name}
              </td>
              <td className="px-6 py-4">
                <TypeBadge value={plan.type} />
              </td>
              <td className="px-6 py-4 font-mono text-slate-800">
                ₹{(plan.priceMonthly / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {plan.vcpu} vCPU / {plan.ram} RAM / {plan.storage} NVMe
              </td>
              <td className="px-6 py-4 text-right">
                <EditBtn onClick={() => onEdit({ ...plan, category: "vps" })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── WordPress ──────────────────────────────────────────────────────────── */

function WordPressPlansTable({ onEdit }) {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["wordpress", "plans"],
    queryFn: () => api.get("/wordpress/plans").then((r) => r.data?.data || []),
  });

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <TableHead cols={["Plan Name", "Price / mo", "Features", "Actions"]} />
        <tbody className="divide-y divide-slate-100">
          {plans?.map((plan) => (
            <tr
              key={plan.id}
              className="text-sm hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {plan.name}
              </td>
              <td className="px-6 py-4 font-mono text-slate-800">
                ₹{(plan.price / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {plan.features?.slice(0, 3).join(", ")}…
              </td>
              <td className="px-6 py-4 text-right">
                <EditBtn
                  onClick={() => onEdit({ ...plan, category: "wordpress" })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── PHP ────────────────────────────────────────────────────────────────── */

function PhpPlansTable({ onEdit }) {
  const { data: plans, isLoading } = usePhpPlans();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <TableHead
          cols={["Plan Name", "Type", "Price / mo", "Storage", "Actions"]}
        />
        <tbody className="divide-y divide-slate-100">
          {plans?.map((plan) => (
            <tr
              key={plan.id}
              className="text-sm hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {plan.name}
              </td>
              <td className="px-6 py-4">
                <TypeBadge value={plan.type} />
              </td>
              <td className="px-6 py-4 font-mono text-slate-800">
                ₹{(plan.price / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-slate-500">{plan.storage}</td>
              <td className="px-6 py-4 text-right">
                <EditBtn onClick={() => onEdit({ ...plan, category: "php" })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Email ──────────────────────────────────────────────────────────────── */

function EmailPlansTable({ onEdit }) {
  const { data: plans, isLoading } = useEmailPlans();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <TableHead
          cols={["Plan Name", "Price / mo", "Mailboxes", "Storage", "Actions"]}
        />
        <tbody className="divide-y divide-slate-100">
          {plans?.map((plan) => (
            <tr
              key={plan.id}
              className="text-sm hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 font-semibold text-slate-900">
                {plan.name}
              </td>
              <td className="px-6 py-4 font-mono text-slate-800">
                ₹{(plan.price / 100).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {plan.maxMailboxes || "Unlimited"}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {plan.storagePerMailbox} GB / user
              </td>
              <td className="px-6 py-4 text-right">
                <EditBtn
                  onClick={() => onEdit({ ...plan, category: "email" })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Edit Modal ─────────────────────────────────────────────────────────── */

function EditPlanModal({ plan, type, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: plan.name,
    price: plan.priceMonthly || plan.price,
    storage: plan.storage || "",
    ram: plan.ram || "",
    vcpu: plan.vcpu || "",
    features: plan.features?.join("\n") || "",
  });

  const updateVps = useUpdateVpsPlan();
  const updateWp = useUpdateWpPlan();
  const updatePhp = useUpdatePhpPlan();
  const updateEmail = useUpdateEmailPlan();

  const isPending =
    updateVps.isPending ||
    updateWp.isPending ||
    updatePhp.isPending ||
    updateEmail.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    // FIX: Get the correct ID from plan object
    const planId = plan.id || plan._id || plan.slug;

    console.log("Plan object:", plan);
    console.log("Using Plan ID:", planId);

    if (!planId) {
      toast.error("Plan ID is missing. Please refresh and try again.");
      return;
    }

    const payload = {
      name: formData.name,
      priceMonthly: formData.price,
      price: formData.price,
      storage: formData.storage,
      ram: formData.ram,
      vcpu: formData.vcpu,
      features: formData.features.split("\n").filter((f) => f.trim()),
    };

    const mutation =
      type === "vps"
        ? updateVps
        : type === "wordpress"
          ? updateWp
          : type === "php"
            ? updatePhp
            : updateEmail;

    mutation.mutate(
      { id: planId, data: payload },
      {
        onSuccess: () => {
          onClose();
          toast.success("Plan updated successfully");
        },
        onError: (error) => {
          console.error("Update error:", error);
          toast.error(
            error?.response?.data?.message || "Failed to update plan",
          );
        },
      },
    );
  };

  /* shared input style */
  const inputCls = `w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm
    placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition`;

  const labelCls = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit — ${plan.name}`}
      size="md"
      theme="light"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Plan name — full width */}
        <div>
          <label className={labelCls}>Plan Name</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
            placeholder="Plan name"
          />
        </div>

        {/* Price + Storage */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Price (₹ in Paise)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
              className={inputCls}
              placeholder="e.g. 49900"
            />
          </div>
          <div>
            <label className={labelCls}>Storage</label>
            <input
              value={formData.storage}
              onChange={(e) =>
                setFormData({ ...formData, storage: e.target.value })
              }
              className={inputCls}
              placeholder="e.g. 100 GB"
            />
          </div>
        </div>

        {/* VPS-only: RAM + vCPU */}
        {type === "vps" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>RAM</label>
              <input
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: e.target.value })
                }
                className={inputCls}
                placeholder="e.g. 4 GB"
              />
            </div>
            <div>
              <label className={labelCls}>vCPU</label>
              <input
                type="number"
                value={formData.vcpu}
                onChange={(e) =>
                  setFormData({ ...formData, vcpu: parseInt(e.target.value) })
                }
                className={inputCls}
                placeholder="e.g. 2"
              />
            </div>
          </div>
        )}

        {/* Features */}
        <div>
          <label className={labelCls}>
            Features{" "}
            <span className="text-slate-400 font-normal">(one per line)</span>
          </label>
          <textarea
            value={formData.features}
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value })
            }
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder={"Free SSL\n24/7 Support\n1 Gbps Port"}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold transition disabled:opacity-60 min-w-[120px]"
          >
            {isPending ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ─── Skeleton ───────────────────────────────────────────────────────────── */

function TableSkeleton() {
  return (
    <div className="p-6 space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-11 bg-slate-100 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}
