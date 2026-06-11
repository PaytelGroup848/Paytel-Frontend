import React, { useEffect, useState } from "react";
import {
  X,
  Mail,
  Shield,
  ChevronRight,
  Globe,
  Check,
  Loader2,
  CircleAlert,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import {
  useCreateEmailOrder,
  useVerifyEmailPayment,
} from "../../hooks/useEmailHosting";
import { useNavigate, useLocation } from "react-router-dom";
import DkimVerificationModal from "./DkimVerificationModal";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import {
  savePendingOrder,
  getPendingOrder,
  clearPendingOrder,
} from "../../utils/pendingOrder";

const TENURES = [
  { months: 12, label: "Yearly", discount: 15 },
  { months: 1, label: "Monthly", discount: 0 },
];

export default function EmailConfigModal({ plan, isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [selectedTenure, setTenure] = useState(TENURES[0]);
  const [mailboxCount, setMailboxCount] = useState(1);
  const [showDkimModal, setShowDkimModal] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;
    const pending = getPendingOrder();
    if (!pending || pending.service !== "email") return;

    if (pending.domain) setDomain(pending.domain);
    if (pending.tenureMonths) {
      const matched = TENURES.find((t) => t.months === pending.tenureMonths);
      if (matched) setTenure(matched);
    }
    if (pending.mailboxCount) setMailboxCount(pending.mailboxCount);

    clearPendingOrder();
  }, [isAuthenticated, plan]);

  const createOrderMutation = useCreateEmailOrder();
  const verifyPaymentMutation = useVerifyEmailPayment();

  if (!isOpen || !plan) return null;

  /* ── price math (aligned with backend) ── */
  const basePricePaise = plan.price;
  let subtotalPaise = basePricePaise * selectedTenure.months * mailboxCount;
  if (selectedTenure.months === 12) {
    subtotalPaise = Math.floor(subtotalPaise * 0.85);
  }
  const totalPaise = Math.round(subtotalPaise * 1.18);
  const gstPaise = totalPaise - subtotalPaise;

  const subtotal = subtotalPaise / 100;
  const gst = gstPaise / 100;
  const total = totalPaise / 100;

  const fmt = (n) =>
    `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  /* ── domain validation ── */
  const domainRegex =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  const handleDomainBlur = () => {
    if (domain && !domainRegex.test(domain))
      setDomainError("Enter a valid domain e.g. yourbusiness.com");
    else setDomainError("");
  };

  const isValid =
    domain.trim() &&
    !domainError &&
    !createOrderMutation.isPending &&
    !verifyPaymentMutation.isPending;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      savePendingOrder({
        service: "email",
        planId: plan.id || plan._id,
        planName: plan.name,
        domain: domain,
        tenureMonths: selectedTenure.months,
        mailboxCount: mailboxCount,
      });
      navigate("/register", { state: { from: "/emails", pendingOrder: true } });
      return;
    }
    try {
      const orderData = await createOrderMutation.mutateAsync({
        planId: plan.id,
        domain,
        tenureMonths: selectedTenure.months,
        mailboxCount,
      });

      if (!orderData.keyId) {
        console.error("keyId is missing from response!");
        toast.error("Payment gateway configuration error", {
          style: { zIndex: 99999 },
        });
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // Use the amount confirmed by backend order
        currency: "INR",
        name: "CloudeData Email Hosting",
        description: `${plan.name} Plan - ${domain} (${mailboxCount} Mailboxes, ${selectedTenure.label})`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            const verifyResult = await verifyPaymentMutation.mutateAsync({
              emailOrderId: orderData.emailOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResult.dkimVerified) {
              navigate(`/emails/manage/${orderData.emailOrderId}`);
              onClose();
            } else {
              setCreatedOrderId(orderData.emailOrderId);
              setShowDkimModal(true);
            }
          } catch (err) {
            console.error("Payment verification failed", err);
            toast.error("Payment verification failed", {
              style: { zIndex: 99999 },
            });
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#4F46E5",
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay modal closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation failed", err);
      toast.error("Order creation failed", { style: { zIndex: 99999 } });
    }
  };

  if (showDkimModal) {
    return (
      <DkimVerificationModal
        emailOrderId={createdOrderId}
        isOpen={showDkimModal}
        onClose={() => {
          setShowDkimModal(false);
          onClose();
          navigate(`/emails/manage/${createdOrderId}`);
        }}
        onVerified={() => {
          navigate(`/emails/manage/${createdOrderId}`);
          onClose();
        }}
      />
    );
  }

  /* ── inline styles ── */
  const S = {
    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(15,23,42,0.45)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    shell: {
      background: "#FFFFFF",
      borderRadius: 20,
      boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
      width: "100%",
      maxWidth: 760,
      maxHeight: "92vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 28px 16px",
      borderBottom: "1px solid #F1F5F9",
      flexShrink: 0,
    },
    headerIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      flexShrink: 0,
      background: "linear-gradient(135deg,#6C63FF 0%,#9B8FFF 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 14px rgba(108,99,255,0.35)",
    },
    body: { display: "flex", flex: 1, overflow: "hidden", minHeight: 0 },
    left: {
      flex: 1,
      padding: "28px 28px",
      borderRight: "1px solid #F1F5F9",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      overflowY: "auto",
      scrollbarWidth: "none",
    },
    right: {
      width: 270,
      flexShrink: 0,
      padding: "24px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      overflowY: "auto",
      scrollbarWidth: "none",
      background: "#FAFBFF",
    },
    label: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#94A3B8",
      marginBottom: 8,
      display: "block",
    },
    input: (hasError) => ({
      width: "100%",
      boxSizing: "border-box",
      background: "#F8FAFC",
      border: `1.5px solid ${hasError ? "#EF4444" : "#E2E8F0"}`,
      borderRadius: 12,
      padding: "12px 14px 12px 42px",
      fontSize: 14,
      color: "#0F172A",
      outline: "none",
      transition: "border-color .15s",
      fontFamily: "inherit",
    }),
    tenureBtn: (active) => ({
      width: "100%",
      padding: "10px 14px",
      borderRadius: 12,
      border: `1.5px solid ${active ? "#6C63FF" : "#E2E8F0"}`,
      background: active
        ? "linear-gradient(135deg,#F5F3FF,#EDE9FF)"
        : "#FAFAFA",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: active ? "0 2px 10px rgba(108,99,255,0.12)" : "none",
      transition: "all .15s",
    }),
    summaryCard: {
      borderRadius: 14,
      background: "#F8FAFC",
      border: "1.5px solid #E2E8F0",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    ctaBtn: (valid) => ({
      width: "100%",
      padding: 13,
      borderRadius: 13,
      border: "none",
      cursor: valid ? "pointer" : "not-allowed",
      background: valid
        ? "linear-gradient(135deg,#4F46E5 0%,#3e38ad 100%)"
        : "#E2E8F0",
      color: valid ? "#FFF" : "#94A3B8",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      boxShadow: valid ? "0 4px 20px rgba(79,70,229,0.35)" : "none",
      transition: "all .2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }),
    counter: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#F8FAFC",
      border: "1.5px solid #E2E8F0",
      borderRadius: 12,
      padding: "8px 12px",
      width: "fit-content",
    },
    counterBtn: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "none",
      background: "#FFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#4F46E5",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      transition: "all 0.2s",
    },
  };

  return (
    <div
      style={S.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={S.shell}>
        {/* Header */}
        <div style={S.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={S.headerIcon}>
              <Mail size={18} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0F172A",
                  letterSpacing: "-0.3px",
                }}
              >
                Configure {plan.name}
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>
                Set up your business email
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "#F8FAFC",
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={S.body}>
          {/* ── LEFT ── */}
          <div style={S.left}>
            {/* Hero blurb */}
            <div
              style={{
                background: "linear-gradient(135deg,#F5F3FF 0%,#EEF2FF 100%)",
                borderRadius: 16,
                padding: "18px 20px",
                border: "1px solid #E0E7FF",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#4F46E5",
                  marginBottom: 6,
                }}
              >
                {plan.name}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>
                {plan.features.join(" · ")}
              </div>
            </div>

            {/* Mailbox Count Selector */}
            <div>
              <label style={S.label}>Number of Mailboxes</label>
              <p
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                How many mailboxes do you need? You can always add more later.
              </p>
              <div style={S.counter}>
                <button
                  style={{
                    ...S.counterBtn,
                    opacity: mailboxCount <= 1 ? 0.5 : 1,
                    cursor: mailboxCount <= 1 ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    mailboxCount > 1 && setMailboxCount((c) => c - 1)
                  }
                  disabled={mailboxCount <= 1}
                >
                  <Minus size={14} />
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 80,
                    justifyContent: "center",
                  }}
                >
                  <Users size={16} className="text-indigo-500" />
                  <span
                    style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
                  >
                    {mailboxCount}
                  </span>
                </div>
                <button
                  style={S.counterBtn}
                  onClick={() => setMailboxCount((c) => c + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Domain input */}
            <div>
              <label style={S.label}>Your Business Domain</label>
              <p
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                Enter the domain you want to use for your business emails.
              </p>
              <div style={{ position: "relative" }}>
                <Globe
                  size={16}
                  style={{
                    position: "absolute",
                    left: 13,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8",
                    pointerEvents: "none",
                  }}
                />
                <input
                  style={S.input(!!domainError)}
                  type="text"
                  value={domain}
                  placeholder="yourbusiness.com"
                  onChange={(e) => {
                    setDomain(e.target.value);
                    setDomainError("");
                  }}
                  onBlur={handleDomainBlur}
                />
              </div>
              {domainError && (
                <p
                  style={{
                    fontSize: 11,
                    color: "#EF4444",
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  ⚠ {domainError}
                </p>
              )}
            </div>

            {/* DNS info note */}
            <div
              style={{
                background: "#FFFBEB",
                borderRadius: 12,
                padding: "12px 16px",
                border: "1px solid #FDE68A",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <CircleAlert
                size={16}
                style={{ color: "#92400E", flexShrink: 0, marginTop: 2 }}
              />
              <p
                style={{
                  fontSize: 11,
                  color: "#92400E",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                After checkout you'll receive DNS records (MX, SPF, DKIM) to add
                to your domain registrar.
              </p>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={S.right}>
            {/* Billing Tenure */}
            <div>
              <div style={S.label}>Billing Tenure</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {TENURES.map((tenure) => {
                  const active = selectedTenure.months === tenure.months;

                  // Calculate tenure price aligned with backend
                  let tSubtotalPaise =
                    plan.price * tenure.months * mailboxCount;
                  if (tenure.months === 12) {
                    tSubtotalPaise = Math.floor(tSubtotalPaise * 0.85);
                  }
                  const tTotalPaise = Math.round(tSubtotalPaise * 1.18);
                  const tTotalINR = tTotalPaise / 100;

                  return (
                    <button
                      key={tenure.months}
                      style={S.tenureBtn(active)}
                      onClick={() => setTenure(tenure)}
                    >
                      <div style={{ textAlign: "left" }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: active ? 700 : 500,
                            color: active ? "#4F46E5" : "#374151",
                          }}
                        >
                          {tenure.label}
                        </div>
                        {tenure.discount > 0 && (
                          <div
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              marginTop: 2,
                              padding: "1px 6px",
                              borderRadius: 20,
                              background: "#D1FAE5",
                              color: "#065F46",
                              display: "inline-block",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
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
                        {fmt(tTotalINR)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div style={S.summaryCard}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#94A3B8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}
              >
                Order Summary
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#64748B",
                }}
              >
                <span>
                  {mailboxCount} Mailbox{mailboxCount > 1 ? "es" : ""}
                </span>
                <span style={{ fontWeight: 600, color: "#374151" }}>
                  {fmt(subtotal)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#64748B",
                }}
              >
                <span>GST (18%)</span>
                <span style={{ fontWeight: 600, color: "#374151" }}>
                  {fmt(gst)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 10,
                  marginTop: 2,
                  borderTop: "1px solid #E2E8F0",
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}
                >
                  Total Due
                </span>
                <span
                  style={{ fontSize: 22, fontWeight: 800, color: "#4F46E5" }}
                >
                  {fmt(total)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              style={S.ctaBtn(isValid)}
              disabled={!isValid}
              onClick={handleCheckout}
            >
              {createOrderMutation.isPending ||
              verifyPaymentMutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Proceed to Checkout <ChevronRight size={14} />
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Shield size={12} color="#94A3B8" />
              <span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 500 }}>
                Secured by Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
