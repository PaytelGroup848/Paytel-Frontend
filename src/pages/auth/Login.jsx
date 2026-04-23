import { useState } from "react";
import {motion} from "framer-motion";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles, ArrowRight, Cloud, Shield, Zap } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useLogin } from "../../hooks/useAuth";

// ------------------------------
// 🌥️ Enhanced Left Panel
// ------------------------------
const CloudVisual = () => {
  return (
    <div className="relative h-full w-full bg-[#0a0f1d] flex flex-col justify-between p-10">
      <div className="absolute top-[-15%] right-[-10%] w-80 h-80 bg-indigo-600/30 blur-[90px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">cloude data</span>
        </div>

        <div className="space-y-5">
          <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
            Deploy with <br />
            <span className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">Confidence.</span>
          </h2>
          <p className="text-slate-400 text-base max-w-[300px] leading-relaxed">
            Scalable infrastructure with enterprise-grade security and 99.99% uptime SLA.
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        {[
          { icon: Shield, text: "Advanced DDoS Protection", color: "text-blue-400" },
          { icon: Zap, text: "NVMe Storage on all Nodes", color: "text-amber-400" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
            <item.icon className={`h-5 w-5 ${item.color}`} />
            <span className="text-sm text-slate-200 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    <div className="min-h-screen   rounded-2xl w-full flex items-center justify-center bg-slate-50 p-6 md:p-8">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl h-[650px] bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row border border-slate-100"
      >
        <div className="hidden md:block md:w-[45%] lg:w-[42%] h-full">
          <CloudVisual />
        </div>

        <div className="flex-1 h-full bg-white p-10 md:p-14 lg:p-20 flex flex-col justify-center border-l border-slate-100">
          <div className="max-w-[380px] mx-auto w-full">
            <header className="mb-10">
             
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tighter">Sign In to Continue</h1>
              <p className="text-slate-500 text-base mt-2">Access your deployments and settings.</p>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-5">
                <Input
                  label="Email"
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
              </div>

              <div className="flex justify-end pt-1">
                {/* Error yahan tha: closing tag </div> ko </Link> kiya hai */}
                <Link to="/forgot-password" size="sm" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={login.isPending}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-sm"
              >
                {!login.isPending && (
                  <>
                    Sign In →
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-slate-500 mt-10">
                Create an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create One →</Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}