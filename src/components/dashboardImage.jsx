export default function ProfessionalHero() {
  return (
    <>
      {/* Import DM Sans (if not already loaded globally) */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-12 md:py-16 max-w-7xl mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* LEFT – Text */}
        <div className="flex-1 max-w-xl">
          {/* Small badge */}
          <span className="inline-block mb-4 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Powerful Dashboard
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">
            Monitor everything
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              in one place
            </span>
          </h1>

          {/* Sub‑copy */}
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 max-w-md">
            Real‑time analytics, resource usage, and performance metrics
            delivered through a sleek, intuitive interface. Built for
            modern teams that demand clarity.
          </p>

          {/* CTA button */}
          <button 
            onClick={() => window.location.href = "/home"}
           className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98]">
            Explore Dashboard
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* RIGHT – Smaller image, right aligned */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="/dashboard.png"
            alt="Dashboard illustration"
            className="w-full max-w-xs sm:max-w-lg md:max-w-3x1 h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
}