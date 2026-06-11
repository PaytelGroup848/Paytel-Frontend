import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Server,
  Shield,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useCreateOrder, useVerifyPayment } from "../../hooks/useBilling";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useVpsPlans } from "../../hooks/useVps";
import {
  savePendingOrder,
  getPendingOrder,
  clearPendingOrder,
} from "../../utils/pendingOrder";
import { metaPixel } from "../../utils/metaPixel";

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

const OsIcon = ({ name, size = 24 }) => {
  const icons = {
    ubuntu: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#E95420" />
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="none"
          stroke="white"
          strokeWidth="10"
        />
        <circle cx="50" cy="14" r="10" fill="white" />
        <circle cx="83" cy="69" r="10" fill="white" />
        <circle cx="17" cy="69" r="10" fill="white" />
      </svg>
    ),
    debian: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#A80030" />
        <path
          d="M55 20 C35 18,18 34,18 52 C18 68,30 82,48 84 C44 80,40 74,40 66 C40 54,50 44,62 44 C68 44,74 46,78 52 C76 36,66 22,55 20Z"
          fill="white"
        />
        <path
          d="M60 36 C52 36,44 44,44 54 C44 62,50 68,58 68 C64 68,70 64,72 58 C68 64,60 66,54 62 C46 58,46 46,56 42 C58 40,60 38,60 36Z"
          fill="#A80030"
        />
      </svg>
    ),
    rocky: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#10B981" />
        <path
          d="M50 20 L70 30 L70 60 L50 80 L30 60 L30 30 Z"
          fill="white"
          opacity="0.9"
        />
        <path d="M50 32 L62 38 L62 58 L50 68 L38 58 L38 38 Z" fill="#10B981" />
        <circle cx="50" cy="50" r="8" fill="white" />
      </svg>
    ),
    alma: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#1A1D6E" />
        <path
          d="M50 22 L65 35 L65 55 L50 68 L35 55 L35 35 Z"
          fill="none"
          stroke="#FF6600"
          strokeWidth="5"
        />
        <path
          d="M50 32 L58 40 L58 54 L50 62 L42 54 L42 40 Z"
          fill="#FF6600"
          opacity="0.8"
        />
        <circle cx="50" cy="48" r="6" fill="white" />
      </svg>
    ),
    centos: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#932279" />
        <path
          d="M50 20 L80 50 L50 80 L20 50 Z"
          fill="none"
          stroke="white"
          strokeWidth="4"
        />
        <path d="M50 20 L50 50 L20 50 Z" fill="#262577" opacity="0.9" />
        <path d="M50 20 L80 50 L50 50 Z" fill="#9CCD2A" opacity="0.9" />
        <path d="M20 50 L50 50 L50 80 Z" fill="#EFA724" opacity="0.9" />
        <path d="M50 50 L80 50 L50 80 Z" fill="#932279" opacity="0.7" />
        <circle cx="50" cy="50" r="8" fill="white" />
      </svg>
    ),
    window: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#ffffff" />
        <rect x="20" y="20" width="27" height="27" rx="2" fill="#F25022" />
        <rect x="53" y="20" width="27" height="27" rx="2" fill="#7FBA00" />
        <rect x="20" y="53" width="27" height="27" rx="2" fill="#00A4EF" />
        <rect x="53" y="53" width="27" height="27" rx="2" fill="#FFB900" />
      </svg>
    ),
  };
  return (
    icons[name] || (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#6366F1" />
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fill="white"
          fontSize="40"
          fontWeight="bold"
        >
          {name.slice(0, 1).toUpperCase()}
        </text>
      </svg>
    )
  );
};

