// EmailConfigModal.jsx  ← new file, same folder as EmailPlanPage

import React, { useState } from 'react';
import { X, Mail, Shield, ChevronRight, Globe, Check } from 'lucide-react';

const TENURES = [
  { months: 48, label: '4 Years',  discount: 30 },
  { months: 24, label: '2 Years',  discount: 15 },
  { months: 12, label: '1 Year',   discount: 0  },
  { months: 1,  label: 'Monthly',  discount: 0, surcharge: true },
];

export default function EmailConfigModal({ plan, isOpen, onClose, onConfirm }) {
  const [domain, setDomain]           = useState('');
  const [domainError, setDomainError] = useState('');
  const [selectedTenure, setTenure]   = useState(
    plan?.workspaceAllowedPeriods
      ? TENURES.find(t => t.months === plan.workspaceAllowedPeriods[0]) ?? TENURES[2]
      : TENURES[0]
  );

  if (!isOpen || !plan) return null;

  /* ── price math ── */
  const factor       = plan.discountFactors?.[selectedTenure.months] ?? 1;
  const monthlyPrice = plan.basePriceMonthly * factor;          // per mailbox/month
  const subtotal     = monthlyPrice * selectedTenure.months;    // total before GST
  const gst          = subtotal * 0.18;
  const total        = subtotal + gst;

  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  /* ── domain validation ── */
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  const handleDomainBlur = () => {
    if (domain && !domainRegex.test(domain))
      setDomainError('Enter a valid domain e.g. yourbusiness.com');
    else setDomainError('');
  };

  const isValid = domain.trim() && !domainError;

  /* ── inline styles (mirrors ConfigurationModal pattern) ── */
  const S = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.45)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    },
    shell: {
      background: '#FFFFFF',
      borderRadius: 20,
      boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
      width: '100%', maxWidth: 760,
      maxHeight: '92vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
    },
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px 16px',
      borderBottom: '1px solid #F1F5F9', flexShrink: 0,
    },
    headerIcon: {
      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
      background: 'linear-gradient(135deg,#6C63FF 0%,#9B8FFF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(108,99,255,0.35)',
    },
    body: { display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 },
    left: {
      flex: 1, padding: '28px 28px',
      borderRight: '1px solid #F1F5F9',
      display: 'flex', flexDirection: 'column', gap: 24,
      overflowY: 'auto', scrollbarWidth: 'none',
    },
    right: {
      width: 270, flexShrink: 0,
      padding: '24px 20px',
      display: 'flex', flexDirection: 'column', gap: 14,
      overflowY: 'auto', scrollbarWidth: 'none',
      background: '#FAFBFF',
    },
    label: {
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: '#94A3B8', marginBottom: 8,
      display: 'block',
    },
    input: (hasError) => ({
      width: '100%', boxSizing: 'border-box',
      background: '#F8FAFC',
      border: `1.5px solid ${hasError ? '#EF4444' : '#E2E8F0'}`,
      borderRadius: 12, padding: '12px 14px 12px 42px',
      fontSize: 14, color: '#0F172A',
      outline: 'none', transition: 'border-color .15s',
      fontFamily: 'inherit',
    }),
    tenureBtn: (active) => ({
      width: '100%', padding: '10px 14px',
      borderRadius: 12,
      border: `1.5px solid ${active ? '#6C63FF' : '#E2E8F0'}`,
      background: active ? 'linear-gradient(135deg,#F5F3FF,#EDE9FF)' : '#FAFAFA',
      cursor: 'pointer',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: active ? '0 2px 10px rgba(108,99,255,0.12)' : 'none',
      transition: 'all .15s',
    }),
    summaryCard: {
      borderRadius: 14, background: '#F8FAFC',
      border: '1.5px solid #E2E8F0', padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 8,
    },
    ctaBtn: (valid) => ({
      width: '100%', padding: 13,
      borderRadius: 13, border: 'none', cursor: valid ? 'pointer' : 'not-allowed',
      background: valid
        ? 'linear-gradient(135deg,#1a11ce 0%,#292079 100%)'
        : '#E2E8F0',
      color: valid ? '#FFF' : '#94A3B8',
      fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase',
      boxShadow: valid ? '0 4px 20px rgba(108,99,255,0.35)' : 'none',
      transition: 'all .2s',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }),
  };

  /* ── tenure row ── */
  const allowedMonths = plan.workspaceAllowedPeriods ?? [48, 24, 12, 1];
  const tenures = TENURES.filter(t => allowedMonths.includes(t.months));

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.shell}>

        {/* Header */}
        <div style={S.header}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={S.headerIcon}><Mail size={18} color="white"/></div>
            <div>
              <div style={{ fontSize:17, fontWeight:700, color:'#0F172A', letterSpacing:'-0.3px' }}>
                Configure {plan.name}
              </div>
              <div style={{ fontSize:12, color:'#94A3B8', marginTop:1 }}>
                Set up your business email
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width:32, height:32, borderRadius:8, border:'none', cursor:'pointer',
              background:'#F8FAFC', color:'#64748B', display:'flex',
              alignItems:'center', justifyContent:'center' }}
          >
            <X size={15}/>
          </button>
        </div>

        {/* Body */}
        <div style={S.body}>

          {/* ── LEFT ── */}
          <div style={S.left}>

            {/* Hero blurb */}
            <div style={{
              background:'linear-gradient(135deg,#F5F3FF 0%,#EEF2FF 100%)',
              borderRadius:16, padding:'18px 20px',
              border:'1px solid #E0E7FF',
            }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#4F46E5', marginBottom:6 }}>
                {plan.name}
              </div>
              <div style={{ fontSize:12, color:'#6B7280', lineHeight:1.6 }}>
                {plan.description}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:12 }}>
                {plan.features.slice(0, 3).map((f, i) => (
                  <span key={i} style={{
                    display:'flex', alignItems:'center', gap:4,
                    fontSize:10, fontWeight:600, color:'#4F46E5',
                    background:'#EDE9FF', borderRadius:20, padding:'3px 8px',
                  }}>
                    <Check size={10}/> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Domain input */}
            <div>
              <label style={S.label}>Your Business Domain</label>
              <p style={{ fontSize:12, color:'#64748B', marginBottom:12, lineHeight:1.6 }}>
                Enter the domain you want to use for your business emails
                (e.g. <strong>yourcompany.com</strong>). Make sure you own this domain —
                you'll need to add DNS records after purchase.
              </p>
              <div style={{ position:'relative' }}>
                {/* Globe icon inside input */}
                <Globe
                  size={16}
                  style={{ position:'absolute', left:13, top:'50%',
                    transform:'translateY(-50%)', color:'#94A3B8', pointerEvents:'none' }}
                />
                <input
                  style={S.input(!!domainError)}
                  type="text"
                  value={domain}
                  placeholder="yourbusiness.com"
                  onChange={(e) => { setDomain(e.target.value); setDomainError(''); }}
                  onBlur={handleDomainBlur}
                  onFocus={(e) => (e.target.style.borderColor = '#6C63FF')}
                />
              </div>
              {domainError && (
                <p style={{ fontSize:11, color:'#EF4444', marginTop:6, fontWeight:500 }}>
                  ⚠ {domainError}
                </p>
              )}
              {domain && !domainError && (
                <p style={{ fontSize:11, color:'#10B981', marginTop:6, fontWeight:600,
                  display:'flex', alignItems:'center', gap:4 }}>
                  <Check size={12}/> Looks good! Emails will be like you@{domain}
                </p>
              )}
            </div>

            {/* DNS info note */}
            <div style={{
              background:'#FFFBEB', borderRadius:12, padding:'12px 16px',
              border:'1px solid #FDE68A',
              display:'flex', gap:10, alignItems:'flex-start',
            }}>
              <span style={{ fontSize:16, flexShrink:0 }}>ℹ️</span>
              <p style={{ fontSize:11, color:'#92400E', lineHeight:1.6, margin:0 }}>
                After checkout you'll receive DNS records (MX, SPF, DKIM) to add to your
                domain registrar. This usually takes 10–30 minutes to propagate.
              </p>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={S.right}>

            {/* Billing Tenure */}
            <div>
              <div style={S.label}>Billing Tenure</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {tenures.map((tenure) => {
                  const active   = selectedTenure.months === tenure.months;
                  const mFactor  = plan.discountFactors?.[tenure.months] ?? 1;
                  const mPrice   = plan.basePriceMonthly * mFactor;
                  const tenTotal = mPrice * tenure.months;
                  return (
                    <button key={tenure.months} style={S.tenureBtn(active)}
                      onClick={() => setTenure(tenure)}>
                      <div style={{ textAlign:'left' }}>
                        <div style={{ fontSize:13, fontWeight: active ? 700 : 500,
                          color: active ? '#4F46E5' : '#374151' }}>
                          {tenure.label}
                        </div>
                        {tenure.discount > 0 && (
                          <div style={{ fontSize:9, fontWeight:700, marginTop:2,
                            padding:'1px 6px', borderRadius:20,
                            background:'#D1FAE5', color:'#065F46',
                            display:'inline-block', letterSpacing:'0.06em',
                            textTransform:'uppercase' }}>
                            Save {tenure.discount}%
                          </div>
                        )}
                        {tenure.surcharge && (
                          <div style={{ fontSize:9, fontWeight:700, marginTop:2,
                            padding:'1px 6px', borderRadius:20,
                            background:'#FEE2E2', color:'#991B1B',
                            display:'inline-block' }}>
                            +50% vs annual
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize:12, fontWeight:700,
                        color: active ? '#4F46E5' : '#374151' }}>
                        {fmt(tenTotal)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div style={S.summaryCard}>
              <div style={{ fontSize:10, fontWeight:700, color:'#94A3B8',
                letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>
                Order Summary
              </div>

              {/* rows */}
              {[
                { label:`${selectedTenure.label} plan`, value: fmt(subtotal) },
                { label:'GST (18%)',                    value: fmt(gst) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between',
                  fontSize:12, color:'#64748B' }}>
                  <span>{label}</span>
                  <span style={{ fontWeight:600, color:'#374151' }}>{value}</span>
                </div>
              ))}

              {/* monthly breakdown */}
              <div style={{ display:'flex', justifyContent:'space-between',
                fontSize:11, color:'#94A3B8', fontStyle:'italic' }}>
                <span>≈ per month</span>
                <span>{fmt((total) / selectedTenure.months)}/mo</span>
              </div>

              {/* total */}
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', paddingTop:10, marginTop:2,
                borderTop:'1px solid #E2E8F0' }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#0F172A' }}>Total Due</span>
                <span style={{ fontSize:22, fontWeight:800, color:'#3e38ad',
                  letterSpacing:'-0.5px' }}>{fmt(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              style={S.ctaBtn(isValid)}
              disabled={!isValid}
              onClick={() => isValid && onConfirm({ plan, domain, tenure: selectedTenure, total })}
            >
              Proceed to Checkout <ChevronRight size={14}/>
            </button>

            <div style={{ display:'flex', alignItems:'center',
              justifyContent:'center', gap:6 }}>
              <Shield size={12} color="#94A3B8"/>
              <span style={{ fontSize:10, color:'#94A3B8', fontWeight:500 }}>
                Secured by Razorpay · 256-bit SSL
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}