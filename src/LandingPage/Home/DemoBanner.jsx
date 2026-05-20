import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const STATS = [
  { value: "99.99", suffix: "%", label: "Uptime SLA" },
  { value: "12", suffix: "K+", label: "Active Users" },
  { value: "8", suffix: "ms", label: "Avg Latency" },
];

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const end = parseFloat(value);
    if (isNaN(end)) return;
    let start = 0;
    const step = end / 50;
    const t = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplay(end);
        clearInterval(t);
      } else {
        setDisplay(parseFloat(start.toFixed(2)));
      }
    }, 25);
    return () => clearInterval(t);
  }, [value]);
  return <>{display}{suffix}</>;
}

/* ── Floating orb ── */
function Orb({ style, delay = 0 }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(120px)",
        pointerEvents: "none",
        ...style,
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ── Particle system ── */
function Particles() {
  const dots = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.4)",
          }}
          animate={{ y: [0, -25, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Banner() {
  const sectionRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const gY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <>
      {/* Professional font: Inter */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <section
        id="hero-banner"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className=" relative w-full overflow-hidden"
        style={{
          minHeight: "100svh",
          background: "#000000",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ════ BACKGROUND LAYERS ════ */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Dark tech background image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/assets/tech-background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.15,
              filter: "brightness(0.6) contrast(1.2)",
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Tech grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse 100% 70% at 50% 30%, black 20%, transparent 90%)",
            }}
          />

          {/* Noise texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating orbs */}
          <Orb
            delay={0}
            style={{
              left: "10%",
              top: "15%",
              width: 500,
              height: 500,
              background: "rgba(139,92,246,0.12)",
            }}
          />
          <Orb
            delay={4}
            style={{
              right: "5%",
              top: "45%",
              width: 420,
              height: 420,
              background: "rgba(124,58,237,0.1)",
            }}
          />
          <Orb
            delay={2}
            style={{
              left: "50%",
              top: "-5%",
              width: 350,
              height: 350,
              background: "rgba(167,139,250,0.08)",
            }}
          />

          {/* Cursor glow */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              x: gX,
              y: gY,
              width: 700,
              height: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)",
            }}
          />

          <Particles />

          {/* Vignette edges */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)",
            }}
          />

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))",
            }}
          />
        </div>

        {/* ════ FLOATING NAVBAR ════ */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: 28,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: "0 24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 1100,
              padding: "12px 20px",
              borderRadius: 50,
              background: "rgba(18,18,18,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.08) inset",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src="Cloudedata.svg" alt="cloudedata" 
                style={{ height: 32, width: "auto", objectFit: "contain" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
           
            </div>

            {/* Desktop nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden md:flex">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.95)"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a
                href="#login"
                className="hidden md:block"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.95)"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
              >
                Login
              </a>

              <motion.a
                href="#demo"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 22px",
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                }}
              >
                Book Free Demo
              </motion.a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex md:hidden"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="7" x2="21" y2="7" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="17" x2="21" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: 24,
                  right: 24,
                  borderRadius: 20,
                  background: "rgba(18,18,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(24px)",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                }}
              >
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 15,
                      padding: "4px 0",
                      textDecoration: "none",
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#login"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 15,
                    padding: "4px 0",
                    textDecoration: "none",
                  }}
                >
                  Login
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* ════ HERO CONTENT ════ */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "120px 32px 80px", // Reduced top padding
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "start", // Align items to the top
          }}
          className="grid-cols-banner"
        >
          {/* ── LEFT CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 16,
                lineHeight: 1.6,
                marginBottom: 20,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Enterprise-grade cloud solutions built for speed, security, and scale.
            </motion.p>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              CLOUDEDATA
              <br />
              <span style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                YOUR CLOUD.
                <br />
                YOUR WAY.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: 36,
                lineHeight: 1.6,
              }}
            >
              Performance-optimized infrastructure with industry-leading 99.99% uptime SLA.
            </motion.p>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginBottom: 40 }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 8,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Starting from
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span
                  style={{
                    fontSize: "clamp(3rem, 6vw, 4.2rem)",
                    fontWeight: 800,
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  ₹290
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  /user/month
                </span>
              </div>
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "16px 36px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  border: "1px solid rgba(139,92,246,0.5)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                  cursor: "pointer",
                }}
              >
                Start Free Trial
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: 0,
                marginTop: 56,
                padding: "24px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {STATS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                  <div style={{ flex: 1, textAlign: i === 0 ? "left" : "center" }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      <AnimatedNumber value={s.value} suffix={s.suffix} />
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div style={{ width: 1, background: "rgba(255,255,255,0.06)", margin: "0 24px", alignSelf: "stretch" }} />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN – Visual / Card ── */}
          <motion.div
            className="banner-img-col"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start", // Align top
              justifyContent: "center",
              alignSelf: "start", // Ensures top alignment
              marginTop: 20, // Slight top offset to match badge line
            }}
          >
            {/* Outer glow */}
            <div
              style={{
                position: "absolute",
                inset: -50,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
              }}
            />

            {/* Image container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 560, // slightly larger
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(10px)",
                overflow: "hidden",
                boxShadow: "0 50px 120px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.1) inset",
                aspectRatio: "4/3",
              }}
            >
              <img
                src="/assets/cloudedata-hero.png"
                alt="Cloudedata Cloud Platform"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />

              {/* Fallback tech illustration */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(124,58,237,0.06))",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <svg
                  width="180"
                  height="160"
                  viewBox="0 0 180 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.6 }}
                >
                  <rect x="30" y="15" width="120" height="28" rx="5" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
                  <circle cx="140" cy="29" r="5" fill="#8b5cf6" opacity="0.8" />
                  <rect x="40" y="22" width="65" height="5" rx="2.5" fill="rgba(167,139,250,0.3)" />
                  <rect x="40" y="29" width="45" height="4" rx="2" fill="rgba(139,92,246,0.25)" />
                  <rect x="30" y="52" width="120" height="28" rx="5" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
                  <circle cx="140" cy="66" r="5" fill="#7c3aed" opacity="0.8" />
                  <rect x="40" y="59" width="55" height="5" rx="2.5" fill="rgba(167,139,250,0.3)" />
                  <rect x="40" y="66" width="40" height="4" rx="2" fill="rgba(124,58,237,0.25)" />
                  <rect x="30" y="89" width="120" height="28" rx="5" fill="rgba(109,40,217,0.15)" stroke="rgba(109,40,217,0.4)" strokeWidth="1.5" />
                  <circle cx="140" cy="103" r="5" fill="#6d28d9" opacity="0.8" />
                  <rect x="40" y="96" width="70" height="5" rx="2.5" fill="rgba(167,139,250,0.3)" />
                  <rect x="40" y="103" width="50" height="4" rx="2" fill="rgba(109,40,217,0.25)" />
                  <line x1="90" y1="124" x2="90" y2="145" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <rect x="60" y="138" width="60" height="14" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <rect x="68" y="142" width="14" height="6" rx="3" fill="rgba(139,92,246,0.4)" />
                  <rect x="86" y="142" width="14" height="6" rx="3" fill="rgba(124,58,237,0.4)" />
                  <rect x="104" y="142" width="10" height="6" rx="3" fill="rgba(109,40,217,0.4)" />
                </svg>
                <p
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Place image at /assets/cloudedata-hero.png
                </p>
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)",
                }}
              />

              {/* Status chip */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  padding: "8px 14px",
                  borderRadius: 12,
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 10px #a78bfa" }} />
                  <span style={{ color: "#c4b5fd", fontSize: 11, fontWeight: 600, fontFamily: "'Inter', sans-serif", letterSpacing: "0.03em" }}>
                    LIVE • All Systems OK
                  </span>
                </div>
              </motion.div>

              {/* Deployments chip */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                style={{
                  position: "absolute",
                  bottom: 18,
                  left: 18,
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p
                  style={{
                    color: "rgba(196,181,253,0.6)",
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  }}
                >
                  Deployments
                </p>
                <p style={{ color: "#fff", fontSize: 18, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}>
                  3,247
                  <span style={{ color: "#c4b5fd", fontSize: 11, fontWeight: 500, marginLeft: 4 }}>today</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 900px) {
          .grid-cols-banner {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding-top: 140px !important;
          }
          .banner-img-col {
            display: none !important;
          }
        }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
    </>
  );
}