import { useState } from "react";

const DishIllustration = () => (
  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "280px", height: "280px" }}>
    {/* Thali plate */}
    <circle cx="140" cy="155" r="95" fill="#3d2513" stroke="#6b4025" strokeWidth="2.5" />
    <circle cx="140" cy="155" r="85" fill="#4a2c18" stroke="#7a4a2a" strokeWidth="1" />

    {/* Steaming rice mound in center */}
    <ellipse cx="140" cy="165" rx="38" ry="16" fill="#faf5e6" opacity="0.9" />
    <ellipse cx="140" cy="160" rx="32" ry="12" fill="#fffef2" opacity="0.95" />
    {/* Rice grains */}
    <path d="M128 158 Q130 155 132 158" stroke="#e8dcc0" strokeWidth="1" fill="none" />
    <path d="M138 155 Q140 152 142 155" stroke="#e8dcc0" strokeWidth="1" fill="none" />
    <path d="M148 158 Q150 155 152 158" stroke="#e8dcc0" strokeWidth="1" fill="none" />
    {/* Steam wisps */}
    <path d="M135 148 Q133 140 136 134" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.3" />
    <path d="M140 145 Q138 137 141 131" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.25" />
    <path d="M145 148 Q143 140 146 134" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.3" />

    {/* Dal / curry bowl left */}
    <circle cx="112" cy="150" r="24" fill="#2a1a0c" stroke="#603020" strokeWidth="1.5" />
    <ellipse cx="112" cy="148" rx="20" ry="10" fill="#e8a52a" opacity="0.85" />
    <ellipse cx="112" cy="146" rx="14" ry="6" fill="#f0c040" opacity="0.6" />
    {/* Tadka / spices on dal */}
    <circle cx="108" cy="145" r="1.8" fill="#8b4513" />
    <circle cx="115" cy="143" r="1.5" fill="#8b4513" />
    <circle cx="112" cy="142" r="1.3" fill="#a0522d" />

    {/* Paneer / vegetable curry bowl right */}
    <circle cx="168" cy="150" r="24" fill="#2a1a0c" stroke="#603020" strokeWidth="1.5" />
    <ellipse cx="168" cy="148" rx="20" ry="10" fill="#d86c20" opacity="0.9" />
    <ellipse cx="168" cy="146" rx="14" ry="6" fill="#f09030" opacity="0.5" />
    {/* Curry pieces */}
    <rect x="162" y="145" width="4" height="4" rx="1" fill="#faf0d7" opacity="0.7" />
    <rect x="170" y="143" width="5" height="5" rx="1" fill="#faf0d7" opacity="0.7" />

    {/* Green chutney / pickle bottom left */}
    <circle cx="122" cy="178" r="10" fill="#2b5a1e" stroke="#3c7a2a" strokeWidth="1" opacity="0.9" />

    {/* Roti / naan top right */}
    <ellipse cx="162" cy="132" rx="16" ry="10" fill="#e0b878" transform="rotate(-15 162 132)" opacity="0.9" />
    <ellipse cx="162" cy="132" rx="14" ry="8" fill="#f0d090" transform="rotate(-15 162 132)" opacity="0.7" />
    {/* Brown spots on roti */}
    <circle cx="158" cy="131" r="2" fill="#c28a4a" opacity="0.5" />
    <circle cx="165" cy="134" r="1.8" fill="#c28a4a" opacity="0.5" />

    {/* Papad standing behind */}
    <path d="M92 162 Q96 120 100 115 Q104 120 108 162" fill="#dca56a" stroke="#b07840" strokeWidth="1" opacity="0.8" />
    <path d="M96 160 Q98 125 100 118" stroke="#c89a58" strokeWidth="0.8" fill="none" />
  </svg>
);