const LINUX_OS = [
  { name: "Ubuntu 22.04", template: "ubuntu-22.04-x86_64", icon: "ubuntu" },
  { name: "AlmaLinux 9", template: "alma-9-x86_64", icon: "alma" },
  { name: "Debian 11 Bullseye", template: "debian-11-x86_64", icon: "debian" },
  {
    name: "Ubuntu 24.04 LTS",
    template: "ubuntu-24.04-x86_64",
    icon: "ubuntu",
    tag: "LTS",
  },
  { name: "AlmaLinux 10", template: "almalinux-10.1-x86_64", icon: "alma" },
  {
    name: "Debian 12 Bookworm",
    template: "debian-12-x86_64",
    icon: "debian",
    tag: "Stable",
  },
  { name: "CentOS Stream 10", template: "centos-10.0-x86_64", icon: "centos" },
  { name: "Rocky 10", template: "rocky-10.1-x86_64", icon: "rocky" },
];
const WINDOWS_OS = [
  {
    name: "Windows 2019",
    template: "windows-2019-scsi-virtio",
    icon: "window",
  },
  {
    name: "Windows 2022",
    template: "windows-2022-scsi-virtio",
    icon: "window",
  },
];
const TENURES = [
  { months: 48, label: "4 Years", discount: 45 },
  { months: 36, label: "3 Years", discount: 35 },
  { months: 24, label: "2 Years", discount: 20 },
  { months: 12, label: "1 Year", discount: 10 },
  { months: 1, label: "Monthly", discount: 0 },
];

