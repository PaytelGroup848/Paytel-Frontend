import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Cloud, Shield, Zap, Globe } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useLogin } from "../../hooks/useAuth";
import { usePendingOrderRestore } from "../../hooks/usePendingOrderRestore";

const handleGoogleAuth = () => {
  window.location.href = `${import.meta.env.VITE_AUTH_URL || "http://localhost:3001"}/api/auth/google`;
};

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
      const res = await login.mutateAsync({
        email: form.email,
        password: form.password,
      });
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
    } catch (err) {
      const response = err?.response?.data;
      if (response?.code === "USE_GOOGLE_AUTH") {
        toast.error(
          "This account uses Google Sign-In. Please click 'Continue with Google' below.",
        );
        return;
      }
      if (response?.code === "EMAIL_NOT_VERIFIED") {
        return;
      }
    }
  };

  return (
    <div>
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl"
      >
        <div className="bg-white rounded-[28px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row border border-slate-100 md:h-[600px]">
          <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 lg:px-16 border-l border-slate-100">
            <div className="max-w-[360px] mx-auto w-full">
              <div className="relative flex items-center justify-center w-full h-12">
                <motion.img
                  src="/Cloudedata.svg"
                  alt="Cloude Data Logo"
                  className="
      w-full h-15 mb-15
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

              <h1 className="text-[28px] text-center mb-8 font-extrabold text-slate-800 tracking-tighter leading-tight">
                Sign in to <span className="text-indigo-600">continue</span>
              </h1>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="admin@cloudedata.com"
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

                {/* <div className="flex items-center justify-between pt-1">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div> */}

                {/* Submit */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-1"
                >
                  <Button
                    type="submit"
                    loading={login.isPending}
                    className="w-full cursor-pointer py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    {!login.isPending && <>Sign In →</>}
                    {login.isPending && "Authenticating..."}
                  </Button>
                </motion.div>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-slate-400 font-medium">
                      OR
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full cursor-pointer flex items-center justify-center gap-3 py-2.5 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path
                      fill="#FFC107"
                      d="M43.6 20H24v8h11.3C33.7 33.2 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.2 4 9.4 8.4 6.3 14.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.3 0-9.7-2.8-11.3-7H6.3C9.4 37.8 16.1 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.7-.1-4z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <p className="text-center text-sm text-slate-500 pt-1">
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
