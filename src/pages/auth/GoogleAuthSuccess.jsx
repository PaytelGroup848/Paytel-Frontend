import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { getPendingOrder } from "../../utils/pendingOrder";
import toast from "react-hot-toast";

export default function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const userStr = searchParams.get("user");

    console.log("=== GoogleAuthSuccess Debug ===");
    console.log(
      "accessToken:",
      accessToken ? `${accessToken.substring(0, 20)}...` : "MISSING",
    );
    console.log("userStr:", userStr ? "PRESENT" : "MISSING");

    if (!accessToken || !userStr) {
      console.error("Missing accessToken or userStr");
      toast.error("Google sign-in failed. Please try again.");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      console.log("User parsed:", user.email);

      setAuth({
        user,
        accessToken,
        refreshToken: null,
      });
      toast.success(`Welcome, to Cloudedata ${user.name || user.email}! `);

      const pending = getPendingOrder();
      if (pending?.returnPath) {
        navigate(pending.returnPath, { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (e) {
      console.error("GoogleAuthSuccess error:", e);
      toast.error("Something went wrong. Please try again.");
      navigate("/login");
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Completing sign-in...</p>
      </div>
    </div>
  );
}