export default function VpsConfigurePage() {
  const { planType, planId } = useParams();
  const { data: plans, isLoading: plansLoading } = useVpsPlans(
    planType || "linux",
  );
  const plan = plans?.find((p) => (p.id || p._id)?.toString() === planId);

  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 900;
  const isSmall = isMobile || isTablet;

  const OS_OPTIONS = planType === "windows" ? WINDOWS_OS : LINUX_OS;

  const navigate = useNavigate();
  const [selectedOs, setSelectedOs] = useState(OS_OPTIONS[0]);
  const [selectedTenure, setSelectedTenure] = useState(TENURES[1]);
  const [hostname, setHostname] = useState("");
  const [rootPassword, setRootPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { user, isAuthenticated } = useAuthStore();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const handleBack = () => navigate(isAuthenticated ? "/vps" : "/vps-cloud");

  const monthlyPrice = plan?.priceMonthly || 0;
  const subtotal =
    monthlyPrice * selectedTenure.months * (1 - selectedTenure.discount / 100);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const formatINR = (paise) =>
    `₹${(Number(paise || 0) / 100).toLocaleString()}`;

  useEffect(() => {
    if (!plan) return;
    setHostname(`${plan.slug || "server"}-vps`);
  }, [plan]);

  useEffect(() => {
    const pending = getPendingOrder();
    if (!pending || pending.service !== "vps") return;
    if (pending.planId?.toString() !== planId) return;
    if (pending.os) {
      const matched = OS_OPTIONS.find(
        (o) => o.template === pending.os.template,
      );
      if (matched) setSelectedOs(matched);
    }
    if (pending.hostname) setHostname(pending.hostname);
    if (pending.rootPassword) {
      setRootPassword(pending.rootPassword);
      checkPasswordStrength(pending.rootPassword);
    }
    if (pending.tenureMonths) {
      const matched = TENURES.find((t) => t.months === pending.tenureMonths);
      if (matched) setSelectedTenure(matched);
    }
    clearPendingOrder();
  }, [planId]);

  const checkPasswordStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[$@#&!]/.test(pw)) s++;
    setPasswordStrength(s);
  };

  const handlePasswordChange = (e) => {
    setRootPassword(e.target.value);
    checkPasswordStrength(e.target.value);
  };

  const validatePassword = () => {
    if (rootPassword.length < 8) {
      toast.error("Minimum 8 characters required");
      return false;
    }
    if (!/[A-Z]/.test(rootPassword)) {
      toast.error("Add at least one uppercase letter");
      return false;
    }
    if (!/[0-9]/.test(rootPassword)) {
      toast.error("Add at least one number");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!hostname.trim()) {
      toast.error("Please enter a hostname");
      return;
    }
    if (!rootPassword) {
      toast.error("Please enter a root password");
      return;
    }
    if (!validatePassword()) return;

    if (!isAuthenticated) {
      savePendingOrder({
        service: "vps",
        planId: plan.id || plan._id,
        planName: plan.name,
        planType,
        os: selectedOs,
        hostname,
        rootPassword,
        tenureMonths: selectedTenure.months,
        amount: total,
        returnPath: `/vps/configure/${planType}/${planId}`,
      });
      toast("Please login to continue your order", { duration: 3000 });
      navigate("/register", {
        state: {
          from: `/vps/configure/${planType}/${planId}`,
          pendingOrder: true,
          message: "Login to complete your VPS order",
        },
      });
      return;
    }

    try {
      if (!window.Razorpay) {
        toast.error("Razorpay not loaded — please refresh");
        return;
      }
      metaPixel.initiateCheckout();
      const orderData = await createOrder.mutateAsync({
        planId: plan.id || plan._id,
        planType: "vps",
        os: { name: selectedOs.name, template: selectedOs.template },
        tenureMonths: selectedTenure.months,
        hostname,
        rootPassword,
        userEmail: user?.email,
      });
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cloudedata VPS",
        description: `${plan.name} — ${selectedOs.name}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          console.log("Razorpay response:", response);
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
          try {
            await verifyPayment.mutateAsync({
              instanceId: orderData.instanceId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planType: "vps",
            });
            metaPixel.purchase(orderData.amount / 100, "INR");
            navigate("/vps/paid");
          } catch (err) {
            console.error("Verification error:", err);
          }
        },
        prefill: { name: user?.name || "", email: user?.email || "" },
        theme: { color: "#6C63FF" },
        modal: { ondismiss: () => toast.error("Payment cancelled") },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const strengthColors = [
    "",
    "#EF4444",
    "#EF4444",
    "#F59E0B",
    "#3B82F6",
    "#10B981",
  ];
  const strengthLabels = ["", "Weak", "Weak", "Fair", "Good", "Strong"];
  const isFormValid = hostname.trim() && rootPassword && passwordStrength >= 3;

  if (plansLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: "#94A3B8", fontSize: 14 }}>
            Loading plan details...
          </p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: 700, fontSize: 18, color: "#0F172A" }}>
            Plan not found
          </p>
          <button
            onClick={() => navigate("/vps")}
            style={{
              marginTop: 12,
              color: "#6366F1",
              fontSize: 14,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to VPS Plans
          </button>
        </div>
      </div>
    );
  }

  /* ── padding values ── */
  const lp = isMobile ? 12 : 16;

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "8px 8px" : "12px 16px",
        boxSizing: "border-box",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
      }}
    >
      {/* ── Back Button ── */}
      <button
        onClick={handleBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          border: "1.5px solid #CBD5E1",
          borderRadius: 8,
          background: "#fff",
          color: "#64748B",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 8,
          alignSelf: "flex-start",
          transition: "all .15s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6C63FF";
          e.currentTarget.style.color = "#6C63FF";
          e.currentTarget.style.background = "#F5F3FF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#CBD5E1";
          e.currentTarget.style.color = "#64748B";
          e.currentTarget.style.background = "#fff";
        }}
      >
        <ArrowLeft size={13} />
        Back
      </button>

      {/* ── Shell ── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxWidth: 1020,
          width: "100%",
          alignSelf: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: `10px ${isMobile ? 12 : 20}px`,
            borderBottom: "1px solid #F1F5F9",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              flexShrink: 0,
              background: "linear-gradient(135deg,#6C63FF,#9B8FFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Server size={17} color="white" />
          </div>
          <div>
            <div
              style={{
                fontSize: isMobile ? 14 : 16,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Configure {plan.name}
            </div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>
              Customize your server specifications
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            overflow: isSmall ? "auto" : "hidden",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              padding: lp,
              borderRight: isSmall ? "none" : "1px solid #F1F5F9",
              borderBottom: isSmall ? "1px solid #F1F5F9" : "none",
              overflowY: isSmall ? "visible" : "auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* OS */}
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                  marginBottom: 6,
                }}
              >
                Operating System
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2,1fr)"
                    : "repeat(3,1fr)",
                  gap: 6,
                }}
              >
                {OS_OPTIONS.map((os) => {
                  const active = selectedOs.template === os.template;
                  return (
                    <button
                      key={os.template}
                      onClick={() => setSelectedOs(os)}
                      style={{
                        padding: "8px",
                        borderRadius: 10,
                        border: `1.5px solid ${active ? "#6C63FF" : "#E2E8F0"}`,
                        background: active
                          ? "linear-gradient(135deg,#F5F3FF,#EDE9FF)"
                          : "#FAFAFA",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        textAlign: "left",
                      }}
                    >
                      <OsIcon name={os.icon} size={22} />
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: active ? 700 : 500,
                            color: active ? "#4F46E5" : "#374151",
                            lineHeight: 1.3,
                          }}
                        >
                          {os.name}
                        </div>
                        {os.tag && (
                          <div
                            style={{
                              fontSize: 8,
                              fontWeight: 700,
                              padding: "1px 4px",
                              borderRadius: 4,
                              background: "#DCFCE7",
                              color: "#16A34A",
                              display: "inline-block",
                              marginTop: 1,
                            }}
                          >
                            {os.tag}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hostname */}
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                  marginBottom: 6,
                }}
              >
                Hostname
              </div>
              <input
                type="text"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                placeholder="my-server-hostname"
                style={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "9px 11px",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                  marginBottom: 6,
                }}
              >
                Root Password
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={rootPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter a strong password"
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 10,
                    padding: "9px 40px 9px 11px",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: '"SF Mono","Fira Code",monospace',
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94A3B8",
                    display: "flex",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {rootPassword && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 3,
                        background: "#F1F5F9",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(passwordStrength / 5) * 100}%`,
                          background: strengthColors[passwordStrength],
                          borderRadius: 3,
                          transition: "all .3s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: strengthColors[passwordStrength],
                      }}
                    >
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {[
                      { ok: rootPassword.length >= 8, label: "8+ chars" },
                      { ok: /[A-Z]/.test(rootPassword), label: "Uppercase" },
                      { ok: /[0-9]/.test(rootPassword), label: "Number" },
                    ].map((c) => (
                      <span
                        key={c.label}
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: c.ok ? "#10B981" : "#CBD5E1",
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        {c.ok ? "✓" : "○"} {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              width: isSmall ? "100%" : 280,
              flexShrink: 0,
              padding: lp,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              overflowY: isSmall ? "visible" : "auto",
              minHeight: 0,
            }}
            className="scrollbar-hide"
          >
            {/* Tenure */}
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#94A3B8",
                  marginBottom: 6,
                }}
              >
                Billing Tenure
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {TENURES.map((tenure) => {
                  const active = selectedTenure.months === tenure.months;
                  const price =
                    monthlyPrice * tenure.months * (1 - tenure.discount / 100);
                  return (
                    <button
                      key={tenure.months}
                      onClick={() => setSelectedTenure(tenure)}
                      style={{
                        width: "100%",
                        padding: "9px 11px",
                        borderRadius: 10,
                        border: `1.5px solid ${active ? "#6C63FF" : "#E2E8F0"}`,
                        background: active
                          ? "linear-gradient(135deg,#F5F3FF,#EDE9FF)"
                          : "#FAFAFA",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: active ? 700 : 500,
                            color: active ? "#4F46E5" : "#374151",
                          }}
                        >
                          {tenure.label}
                        </div>
                        {tenure.discount > 0 && (
                          <div
                            style={{
                              fontSize: 8,
                              fontWeight: 700,
                              padding: "1px 5px",
                              borderRadius: 20,
                              background: "#D1FAE5",
                              color: "#065F46",
                              display: "inline-block",
                              marginTop: 2,
                            }}
                          >
                            Save {tenure.discount}%
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: active ? "#4F46E5" : "#374151",
                        }}
                      >
                        {formatINR(price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div
              style={{
                borderRadius: 12,
                background: "#F8FAFC",
                border: "1.5px solid #E2E8F0",
                padding: "12px",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#94A3B8",
                  marginBottom: 8,
                }}
              >
                Order Summary
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                <span style={{ color: "#64748B" }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: "#475569" }}>
                  {formatINR(subtotal)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                <span style={{ color: "#64748B" }}>GST (18%)</span>
                <span style={{ fontWeight: 600, color: "#475569" }}>
                  {formatINR(gst)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 8,
                  marginTop: 4,
                  borderTop: "1px solid #E2E8F0",
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}
                >
                  Total Due
                </span>
                <span
                  style={{ fontSize: 18, fontWeight: 800, color: "#3e38ad" }}
                >
                  {formatINR(total)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              disabled={!isFormValid || createOrder.isPending}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 11,
                border: "none",
                cursor: isFormValid ? "pointer" : "not-allowed",
                background: isFormValid
                  ? "linear-gradient(135deg,#1a11ce,#292079)"
                  : "#E2E8F0",
                color: isFormValid ? "#fff" : "#94A3B8",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {createOrder.isPending ? (
                "Processing..."
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ChevronRight size={15} />
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                opacity: 0.45,
              }}
            >
              <Shield size={11} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Secured by Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
