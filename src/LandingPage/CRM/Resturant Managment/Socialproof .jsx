const stats = [
  { icon: "ti-building-store", num: "500", suffix: "+", label: "Restaurants" },
  { icon: "ti-shopping-cart",  num: "2",   suffix: "M+", label: "Orders Managed" },
  { icon: "ti-clock",          num: "98",  suffix: "%",  label: "Uptime" },
  { icon: "ti-star",           num: "4.9", suffix: "★",  label: "Avg. Rating" },
];

const testimonials = [
  {
    initials: "RK",
    name: "Rahul Kapoor",
    role: "Owner, Spice Route — Delhi",
    quote:
      "Since switching to this platform, our table turnaround time dropped by 30%. The kitchen display alone saved us from endless miscommunication.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Director, Dosa House Chain — Bangalore",
    quote:
      "Managing three branches used to be chaos. Now I see all orders, revenue, and staff from one screen. Absolute game changer for multi-outlet ops.",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    role: "F&B Manager, The Grand Café — Mumbai",
    quote:
      "The billing & UPI integration is flawless. Guests check out in seconds and our accounts team loves the automatic daily reports.",
  },
];

function StatItem({ icon, num, suffix, label, isLast }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "0 24px",
        borderRight: isLast ? "none" : "1px solid #3a2010",
      }}
    >
      <div style={{ fontSize: "22px", color: "#c8822a", marginBottom: "10px" }}>
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "44px",
          fontWeight: 700,
          color: "#f5e6c8",
          lineHeight: 1,
          marginBottom: "6px",
        }}
      >
        {num}
        <span style={{ color: "#c8822a" }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "#7a6050",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function TestimonialCard({ initials, name, role, quote }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8d5be",
        borderRadius: "14px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ color: "#c8822a", fontSize: "14px", letterSpacing: "2px" }}>
        ★★★★★
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#4a3020",
          lineHeight: 1.75,
          fontWeight: 300,
          margin: 0,
          flex: 1,
        }}
      >
        <span style={{ color: "#c8822a", fontSize: "20px", fontWeight: 700 }}>"</span>
        {quote}
        <span style={{ color: "#c8822a", fontSize: "20px", fontWeight: 700 }}>"</span>
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderTop: "1px solid #f0e0cc",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#c8822a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 500,
            color: "#fff8ee",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a0f07", margin: "0 0 2px" }}>
            {name}
          </p>
          <p style={{ fontSize: "11px", color: "#9e8670", margin: 0, fontWeight: 300 }}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />

      <section style={{ background: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Stats Strip ── */}
        <div style={{ background: "#1a0f07", padding: "56px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} isLast={i === stats.length - 1} />
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div style={{ padding: "80px 48px", background: "#fffaf5" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                display: "inline-block",
                border: "1px solid #c8822a66",
                color: "#c8822a",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "6px 18px",
                borderRadius: "100px",
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              ✦ What Owners Say
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "36px",
                fontWeight: 700,
                color: "#1a0f07",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Loved by{" "}
              <em style={{ color: "#c8822a", fontStyle: "italic" }}>
                Restaurant Teams
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
}