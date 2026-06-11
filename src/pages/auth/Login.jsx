import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Cloud,
  Shield,
  Zap,
  ArrowRight,
  Globe,
} from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useLogin } from "../../hooks/useAuth";
import { usePendingOrderRestore } from '../../hooks/usePendingOrderRestore';

// ----------------------------------------
// 🌑 Left Dark Panel
// ----------------------------------------
const CloudVisual = () => {
  const features = [
    {
      icon: Shield,
      text: "Advanced DDoS Protection",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Zap,
      text: "NVMe Storage on all Nodes",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: Globe,
      text: "180+ Global Edge Locations",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  const stats = [
    { value: "99.99%", label: "Uptime" },
    { value: "180+", label: "Regions" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="relative h-full w-full bg-[#080d1a] flex flex-col justify-between p-8 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-[-20%] right-[-15%] w-96 h-96 bg-indigo-600/25 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-15%] w-72 h-72 bg-blue-500/20 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-40 h-40 bg-violet-600/15 blur-[70px] rounded-full pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <div className="relative flex items-center justify-center w-full h-12">
        <motion.img
          src="/Cloudedata.svg"
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

      {/* Headline + stats */}
      <div className="relative z-10 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-[11px] font-semibold tracking-wide uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Enterprise Cloud
          </div>
          <h2 className="text-3xl font-extrabold text-white leading-[1.1] tracking-tight">
            Deploy with <br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Confidence.
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-[260px] leading-relaxed">
            Scalable infrastructure with enterprise-grade security and 99.99%
            uptime SLA.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/[0.08] px-3 py-2.5 text-center"
            >
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="relative z-10 space-y-2.5">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-3.5 bg-white/5 border border-white/[0.08] px-4 py-3 rounded-xl backdrop-blur-sm"
          >
            <div className={`p-1.5 rounded-lg ${item.bg}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
            <span className="text-sm text-slate-200 font-medium">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------
//  Login Page
// ----------------------------------------
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/home";
  const login = useLogin();
  const { restoreAndRedirect, getPendingOrder } = usePendingOrderRestore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.email) nextErrors.email = "Required";
    if (!form.password) nextErrors.password = "Required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      const res = await login.mutateAsync({ email: form.email, password: form.password });
      const role = res?.user?.role;

      // Check for pending order returnPath
      const pending = getPendingOrder();
      if (pending?.returnPath) {
        navigate(pending.returnPath, { replace: true });
        return;
      }

      // Try to restore other pending order types if returnPath not present
      const restored = restoreAndRedirect();
      if (restored) return;

      if (role === "superadmin") {
        navigate("/superadmin/servers");
      } else if (role === "support") {
        navigate("/superadmin/support");
      } else {
        navigate(from);
      }
    } catch (_) {}
  };

  return (
    <div>
      {location.state?.pendingOrder && (
        <div className="max-w-5xl mx-auto mb-6 flex items-center gap-3 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-3">
          <span className="text-xl">🖥️</span>
          <div>
            <p className="text-indigo-800 font-semibold text-xs">Your order is saved!</p>
            <p className="text-indigo-600 text-xs">
              {location.state?.message || 'Sign in to complete your order.'}
            </p>
          </div>
        </div>
      )}
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl"
      >
        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row border border-slate-100 md:h-[600px]">
          {/* ── Left dark panel ── */}
          <div className="hidden md:block md:w-[44%]">
            <CloudVisual />
          </div>

          {/* ── Right form panel ── */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 lg:px-16 border-l border-slate-100">
            <div className="max-w-[360px] mx-auto w-full">
              {/* Header */}
              <motion.header
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 border border-indigo-100 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Secure Access
                </div>
                <h1 className="text-[28px] font-extrabold text-slate-950 tracking-tighter leading-tight">
                  Sign in to <span className="text-indigo-600">continue</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1.5">
                  Access your deployments and settings.
                </p>
              </motion.header>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="admin@cloudedata.io"
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                  icon={Mail}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={onChange}
                  error={errors.password}
                  icon={Lock}
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-500">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-1"
                >
                  <Button
                    type="submit"
                    loading={login.isPending}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    {!login.isPending && <>Sign In →</>}
                    {login.isPending && "Authenticating..."}
                  </Button>
                </motion.div>

                <p className="text-center text-xs text-slate-500 pt-1">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    state={{ from }}
                    className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition"
                  >
                    Create one →
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
