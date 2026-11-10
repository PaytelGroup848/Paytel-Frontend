import { AppWindow, ArrowRight, Monitor, ShieldCheck } from "lucide-react";
import ProductPreview from "./ProductPreview";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071b3b] text-white max-sm:mt-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(ellipse_at_10%_100%,rgba(37,99,235,0.22),transparent_40%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:pb-24 lg:pt-24">
            <div className="relative z-10">
              <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.18em] text-cyan-100 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />{" "}
                REMOTE ACCESS, REIMAGINED
              </span>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.8rem] xl:text-[4.25rem]">
                Your Windows apps.
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Anywhere you work.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Give your team secure, simple access to the Windows desktops and
                business apps they rely on—from the office, at home, or on the
                move.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  Book Free Demo
                  <ArrowRight size={17} />
                </a>
              </div>
              <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex -space-x-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#071b3b] bg-sky-200 text-xs font-bold text-sky-900">
                    A
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#071b3b] bg-violet-200 text-xs font-bold text-violet-900">
                    R
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#071b3b] bg-orange-200 text-xs font-bold text-orange-900">
                    M
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#071b3b] bg-slate-700 text-xs font-bold text-white">
                    +
                  </span>
                </div>
                <p className="text-xs leading-5 text-slate-300 sm:text-sm">
                  <b className="text-white">One workspace, fewer barriers.</b>
                  <br />
                  Make your existing tools work from anywhere.
                </p>
              </div>
            </div>
            <ProductPreview />
          </div>
          <div className="border-t border-white/10 bg-white/[0.03]">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400">
                BUILT FOR THE WAY YOUR TEAM WORKS
              </span>
              <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-2">
                  <Monitor size={16} className="text-cyan-300" /> Remote
                  desktops
                </span>
                <span className="flex items-center gap-2">
                  <AppWindow size={16} className="text-cyan-300" /> Published
                  apps
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-cyan-300" /> Secure
                  access
                </span>
              </div>
            </div>
          </div>
        </section>
  );
}