const styles = {
  bannerWrap:
     {marginTop:"4rem" ,
    display: "flex",
    alignItems: "center",
    minHeight: "520px",
    background: "#1a0f07",
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
  },
  bgTexture: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 20% 50%, #2e1a0e 0%, #1a0f07 60%)",
    zIndex: 0,
  },
  leftContent: {
    flex: 1,
    padding: "56px 48px",
    position: "relative",
    zIndex: 2,
  },
  badge: {
    display: "inline-block",
    background: "#c8822a",
    color: "#fff8ee",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: "100px",
    marginBottom: "24px",
  },
  mainHeading: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "clamp(36px, 4vw, 52px)",
    fontWeight: 700,
    color: "#f5e6c8",
    lineHeight: 1.15,
    margin: "0 0 8px",
  },
  accent: {
    color: "#c8822a",
    fontStyle: "italic",
  },
  subHeading: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "22px",
    fontWeight: 400,
    color: "#a07850",
    margin: "0 0 24px",
    fontStyle: "italic",
  },
  divider: {
    width: "48px",
    height: "2px",
    background: "#c8822a",
    marginBottom: "24px",
    borderRadius: "2px",
  },
  quote: {
    fontSize: "15px",
    color: "#9e8670",
    lineHeight: 1.75,
    maxWidth: "380px",
    marginBottom: "40px",
    fontWeight: 300,
  },
  statsRow: {
    display: "flex",
    gap: "28px",
    marginBottom: "40px",
  },
  statNum: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#c8822a",
  },
  statLabel: {
    fontSize: "11px",
    color: "#7a6050",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    fontWeight: 400,
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "#c8822a",
    color: "#fff8ee",
    fontSize: "14px",
    fontWeight: 500,
    padding: "14px 32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "background 0.2s, transform 0.15s",
  },
  rightPanel: {
    marginRight: "4rem",
    width: "420px",
    minHeight: "520px",
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dishCircle: {
    width: "340px",
    height: "340px",
    borderRadius: "50%",
    background: "#2a1608",
    border: "2px solid #3d2010",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0 80px #c8822a22",
  },
  accentRing: {
    position: "absolute",
    width: "370px",
    height: "370px",
    borderRadius: "50%",
    border: "1px dashed #c8822a44",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
  cornerDeco: {
    position: "absolute",
    top: "32px",
    right: "32px",
    width: "80px",
    height: "80px",
    borderTop: "1px solid #c8822a33",
    borderRight: "1px solid #c8822a33",
    borderRadius: "0 12px 0 0",
    zIndex: 1,
  },
  cornerDeco2: {
    position: "absolute",
    bottom: "32px",
    left: "32px",
    width: "80px",
    height: "80px",
    borderBottom: "1px solid #c8822a33",
    borderLeft: "1px solid #c8822a33",
    borderRadius: "0 0 0 12px",
    zIndex: 1,
  },
};

export default function Banner() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.bannerWrap}>
        <div style={styles.bgTexture} />
        <div style={styles.cornerDeco} />
        <div style={styles.cornerDeco2} />

        {/* Left Content */}
        <div style={styles.leftContent}>
          <div style={styles.badge}>✦ Restaurant Management System</div>

          <h1 style={styles.mainHeading}>
            Taste the Art<br />
            of <span style={styles.accent}>Smart Dining</span>
          </h1>

          <p style={styles.subHeading}>Where flavour meets flawless ops</p>

          <div style={styles.divider} />

          <p style={styles.quote}>
            Streamline your kitchen, delight every guest, and grow your
            restaurant — all from one powerful platform built for modern dining.
          </p>

          <div style={styles.statsRow}>
            {[
              { num: "500+", label: "Restaurants" },
              { num: "98%", label: "Uptime" },
              { num: "2M+", label: "Orders Managed" },
            ].map((s) => (
              <div key={s.label}>
                <div style={styles.statNum}>{s.num}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          <button
            style={{
              ...styles.ctaBtn,
              ...(hovered ? { background: "#e09535", transform: "translateY(-2px)" } : {}),
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Get Started Free
            <span style={{ fontSize: "18px", transition: "transform 0.2s", ...(hovered ? { transform: "translateX(4px)" } : {}) }}>
              →
            </span>
          </button>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.accentRing} />
          <div style={styles.dishCircle}>
            <DishIllustration />
          </div>
        </div>
      </div>
    </>
  );
}