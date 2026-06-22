import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";

const FONT_HEADING = "'Times New Roman', Times, Georgia, serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif";

const highlights = [
  "Free SSL & Daily Backups",
  "1-Click WordPress Install",
];

const floatingBadges = [
  { icon: ShieldCheck, label: "SSL Secured", color: "#22c55e" },
  { icon: Zap,         label: "Fast NVMe",   color: "#f59e0b" },
  { icon: Globe,       label: "Global CDN",  color: "#2271b1" },
];

export default function WordPressBanner() {
  const scrollToPlans = () => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #95CCDD 0%, #aed8e8 35%, #caeaf5 65%, #e2f4fb 100%)",
          fontFamily: FONT_BODY,
        }}
      >
        {/* ── Decorative layer ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 rounded-full opacity-25"
            style={{
              width: 700,
              height: 700,
              background: "radial-gradient(circle, #ffffff 0%, transparent 68%)",
            }}
          />
          <div
            className="absolute -bottom-32 -left-32 rounded-full opacity-20"
            style={{
              width: 500,
              height: 500,
              background: "radial-gradient(circle, #2271b1 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #1e3a5f 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 mx-auto flex w-full max-w-9xl flex-col items-center gap-8 px-5 pt-14 pb-0 sm:px-8 sm:pt-16 md:flex-row md:items-end md:gap-0 lg:px-14 lg:pt-20 xl:pt-24">

          {/* ════ LEFT — Text ════ */}
          <div className="w-full flex-shrink-0 pb-14 text-center md:w-[52%] md:pb-20 md:pr-6 md:text-left lg:w-[50%] lg:pb-24 lg:pr-10">


            {/* Heading */}
            <h1
              className="text-slate-900 mt-5"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 400,
                fontSize: "clamp(2.5rem, 5.8vw, 4.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              Build faster with
              <br />
              <span style={{ color: "#0a304e" }}>WordPress</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="mt-3"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 400,
                fontSize: "clamp(1.2rem, 2.5vw, 1.85rem)",
                color: "#2c5f7a",
                letterSpacing: "0.01em",
              }}
            >
              with Ease
            </p>

            {/* Offer line */}
            <p
              className="mt-5 font-semibold"
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "#1a4a72",
              }}
            >
               Up to{" "}
              <span
                className="rounded-md px-2 py-0.5 text-white"
                style={{ background: "#2271b1" }}
              >
                60% off
              </span>{" "}
              on Hosting
            </p>

            {/* Price — inline, no box */}
            <div className="mt-4 flex items-baseline justify-center gap-2 md:justify-start">
              <span
                className="font-medium text-slate-500"
                style={{
                  fontSize: "clamp(0.78rem, 1.3vw, 0.9rem)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Starts from
              </span>
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 400,
                  fontSize: "clamp(2.8rem, 5.8vw, 4.2rem)",
                  color: "#051b2e",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                ₹ 61
              </span>
              <span
                className="font-normal text-slate-500"
                style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
              >
                /month
              </span>
            </div>

            {/* Highlights */}
            <div className="mt-6 flex flex-col items-center gap-2.5 md:items-start">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 font-medium"
                  style={{
                    fontSize: "clamp(0.82rem, 1.5vw, 0.92rem)",
                    color: "#2c5f7a",
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: "#2271b1", flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className=" flex flex-col items-center gap-2 sm:flex-row md:items-start">
              <button
                onClick={scrollToPlans}
                className="mt-5 group inline-flex min-h-[52px] items-center gap-2.5 rounded-xl px-8 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 active:scale-[0.98]"
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(0.88rem, 1.5vw, 0.95rem)",
                  letterSpacing: "-0.01em",
                  background: "linear-gradient(135deg, #2271b1 0%, #1a5a9a 100%)",
                  boxShadow: "0 6px 28px rgba(34,113,177,0.38), 0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                View Plans
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* ════ RIGHT — Image ════ */}
          <div className="relative w-full flex-shrink-0 md:w-[48%] lg:w-[50%]">


            {/* Image */}
            <img
              src="/wordpressimage.jpg"
              alt="WordPress hosting illustration"
              style={{
                width: "100%",
                height: "clamp(340px, 70vh, 680px)",
                objectFit: "contain",
                objectPosition: "bottom center",
                display: "block",
                filter: "drop-shadow(0 28px 44px rgba(34,113,177,0.18))",
              }}
            />
          </div>
        </div>
      </section>

      {/* Plans section anchor */}
      <div id="plans" />
    </>
  );
}