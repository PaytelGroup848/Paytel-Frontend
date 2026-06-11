import { useState } from "react";
import { AlertCircle } from "lucide-react";
import Modal from "./Modal";
import { useCreateAdminUser } from "../../hooks/useAdminUsers";

export default function CreateUserModal({
  isCreateModalOpen,
  onClose,
  theme = "light",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
 const [errors, setErrors] = useState({});
 const createMutation = useCreateAdminUser();
  const [showPassword, setShowPassword] = useState(false);

  const isDark = theme === "dark";

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
        setErrors({});
        onClose();
      },
    });
  };

  /* ── Shared input styles ── */
  const inputBase = `w-full px-3.5 py-2.5 rounded-lg border text-sm transition
    focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400`;

  const inputLight =
    "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400";
  const inputDark =
    "bg-[#1a1a1a] border-white/10 text-white placeholder:text-slate-500";
  const inputError = isDark
    ? "border-rose-500/60 bg-rose-950/20"
    : "border-rose-400 bg-rose-50";

  const labelClass = `block text-sm font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`;
  const errorClass = "mt-1 text-xs text-rose-500";

  const field = (label, key, props = {}) => (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        value={formData[key]}
        onChange={(e) => {
          setFormData({ ...formData, [key]: e.target.value });
          if (errors[key]) setErrors({ ...errors, [key]: "" });
        }}
        className={`${inputBase} ${errors[key] ? inputError : isDark ? inputDark : inputLight}`}
        {...props}
      />
      {errors[key] && <p className={errorClass}>{errors[key]}</p>}
    </div>
  );

  const dividerClass = `border-t mt-5 pt-4 ${isDark ? "border-white/10" : "border-slate-100"}`;

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={onClose}
      title="Create Verified User"
      size="md"
      theme={theme}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Full Name", "name", { placeholder: "John Doe" })}
          {field("Email Address", "email", { placeholder: "john@example.com" })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Phone Number", "phone", { placeholder: "9956456744" })}

          <div>
            <label className={labelClass}>Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className={`${inputBase} appearance-none ${isDark ? inputDark : inputLight}`}
            >
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
              className={`${inputBase} pr-12 ${
                errors.password ? inputError : isDark ? inputDark : inputLight
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.password && <p className={errorClass}>{errors.password}</p>}
        </div>

        {/* Info banner */}
        <div
          className={`flex items-start gap-3 rounded-lg px-4 py-3 text-sm border ${
            isDark
              ? "bg-indigo-950/40 border-indigo-500/20 text-indigo-300"
              : "bg-indigo-50 border-indigo-100 text-indigo-800"
          }`}
        >
          <AlertCircle
            className={`w-4 h-4 mt-0.5 shrink-0 ${isDark ? "text-indigo-400" : "text-indigo-500"}`}
          />
          <p>
            This account will be marked as <strong>verified</strong> immediately
            — no OTP or email confirmation required.
          </p>
        </div>

        {/* Footer actions */}
        <div className={`flex justify-end gap-3 ${dividerClass}`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              isDark
                ? "border-white/10 text-slate-300 hover:bg-white/10"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold transition disabled:opacity-60 min-w-[110px]"
          >
            {createMutation.isPending ? "Creating…" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
