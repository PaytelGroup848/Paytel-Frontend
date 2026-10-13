import React from "react";

export default function MoneyBack() {
  return (
    <section className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-white px-4 py-5 sm:px-6 sm:py-7 lg:flex-row lg:gap-10 lg:px-8 lg:py-8">
          
          {/* Soft Background Effects */}
          <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-sky-100/70 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Left Text Content */}
          <div className="relative z-10 w-full text-center lg:w-[36%] lg:text-left">
            <div className="mb-4 inline-flex items-center rounded-full bg-slate-50 px-4 py-2 text-[0.7rem] tracking-[0.18em] text-slate-500 shadow-sm sm:text-xs">
              VPS • CLOUD • SERVERS
            </div>

            <h2 className="max-w-xl text-[1.75rem] font-normal leading-tight tracking-[-0.04em] text-slate-950 sm:text-[2.2rem] lg:text-[2.55rem]">
              Reliable VPS hosting built for smooth performance
            </h2>

            <p className="mt-4 max-w-xl text-sm font-normal leading-7 text-slate-600 sm:text-base lg:text-[1.02rem]">
              Get fast, secure, and scalable server infrastructure for websites,
              business apps, cloud workloads, and growing online platforms.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-xl lg:max-w-none">
              <div className="rounded-2xl bg-slate-50 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="text-[0.72rem] text-slate-400">Uptime</p>
                <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                  99.99%
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="text-[0.72rem] text-slate-400">Storage</p>
                <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                  NVMe SSD
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="text-[0.72rem] text-slate-400">Security</p>
                <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                  DDoS Ready
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="text-[0.72rem] text-slate-400">Support</p>
                <p className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
                  24/7 Expert
                </p>
              </div>
            </div>
          </div>

          {/* Right SVG Banner */}
          <div className="relative z-10 w-full lg:w-[64%]">
            <div className="group overflow-hidden rounded-3xl bg-slate-50/70 p-1.5 shadow-xl shadow-slate-200/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/80">
              <img
                src="/moneyback.svg"
                alt="High performance VPS and cloud servers"
                className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.012]"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}