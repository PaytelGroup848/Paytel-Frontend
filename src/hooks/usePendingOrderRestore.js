import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getPendingOrder, clearPendingOrder } from "../utils/pendingOrder";

// Call this hook in the component that runs after auth success
// (OtpVerify success + Login success)
export const usePendingOrderRestore = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const restoreAndRedirect = () => {
    const pending = getPendingOrder();
    if (!pending) return false;

    if (pending.returnPath) {
      navigate(pending.returnPath, { replace: true });
      return true;
    }

    // Clear after fetching so it doesn't loop
    clearPendingOrder();

    switch (pending.service) {
      case "vps":
        // Navigate to /vps with state so ConfigurationModal auto-opens
        navigate("/vps", {
          state: {
            restoreOrder: pending,
            autoOpenModal: true,
          },
        });

        break;

      case "wordpress":
        navigate("/wordpress/domainEnter", {
          state: { restoreOrder: pending },
        });

        break;

      case "php":
        navigate("/php-hosting", {
          state: { restoreOrder: pending, autoOpenModal: true },
        });

        break;

      case "email":
        navigate("/emails", {
          state: { restoreOrder: pending, autoOpenModal: true },
        });

        break;

      default:
        navigate("/home");
    }

    return true;
  };

  return { restoreAndRedirect, getPendingOrder };
};
