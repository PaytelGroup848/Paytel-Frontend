import { useState } from "react";

const features = [
  {
    icon: "ti-layout-dashboard",
    title: "Smart Dashboard",
    desc: "Real-time overview of orders, revenue, and staff — all at a glance.",
    tag: "Analytics",
  },
  {
    icon: "ti-calendar-event",
    title: "Table Reservations",
    desc: "Let guests book online, manage walk-ins, and auto-assign tables seamlessly.",
    tag: "Booking",
  },
  {
    icon: "ti-clipboard-list",
    title: "Order Management",
    desc: "Handle dine-in, takeaway, and delivery orders from a unified queue.",
    tag: "Operations",
  },
  {
    icon: "ti-tools-kitchen-2",
    title: "Kitchen Display",
    desc: "Live KDS screen for chefs — tickets update in real-time as orders come in.",
    tag: "Kitchen",
  },
  {
    icon: "ti-report-money",
    title: "Billing & Payments",
    desc: "Generate bills, split checks, and accept UPI, card, or cash effortlessly.",
    tag: "Finance",
  },
  {
    icon: "ti-users-group",
    title: "Staff Management",
    desc: "Track shifts, assign roles, and monitor performance across your team.",
    tag: "HR",
  },
];

function FeatureCard({ icon, title, desc, tag }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // Gradient background (subtle warm shift)
        background: hovered
          ? "linear-gradient(135deg, #fffaf5 0%, #fff2e2 100%) padding-box, linear-gradient(135deg, #c8822a, #e8b96a) border-box"
          : "linear-gradient(135deg, #fffaf5 0%, #fff5eb 100%) padding-box, linear-gradient(135deg, #e8d5be, #d4b896) border-box",
        border: "1px solid transparent",
        borderRadius: "14px",
        padding: "28px 24px",
        transition: "transform 0.25s, box-shadow 0.25s, background 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        // Coloured shadow on hover, subtle base shadow always
        boxShadow: hovered
          ? "0 12px 32px rgba(200,130,42,0.12), 0 2px 12px rgba(0,0,0,0.04)"
          : "0 2px 12px rgba(0,0,0,0.03)",
        cursor: "default",
        backgroundClip: "padding-box, border-box", // needed for gradient border
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "#fff3e0",
          border: "1px solid #f0c88a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          fontSize: "22px",
          color: "#c8822a",
        }}
      >
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>

      <p style={{ fontSize: "16px", fontWeight: 500, color: "#1a0f07", margin: "0 0 10px" }}>
        {title}
      </p>
      <p style={{ fontSize: "13px", color: "#9e8670", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
        {desc}
      </p>
      <span
        style={{
          display: "inline-block",
          marginTop: "16px",
          fontSize: "10px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#854F0B",
          background: "#FAEEDA",
          padding: "3px 10px",
          borderRadius: "100px",
        }}
      >
        {tag}
      </span>
    </div>
  );
}

export default function FeaturesSection() {
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

      <section
        style={{
          background: "#ffffff",
          padding: "80px 48px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            ✦ Everything You Need
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "42px",
              fontWeight: 700,
              color: "#1a0f07",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Powerful Features for{" "}
            <em style={{ color: "#c8822a", fontStyle: "italic" }}>Modern Restaurants</em>
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "#9e8670",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            From table booking to kitchen analytics — manage your entire restaurant
            from one sleek dashboard.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>
    </>
  );
}