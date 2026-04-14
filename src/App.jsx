import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuthStore } from './store/authStore';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import { pageTransition } from './animations/variants';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import ManageHosting from './pages/hosting/ManageHosting';
import HostingPlans from './pages/hosting/HostingPlans';
import HostingDetails from './pages/hosting/HostingDetails';
import Domains from './pages/domains/Domains';
import DomainSearch from './pages/domains/DomainSearch';
import ManageDomain from './pages/domains/ManageDomain';
import Billing from './pages/billing/Billing';
import Invoices from './pages/billing/Invoices';
import PaymentMethods from './pages/billing/PaymentMethods';
import Settings from './pages/settings/Settings';

const PageShell = ({ title, subtitle }) => (
  <motion.div
    className="max-w-5xl mx-auto"
    initial={pageTransition.initial}
    animate={pageTransition.animate}
    exit={pageTransition.exit}
  >
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <div className="text-xl font-semibold text-textPrimary">{title}</div>
      {subtitle ? <div className="mt-2 text-sm text-textMuted">{subtitle}</div> : null}
    </div>
  </motion.div>
);

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
};

const AuthRoutes = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

const AppRoutes = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public (no auth) */}
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected */}
      <Route
      //  element={<ProtectedRoute />}
       >
        <Route element={<AppRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hosting" element={<ManageHosting />} />
          <Route path="/hosting/plans" element={<HostingPlans />} />
          <Route path="/hosting/:id" element={<HostingDetails />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/domains/search" element={<DomainSearch />} />
          <Route path="/domains/:id" element={<ManageDomain />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing/invoices" element={<Invoices />} />
          <Route path="/billing/payment-methods" element={<PaymentMethods />} />
          <Route path="/settings/*" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
