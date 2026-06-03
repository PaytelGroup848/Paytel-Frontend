import { useEffect } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "./store/authStore";
import { api } from "./services/api";
import Dashboard from "./pages/dashboard/Home";
import ScrollToTop from "./components/ScrollToTop";

import PricingPage from "./LandingPage/pricing/PricingPage";
import EducationPage from "./LandingPage/CRM/Education ERP/EducationPage";
import RmsPage from "./LandingPage/CRM/Resturant Managment/RmsPage";
import LandingWordpress from "./LandingPage/Wordpress/LandingWordpress";
import BusyPage from "./LandingPage/Services/busy on cloud/BusyPage";
import TallyPage from "./LandingPage/Services/tally on cloud/tallyPage";
import Margpage from "./LandingPage/Services/Marg on cloud/MargPage";
import BlogPage from "./LandingPage/Blog/BlogPage";
import CPanelPage from "./LandingPage/C-panel/CPanelPage";
import ContactUs from "./LandingPage/Contact/Contact";
import PrivacyPolicy from "./LandingPage/PrivacyPolicy";
import RefundPolicy from "./LandingPage/RefundPolicy";
import TermsOfService from "./LandingPage/TermsAndConditions";
import AboutPage from "./LandingPage/Aboutus";

import Spinner from "./components/ui/Spinner";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import { pageTransition } from "./animations/variants";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OtpVerify from "./pages/auth/OtpVerify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import HomePage from "./LandingPage/Home/HomePage";
import ManageHosting from "./pages/hosting/ManageHosting";
import HostingPlans from "./pages/hosting/HostingPlans";
import HostingDetails from "./pages/hosting/HostingDetails";
import Domains from "./pages/domains/Domains";
import DomainSearch from "./pages/domains/DomainSearch";
import ManageDomain from "./pages/domains/ManageDomain";
import Settings from "./pages/settings/Settings";
import Plans from "./pages/plans/Plan";
import Wordpress_Page from "./pages/websites/wordpress/WordPress_Page";
import PaidWordpress from "./pages/websites/wordpress/PaidWordpress";
import Home from "./pages/dashboard/Home";
import WebsiteDashboard from "./pages/websites/wordpress/websiteDashboard";
import DomainEnter from "./pages/websites/wordpress/domainEnter";
import PhpPlans from "./pages/websites/php/PhpPlans";
import MyPhpSites from "./pages/websites/php/MyPhpSites";
import PhpDnsVerify from "./pages/websites/php/PhpDnsVerify";
import PhpDashboard from "./pages/websites/php/PhpDashboard";
import NodeJS_Page from "./pages/websites/nodejs/nodejs";
import SuperAdminLayout from "./pages/superadmin/SuperAdminLayout";
import Servers from "./pages/superadmin/Servers";
import AdminInstances from "./pages/superadmin/Instances";
import FilesPage from "./pages/websites/wordpress/FilesPage";
import DatabasePage from "./pages/websites/wordpress/DatabasePage";
import VpsPlans from "./pages/vps/VpsPlans";
import VPSDocumentation from "./pages/vps/slidebar/docs";
import BackupManager from "./pages/vps/slidebar/BackupManager";
import SnapShot from "./pages/vps/slidebar/SnapShot";
import OSPanel from "./pages/vps/slidebar/Os_panel";
import VpsSettings from "./pages/vps/slidebar/setting";
import firewall from "./pages/vps/slidebar/security/firewall";
import SupportPage from "./pages/support/Support";
import TicketDetail from "./pages/support/TicketDetail";
import AdminSupport from "./pages/superadmin/AdminSupport";
import AnalyticsPage from "./pages/wordpress/AnalyticsPage";
import BackupsPage from "./pages/wordpress/BackupsPage";
import { useMe } from "./hooks/useAuth";
import VPSDashboard from "./pages/vps/vps_paid";
import VpsDashboard from "./pages/vps/slidebar/vpsOverview";
import EmailsPage from "./pages/Emails/Emails";
import EmailMailboxPage from "./pages/Emails/EmailMailboxPage";
import EmailPlansPage from "./pages/Emails/EmailPlan";
import ForwardersPage from "./pages/Emails/EmailForward";
import AliasesPage from "./pages/Emails/EmailAlias";
import AutoReplyPage from "./pages/Emails/EmailAutoReply";
import EmailConnect from "./pages/Emails/EmailConnect";
import EmailLogsPage from "./pages/Emails/EmailLogsPage";
import DkimPage from "./pages/Emails/EmailDkim";
import Docker from "./pages/vps/Docker";
import { setNavigator } from "./utils/navigation";
// import LoadingScreen from './pages/loading';

import SubscriptionsPage from "./pages/billing/Subscription";
import PaymentHistoryPage from "./pages/billing/paymentHistory";
import ComingSoon from "./utils/ComingSoon";
import BlogDetail from "./LandingPage/Blog/blogDetail";
import VpsLandingpage from "./LandingPage/Services/Vps on Cloud/VpsLandingPage";

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
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
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

