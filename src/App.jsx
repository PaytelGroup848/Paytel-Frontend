import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import { api } from './services/api';
import Spinner from './components/ui/Spinner';
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
import Plans from "./pages/plans/Plan";
import BillingHistory from './pages/billing/BillingHistory';
import Wordpress_Page from './pages/websites/wordpress/WordPress_Page';
import WordpressNew from './pages/websites/wordpress/WordpressNew';
import PaidWordpress from './pages/websites/wordpress/PaidWordpress';
import Home from './pages/dashboard/Home';
import WebsiteDashboard from './pages/websites/wordpress/websiteDashboard';
import DomainEnter from './pages/websites/wordpress/domainEnter';
import HTML_Page from './pages/websites/html/html_page';
import PHP_Page from './pages/websites/php/php_page';
import NodeJS_Page from './pages/websites/nodejs/nodejs';
import SuperAdminLayout from './pages/superadmin/SuperAdminLayout';
import Servers from './pages/superadmin/Servers';
import AdminInstances from './pages/superadmin/Instances';
import FilesPage from './pages/websites/wordpress/FilesPage';
import DatabasePage from './pages/websites/wordpress/DatabasePage';
import VPS_Page from './pages/vps/VPS_Page';
import VPSPricing from './pages/vps/VPS_Page';
import  VPSDashboard from './pages/vps/vps_paid';
import VPSOverviewPage from './pages/vps/slidebar/vps_overview';
import VPSDocumentation from './pages/vps/slidebar/support/docs';
import BackupManager from './pages/vps/slidebar/BackupManager';
import OSPanel from './pages/vps/slidebar/Os_panel';
import {useMe} from "./hooks/useAuth";


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
  const authBootstrapped = useAuthStore((s) => s.authBootstrapped);
  const location = useLocation();

  if (!authBootstrapped) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="flex items-center gap-3 text-textMuted">
          <Spinner />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }
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
  const setAuth = useAuthStore((s) => s.setAuth);
  const setAuthBootstrapped = useAuthStore((s) => s.setAuthBootstrapped);
  const clearAuth = useAuthStore((s) => s.clearAuth);


  useEffect(() => {
    let alive = true;

    const bootstrap = async () => {
      try {
        const refreshRes = await api.post('/auth/refresh-token');
        const newToken = refreshRes.data?.data?.accessToken;
        const user = refreshRes.data?.data?.user;

        if (alive && newToken) setAuth({ user, accessToken: newToken });
        else if (alive) clearAuth();
      } catch {
        if (alive) clearAuth();
      } finally {
        if (alive) setAuthBootstrapped(true);
      }
    };

    bootstrap();
    return () => {
      alive = false;
    };
  }, [clearAuth, setAuth, setAuthBootstrapped]);

  return (
    <Routes>
      <Route path="/" element={<Navigate 
      // to="/dashboard"
      to="/home"
      replace />} />

      {/* Public (no auth) */}
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected */}
      <Route
        // element={
        // <ProtectedRoute />
        // }
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
          <Route path="/plans" element={<Plans/>}/>
          <Route path="/billing/history" element={<BillingHistory/>}/>
          <Route path="websites/wordpress" element  = {<Wordpress_Page/>} />
          <Route path="websites/wordpress/new" element={<WordpressNew />} />
          <Route path="websites/wordpress/paid" element={<PaidWordpress />} />
          <Route path ="wordpress/websiteDashboard" element={<WebsiteDashboard/>} />
          <Route path ="wordpress/websitedashboard/:id" element={<WebsiteDashboard/>} />
          <Route path ="wordpress/domainEnter" element={<DomainEnter/>} />
          <Route path ="wordpress/:id/files" element={<FilesPage/>} />
          <Route path ="wordpress/:id/database" element={<DatabasePage/>} />
          <Route path ="websites/html" element  = {<HTML_Page/>} /> 
          <Route path ="websites/php" element  = {<PHP_Page/>} />
          <Route path ="websites/nodejs" element  = {<NodeJS_Page/>} />
          <Route path ="vps" element  = {<VPSPricing/>} />  
          <Route path ="vps/paid"  element ={< VPSDashboard/>} />  
          <Route path ="vps/vps_overview"  element ={< VPSOverviewPage/>} />   
          <Route path = "/vps/support/docs" element ={<VPSDocumentation/>} />
          <Route path ="/vps/backupmgr" element = {<BackupManager/>} />  
          <Route path = "/vps/OSPanel" element = {<OSPanel/>} />
          <Route path ="/home" element ={<Home/>} />
          {/* <Route path="websites/wordpress/:id" element={<WordPress_Page />} /> */}
        </Route>

       
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route path="servers" element={<Servers />} />
          <Route path="instances" element={<AdminInstances />} />
        </Route>
        
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
