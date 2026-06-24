import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";

const FONT_HEADING = "'DM Sans', 'Inter', system-ui, -apple-system, sans-serif";
const FONT_BODY = "'DM Sans', 'Inter', system-ui, -apple-system, sans-serif";

const highlights = [
  "Free SSL & Daily Backups",
  "1-Click WordPress Install",
  "24/7 Priority Support",
  "Free Domain Name",
];

const floatingBadges = [
  { icon: ShieldCheck, label: "SSL Secured", color: "#22c55e" },
  { icon: Zap, label: "Fast NVMe", color: "#f59e0b" },
  { icon: Globe, label: "Global CDN", color: "#2271b1" },
];

// ─── Animated dots (always visible now) ──────────────────────────────
function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full"
          style={{
            backgroundColor: "#0a304e",
            animation: "dotPulse 1.4s infinite ease-in-out",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    <div className="ms-5  items-center gap-x-4">
  {/* First line – shorter */}
  <div className="flex flex-row">
  <hr className="border-1 1-px bg-black w-60 my-2"/> 
    <hr className="border-1 ml-5 1-px bg-black w-60 my-2"/></div>
  {/* Second line – longer */}
  <div className="flex flex-row">
  <hr className=" ms-35  border-1 1-px bg-black w-60 my-2" />
  <hr className=" ml-5 ms-35  border-1 1-px bg-black w-60 w-4/4 my-2" />
  </div>
</div>
    
    </div>
  );
}

export default function WordPressBanner() {
  const scrollToPlans = () => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Font & keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #e0f0ff 100%)",
          fontFamily: FONT_BODY,
        }}
      >
        {/* Decorative layer (untouched) */}
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

        {/* Main container with high top‑padding to clear navbar */}
        <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-20 lg:pt-24 xl:pt-28">
          
          {/* The "open window" card – now with black border */}
          <div
            className="relative overflow-hidden rounded-3xl border border-black bg-white/10 backdrop-blur-sm shadow-2xl"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.5)",
            }}
          >
            {/* Top‑left animated dots – now fully visible */}
            <div className="absolute top-4 left-5 z-10">
              <LoadingDots />
            </div>

            {/* Flex row (content unchanged) */}
            <div className="flex flex-row items-center justify-between gap-2 px-4 pt-10 pb-8 sm:gap-4 sm:px-6 sm:pt-12 sm:pb-10 md:gap-6 md:px-8 md:pt-14 md:pb-12 lg:px-14 lg:pt-16 lg:pb-14 xl:pt-18 xl:pb-16">
              
              {/* LEFT – Text */}
              <div className="w-[55%] flex-shrink-0 ml-2 sm:ml-3 md:ml-0 md:w-[52%] lg:w-[50%]">
                {/* Heading */}
                <h1
                  className="text-slate-900"
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 500,
                    fontSize: "clamp(1.8rem, 6vw, 4rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
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
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 2.5vw, 2rem)",
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
                    fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
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

                {/* Trust line */}
                <p
                  className="mt-2 font-medium"
                  style={{
                    fontSize: "clamp(0.7rem, 1.6vw, 0.95rem)",
                    color: "#0d3b5c",
                    opacity: 0.85,
                  }}
                >
                  Trusted by over 1,000,000 websites worldwide
                </p>

                {/* Price – inline */}
                <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3 sm:gap-2">
                  <span
                    className="font-medium text-slate-800"
                    style={{
                      fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                    }}
                  >
                    Starts from
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: "clamp(2rem, 6vw, 4.5rem)",
                      color: "#051b2e",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ₹ 61
                  </span>
                  <span
                    className="font-normal text-slate-700"
                    style={{ fontSize: "clamp(0.7rem, 1.5vw, 1.5rem)" }}
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
                        fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
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
                    fontSize: "clamp(0.8rem, 1.6vw, 1rem)",
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
              <div className="">
                <img
                  src="/wordpressimage.png"
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
          </div>
        </div>
      </section>

      {/* Plans section anchor */}
      <div id="plans" />
    </>
  );
}