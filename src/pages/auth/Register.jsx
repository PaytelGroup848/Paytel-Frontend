import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Sparkles, ArrowRight, Cloud, Shield, Zap, Globe } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useRegister } from "../../hooks/useAuth";

// ----------------------------------------
// 🌥️ Left Side Banner
// ----------------------------------------
const RegisterBanner = () => {
  const stats = [
    { value: "99.99%", label: "Uptime SLA" },
    { value: "180+", label: "Regions" },
    { value: "24/7", label: "Support" },
  ];

  const badges = [
    { icon: Shield, label: "Secure by default" },
    { icon: Zap, label: "Blazing fast" },
    { icon: Globe, label: "Global CDN" },
  ];

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-900 to-indigo-950 overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop"
        alt="Cloud Platform"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/60 to-blue-950/90" />

      {/* Decorative blobs */}
      <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 rounded-full bg-blue-400/20 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-7 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/10 shadow-lg">
            <Cloud className="h-4 w-4 text-blue-200" />
          </div>
          <span className="text-base font-bold tracking-tight">CloudData</span>
        </div>

        {/* Main copy */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold leading-snug">
              Join the future of
              <br />
              <span className="text-blue-300">cloud infrastructure</span>
            </h2>
            <p className="text-xs text-white/70 mt-2 max-w-[220px] leading-relaxed">
              Enterprise-grade tools, global scalability, and world-class support — from day one.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 text-center">
                <div className="text-base font-bold text-white">{s.value}</div>
                <div className="text-[10px] text-white/60 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {badges.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-medium"
              >
                <item.icon className="h-3 w-3 text-blue-300" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------
// 🔑 Register Page
// ----------------------------------------
export default function Register() {
  const navigate = useNavigate();
  const register = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA:", form);

    const nextErrors = {};

    if (!form.name) nextErrors.name = "Name is required";
    if (!form.email) nextErrors.email = "Email is required";
    if (!form.phone) nextErrors.phone = "Phone number is required";
    if (!form.password) nextErrors.password = "Password is required";

    if (form.phone && form.phone.length < 10)
      nextErrors.phone = "Phone number must be at least 10 digit";

    if (form.password && form.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters";

    if (form.confirmPassword !== form.password)
      nextErrors.confirmPassword = "Passwords must match";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      await register.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (_) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 overflow-auto">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

          {/* ── Left Banner ── */}
          <div className="hidden lg:block lg:w-[38%] min-h-[520px]">
            <RegisterBanner />
          </div>

          {/* ── Right Form ── */}
          <div className="flex-1 flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-8">
            <div className="w-full max-w-lg mx-auto">

              {/* Header */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-5"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 border border-indigo-100 mb-2.5">
                  <Sparkles size={10} />
                  Get Started Free
                  <Sparkles size={10} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Create an <span className="text-indigo-600">account</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Join CloudData and start managing your cloud effortlessly.
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-3">

                {/* Row 1 — Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={onChange}
                    error={errors.name}
                    icon={User}
                    autoComplete="name"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="9998887776"
                    value={form.phone}
                    onChange={onChange}
                    error={errors.phone}
                    icon={Phone}
                    autoComplete="tel"
                  />
                </div>

                {/* Row 2 — Email (full width) */}
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                  icon={Mail}
                  autoComplete="email"
                />

                {/* Row 3 — Password + Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    error={errors.password}
                    icon={Lock}
                    autoComplete="new-password"
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword}
                    icon={Lock}
                    autoComplete="new-password"
                  />
                </div>

                {/* Terms hint */}
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  By creating an account you agree to our{" "}
                  <span className="text-indigo-500 cursor-pointer hover:underline">Terms of Service</span>{" "}
                  and{" "}
                  <span className="text-indigo-500 cursor-pointer hover:underline">Privacy Policy</span>.
                </p>

                {/* Submit */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    loading={register.isPending}
                    className="w-full py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {!register.isPending && (
                      <>
                        Create Account
                        <ArrowRight size={13} />
                      </>
                    )}
                    {register.isPending && "Creating account..."}
                  </Button>
                </motion.div>

                {/* Divider + sign in link */}
                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-[11px]">
                    <span className="bg-white px-3 text-slate-500">Already have an account?</span>
                  </div>
                </div>

                <p className="text-xs text-center text-slate-600">
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-700 transition hover:underline"
                  >
                    Sign in instead
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
          CloudData • Secure Cloud Platform
        </p>
      </motion.div>
    </div>
  );
}