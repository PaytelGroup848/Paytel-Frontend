import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Cloud, Shield, Zap, Globe } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useRegister } from "../../hooks/useAuth";
import { getUserIp } from "../../utils/ipUtils";

const handleGoogleAuth = async () => {
  // Get real client IP
  let clientIp = null;
  try {
    clientIp = await getUserIp();

    // Save IP in localStorage
    if (clientIp) {
      localStorage.setItem("oauth_client_ip", clientIp);
    }
  } catch (error) {
    console.error("[GoogleAuth] Failed to get IP:", error);
  }

  // Redirect to Google OAuth
  const authUrl = `${import.meta.env.VITE_AUTH_URL || "http://localhost:3001"}/api/auth/google`;
  window.location.href = authUrl;
};

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";
  const register = useRegister();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [clientIp, setClientIp] = useState(null);
  const [isGettingIp, setIsGettingIp] = useState(true);

  // Get user's real IP on component mount
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const ip = await getUserIp();
        setClientIp(ip);
      } catch (error) {
        console.error("[Register] Failed to get IP:", error);
      } finally {
        setIsGettingIp(false);
      }
    };
    fetchIp();
  }, []);

  const onChange = (e) => {
    let value = e.target.value;
    setForm((s) => ({ ...s, [e.target.name]: value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!form.email) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email address";

    if (!form.password) nextErrors.password = "Password is required";
    else if (form.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      const data = await register.mutateAsync({
        email: form.email,
        password: form.password,
        clientIp: clientIp, // Send the real client IP
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
        className="w-full max-w-5xl"
      >
        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row border border-slate-100 md:h-[600px]">
          <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 lg:px-16 border-l border-slate-100">
            <div className="w-full max-w-lg mx-auto">
              <div className="relative flex items-center justify-center w-full h-15">
                <motion.img
                  src="/Cloudedata.svg"
                  alt="Cloude Data Logo"
                  className="w-full h-15 mb-15 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <h1 className="text-[28px] text-center mb-8 font-extrabold text-slate-800 tracking-tighter leading-tight">
                Create an <span className="text-indigo-600">account</span>
              </h1>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="enter email"
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                  icon={Mail}
                  autoComplete="email"
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="enter password"
                  value={form.password}
                  onChange={onChange}
                  error={errors.password}
                  icon={Lock}
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  loading={register.isPending}
                  className="w-full cursor-pointer py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {register.isPending
                    ? "Creating account..."
                    : "Create Account →"}
                </Button>

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

                <p className="text-sm text-center text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Sign in →
                  </Link>
                </p>

                <p className="text-[11px] text-center text-slate-400 leading-relaxed px-2">
                  By creating an account or continuing with Google, you{" "}
                  <br></br>
                  agree to our{" "}
                  <a
                    href="https://cloudedata.com/term-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-500 hover:text-indigo-700 hover:underline underline-offset-2 transition-colors"
                  >
                    Terms &amp; Conditions
                  </a>{" "}
                  as mentioned on our landing page.
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
