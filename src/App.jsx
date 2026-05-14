
import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import ManageHosting from './pages/hosting/ManageHosting';
import HostingPlans from './pages/hosting/HostingPlans';
import HostingDetails from './pages/hosting/HostingDetails';
import Domains from './pages/domains/Domains';
import DomainSearch from './pages/domains/DomainSearch';
import ManageDomain from './pages/domains/ManageDomain';
import Settings from './pages/settings/Settings';
import Plans from "./pages/plans/Plan";
import Wordpress_Page from './pages/websites/wordpress/WordPress_Page';
import WordpressNew from './pages/websites/wordpress/WordpressNew';
import PaidWordpress from './pages/websites/wordpress/PaidWordpress';
import Home from './pages/dashboard/Home';
import WebsiteDashboard from './pages/websites/wordpress/websiteDashboard';
import DomainEnter from './pages/websites/wordpress/domainEnter';
import PHP_Page from './pages/websites/php/php_page';
import PaidPhpDashboard from './pages/websites/php/PaidPhp';
import NodeJS_Page from './pages/websites/nodejs/nodejs';
import SuperAdminLayout from './pages/superadmin/SuperAdminLayout';
import Servers from './pages/superadmin/Servers';
import AdminInstances from './pages/superadmin/Instances';
import FilesPage from './pages/websites/wordpress/FilesPage';
import DatabasePage from './pages/websites/wordpress/DatabasePage';
import VpsPlans from './pages/vps/VpsPlans';
import VPSDocumentation from './pages/vps/slidebar/docs';
import BackupManager from './pages/vps/slidebar/BackupManager';
import SnapShot from './pages/vps/slidebar/SnapShot';
import OSPanel from './pages/vps/slidebar/Os_panel';
import VpsSettings from "./pages/vps/slidebar/setting";
import firewall from "./pages/vps/slidebar/security/firewall";
import GetHelp from "./pages/vps/slidebar/support/GetHelp";
import AnalyticsPage from './pages/wordpress/AnalyticsPage';
import BackupsPage from './pages/wordpress/BackupsPage';
import { useMe } from "./hooks/useAuth";
import VPSDashboard from './pages/vps/vps_paid';
import VpsDashboard from "./pages/vps/slidebar/vpsOverview";
import { EmailPlanProvider } from './pages/Emails/EmailPlanContext';
import EmailsPage from "./pages/Emails/Emails";
import EmailMailboxPage from './pages/Emails/EmailMailboxPage';
import EmailPlansPage from './pages/Emails/EmailPlan';
import ForwardersPage from './pages/Emails/EmailForward';
import AliasesPage from './pages/Emails/EmailAlias';
import  AutoReplyPage from './pages/Emails/EmailAutoReply'; 
import EmailConnect from './pages/Emails/EmailConnect';
import EmailLogsPage from './pages/Emails/EmailLogsPage';
import DkimPage from './pages/Emails/EmailDkim';
import Docker from './pages/vps/Docker';
import { setNavigator } from './utils/navigation';
// import LoadingScreen from './pages/loading';

import SubscriptionsPage from './pages/billing/Subscription';
import PaymentHistoryPage from "./pages/billing/paymentHistory";
import ComingSoon from './utils/ComingSoon';




// Protected Route wrapper
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

// Layout for auth pages
const AuthRoutes = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

// Layout for main app (after login)
const AppRoutes = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

export default function App() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setAuthBootstrapped = useAuthStore((s) => s.setAuthBootstrapped);
  const clearAuth = useAuthStore((s) => s.clearAuth);
   const navigate = useNavigate();

 useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

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
      {/* Public redirect */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Auth routes (no layout needed) */}
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected routes */}
      <Route
      // element={<ProtectedRoute />}
      >
        <Route element={<AppRoutes />}>
          <Route path="/hosting" element={<ManageHosting />} />
          <Route path="/hosting/plans" element={<HostingPlans />} />
          <Route path="/hosting/:id" element={<HostingDetails />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/domains/search" element={<DomainSearch />} />
          <Route path="/domains/:id" element={<ManageDomain />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/websites/wordpress" element={<Wordpress_Page />} />
          <Route path="/websites/wordpress/new" element={<WordpressNew />} />
          <Route path="/websites/wordpress/paid" element={<PaidWordpress />} />
          <Route path="/wordpress/websiteDashboard" element={<WebsiteDashboard />} />
          <Route path="/wordpress/websitedashboard/:id" element={<WebsiteDashboard />} />
          <Route path="/wordpress/domainEnter" element={<DomainEnter />} />
          <Route path="/wordpress/:id/files" element={<FilesPage />} />
          <Route path="/wordpress/:id/analytics" element={<AnalyticsPage />} />
          <Route path="/wordpress/:id/backups" element={<BackupsPage />} />
          <Route path="wordpress/:id/database" element={<DatabasePage />} />

          <Route path="/websites/php" element={<PHP_Page />} />
          <Route path="/websites/php/paid" element={<PaidPhpDashboard />} />
          <Route path="/websites/nodejs" element={<NodeJS_Page />} />
          <Route path="/vps" element={<VpsPlans/>} />
          <Route path = "/vps/plans" element={<VpsPlans />} />
          <Route path='/vps/paid' element={<VPSDashboard />} />
          <Route path="/vps/paid/:id" element={<VpsDashboard />} />
          <Route path="/vps/support/docs" element={<VPSDocumentation />} />
          <Route path="/vps/backup" element={<BackupManager />} />
          <Route path="vps/backup/snapshot" element={<SnapShot />} />
          <Route path="/vps/OSPanel" element={<OSPanel />} />
          <Route path="/vps/setting" element={<VpsSettings />} />
          <Route path="/Support" element={<GetHelp />} />
          <Route path="/vps/:id/docker" element={<Docker />} />
          <Route path="/vps/security/firewall" element={<firewall />} />




          <Route path="/emails" element={<EmailPlanProvider><EmailsPage /></EmailPlanProvider>} />
          <Route path="/emails/mailbox" element={<EmailPlanProvider><EmailMailboxPage /></EmailPlanProvider>} />
          <Route path="/email/plan" element={<EmailPlanProvider>< EmailPlansPage /></EmailPlanProvider>} />
          <Route path="/emails/forwarders" element={<EmailPlanProvider><ForwardersPage /></EmailPlanProvider>} />
          <Route path="/emails/aliases" element={<EmailPlanProvider><AliasesPage /></EmailPlanProvider>} />
          <Route path = "/emails/autoreply" element  = { <EmailPlanProvider>     <AutoReplyPage/> </EmailPlanProvider>} /> 
          <Route path ="/emails/logs" element ={<EmailPlanProvider>  <EmailLogsPage/>  </EmailPlanProvider>} /> 
           <Route path = "emails/dkim" element ={<EmailPlanProvider> < DkimPage/> </EmailPlanProvider>} />
          <Route path = "/emails/connect" element = { <EmailPlanProvider> <EmailConnect/> </EmailPlanProvider>} />


          <Route path = "/billing/subscriptions" element={<SubscriptionsPage/>} />
          <Route path  ='/payment-history' element = {<PaymentHistoryPage/>} />
          {/* <Route path ='/loading' element={<LoadingScreen/>}/> */}


          <Route path = "/Soon" element ={<ComingSoon/>} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Route>


      <Route path="/superadmin" element={<SuperAdminLayout />}>
        <Route path="servers" element={<Servers />} />
        <Route path="instances" element={<AdminInstances />} />
      </Route>




      {/* Fallback */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}