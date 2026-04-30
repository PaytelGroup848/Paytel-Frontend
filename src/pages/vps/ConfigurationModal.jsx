import React, { useState } from 'react';
import { X, Minus, Plus, Eye, EyeOff, Server, Shield, ChevronRight } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { useCreateVpsOrder, useVerifyVpsPayment } from '../../hooks/useVps';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

/* ─── Inline SVG OS Icons ────────────────────────────────────────────────── */
const OsIcon = ({ name, size = 28 }) => {
  const icons = {
    ubuntu: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#E95420"/>
        <circle cx="50" cy="50" r="18" fill="none" stroke="white" strokeWidth="10"/>
        <circle cx="50" cy="14" r="10" fill="white"/>
        <circle cx="83" cy="69" r="10" fill="white"/>
        <circle cx="17" cy="69" r="10" fill="white"/>
      </svg>
    ),
    debian: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#A80030"/>
        <path d="M55 20 C35 18, 18 34, 18 52 C18 68, 30 82, 48 84 C44 80, 40 74, 40 66 C40 54, 50 44, 62 44 C68 44, 74 46, 78 52 C76 36, 66 22, 55 20Z" fill="white"/>
        <path d="M60 36 C52 36, 44 44, 44 54 C44 62, 50 68, 58 68 C64 68, 70 64, 72 58 C68 64, 60 66, 54 62 C46 58, 46 46, 56 42 C58 40, 60 38, 60 36Z" fill="#A80030"/>
      </svg>
    ),
    rocky: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#10B981"/>
        <path d="M50 20 L70 30 L70 60 L50 80 L30 60 L30 30 Z" fill="white" opacity="0.9"/>
        <path d="M50 32 L62 38 L62 58 L50 68 L38 58 L38 38 Z" fill="#10B981"/>
        <circle cx="50" cy="50" r="8" fill="white"/>
      </svg>
    ),
    alma: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#1A1D6E"/>
        <path d="M50 22 L65 35 L65 55 L50 68 L35 55 L35 35 Z" fill="none" stroke="#FF6600" strokeWidth="5"/>
        <path d="M50 32 L58 40 L58 54 L50 62 L42 54 L42 40 Z" fill="#FF6600" opacity="0.8"/>
        <circle cx="50" cy="48" r="6" fill="white"/>
      </svg>
    ),
    centos: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#932279"/>
        <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="white" strokeWidth="4"/>
        <path d="M50 20 L50 50 L20 50 Z" fill="#262577" opacity="0.9"/>
        <path d="M50 20 L80 50 L50 50 Z" fill="#9CCD2A" opacity="0.9"/>
        <path d="M20 50 L50 50 L50 80 Z" fill="#EFA724" opacity="0.9"/>
        <path d="M50 50 L80 50 L50 80 Z" fill="#932279" opacity="0.7"/>
        <circle cx="50" cy="50" r="8" fill="white"/>
      </svg>
    ),
    fedora: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#294172"/>
        <rect x="38" y="20" width="12" height="40" rx="6" fill="white"/>
        <rect x="38" y="40" width="35" height="12" rx="6" fill="white"/>
        <path d="M38 38 Q38 22, 52 22 Q66 22, 66 38 Q66 50, 52 50 L50 50" fill="none" stroke="#3C6EB4" strokeWidth="6"/>
        <circle cx="44" cy="22" r="6" fill="#3C6EB4"/>
      </svg>
    ),
    arch: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#1793D1"/>
        <path d="M50 15 L68 72 L60 68 L50 80 L40 68 L32 72 Z" fill="white"/>
        <path d="M50 30 L60 65 L50 72 L40 65 Z" fill="#1793D1"/>
      </svg>
    ),
    alpine: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#0D597F"/>
        <path d="M50 20 L78 72 L22 72 Z" fill="white"/>
        <path d="M50 36 L66 65 L34 65 Z" fill="#0D597F"/>
        <path d="M38 55 L50 35 L62 55" fill="none" stroke="white" strokeWidth="4"/>
      </svg>
    ),
    opensuse: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#73BA25"/>
        <path d="M28 50 C28 38, 38 28, 50 28 C62 28, 72 38, 72 50" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"/>
        <path d="M72 50 C72 62, 62 72, 50 72 C38 72, 28 62, 28 50" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="28" cy="50" r="7" fill="white"/>
        <circle cx="72" cy="50" r="7" fill="white"/>
      </svg>
    ),
  };
  return icons[name] || (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="48" fill="#6366F1"/>
      <text x="50" y="65" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold">
        {name.slice(0, 1).toUpperCase()}
      </text>
    </svg>
  );
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const OS_OPTIONS = [
  { name: 'Ubuntu 24.04 LTS', template: 'ubuntu-24.04-x86_64', icon: 'ubuntu', tag: 'LTS' },
  { name: 'Ubuntu 22.04', template: 'ubuntu-22.04-x86_64', icon: 'ubuntu' },
  { name: 'Debian 12 Bookworm', template: 'debian-12-x86_64', icon: 'debian', tag: 'Stable' },
  { name: 'Debian 11 Bullseye', template: 'debian-11-x86_64', icon: 'debian' },
  { name: 'Rocky Linux 9', template: 'rocky-9-x86_64', icon: 'rocky' },
  { name: 'AlmaLinux 9', template: 'alma-9-x86_64', icon: 'alma' },
  { name: 'CentOS Stream 9', template: 'centos-9-x86_64', icon: 'centos' },
  { name: 'Fedora 40', template: 'fedora-40-x86_64', icon: 'fedora' },
  // { name: 'Arch Linux', template: 'arch-x86_64', icon: 'arch' },
  // { name: 'Alpine 3.19', template: 'alpine-3.19-x86_64', icon: 'alpine', tag: 'Minimal' },
  // { name: 'openSUSE Leap 15.5', template: 'opensuse-15.5-x86_64', icon: 'opensuse' },
];

