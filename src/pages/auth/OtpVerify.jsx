import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useVerifyOtp, useResendOtp } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";

import { usePendingOrderRestore } from "../../hooks/usePendingOrderRestore";

export default function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, email, from } = location.state || {};
  const setAuth = useAuthStore((s) => s.setAuth);
  const { restoreAndRedirect, getPendingOrder } = usePendingOrderRestore();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  // Redirect if no userId
  useEffect(() => {
    if (!userId) navigate("/register");
  }, [userId, navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) inputRefs[index + 1].current?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pasted.length === 4) {
      setOtp(pasted.split(""));
      inputRefs[3].current?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }
    try {
      const data = await verifyOtp.mutateAsync({ userId, otp: otpString });

      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
      });

      toast.success("Email verified! Welcome to CloudeData");

      const pending = getPendingOrder();
      if (pending?.returnPath) {
        navigate(pending.returnPath, { replace: true });
      } else {
        const restored = restoreAndRedirect();
        if (!restored) {
          navigate(from || "/home");
        }
      }
    } catch (err) {
      setShake(true);
      setOtp(["", "", "", ""]);
      inputRefs[0].current?.focus();
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleResend = async () => {
    await resendOtp.mutateAsync({ userId });
    setCountdown(60);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    inputRefs[0].current?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Right: OTP Form */}
          <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10">
            <div className="w-full max-w-sm mx-auto">
              {/* Icon */}
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-sky-100">
                <Mail className="w-8 h-8 text-sky-500" />
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
                Verify your email
              </h2>
              <p className="text-slate-500 text-sm text-center mb-1">
                We sent a 4-digit code to
              </p>
              <p className="text-sky-500 font-bold text-sm text-center mb-8 truncate">
                {email}
              </p>

              {/* OTP Boxes */}
              <motion.div
                animate={shake ? { x: [-8, 8, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="flex justify-center gap-3 mb-8"
                onPaste={handlePaste}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-14 h-14 text-2xl font-bold text-center rounded-xl border-2 outline-none transition-all duration-200 
                      ${
                        digit
                          ? "border-sky-500 bg-sky-50 text-sky-700"
                          : "border-slate-200 hover:border-sky-300 text-slate-800"
                      } 
                      focus:border-sky-500 focus:bg-sky-50 focus:ring-2 focus:ring-sky-100`}
                  />
                ))}
              </motion.div>

              {/* Verify Button */}
              <motion.button
                onClick={handleVerify}
                disabled={verifyOtp.isPending || otp.join("").length !== 4}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg shadow-sky-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
              >
                {verifyOtp.isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Email →"
                )}
              </motion.button>

              {/* Resend */}
              <div className="text-center mb-4">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    disabled={resendOtp.isPending}
                    className="text-sky-500 hover:text-sky-600 text-sm font-semibold flex items-center gap-1.5 mx-auto transition"
                  >
                    <RefreshCw
                      size={14}
                      className={resendOtp.isPending ? "animate-spin" : ""}
                    />
                    {resendOtp.isPending ? "Sending..." : "Resend OTP"}
                  </button>
                ) : (
                  <p className="text-slate-400 text-sm">
                    Resend OTP in{" "}
                    <span className="text-sky-500 font-bold">
                      0:{countdown.toString().padStart(2, "0")}
                    </span>
                  </p>
                )}
              </div>

              {/* Back link */}
              <div className="text-center">
                <Link
                  to="/register"
                  className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1 justify-center transition"
                >
                  <ArrowLeft size={12} />
                  Back to Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
