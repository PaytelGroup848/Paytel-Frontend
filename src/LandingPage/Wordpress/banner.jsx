import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";

const FONT_HEADING = "'Times New Roman', Times, Georgia, serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif";

const highlights = [
  "Free SSL & Daily Backups",
  "1-Click WordPress Install",
];

const floatingBadges = [
  { icon: ShieldCheck, label: "SSL Secured", color: "#22c55e" },
  { icon: Zap, label: "Fast NVMe", color: "#f59e0b" },
  { icon: Globe, label: "Global CDN", color: "#2271b1" },
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
        {/* Decorative layer */}
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
              backgroundImage:
                "radial-gradient(circle, #1e3a5f 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
        </div>

        {/* Main content – high top padding to clear navbar */}
        <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-row items-center justify-between gap-2 px-4 pt-24 pb-8 sm:gap-4 sm:px-6 sm:pt-28 sm:pb-10 md:gap-6 md:px-8 md:pt-20 lg:px-14 lg:pt-24 xl:pt-28">

          {/* LEFT – Text (slight right shift on mobile) */}
          <div className="w-[55%] flex-shrink-0 ml-2 sm:ml-3 md:ml-0 md:w-[52%] lg:w-[50%]">
            {/* Heading */}
            <h1
              className="text-slate-900"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 400,
                fontSize: "clamp(1.6rem, 6vw, 4.5rem)",
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
              className="mt-1 sm:mt-2"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 400,
                fontSize: "clamp(0.9rem, 2.5vw, 1.85rem)",
                color: "#2c5f7a",
                letterSpacing: "0.01em",
              }}
            >
              with Ease
            </p>

            {/* Offer line */}
            <p
              className="mt-2 font-semibold sm:mt-3"
              style={{
                fontSize: "clamp(0.7rem, 1.8vw, 1.1rem)",
                color: "#1a4a72",
              }}
            >
              Up to{" "}
              <span
                className="rounded-md px-1.5 py-0.5 text-white sm:px-2"
                style={{ background: "#2271b1" }}
              >
                60% off
              </span>{" "}
              on Hosting
            </p>

            {/* Price – inline */}
            <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3 sm:gap-2">
              <span
                className="font-medium text-slate-500"
                style={{
                  fontSize: "clamp(0.6rem, 1.3vw, 0.9rem)",
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
                  fontSize: "clamp(1.8rem, 6vw, 4.2rem)",
                  color: "#051b2e",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                ₹ 61
              </span>
              <span
                className="font-normal text-slate-500"
                style={{ fontSize: "clamp(0.65rem, 1.5vw, 1rem)" }}
              >
                /month
              </span>
            </div>

            {/* Highlights */}
            <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 font-medium sm:gap-2"
                  style={{
                    fontSize: "clamp(0.65rem, 1.5vw, 0.92rem)",
                    color: "#2c5f7a",
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{ color: "#2271b1", flexShrink: 0 }}
                  />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={scrollToPlans}
              className="mt-4 group inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 active:scale-[0.98] sm:min-h-[48px] sm:px-6 md:min-h-[52px] md:px-8"
              style={{
                fontWeight: 600,
                fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
                letterSpacing: "-0.01em",
                background: "linear-gradient(135deg, #2271b1 0%, #1a5a9a 100%)",
                boxShadow:
                  "0 6px 24px rgba(34,113,177,0.35), 0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              View Plans
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* RIGHT – Image */}
          <div className="relative w-[45%] flex-shrink-0 mr-0.5 sm:mr-2 md:mr-0 md:w-[48%] lg:w-[50%]">
            <img
              src="/wordpressimage.jpg"
              alt="WordPress hosting illustration"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
                objectFit: "contain",
                objectPosition: "bottom center",
                display: "block",
                filter: "drop-shadow(0 20px 30px rgba(34,113,177,0.15))",
                borderRadius: "2rem",
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