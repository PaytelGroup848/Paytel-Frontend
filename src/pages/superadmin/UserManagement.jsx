import React, { useState } from "react";
import {
  useAdminUsers,
  useCreateAdminUser,
  useTerminateUser,
  useUnterminateUser,
  useDeleteAdminUser,
} from "../../hooks/useAdminUsers";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "./Modal";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import {
  Trash2,
  Power,
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const params = {
    page,
    search,
    ...(filter === "verified" && { isVerified: "true" }),
    ...(filter === "unverified" && { isVerified: "false" }),
    ...(filter === "terminated" && { isTerminated: "true" }),
  };

  const { data, isLoading } = useAdminUsers(params);
  const terminateMutation = useTerminateUser();
  const unterminateMutation = useUnterminateUser();
  const deleteMutation = useDeleteAdminUser();

  const handleTerminate = (id) =>
    window.confirm("Terminate this user?") && terminateMutation.mutate(id);
  const handleUnterminate = (id) => unterminateMutation.mutate(id);
  const handleDelete = (id) =>
    window.confirm("Permanently delete? Cannot be undone.") &&
    deleteMutation.mutate(id);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage all users across the platform
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Create User
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by name or email…"
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg self-start">
            {["all", "verified", "unverified", "terminated"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold text-center">
                  Verified
                </th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
                <th className="px-5 py-3 font-semibold">Created</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <Spinner className="w-7 h-7 mx-auto text-indigo-400" />
                  </td>
                </tr>
              ) : data?.items?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <AlertCircle className="w-7 h-7 opacity-50" />
                      <p className="text-sm">No users match your search.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.items.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors text-sm"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">
                        {user.name}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mt-0.5">
                        {user.role}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{user.email}</td>
                    <td className="px-5 py-3.5 text-center">
                      {user.isEmailVerified ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {user.isTerminated ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Terminated
                        </span>
                      ) : !user.isEmailVerified ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Unverified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        {user.isTerminated ? (
                          <button
                            onClick={() => handleUnterminate(user.id)}
                            title="Reinstate user"
                            className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleTerminate(user.id)}
                            title="Terminate user"
                            className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          title="Delete user"
                          disabled={user.role === "superadmin"}
                          className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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

        {/* Pagination */}
        {data?.meta?.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 border-t border-slate-100 gap-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {(page - 1) * 20 + 1}
              </span>{" "}
              –{" "}
              <span className="font-semibold text-slate-800">
                {Math.min(page * 20, data.meta.total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {data.meta.total}
              </span>{" "}
              users
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(data.meta.totalPages, p + 1))
                }
                disabled={page === data.meta.totalPages}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}

/* ─── Create User Modal ─────────────────────────────────────────────────── */

function CreateUserModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const createMutation = useCreateAdminUser();

  const validate = () => {
    const e = {};
    if (!formData.name) e.name = "Name is required";
    if (!formData.email) e.email = "Email is required";
    else if (!/^\S+@\S+$/i.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone) e.phone = "Phone is required";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8) e.password = "Min 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "user",
        });
        onClose();
      },
    });
  };

  const field = (label, key, props = {}) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        value={formData[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition ${
          errors[key]
            ? "border-rose-400 bg-rose-50"
            : "border-slate-200 bg-white"
        }`}
        {...props}
      />
      {errors[key] && (
        <p className="mt-1 text-xs text-rose-600">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Verified User"
      className="bg-white border border-slate-200"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Full Name", "name", { placeholder: "John Doe" })}
          {field("Email Address", "email", { placeholder: "john@example.com" })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Phone Number", "phone", { placeholder: "+91 9953791400" })}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition appearance-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {field("Password", "password", {
          type: "password",
          placeholder: "Min 8 characters",
        })}

        <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3 text-sm text-indigo-800">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
          <p>
            This account will be marked as <strong>verified</strong> immediately
            — no OTP or email confirmation required.
          </p>
        </div>

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
            disabled={createMutation.isPending}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60 min-w-[110px]"
          >
            {createMutation.isPending ? "Creating…" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
