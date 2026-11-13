import { lazy, Suspense, useEffect } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "./store/authStore";
import { api } from "./services/api";
import { setNavigator } from "./utils/navigation";

import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/ui/Spinner";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import SuperAdminLayout from "./pages/superadmin/SuperAdminLayout";

// ------------------------------------
// Lazy loaded pages
// ------------------------------------

// Dashboard
const Dashboard = lazy(() => import("./pages/dashboard/Home"));

// Landing pages
const HomePage = lazy(() => import("./LandingPage/Home/HomePage"));
const PricingPage = lazy(() => import("./LandingPage/pricing/PricingPage"));
const EducationPage = lazy(
  () => import("./LandingPage/CRM/Education ERP/EducationPage"),
);
const RmsPage = lazy(
  () => import("./LandingPage/CRM/Resturant Managment/RmsPage"),
);
const LandingWordpress = lazy(
  () => import("./LandingPage/Wordpress/LandingWordpress"),
);
const BusyPage = lazy(
  () => import("./LandingPage/Services/busy on cloud/BusyPage"),
);
const TallyPage = lazy(
  () => import("./LandingPage/Services/tally on cloud/tallyPage"),
);
const Margpage = lazy(
  () => import("./LandingPage/Services/Marg on cloud/MargPage"),
);
const BlogPage = lazy(() => import("./LandingPage/Blog/BlogPage"));
const BlogDetail = lazy(() => import("./LandingPage/Blog/blogDetail"));
const CPanelPage = lazy(() => import("./LandingPage/C-panel/CPanelPage"));
const ContactUs = lazy(() => import("./LandingPage/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("./LandingPage/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./LandingPage/RefundPolicy"));
const TermsOfService = lazy(() => import("./LandingPage/TermsAndConditions"));
const AboutPage = lazy(() => import("./LandingPage/Aboutus"));
const VpsLandingpage = lazy(
  () => import("./LandingPage/Services/Vps on Cloud/VpsLandingPage"),
);
const PhpLandingPage = lazy(() => import("./LandingPage/php/PhpLandingpage"));
const EmailLandingPage = lazy(
  () => import("./LandingPage/email/EmailLandingPage"),
);

// Authentication
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const OtpVerify = lazy(() => import("./pages/auth/OtpVerify"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const GoogleAuthSuccess = lazy(() => import("./pages/auth/GoogleAuthSuccess"));

// Hosting
const ManageHosting = lazy(() => import("./pages/hosting/ManageHosting"));
const HostingPlans = lazy(() => import("./pages/hosting/HostingPlans"));
const HostingDetails = lazy(() => import("./pages/hosting/HostingDetails"));

// Domains
const Domains = lazy(() => import("./pages/domains/Domains"));
const DomainSearch = lazy(() => import("./pages/domains/DomainSearch"));
const ManageDomain = lazy(() => import("./pages/domains/ManageDomain"));

// Settings and plans
const Settings = lazy(() => import("./pages/settings/Settings"));
const Plans = lazy(() => import("./pages/plans/Plan"));
const WordpressConfigurePage = lazy(
  () => import("./pages/plans/WordpressConfigurePage"),
);

// WordPress
const Wordpress_Page = lazy(
  () => import("./pages/websites/wordpress/WordPress_Page"),
);
const PaidWordpress = lazy(
  () => import("./pages/websites/wordpress/PaidWordpress"),
);
const WebsiteDashboard = lazy(
  () => import("./pages/websites/wordpress/websiteDashboard"),
);
const DomainEnter = lazy(
  () => import("./pages/websites/wordpress/domainEnter"),
);
const FilesPage = lazy(() => import("./pages/websites/wordpress/FilesPage"));
const DatabasePage = lazy(
  () => import("./pages/websites/wordpress/DatabasePage"),
);

// PHP hosting
const PhpPlans = lazy(() => import("./pages/websites/php/PhpPlans"));
const MyPhpSites = lazy(() => import("./pages/websites/php/MyPhpSites"));
const PhpDnsVerify = lazy(() => import("./pages/websites/php/PhpDnsVerify"));
const PhpDashboard = lazy(() => import("./pages/websites/php/PhpDashboard"));

// Node JS
const NodeJS_Page = lazy(() => import("./pages/websites/nodejs/nodejs"));

// VPS
const VpsPlans = lazy(() => import("./pages/vps/VpsPlans"));
const VpsConfigurePage = lazy(() => import("./pages/vps/VpsConfigurePage"));
const VPSDashboard = lazy(() => import("./pages/vps/vps_paid"));
const VpsDashboard = lazy(() => import("./pages/vps/slidebar/vpsOverview"));
const VPSDocumentation = lazy(() => import("./pages/vps/slidebar/docs"));
const BackupManager = lazy(() => import("./pages/vps/slidebar/BackupManager"));
const SnapShot = lazy(() => import("./pages/vps/slidebar/SnapShot"));
const OSPanel = lazy(() => import("./pages/vps/slidebar/Os_panel"));
const VpsSettings = lazy(() => import("./pages/vps/slidebar/setting"));
const Firewall = lazy(() => import("./pages/vps/slidebar/security/firewall"));
const Docker = lazy(() => import("./pages/vps/Docker"));

// Support
const SupportPage = lazy(() => import("./pages/support/Support"));
const PublicSupportPage = lazy(
  () => import("./pages/support/PublicSupportPage"),
);
const PublicTicketDetail = lazy(
  () => import("./pages/support/PublicTicketDetail"),
);

// Super Admin
const Servers = lazy(() => import("./pages/superadmin/Servers"));
const AdminInstances = lazy(() => import("./pages/superadmin/Instances"));
const AdminSupport = lazy(() => import("./pages/superadmin/AdminSupport"));
const UserManagement = lazy(() => import("./pages/superadmin/UserManagement"));
const Products = lazy(() => import("./pages/superadmin/Products"));
const Invoices = lazy(() => import("./pages/superadmin/Invoices"));
const Renewals = lazy(() => import("./pages/superadmin/Renewals"));

// WordPress analytics
const AnalyticsPage = lazy(() => import("./pages/wordpress/AnalyticsPage"));
const BackupsPage = lazy(() => import("./pages/wordpress/BackupsPage"));

// Emails
const EmailsPage = lazy(() => import("./pages/Emails/Emails"));
const EmailMailboxPage = lazy(() => import("./pages/Emails/EmailMailboxPage"));
const EmailPlansPage = lazy(() => import("./pages/Emails/EmailPlan"));
const ForwardersPage = lazy(() => import("./pages/Emails/EmailForward"));
const AliasesPage = lazy(() => import("./pages/Emails/EmailAlias"));
const AutoReplyPage = lazy(() => import("./pages/Emails/EmailAutoReply"));
const EmailConnect = lazy(() => import("./pages/Emails/EmailConnect"));
const EmailLogsPage = lazy(() => import("./pages/Emails/EmailLogsPage"));
const DkimPage = lazy(() => import("./pages/Emails/EmailDkim"));

// Billing
const SubscriptionsPage = lazy(() => import("./pages/billing/Subscription"));
const PaymentHistoryPage = lazy(() => import("./pages/billing/paymentHistory"));

// Other pages
const ComingSoon = lazy(() => import("./utils/ComingSoon"));
const TallyOnCloud = lazy(() => import("./pages/TallyOnCloud/TallyOnCloud"));
const LR = lazy(() => import("./pages/LR/LR"));
const Index = lazy(() => import("./pages/CtrlBooks"));

// ------------------------------------
// Loading fallback
// ------------------------------------

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex items-center gap-3 text-textMuted">
      <Spinner />
      <span className="text-sm">Loading...</span>
    </div>
  </div>
);

// ------------------------------------
// Protected Route
// ------------------------------------

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const authBootstrapped = useAuthStore((s) => s.authBootstrapped);

  const location = useLocation();

  if (!authBootstrapped) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

// ------------------------------------
// Auth Layout
// ------------------------------------

const AuthRoutes = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

// ------------------------------------
// Dashboard Layout
// ------------------------------------

const AppRoutes = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

// ------------------------------------
// Public Route
// ------------------------------------

const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return children;
};

// ------------------------------------
// Main App
// ------------------------------------

export default function App() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setAuthBootstrapped = useAuthStore((s) => s.setAuthBootstrapped);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const navigate = useNavigate();

  // Set global navigator
  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  // Authentication bootstrap
  useEffect(() => {
    let alive = true;

    const bootstrap = async () => {
      try {
        const refreshRes = await api.post("/auth/refresh-token");

        const newToken = refreshRes.data?.data?.accessToken;

        const user = refreshRes.data?.data?.user;

        if (alive && newToken) {
          setAuth({
            user,
            accessToken: newToken,
          });
        } else if (alive) {
          clearAuth();
        }
      } catch {
        if (alive) {
          clearAuth();
        }
      } finally {
        if (alive) {
          setAuthBootstrapped(true);
        }
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

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* -------------------------------- */}
          {/* Public Routes */}
          {/* -------------------------------- */}

          <Route path="/" element={<HomePage />} />

          <Route path="/public-support" element={<PublicSupportPage />} />

          <Route
            path="/public-support/tickets/:ticketId"
            element={<PublicTicketDetail />}
          />

          <Route
            path="/cloud-hosting-blog"
            element={
              <PublicRoute>
                <BlogPage />
              </PublicRoute>
            }
          />

          <Route
            path="/blog/:slug"
            element={
              <PublicRoute>
                <BlogDetail />
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
            path="/emails/plan"
            element={
              <PublicRoute>
                <EmailLandingPage />
              </PublicRoute>
            }
          />

          <Route path="/wordpress-hosting" element={<LandingWordpress />} />

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

          <Route path="/vps-cloud" element={<VpsLandingpage />} />

          <Route path="/busy-on-cloud" element={<BusyPage />} />

          <Route
            path="/tally-on-cloud"
            element={
              <PublicRoute>
                <TallyOnCloud />
              </PublicRoute>
            }
          />

          <Route path="/marg-on-cloud" element={<Margpage />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/refund-policy-cloude" element={<RefundPolicy />} />

          <Route path="/term-and-conditions" element={<TermsOfService />} />

          <Route path="/about-us" element={<AboutPage />} />

          <Route path="/c-panel" element={<CPanelPage />} />

          <Route path="/lr" element={<LR />} />

          <Route path="/ctrl-books" element={<Index />} />

          <Route
            path="/vps/configure/:planType/:planId"
            element={<VpsConfigurePage />}
          />

          <Route
            path="/wordpress/configure/:planId"
            element={<WordpressConfigurePage />}
          />

          {/* -------------------------------- */}
          {/* Authentication Routes */}
          {/* -------------------------------- */}

          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/verify-otp" element={<OtpVerify />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/auth/google/success"
              element={<GoogleAuthSuccess />}
            />
          </Route>

          {/* -------------------------------- */}
          {/* Protected Application Routes */}
          {/* -------------------------------- */}

          <Route element={<ProtectedRoute />}>
            <Route element={<AppRoutes />}>
              {/* Hosting */}
              <Route path="/hosting" element={<ManageHosting />} />

              <Route path="/hosting/plans" element={<HostingPlans />} />

              <Route path="/hosting/:id" element={<HostingDetails />} />

              {/* Domains */}
              <Route path="/domains" element={<Domains />} />

              <Route path="/domains/search" element={<DomainSearch />} />

              <Route path="/domains/:id" element={<ManageDomain />} />

              {/* Settings */}
              <Route path="/settings/*" element={<Settings />} />

              <Route path="/plans" element={<Plans />} />

              {/* Tally */}
              <Route path="/tallyoncloud" element={<TallyOnCloud />} />

              {/* WordPress */}
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

              <Route
                path="/wordpress/:id/database"
                element={<DatabasePage />}
              />

              <Route path="/wordpress" element={<Wordpress_Page />} />

              {/* PHP Hosting */}
              <Route path="/php-hosting/paid" element={<MyPhpSites />} />

              <Route
                path="/php-hosting/dns/:instanceId"
                element={<PhpDnsVerify />}
              />

              <Route
                path="/php-hosting/dashboard/:instanceId"
                element={<PhpDashboard />}
              />

              {/* Node JS */}
              <Route path="/websites/nodejs" element={<NodeJS_Page />} />

              {/* VPS */}
              <Route path="/vps/paid" element={<VPSDashboard />} />

              <Route path="/vps/paid/:id" element={<VpsDashboard />} />

              <Route path="/vps/support/docs" element={<VPSDocumentation />} />

              <Route path="/vps/backup" element={<BackupManager />} />

              <Route path="/vps/backup/snapshot" element={<SnapShot />} />

              <Route path="/vps/OSPanel" element={<OSPanel />} />

              <Route path="/vps/setting" element={<VpsSettings />} />

              <Route path="/vps/security/firewall" element={<Firewall />} />

              <Route path="/vps/:id/docker" element={<Docker />} />

              {/* Support */}
              <Route path="/support" element={<SupportPage />} />

              <Route path="/support/tickets/:id" element={<SupportPage />} />

              {/* Emails */}
              <Route path="/emails" element={<EmailsPage />} />

              <Route
                path="/emails/mailbox/:id"
                element={<EmailMailboxPage />}
              />

              <Route path="/emails/forwarders" element={<ForwardersPage />} />

              <Route path="/emails/aliases" element={<AliasesPage />} />

              <Route path="/emails/autoreply" element={<AutoReplyPage />} />

              <Route path="/emails/logs" element={<EmailLogsPage />} />

              <Route path="/email/plan" element={<EmailPlansPage />} />

              <Route path="/emails/dkim" element={<DkimPage />} />

              <Route path="/emails/connect" element={<EmailConnect />} />

              {/* Billing */}
              <Route
                path="/billing/subscriptions"
                element={<SubscriptionsPage />}
              />

              <Route path="/payment-history" element={<PaymentHistoryPage />} />

              {/* Other */}
              <Route path="/comingsoon" element={<ComingSoon />} />
            </Route>
          </Route>

          {/* -------------------------------- */}
          {/* Super Admin Routes */}
          {/* -------------------------------- */}

          <Route path="/superadmin" element={<SuperAdminLayout />}>
            <Route path="servers" element={<Servers />} />

            <Route path="instances" element={<AdminInstances />} />

            <Route path="support" element={<AdminSupport />} />

            <Route path="users" element={<UserManagement />} />

            <Route path="products" element={<Products />} />

            <Route path="invoices" element={<Invoices />} />

            <Route path="upcomming-renewals" element={<Renewals />} />
          </Route>

          {/* -------------------------------- */}
          {/* Fallback */}
          {/* -------------------------------- */}

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
