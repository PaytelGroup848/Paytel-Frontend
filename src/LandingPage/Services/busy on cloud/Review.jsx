import { motion } from "framer-motion";

const reviews = [
  {
    initials: "AK",
    name: "Amit Khanna",
    role: "Partner, Khanna & Associates — Delhi",
    quote:
      "Busy on Cloud completely transformed our workflow. No more server maintenance; our team accesses data from anywhere in seconds. The real‑time collaboration feature is a game changer.",
    rating: 5,
  },
  {
    initials: "SR",
    name: "Sunita Reddy",
    role: "Founder, Reddy Retail Chain — Hyderabad",
    quote:
      "We migrated three branches to Busy on Cloud, and the support team handled everything flawlessly. Our accountants can now work simultaneously without any data clashes. Highly recommended!",
    rating: 5,
  },
  {
    initials: "VP",
    name: "Vikram Patel",
    role: "CFO, Patel Industries — Mumbai",
    quote:
      "The security and automatic backups give us complete peace of mind. The uptime is incredible, and the pricing is very competitive for the features offered.",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Tiny animation for stars
const starVariants = {
  hidden: { scale: 0, rotate: -30 },
  show: (i) => ({
    scale: 1,
    rotate: 0,
    transition: { delay: 0.3 + i * 0.05, type: "spring", stiffness: 200 },
  }),
};

export default function Review() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <section className="relative py-24 px-4 sm:px-8 bg-gradient-to-br from-[#f8faff] via-[#f0f4ff] to-[#f4f6fc] font-['Inter'] overflow-hidden">
        {/* ✨ Background blobs with slightly higher opacity for depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-300/15 rounded-full blur-3xl" />
          <div className="absolute -top-20 left-10 w-[30rem] h-[30rem] bg-purple-300/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-[28rem] h-[28rem] bg-cyan-300/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-blue-300/10 rounded-full blur-3xl" />

          {/* Subtle dots pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #4338ca 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-white/80 backdrop-blur-sm border border-indigo-200/60 text-indigo-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
              </svg>
              Client Testimonials
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                Accounting Professionals
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Don’t just take our word for it — see what our clients have to say
              about Busy on Cloud.
            </p>
          </motion.div>

          {/* Review Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-400/80 via-purple-400/80 to-cyan-400/80 transition-all duration-500"
                style={{
                  boxShadow:
                    "0 4px 20px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(99,102,241,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 20px 35px -8px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(99,102,241,0.05)";
                }}
              >
                {/* Inner shiny white card */}
                <div
                  className="relative h-full rounded-2xl flex flex-col overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #fcfcfc 50%, #ffffff 100%)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)",
                  }}
                >
                  <div className="p-6 flex flex-col h-full relative">
                    {/* Big faint quote mark in background */}
                    <div className="absolute top-2 right-4 text-8xl font-serif text-indigo-100/40 select-none pointer-events-none">
                      “
                    </div>

                    {/* Stars with staggered animation */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <motion.svg
                          key={i}
                          custom={i}
                          variants={starVariants}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          className="w-5 h-5 text-amber-400 drop-shadow-sm"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>

                    {/* Quote text */}
                    <blockquote className="flex-1 mb-6 relative z-10">
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        “{review.quote}”
                      </p>
                    </blockquote>

                    {/* Author section */}
                    <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
                          {review.initials}
                        </div>
                        {/* subtle glow ring behind */}
                        <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-md -z-10" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {review.name}
                        </p>
                        <p className="text-xs text-slate-500">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View all reviews link/button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
            >
              View all reviews
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}