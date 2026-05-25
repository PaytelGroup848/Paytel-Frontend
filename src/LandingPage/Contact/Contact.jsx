import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building,
  ShieldCheck,
  User,
  Briefcase,
  FileText,
  ChevronRight,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const DEPARTMENTS = [
  "Enterprise Sales",
  "Technical Infrastructure",
  "Billing & Accounting",
  "General Inquiry",
];

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (success) setSuccess("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (!form.name || !form.email || !form.phone || !form.department) {
      setError("Please fill all required fields (name, email, phone, department).");
      setLoading(false);
      return;
    }

    // Build a descriptive message from extra fields
    const extraInfo = [
      form.company && `Company: ${form.company}`,
      form.department && `Department: ${form.department}`,
    ]
      .filter(Boolean)
      .join(" | ");
    const fullMessage = form.message
      ? `${extraInfo} | Message: ${form.message}`
      : extraInfo || "No additional message";

    try {
      const response = await axios.post("https://backend.cloudedata.info/api/public/submit", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        product: "Contact Inquiry", // fixed for contact page
        message: fullMessage,
      });

      if (response.data.success) {
        setSuccess("Thank you! Your inquiry has been submitted. Our team will respond within 1 business day.");
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          department: "",
          message: "",
        });
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Professional Banner Section */}
      <section className="bg-slate-900 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            How can we assist your business today?
          </h1>
          <p className="text-lg text-slate-400 font-light">
            Whether you're looking to scale your infrastructure or need technical support, our team is ready to provide enterprise-grade solutions.
          </p>
        </div>
      </section>

      {/* Main Contact Page Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Corporate & Department Data */}
          <div className="lg:col-span-1 space-y-10">
            {/* Headquarters Card */}
            <section className="bg-white p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-5 h-5 text-blue-700" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">Corporate HQ</h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Paytel Financial Technologies Pvt. Ltd.
              </p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                A 212, First Floor, Okhla Industrial Estate Phase-3, New Delhi, 110020, India
              </p>
            </section>

            {/* Departmental Routing */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">Departmental Lines</h2>
              <div className="space-y-5">
                {[
                  { label: "Enterprise Sales", email: "sales@cloudedata.com" },
                  { label: "Technical Support", email: "support@cloudedata.com" },
                  { label: "Billing & Accounting", email: "billing@cloudedata.com" },
                  { label: "Corporate Inquiries", email: "info@cloudedata.com" },
                ].map((dept, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-slate-900">{dept.label}</p>
                    <a href={`mailto:${dept.email}`} className="text-sm text-blue-700 hover:underline">
                      {dept.email}
                    </a>
                  </div>
                ))}
                <div>
                  <p className="text-xs font-bold text-slate-900">Direct Phone Line</p>
                  <p className="text-sm text-slate-700">+91-9311472355</p>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">Service Hours</h2>
              </div>
              <p className="text-xs text-slate-600">
                Mon-Fri: 09:00 - 18:00 IST
                <br />
                Technical Support: 24/7/365
              </p>
            </section>
          </div>

          {/* Right Column: Functional Inquiry Form (like the banner's right card) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Service Request Portal</h2>

              {/* Success / Error messages */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 flex items-center gap-2 rounded-lg bg-green-100 border border-green-400 p-4 text-sm text-green-800"
                  >
                    <CheckCircle size={18} className="shrink-0" />
                    {success}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 flex items-center gap-2 rounded-lg bg-red-100 border border-red-400 p-4 text-sm text-red-800"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <User size={14} /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all"
                    placeholder="Enter Full Name"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Mail size={14} /> Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>

                {/* Phone Number (new field to match banner functionality) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Phone size={14} /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Company/Org */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Briefcase size={14} /> Company/Org
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all"
                    placeholder="Organization Name"
                  />
                </div>

                {/* Department Route */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <FileText size={14} /> Department Route *
                  </label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none bg-white"
                  >
                    <option value="" disabled>Select department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Project Requirements (textarea spans full width) */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Project Requirements
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full border border-slate-300 p-3 text-sm focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all"
                    placeholder="Describe your technical requirements or support issue..."
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-4">
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck size={12} /> Secure 256-bit Encrypted Transmission
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-900 text-white font-bold py-3 px-8 text-sm hover:bg-blue-800 transition-all uppercase tracking-wider flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"}
                    {!loading && <ChevronRight size={16} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}