import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  ArrowRight,
  Cloud,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useRegister } from "../../hooks/useAuth";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export const RegisterBanner = () => {
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
        <div className="relative flex items-center justify-center w-full h-12">
          <motion.img
            src="\Cloudedata.svg"
            alt="Cloude Data Logo"
            className="
      w-full h-12
      object-contain
      drop-shadow-xl
      group-hover:scale-110
      transition-transform duration-300
    "
            animate={{ y: [0, -2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
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
              Enterprise-grade tools, global scalability, and world-class
              support — from day one.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 text-center"
              >
                <div className="text-base font-bold text-white">{s.value}</div>
                <div className="text-[10px] text-white/60 mt-0.5">
                  {s.label}
                </div>
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

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";
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
    let value = e.target.value;
    // if (e.target.name === "phone")
    //   value = value.replace(/\D/g, "").slice(0, 10); // sirf digits, max 10
    if (e.target.name === "name") value = value.replace(/[^a-zA-Z\s]/g, ""); // sirf letters & spaces
    setForm((s) => ({ ...s, [e.target.name]: value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!form.name) nextErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s]+$/.test(form.name))
      nextErrors.name = "Name can only contain letters";

    if (!form.phone) nextErrors.phone = "Phone number is required";
    else if (form.phone.length < 8)
      nextErrors.phone = "Enter a valid phone number";

    if (!form.email) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email address";

    if (!form.password) nextErrors.password = "Password is required";
    else if (form.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters";

    if (!form.confirmPassword)
      nextErrors.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password)
      nextErrors.confirmPassword = "Passwords do not match";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      const data = await register.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone.replace(/^\+\d{1,2}/, ""),
        password: form.password,
      });

      toast.success("OTP sent to your email!");
      navigate("/verify-otp", {
        state: {
          userId: data.userId,
          email: data.email,
          from: location.state?.from,
          pendingOrder: location.state?.pendingOrder,
        },
      });
    } catch (_) {}
  };

  return (
    <div>
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
                <h2 className="text-2xl font-bold text-slate-900">
                  Create an <span className="text-indigo-600">account</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Join CloudData and start managing your cloud effortlessly.
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Row 1 — Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="w-full z-50">
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Phone Number
                    </label>
                    <PhoneInput
                      defaultCountry="in"
                      forceDialCode
                      value={form.phone}
                      onChange={(phone) => {
                        setForm((s) => ({ ...s, phone }));
                        setErrors((s) => ({ ...s, phone: "" }));
                      }}
                      style={{
                        "--react-international-phone-border-radius": "0.75rem",
                        "--react-international-phone-border-color": errors.phone
                          ? "#f87171"
                          : "#e2e8f0",
                        "--react-international-phone-background-color":
                          "#ffffff",
                        "--react-international-phone-text-color": "#1e293b",
                        "--react-international-phone-selected-dropdown-item-background-color":
                          "#eef2ff",
                        "--react-international-phone-font-size": "14px",
                        "--react-international-phone-height": "44px",
                        width: "100%",
                      }}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2 — Email */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Password strength bar */}
                {form.password && (
                  <div className="flex items-center gap-2 -mt-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          form.password.length >= (i + 1) * 3
                            ? form.password.length >= 10
                              ? "bg-green-400"
                              : form.password.length >= 7
                                ? "bg-amber-400"
                                : "bg-red-400"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-textMuted shrink-0">
                      {form.password.length >= 10
                        ? "Strong"
                        : form.password.length >= 7
                          ? "Medium"
                          : "Weak"}
                    </span>
                  </div>
                )}

                {/* Submit */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-1"
                >
                  <Button
                    type="submit"
                    loading={register.isPending}
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {!register.isPending && (
                      <>
                        <span>Create Account</span>
                      </>
                    )}
                    {register.isPending && (
                      <>
                        <span>Creating account...</span>
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-textMuted">
                    Already have an account?
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <p className="text-xs text-center">
                  <Link
                    to="/login"
                    state={{ from }}
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition hover:underline"
                  >
                    Sign in instead →
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
