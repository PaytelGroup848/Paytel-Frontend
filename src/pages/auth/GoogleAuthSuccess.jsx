import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { getPendingOrder } from "../../utils/pendingOrder";
import { api } from "../../services/api";
import toast from "react-hot-toast";

export default function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const userStr = searchParams.get("user");
    const redirectUrl = searchParams.get("redirect") || "/home";

    

    if (!accessToken || !userStr) {
      toast.error("Google sign-in failed. Please try again.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(decodeURIComponent(userStr));
  

    // Get IP from localStorage
    const clientIp = localStorage.getItem("oauth_client_ip");
 

    // First, update the user's IP in database via API call
    if (clientIp && user.id) {
      
      api
        .patch(`/auth/users/${user.id}/ip`, { clientIp })
        .then(() => {
        
        })
        .catch((err) => {
          console.error("Failed to update IP:", err);
        });

      // Clear localStorage
      localStorage.removeItem("oauth_client_ip");
    }

    setAuth({
      user,
      accessToken,
      refreshToken: null,
    });

    toast.success(`Welcome, ${user.name || user.email}! `);

    const pending = getPendingOrder();
    if (pending?.returnPath) {
      navigate(pending.returnPath, { replace: true });
    } else {
      navigate(redirectUrl, { replace: true });
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
