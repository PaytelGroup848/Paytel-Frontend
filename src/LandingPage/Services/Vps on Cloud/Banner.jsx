import { useEffect } from "react";
import BannerHero from "./BannerHero";
import BannerCard from "./BannerCard";

// Inject DM Sans + JetBrains Mono once (optional, if not already loaded)
function useFonts() {
  useEffect(() => {
    if (document.getElementById("cloudedata-fonts")) return;
    const link = document.createElement("link");
    link.id = "cloudedata-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function Banner() {
  useFonts();

  return (
    <div
      className="antialiased"
      style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* ── MOBILE: stacked layout, extra top padding to clear fixed navbar ── */}
      <section className="block lg:hidden relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/40 to-indigo-50/60">
        {/* Subtle dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-indigo-300/20 blur-[90px]" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-blue-300/20 blur-[70px]" />
        </div>

        <div className="relative z-10 px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10 max-w-xl mx-auto flex flex-col gap-10">
          <BannerHero />
          <BannerCard />
        </div>
      </section>

      {/* ── DESKTOP: side‑by‑side, hero pushed to left edge, sticky card on right ── */}
      <section className="hidden lg:block relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70">
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-16 h-96 w-96 rounded-full bg-indigo-300/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-300/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/15 blur-[80px]" />
        </div>

        {/* Top rule */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

        {/* Container: left padding removed so hero touches the left edge,
            right padding kept for card spacing. More gap between columns. */}
        <div className="relative z-10 mx-auto w-full max-w-screen-xl pl-0 pr-8 py-20 xl:pr-12">
          <div className="grid grid-cols-[1fr_auto] items-start gap-20 xl:gap-24">
            {/* Hero takes remaining space, starts at the very left */}
            <div className="mt-5 min-w-0">
              <BannerHero />
            </div>

            {/* Card: sticky, kept on the right side with its own width */}
            <div className="mt-5 sticky top-8 self-start w-[420px] xl:w-[460px] flex-shrink-0">
              <BannerCard />
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
      </section>
    </div>
  );
}