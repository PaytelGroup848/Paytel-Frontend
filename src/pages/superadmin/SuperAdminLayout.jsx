import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import SuperAdminSidebar from "./SuperAdminSidebar";

export default function SuperAdminLayout() {
  const user = useAuthStore((s) => s.user);
  const authBootstrapped = useAuthStore((s) => s.authBootstrapped);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!authBootstrapped) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-600 text-sm">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role !== "superadmin" && user?.role !== "support") {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar stays fixed; only main scrolls */}
      <SuperAdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
