import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Eye, EyeOff, Server, Shield, ChevronRight } from 'lucide-react';
import { useCreateOrder, useVerifyPayment } from '../../hooks/useBilling';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { metaPixel } from '../../utils/metaPixel';
import { createPortal } from 'react-dom';

/* ─── useWindowSize hook ─────────────────────────────────────────────────── */
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

/* ─── Inject global scrollbar-hide styles once ───────────────────────────── */
if (typeof document !== 'undefined' && !document.getElementById('cfg-modal-styles')) {
  const style = document.createElement('style');
  style.id = 'cfg-modal-styles';
  style.textContent = `
    .cfg-scroll::-webkit-scrollbar { display: none; }
    .cfg-scroll { scrollbar-width: none; -ms-overflow-style: none; }
    .cfg-os-btn:hover  { transform: translateY(-1px); }
    .cfg-tenure-btn:hover { transform: translateY(-1px); }
    .cfg-qty-btn:hover { background: #F1F5F9 !important; }
    .cfg-close-btn:hover { background: #F1F5F9 !important; color: #0F172A !important; }
    .cfg-cta-btn:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(108,99,255,0.45) !important; }
    .cfg-cta-btn:disabled { cursor: not-allowed; }
    @keyframes cfg-fadein {
      from { opacity: 0; transform: scale(0.96) translateY(8px); }
      to   { opacity: 1; transform: scale(1)   translateY(0);    }
    }
    .cfg-shell { animation: cfg-fadein 0.22s cubic-bezier(0.16,1,0.3,1) forwards; }

    /* ── Responsive overrides ── */
    @media (max-width: 639px) {
      .cfg-body      { flex-direction: column !important; overflow-y: auto !important; }
      .cfg-left      { border-right: none !important; border-bottom: 1px solid #F1F5F9 !important; overflow-y: visible !important; }
      .cfg-right     { width: 100% !important; overflow-y: visible !important; }
      .cfg-os-grid   { grid-template-columns: repeat(2, 1fr) !important; }
      .cfg-shell     { border-radius: 16px !important; max-height: 92vh !important; }
      .cfg-header    { padding: 14px 16px 12px !important; }
      .cfg-total-amt { font-size: 18px !important; }
    }
    @media (min-width: 640px) and (max-width: 899px) {
      .cfg-body      { flex-direction: column !important; overflow-y: auto !important; }
      .cfg-left      { border-right: none !important; border-bottom: 1px solid #F1F5F9 !important; overflow-y: visible !important; }
      .cfg-right     { width: 100% !important; overflow-y: visible !important; }
      .cfg-os-grid   { grid-template-columns: repeat(3, 1fr) !important; }
      .cfg-tenure-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 6px !important; }
      .cfg-shell     { max-height: 94vh !important; }
    }
  `;
  document.head.appendChild(style);
}

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
    window: (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="#ffffff"/>
        <rect x="20" y="20" width="27" height="27" rx="2" fill="#F25022"/>
        <rect x="53" y="20" width="27" height="27" rx="2" fill="#7FBA00"/>
        <rect x="20" y="53" width="27" height="27" rx="2" fill="#00A4EF"/>
        <rect x="53" y="53" width="27" height="27" rx="2" fill="#FFB900"/>
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


const LINUX_OS = [
  { name: 'Ubuntu 22.04',        template: 'ubuntu-22.04-x86_64',      icon: 'ubuntu' },
  { name: 'AlmaLinux 9',         template: 'alma-9-x86_64',            icon: 'alma'   },
  { name: 'Debian 11 Bullseye',  template: 'debian-11-x86_64',         icon: 'debian' },
  { name: 'Ubuntu 24.04 LTS',    template: 'ubuntu-24.04-x86_64',      icon: 'ubuntu', tag: 'LTS'    },
  { name: 'AlmaLinux 10',        template: 'almalinux-10.1-x86_64',    icon: 'alma'   },
  { name: 'Debian 12 Bookworm',  template: 'debian-12-x86_64',         icon: 'debian', tag: 'Stable' },
  { name: 'CentOS Stream 10',    template: 'centos-10.0-x86_64',       icon: 'centos' },
  { name: 'Rocky 10',     template: 'rocky-10.1-x86_64',          icon: 'rocky' },
  
  // { name: 'Fedora 42',           template: 'fedora-42-x86_64',         icon: 'fedora' },
];
const WINDOWS_OS = [
  { name: 'Windows 2019', template: 'windows-2019-scsi-virtio', icon: 'window' },
  { name: 'Windows 2022', template: 'windows-2022-scsi-virtio', icon: 'window' },
];
const TENURES = [
  { months: 48, label: '4 Years', discount: 45 },
  { months: 36, label: '3 Years', discount: 35 },
  { months: 24, label: '2 Years', discount: 20 },
  { months: 12, label: '1 Year',  discount: 10 },
  { months: 1,  label: 'Monthly', discount: 0  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ConfigurationModal({ plan, isOpen, onClose, type }) {
  console.log('ConfigurationModal received plan:', plan);
  const { width } = useWindowSize();
  const isMobile  = width < 640;
  const isTablet  = width >= 640 && width < 900;
  const isSmall   = isMobile || isTablet;          // stacked layout

  const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toLocaleString()}`;

  const OS_OPTIONS = type === 'windows' ? WINDOWS_OS : LINUX_OS;

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOs,       setSelectedOs]       = useState(OS_OPTIONS[0]);
  const [selectedTenure,   setSelectedTenure]   = useState(TENURES[1]);
  const [quantity,         setQuantity]         = useState(1);
  const [hostname,         setHostname]         = useState(`${plan.slug}-server`);
  const [rootPassword,     setRootPassword]     = useState('');
  const [showPassword,     setShowPassword]     = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { user }      = useAuthStore();
  const createOrder   = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const monthlyPrice = plan.priceMonthly;
  const subtotal     = monthlyPrice * selectedTenure.months * (1 - selectedTenure.discount / 100) * quantity;
  const gst          = subtotal * 0.18;
  const total        = subtotal + gst;

  const checkPasswordStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8)      s++;
    if (/[a-z]/.test(pw))   s++;
    if (/[A-Z]/.test(pw))   s++;
    if (/[0-9]/.test(pw))   s++;
    if (/[$@#&!]/.test(pw)) s++;
    setPasswordStrength(s);
  };
  const handlePasswordChange = (e) => { setRootPassword(e.target.value); checkPasswordStrength(e.target.value); };

  const validatePassword = () => {
    if (rootPassword.length < 8)     { toast.error('Minimum 8 characters required');       return false; }
    if (!/[A-Z]/.test(rootPassword)) { toast.error('Add at least one uppercase letter');   return false; }
    if (!/[0-9]/.test(rootPassword)) { toast.error('Add at least one number');             return false; }
    return true;
  };


const handleCheckout = async () => {
  if (!user) {
    toast.error('Please login to continue');
    navigate('/login', { state: { from: "/vps" } });
    return;
  }
  if (!hostname.trim())  { toast.error('Please enter a hostname'); return; }
  if (!rootPassword)     { toast.error('Please enter a root password'); return; }
  if (!validatePassword()) return;
  
  //  Get planId correctly
  const planId = plan.id || plan._id;
  
  if (!planId) {
    console.error(' No plan ID found in plan object:', plan);
    toast.error('Plan information missing');
    return;
  }
  
 
  
  try {
    if (!window.Razorpay) { 
      toast.error('Razorpay not loaded — please refresh'); 
      return; 
    }

     metaPixel.initiateCheckout();
    
    const orderData = await createOrder.mutateAsync({
      planId: plan.id || plan._id,
      planType: 'vps',
      os: { 
        name: selectedOs.name, 
        template: selectedOs.template 
      },
      tenureMonths: selectedTenure.months,
      hostname: hostname,
      rootPassword: rootPassword,
      userEmail: user?.email,
    });
    
    console.log(' Order created:', orderData);
    
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Cloudedata VPS',
      description: `${plan.name} — ${selectedOs.name}`,
      order_id: orderData.orderId,
      handler: async (response) => {
        try {
           console.log(' Razorpay response:', response);
           await verifyPayment.mutateAsync({
      instanceId: orderData.instanceId,
      razorpay_payment_id: response.razorpay_payment_id,    
      razorpay_order_id: response.razorpay_order_id,       
      razorpay_signature: response.razorpay_signature,     
      planType: 'vps'
    });
    const totalAmount = orderData.amount / 100; 
    metaPixel.purchase(totalAmount, 'INR');
          navigate('/vps/paid');
          onClose();
        } catch (err) { 
          console.error('Verification error:', err); 
        }
      },
      prefill: { 
        name: user?.name || '', 
        email: user?.email || '' 
      },
      theme: { color: '#6C63FF' },
      modal: {
        ondismiss: () => {
          toast.error('Payment cancelled');
        }
      },
    };
    new window.Razorpay(options).open();
  } catch (err) { 
    console.error('Checkout error:', err); 
  }
};

  const strengthColors = ['', '#EF4444', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];
  const strengthLabels = ['', 'Weak',    'Weak',    'Fair',    'Good',    'Strong'];
  const isFormValid    = hostname.trim() && rootPassword && passwordStrength >= 3;

  /* ── Responsive style helpers ── */
  const p  = isMobile ? 16 : 24;       // base padding
  const hp = isMobile ? 14 : 20;       // header padding

  const S = {
    overlay: {
  position: 'fixed',
  inset: 0,
  zIndex: 2147483646, 
  background: 'rgba(15,23,42,0.50)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: isMobile ? 'flex-end' : 'center',
  justifyContent: 'center',
  padding: isMobile ? 0 : '16px',
},
    shell: {
  position: 'relative',
  zIndex: 2147483647,

  background: '#FFFFFF',
  borderRadius: isMobile ? '20px 20px 0 0' : '20px',
  boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
  width: '100%',
  maxWidth: isSmall ? '100%' : '920px',
  maxHeight: isMobile ? '92vh' : '96vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
},
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${hp}px ${isMobile ? 16 : 28}px ${isMobile ? 12 : 16}px`,
      borderBottom: '1px solid #F1F5F9',
      flexShrink: 0,
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 12 },
    headerIcon: {
      width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: 12,
      background: 'linear-gradient(135deg, #6C63FF 0%, #9B8FFF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(108,99,255,0.35)',
      flexShrink: 0,
    },
    headerTitle: { fontSize: isMobile ? 14 : 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' },
    headerSub:   { fontSize: isMobile ? 11 : 12, color: '#94A3B8', marginTop: 1 },
    closeBtn: {
      width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
      background: '#F8FAFC', color: '#64748B',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all .15s', flexShrink: 0,
    },
    /* Body */
    body: {
      display: 'flex',
      flex: 1,
      flexDirection: isSmall ? 'column' : 'row',
      overflow: isSmall ? 'auto' : 'hidden',
      minHeight: 0,
    },
    left: {
      flex: 1,
      padding: `${isMobile ? 16 : 20}px ${p}px`,
      borderRight: isSmall ? 'none' : '1px solid #F1F5F9',
      borderBottom: isSmall ? '1px solid #F1F5F9' : 'none',
      display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 16,
      minWidth: 0,
      overflowY: isSmall ? 'visible' : 'auto',
    },
    right: {
      width: isSmall ? '100%' : 288,
      flexShrink: 0,
      padding: `${isMobile ? 16 : 20}px ${isMobile ? 16 : 20}px`,
      display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 14,
      overflowY: isSmall ? 'visible' : 'auto',
    },
    sectionLabel: {
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: '#94A3B8', marginBottom: 8,
    },
    /* OS Grid */
    osGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? 6 : 7,
    },
    osCard: (active) => ({
      padding: isMobile ? '8px' : '9px 10px',
      borderRadius: 12,
      border: `1.5px solid ${active ? '#6C63FF' : '#E2E8F0'}`,
      background: active ? 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FF 100%)' : '#FAFAFA',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8,
      transition: 'all .15s',
      boxShadow: active ? '0 2px 12px rgba(108,99,255,0.15)' : 'none',
    }),
    osName: (active) => ({
      fontSize: isMobile ? 10 : 11, fontWeight: active ? 700 : 500,
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
      borderRadius: 12, padding: isMobile ? '10px 12px' : '11px 14px',
      fontSize: isMobile ? 14 : 13, color: '#0F172A',
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
    strengthRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 },
    strengthTrack: {
      flex: 1, height: 4, borderRadius: 999,
      background: '#F1F5F9', overflow: 'hidden',
    },
    /* Tenure */
    tenureWrap: {
      display: isTablet ? 'grid' : 'flex',
      gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : undefined,
      flexDirection: isTablet ? undefined : 'column',
      gap: 6,
    },
    tenureBtn: (active) => ({
      width: '100%', padding: isMobile ? '9px 12px' : '10px 14px',
      borderRadius: 12, border: `1.5px solid ${active ? '#6C63FF' : '#E2E8F0'}`,
      background: active ? 'linear-gradient(135deg, #F5F3FF, #EDE9FF)' : '#FAFAFA',
      cursor: 'pointer', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      boxShadow: active ? '0 2px 10px rgba(108,99,255,0.12)' : 'none',
      transition: 'all .15s',
    }),
    tenureLabel: (active) => ({
      fontSize: isMobile ? 12 : 13, fontWeight: active ? 700 : 500,
      color: active ? '#4F46E5' : '#374151',
    }),
    tenureDiscount: {
      fontSize: 8, fontWeight: 700, padding: '2px 6px',
      borderRadius: 20, background: '#D1FAE5', color: '#065F46',
      letterSpacing: '0.06em', textTransform: 'uppercase',
    },
    tenurePrice: (active) => ({
      fontSize: isMobile ? 12 : 13, fontWeight: 700,
      color: active ? '#4F46E5' : '#374151',
    }),
    summaryCard: {
      borderRadius: 14, background: '#F8FAFC',
      border: '1.5px solid #E2E8F0', padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
    },
    summaryRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: isMobile ? 13 : 12, color: '#64748B',
    },
    totalRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingTop: 10, marginTop: 2, borderTop: '1px solid #E2E8F0',
    },
    totalLabel:  { fontSize: 13, fontWeight: 700, color: '#0F172A' },
    totalAmount: { fontSize: isMobile ? 18 : 22, fontWeight: 800, color: '#3e38ad', letterSpacing: '-0.5px' },
    ctaBtn: {
      width: '100%', padding: isMobile ? '14px' : '13px',
      borderRadius: 13, border: 'none', cursor: 'pointer',
      background: isFormValid
        ? 'linear-gradient(135deg, #1a11ce 0%, #292079 100%)'
        : '#E2E8F0',
      color: isFormValid ? '#FFF' : '#94A3B8',
      fontSize: isMobile ? 14 : 13, fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase',
      boxShadow: isFormValid ? '0 4px 20px rgba(108,99,255,0.35)' : 'none',
      transition: 'all .2s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      flexShrink: 0,
    },
    /* Bottom safe area on mobile */
    safeArea: { height: isMobile ? 'env(safe-area-inset-bottom, 8px)' : 0 },
  };

  if (!isOpen) return null;

  return createPortal(
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.shell} className="cfg-shell">

        {/* ── Header ── */}
        <div style={S.header} className="cfg-header">
          <div style={S.headerLeft}>
            <div style={S.headerIcon}>
              <Server size={isMobile ? 16 : 18} color="white" />
            </div>
            <div>
              <div style={S.headerTitle}>Configure {plan.name}</div>
              {!isMobile && <div style={S.headerSub}>Customize your server before checkout</div>}
            </div>
          </div>
          <button style={S.closeBtn} className="cfg-close-btn" onClick={onClose}>
            <X size={15}/>
          </button>
        </div>

        {/* ── Body ── */}
        <div style={S.body} className="cfg-body cfg-scroll">

          {/* ── Left: OS + Fields ── */}
          <div style={S.left} className="cfg-left cfg-scroll">

            {/* OS Selection */}
            <div>
              <div style={S.sectionLabel}>Operating System</div>
              <div style={S.osGrid} className="cfg-os-grid">
                {OS_OPTIONS.map((os) => {
                  const active = selectedOs.template === os.template;
                  return (
                    <button
                      key={os.template}
                      style={S.osCard(active)}
                      className="cfg-os-btn"
                      onClick={() => setSelectedOs(os)}
                    >
                      <OsIcon name={os.icon} size={isMobile ? 22 : 26} />
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
                      { ok: rootPassword.length >= 8,     label: '8+ chars'  },
                      { ok: /[A-Z]/.test(rootPassword),   label: 'Uppercase' },
                      { ok: /[0-9]/.test(rootPassword),   label: 'Number'    },
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
          <div style={S.right} className="cfg-right cfg-scroll">

            {/* Tenure */}
            <div>
              <div style={S.sectionLabel}>Billing Tenure</div>
              <div style={S.tenureWrap} className="cfg-tenure-grid">
                {TENURES.map((tenure) => {
                  const active = selectedTenure.months === tenure.months;
                  return (
                    <button
                      key={tenure.months}
                      style={S.tenureBtn(active)}
                      className="cfg-tenure-btn"
                      onClick={() => setSelectedTenure(tenure)}
                    >
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
              className="cfg-cta-btn"
              onClick={handleCheckout}
              disabled={!isFormValid || createOrder.isPending}
            >
              {createOrder.isPending ? 'Processing…' : (
                <>Proceed to Checkout <ChevronRight size={14}/></>
              )}
            </button>

            {/* Trust badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Shield size={12} color="#94A3B8"/>
              <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500 }}>
                Secured by Razorpay · 256-bit SSL
              </span>
            </div>

            {/* Safe-area spacer for mobile home bars */}
            <div style={S.safeArea}/>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}