// Public route that shows DashboardLayout only if user is logged in
const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }
  return children;
};

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
        const refreshRes = await api.post("/auth/refresh-token");
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
    <>
      <ScrollToTop />

      <Routes>
        {/* Public redirect */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cloud-hosting-blog"
          element={
            <PublicRoute>
              {" "}
              <BlogPage />{" "}
            </PublicRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PublicRoute>
              {" "}
              <BlogDetail />{" "}
            </PublicRoute>
          }
        />
        <Route
          path="/vps"
          element={
            <PublicRoute>
              <VpsPlans />
            </PublicRoute>
          }
        />
        <Route
          path="/email/plan"
          element={
            <PublicRoute>
              <EmailPlansPage />
            </PublicRoute>
          }
        />
        <Route
          path="/wordpress-hosting"
          element={
            <PublicRoute>
              <Wordpress_Page />
            </PublicRoute>
          }
        />
        <Route
          path="/php-hosting"
          element={
            <PublicRoute>
              <PhpPlans />
            </PublicRoute>
          }
        />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/education-management-system"
          element={<EducationPage />}
        />
        <Route path="/restaurant-management-system" element={<RmsPage />} />
        <Route path="/wordpress-hosting" element={<LandingWordpress />} />
        <Route path="/vps-cloud" element={<VpsLandingpage />} />
        <Route path="/busy-on-cloud" element={<BusyPage />} />
        <Route path="/tally-on-cloud" element={<TallyPage />} />
        <Route path="/marg-on-cloud" element={<Margpage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy-cloude" element={<RefundPolicy />} />
        <Route path="/term-and-conditions" element={<TermsOfService />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/c-panel" element={<CPanelPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy-cloude " element={<RefundPolicy />} />
        <Route path="/term-and-conditions" element={<TermsOfService />} />
        {/* Auth routes (no layout needed) */}
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppRoutes />}>
            <Route path="/hosting" element={<ManageHosting />} />
            <Route path="/hosting/plans" element={<HostingPlans />} />
            <Route path="/hosting/:id" element={<HostingDetails />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/domains/search" element={<DomainSearch />} />
            <Route path="/domains/:id" element={<ManageDomain />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/plans" element={<Plans />} />
            {/* <Route path="/websites/wordpress" element={<Wordpress_Page />} /> */}
            <Route
              path="/websites/wordpress/paid"
              element={<PaidWordpress />}
            />
            <Route
              path="/wordpress/websiteDashboard"
              element={<WebsiteDashboard />}
            />
            <Route
              path="/wordpress/websitedashboard/:id"
              element={<WebsiteDashboard />}
            />
            <Route path="/wordpress/domainEnter" element={<DomainEnter />} />
            <Route path="/wordpress/:id/files" element={<FilesPage />} />
            <Route
              path="/wordpress/:id/analytics"
              element={<AnalyticsPage />}
            />
            <Route path="/wordpress/:id/backups" element={<BackupsPage />} />
            <Route path="wordpress/:id/database" element={<DatabasePage />} />

            <Route path="/php-hosting" element={<PhpPlans />} />
            <Route path="/php-hosting/paid" element={<MyPhpSites />} />
            <Route
              path="/php-hosting/dns/:instanceId"
              element={<PhpDnsVerify />}
            />
            <Route
              path="/php-hosting/dashboard/:instanceId"
              element={<PhpDashboard />}
            />
            <Route path="/websites/nodejs" element={<NodeJS_Page />} />
            {/* <Route path="/vps" element={<VpsPlans/>} /> */}
            <Route path="/vps/paid" element={<VPSDashboard />} />
            <Route path="/vps/paid/:id" element={<VpsDashboard />} />
            <Route path="/vps/support/docs" element={<VPSDocumentation />} />
            <Route path="/vps/backup" element={<BackupManager />} />
            <Route path="vps/backup/snapshot" element={<SnapShot />} />
            <Route path="/vps/OSPanel" element={<OSPanel />} />
            <Route path="/vps/setting" element={<VpsSettings />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/tickets/:id" element={<SupportPage />} />
            {/* <Route
              path="/support/tickets/:ticketId"
              element={<TicketDetail />}
            /> */}
            <Route path="/vps/:id/docker" element={<Docker />} />
            <Route path="/vps/security/firewall" element={<firewall />} />

            <Route path="/emails" element={<EmailsPage />} />
            {/* <Route path="/emails/mailbox/:id" element={<EmailMailboxPage />} /> */}
            <Route path="/emails/mailbox/:id" element={<EmailMailboxPage />} />
            <Route path="/emails/forwarders" element={<ForwardersPage />} />
            <Route path="/emails/aliases" element={<AliasesPage />} />
            <Route path="/emails/autoreply" element={<AutoReplyPage />} />
            <Route path="/emails/logs" element={<EmailLogsPage />} />
            <Route path="emails/dkim" element={<DkimPage />} />
            <Route path="/emails/connect" element={<EmailConnect />} />

            <Route
              path="/billing/subscriptions"
              element={<SubscriptionsPage />}
            />
            <Route path="/payment-history" element={<PaymentHistoryPage />} />
            {/* <Route path ='/loading' element={<LoadingScreen/>}/> */}

            <Route path="/comingsoon" element={<ComingSoon />} />
          </Route>
        </Route>
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route path="servers" element={<Servers />} />
          <Route path="instances" element={<AdminInstances />} />
          <Route path="support" element={<AdminSupport />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}