const TENURES = [
  { months: 48, label: '4 Years', discount: 45 },
  { months: 36, label: '3 Years', discount: 35 },
  { months: 24, label: '2 Years', discount: 20 },
  { months: 12, label: '1 Year', discount: 10 },
  { months: 1,  label: 'Monthly', discount: 0  },
];


export default function ConfigurationModal({ plan, isOpen, onClose }) {
  const navigate = useNavigate();
  const [selectedOs, setSelectedOs]         = useState(OS_OPTIONS[0]);
  const [selectedTenure, setSelectedTenure] = useState(TENURES[1]);
  const [quantity, setQuantity]             = useState(1);
  const [hostname, setHostname]             = useState(`${plan.slug}-server`);
  const [rootPassword, setRootPassword]     = useState('');
  const [showPassword, setShowPassword]     = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { user }       = useAuthStore();
  const createOrder    = useCreateVpsOrder();
  const verifyPayment  = useVerifyVpsPayment();

  const monthlyPrice = plan.priceMonthly;
  const subtotal     = monthlyPrice * selectedTenure.months * (1 - selectedTenure.discount / 100) * quantity;
  const gst          = subtotal * 0.18;
  const total        = subtotal + gst;

  const checkPasswordStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8)            s++;
    if (/[a-z]/.test(pw))          s++;
    if (/[A-Z]/.test(pw))          s++;
    if (/[0-9]/.test(pw))          s++;
    if (/[$@#&!]/.test(pw))        s++;
    setPasswordStrength(s);
  };

  const handlePasswordChange = (e) => {
    setRootPassword(e.target.value);
    checkPasswordStrength(e.target.value);
  };

  const validatePassword = () => {
    if (rootPassword.length < 8)    { toast.error('Minimum 8 characters required'); return false; }
    if (!/[A-Z]/.test(rootPassword)){ toast.error('Add at least one uppercase letter'); return false; }
    if (!/[0-9]/.test(rootPassword)){ toast.error('Add at least one number'); return false; }
    return true;
  };

  const handleCheckout = async () => {
    if (!hostname.trim())  { toast.error('Please enter a hostname'); return; }
    if (!rootPassword)     { toast.error('Please enter a root password'); return; }
    if (!validatePassword()) return;

    try {
      if (!window.Razorpay) { toast.error('Razorpay not loaded — please refresh'); return; }
      const orderData = await createOrder.mutateAsync({
        planId: plan.id,
        os: { name: selectedOs.name, template: selectedOs.template },
        tenureMonths: selectedTenure.months,
        hostname, rootPassword,
        userEmail: user?.email,
      });

      const options = {
        key: orderData.keyId, amount: orderData.amount, currency: 'INR',
        name: 'Cloudedata VPS',
        description: `${plan.name} — ${selectedOs.name}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await verifyPayment.mutateAsync({
              instanceId: orderData.instanceId,
              razorpayPaymentId:  response.razorpay_payment_id,
              razorpayOrderId:    response.razorpay_order_id,
              razorpaySignature:  response.razorpay_signature,
            });
            navigate('/vps/paid');
            onClose();
          } catch (err) { console.error('Verification error:', err); }
        },
        prefill: { name: '', email: '' },
        theme: { color: '#6C63FF' },
      };

      new window.Razorpay(options).open();
    } catch (err) { console.error('Checkout error:', err); }
  };

  const strengthColors = ['', '#EF4444', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];
  const strengthLabels = ['', 'Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const isFormValid = hostname.trim() && rootPassword && passwordStrength >= 3;

  const S = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.45)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    },
    shell: {
      background: '#FFFFFF',
      borderRadius: '20px',
      boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '96vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',          // ← no scroll on shell
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    },
    /* Header */
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px 16px',
      borderBottom: '1px solid #F1F5F9',
      flexShrink: 0,
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
    headerIcon: {
      width: 40, height: 40, borderRadius: 12,
      background: 'linear-gradient(135deg, #6C63FF 0%, #9B8FFF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(108,99,255,0.35)',
    },
    headerTitle: { fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' },
    headerSub:   { fontSize: 12, color: '#94A3B8', marginTop: 1 },
    closeBtn: {
      width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
      background: '#F8FAFC', color: '#64748B', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      transition: 'all .15s',
    },
    /* Body — two column, no overflow */
    body: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden',          // ← lock overflow
      minHeight: 0,
    },
    /* Left panel */
    left: {
      flex: 1,
      padding: '20px 24px',
      borderRight: '1px solid #F1F5F9',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minWidth: 0,
      overflowY: 'auto',          // only left can scroll if content overflows
      scrollbarWidth: 'none',
    },
    /* Right panel */
    right: {
      width: 280,
      flexShrink: 0,
      padding: '20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    sectionLabel: {
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: '#94A3B8', marginBottom: 8,
    },
    /* OS Grid */
    osGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 7,
    },
    osCard: (active) => ({
      padding: '9px 10px',
      borderRadius: 12,
      border: `1.5px solid ${active ? '#6C63FF' : '#E2E8F0'}`,
      background: active ? 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FF 100%)' : '#FAFAFA',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 8,
      transition: 'all .15s',
      boxShadow: active ? '0 2px 12px rgba(108,99,255,0.15)' : 'none',
    }),
    osName: (active) => ({
      fontSize: 11, fontWeight: active ? 700 : 500,
      color: active ? '#4F46E5' : '#374151',
      lineHeight: 1.25,
    }),
    osTag: {
      fontSize: 8, fontWeight: 700, padding: '1px 5px',
      borderRadius: 4, background: '#DCFCE7', color: '#16A34A',
      letterSpacing: '0.05em', textTransform: 'uppercase',
    },
    /* Input */
    inputWrap: { position: 'relative' },
    input: {
      width: '100%', boxSizing: 'border-box',
      background: '#F8FAFC', border: '1.5px solid #E2E8F0',
      borderRadius: 12, padding: '11px 14px',
      fontSize: 13, color: '#0F172A',
      outline: 'none', transition: 'border-color .15s',
      fontFamily: 'inherit',
    },
    inputMono: {
      fontFamily: '"SF Mono","Fira Code",monospace',
      paddingRight: 48,
    },
    eyeBtn: {
      position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
      background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8',
      display: 'flex', alignItems: 'center', padding: 4,
    },
    /* Strength bar */
    strengthRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 },
    strengthTrack: {
      flex: 1, height: 4, borderRadius: 999,
      background: '#F1F5F9', overflow: 'hidden',
    },
    /* Tenure */
    tenureBtn: (active) => ({
      width: '100%', padding: '10px 14px',
      borderRadius: 12, border: `1.5px solid ${active ? '#6C63FF' : '#E2E8F0'}`,
      background: active ? 'linear-gradient(135deg, #F5F3FF, #EDE9FF)' : '#FAFAFA',
      cursor: 'pointer', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      boxShadow: active ? '0 2px 10px rgba(108,99,255,0.12)' : 'none',
      transition: 'all .15s',
    }),
    tenureLabel: (active) => ({
      fontSize: 13, fontWeight: active ? 700 : 500,
      color: active ? '#4F46E5' : '#374151',
    }),
    tenureDiscount: {
      fontSize: 9, fontWeight: 700, padding: '2px 6px',
      borderRadius: 20, background: '#D1FAE5', color: '#065F46',
      letterSpacing: '0.06em', textTransform: 'uppercase',
    },
    tenurePrice: (active) => ({
      fontSize: 13, fontWeight: 700,
      color: active ? '#4F46E5' : '#374151',
    }),
    /* Quantity */
    qtyRow: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 14px', borderRadius: 12,
      border: '1.5px solid #E2E8F0', background: '#FAFAFA',
    },
    qtyBtn: {
      width: 28, height: 28, borderRadius: 8,
      border: '1.5px solid #E2E8F0', background: '#FFF',
      cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: '#374151', transition: 'all .15s',
    },
    /* Summary card */
    summaryCard: {
      borderRadius: 14, background: '#F8FAFC',
      border: '1.5px solid #E2E8F0', padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
    },
    summaryRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 12, color: '#64748B',
    },
    totalRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingTop: 10, marginTop: 2, borderTop: '1px solid #E2E8F0',
    },
    totalLabel: { fontSize: 13, fontWeight: 700, color: '#0F172A' },
    totalAmount: { fontSize: 22, fontWeight: 800, color: '#6C63FF', letterSpacing: '-0.5px' },
    /* CTA */
    ctaBtn: {
      width: '100%', padding: '13px',
      borderRadius: 13, border: 'none', cursor: 'pointer',
      background: isFormValid
        ? 'linear-gradient(135deg, #6C63FF 0%, #9B8FFF 100%)'
        : '#E2E8F0',
      color: isFormValid ? '#FFF' : '#94A3B8',
      fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase',
      boxShadow: isFormValid ? '0 4px 20px rgba(108,99,255,0.35)' : 'none',
      transition: 'all .2s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      flexShrink: 0,
    },
  };

  if (!isOpen) return null;

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.shell}>

        {/* ── Header ── */}
        <div style={S.header}>
          <div style={S.headerLeft}>
            <div style={S.headerIcon}>
              <Server size={18} color="white" />
            </div>
            <div>
              <div style={S.headerTitle}>Configure {plan.name}</div>
              <div style={S.headerSub}>Customize your server before checkout</div>
            </div>
          </div>
          <button style={S.closeBtn} onClick={onClose}><X size={15}/></button>
        </div>

        {/* ── Body ── */}
        <div style={S.body}>

          {/* ── Left: OS + fields ── */}
          <div style={S.left}>

            {/* OS Selection */}
            <div>
              <div style={S.sectionLabel}>Operating System</div>
              <div style={S.osGrid}>
                {OS_OPTIONS.map((os) => {
                  const active = selectedOs.template === os.template;
                  return (
                    <button key={os.template} style={S.osCard(active)} onClick={() => setSelectedOs(os)}>
                      <OsIcon name={os.icon} size={26} />
                      <div style={{ minWidth: 0 }}>
                        <div style={S.osName(active)}>{os.name}</div>
                        {os.tag && <div style={S.osTag}>{os.tag}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hostname */}
            <div>
              <div style={S.sectionLabel}>Hostname</div>
              <div style={S.inputWrap}>
                <input
                  style={S.input}
                  type="text"
                  value={hostname}
                  onChange={(e) => setHostname(e.target.value)}
                  placeholder="my-awesome-vps"
                  onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
                  onBlur={(e)  => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
            </div>

            {/* Root Password */}
            <div>
              <div style={S.sectionLabel}>Root Password</div>
              <div style={S.inputWrap}>
                <input
                  style={{ ...S.input, ...S.inputMono }}
                  type={showPassword ? 'text' : 'password'}
                  value={rootPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter a strong password…"
                  onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
                  onBlur={(e)  => (e.target.style.borderColor = '#E2E8F0')}
                />
                <button style={S.eyeBtn} type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>

              {/* Strength */}
              {rootPassword && (
                <div>
                  <div style={S.strengthRow}>
                    <div style={S.strengthTrack}>
                      <div style={{
                        height: '100%', borderRadius: 999,
                        width: `${(passwordStrength / 5) * 100}%`,
                        background: strengthColors[passwordStrength] || '#E2E8F0',
                        transition: 'all .3s',
                      }}/>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: strengthColors[passwordStrength], whiteSpace: 'nowrap' }}>
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 5 }}>
                    {[
                      { ok: rootPassword.length >= 8, label: '8+ chars' },
                      { ok: /[A-Z]/.test(rootPassword), label: 'Uppercase' },
                      { ok: /[0-9]/.test(rootPassword), label: 'Number' },
                    ].map(({ ok, label }) => (
                      <span key={label} style={{
                        fontSize: 10, fontWeight: 600,
                        color: ok ? '#10B981' : '#CBD5E1',
                        display: 'flex', alignItems: 'center', gap: 3,
                      }}>
                        <span style={{ fontSize: 12 }}>{ok ? '✓' : '○'}</span> {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Tenure + Summary ── */}
          <div style={S.right}>

            {/* Tenure */}
            <div>
              <div style={S.sectionLabel}>Billing Tenure</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {TENURES.map((tenure) => {
                  const active = selectedTenure.months === tenure.months;
                  return (
                    <button key={tenure.months} style={S.tenureBtn(active)} onClick={() => setSelectedTenure(tenure)}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={S.tenureLabel(active)}>{tenure.label}</div>
                        {tenure.discount > 0 && (
                          <div style={{ ...S.tenureDiscount, marginTop: 2 }}>
                            Save {tenure.discount}%
                          </div>
                        )}
                      </div>
                      <div style={S.tenurePrice(active)}>
                        {formatINR(monthlyPrice * tenure.months * (1 - tenure.discount / 100))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div style={S.sectionLabel}>Quantity</div>
              <div style={S.qtyRow}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Instances</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button style={S.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={12}/>
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', minWidth: 18, textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button style={S.qtyBtn} onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={12}/>
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={S.summaryCard}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                Order Summary
              </div>
              <div style={S.summaryRow}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{formatINR(subtotal)}</span>
              </div>
              <div style={S.summaryRow}>
                <span>GST (18%)</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{formatINR(gst)}</span>
              </div>
              <div style={S.totalRow}>
                <span style={S.totalLabel}>Total Due</span>
                <span style={S.totalAmount}>{formatINR(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              style={S.ctaBtn}
              onClick={handleCheckout}
              disabled={!isFormValid || createOrder.isPending}
            >
              {createOrder.isPending ? 'Processing…' : (
                <>Proceed to Checkout <ChevronRight size={14}/></>
              )}
            </button>

            {/* Trust badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 2 }}>
              <Shield size={12} color="#94A3B8"/>
              <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500 }}>
                Secured by Razorpay · 256-bit SSL
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}