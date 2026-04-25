import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Cloud, Shield, Zap, ArrowRight, Globe } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useLogin } from "../../hooks/useAuth";

// ----------------------------------------
// 🌑 Left Dark Panel
// ----------------------------------------
const CloudVisual = () => {
  const features = [
    { icon: Shield, text: "Advanced DDoS Protection", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Zap, text: "NVMe Storage on all Nodes", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Globe, text: "180+ Global Edge Locations", color: "text-emerald-400", bg: "bg-emerald-500/10" },
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
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
          <Cloud className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-black tracking-tighter text-white">cloude data</span>
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
            Scalable infrastructure with enterprise-grade security and 99.99% uptime SLA.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/[0.08] px-3 py-2.5 text-center">
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
            <span className="text-sm text-slate-200 font-medium">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------
// 🔑 Login Page
// ----------------------------------------
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";
  const login = useLogin();

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
      await login.mutateAsync({ email: form.email, password: form.password });
      navigate(from);
    } catch (_) {}
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 md:p-8">
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
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-1">
                  <Button
                    type="submit"
                    loading={login.isPending}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    {!login.isPending && (
                      <>
                        Sign In
                        <ArrowRight size={14} />
                      </>
                    )}
                    {login.isPending && "Authenticating..."}
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100" />
                  </div>
                  <div className="relative flex justify-center text-[11px]">
                    <span className="bg-white px-3 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* SSO */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                  >
                    <svg className="h-3.5 w-3.5" fill="#24292F" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.876.118 3.176.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.222 0 1.603-.015 2.896-.015 3.286 0 .322.216.698.83.578C20.565 22.092 24 17.592 24 12c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500 pt-1">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition">
                    Create one →
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
          CloudData • Enterprise Cloud Platform
        </p>
      </motion.div>
    </div>
  );
}