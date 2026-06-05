import React, { useState } from "react";
import { X, Plus, Paperclip, Loader2, Send } from "lucide-react";
import { useCreateTicket } from "../../hooks/useSupport";
import { useAuthStore } from "../../store/authStore";

const RaiseTicketModal = ({ isOpen, onClose }) => {
  const user = useAuthStore((s) => s.user);
  const mutation = useCreateTicket();

  const [formData, setFormData] = useState({
    name: user?.name || user?.fullName || "",
    email: user?.email || "",
    department: "General Enquiry",
    priority: "Medium",
    subject: "",
    message: "",
    file: null,
  });
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim() ||
      !formData.subject.trim()
    ) {
      alert("Please fill name, email, subject and message");
      return;
    }

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("department", formData.department);
    fd.append("priority", formData.priority);
    fd.append("subject", formData.subject);
    fd.append("message", formData.message);
    if (formData.file) fd.append("attachment", formData.file);

    await mutation.mutateAsync(fd);
    setFormData({
      name: user?.name || user?.fullName || "",
      email: user?.email || "",
      department: "General Enquiry",
      priority: "Medium",
      subject: "",
      message: "",
      file: null,
    });
    setFileName("");
    onClose();
  };

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white";
  const labelClass =
    "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Plus size={17} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Raise a Ticket
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                We'll get back to you as soon as possible
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className={labelClass}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="user@example.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className={labelClass}>
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Brief summary of your issue"
            />
          </div>

          {/* Department + Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={inputClass}
              >
                <option>General Enquiry</option>
                <option>Technical</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={inputClass}
              placeholder="Describe your issue in detail..."
            />
          </div>

          {/* Attachment */}
          <div>
            <label className={labelClass}>
              Attachment <span className="text-slate-300">(optional)</span>
            </label>
            <label className="flex items-center gap-3 w-full border border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 rounded-xl px-4 py-3 cursor-pointer transition-all group">
              <Paperclip
                size={15}
                className="text-slate-400 group-hover:text-indigo-500 flex-shrink-0 transition-colors"
              />
              <span className="text-sm text-slate-400 group-hover:text-indigo-500 transition-colors truncate">
                {fileName || "Click to attach a file (image or PDF)"}
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {fileName && (
              <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                <Paperclip size={11} />
                {fileName}
              </p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={14} /> Submit Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseTicketModal;
