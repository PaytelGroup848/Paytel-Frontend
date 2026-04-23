import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Sparkles, ArrowRight, Cloud, Shield, Zap } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useRegister } from "../../hooks/useAuth";

// ------------------------------
// 🌥️ Left Side Banner
// ------------------------------
const RegisterBanner = () => {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-900 to-indigo-950 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop"
        alt="Cloud Platform"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/50" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md">
            <Cloud className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-bold">CloudData</span>
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold leading-tight">
            Join the future of
            <br />
            <span className="text-blue-200">cloud infrastructure</span>
          </h2>
          <p className="text-[11px] text-white/80 max-w-xs">
            Get started with enterprise-grade tools, global scalability, and 24/7 support.
          </p>
          <div className="flex flex-wrap gap-1 pt-2">
            {[
              { icon: Shield, label: "Secure by default" },
              { icon: Zap, label: "Blazing fast" },
              { icon: Cloud, label: "99.99% uptime" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium"
              >
                <item.icon className="h-2.5 w-2.5 text-blue-300" />
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-2 overflow-hidden">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side - Banner */}
          <div className="hidden lg:block">
            <RegisterBanner />
          </div>

          {/* Right Side - Registration Form (no scroll) */}
          <div className="flex flex-col justify-center p-5 md:p-6">
            <div className="w-full max-w-md mx-auto">
              {/* Header */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-3"
              >
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 rounded-full text-[9px] font-bold uppercase tracking-wider text-indigo-600 border border-indigo-100 mb-2">
                  <Sparkles size={10} />
                  Get Started
                  <Sparkles size={10} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create an <span className="text-indigo-600">account</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Join CloudData and start managing your cloud effortlessly.
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-2.5">
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

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="9998887776"
                  value={form.phone}
                  onChange={onChange}
                  error={errors.phone}
                  icon={Phone}
                  autoComplete="phone"
                />

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

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    loading={register.isPending}
                    className="
                      w-full py-2 rounded-xl font-semibold text-sm
                      bg-gradient-to-r from-indigo-600 to-blue-600
                      hover:from-indigo-700 hover:to-blue-700
                      text-white shadow-md shadow-indigo-200
                      transition-all duration-200
                      flex items-center justify-center gap-2
                    "
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

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-[10px]">
                    <span className="bg-white px-3 text-slate-500">Already have an account?</span>
                  </div>
                </div>

                <div className="text-xs text-center text-slate-600">
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-700 transition hover:underline"
                  >
                    Sign in instead
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] text-slate-400 mt-2 uppercase tracking-widest">
          CloudData • Secure Cloud Platform
        </p>
      </motion.div>
    </div>
  );
}