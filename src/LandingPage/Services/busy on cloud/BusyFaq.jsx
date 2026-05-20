import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Custom icons same hi rakhe hain ── */
const faqs = [ /* tumhara pura data yahin */ ];

export default function BusyFaq() {
  // 👇 Ab array ki jagah Set – multiple khul sakte hain
  const [openIndexes, setOpenIndexes] = useState(new Set());

  const toggle = (index) => {
    const next = new Set(openIndexes);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setOpenIndexes(next);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <section className="relative py-24 px-4 sm:px-8 bg-[#0f172a] overflow-hidden font-['Inter']">
        {/* Background blobs – wahi rahenge */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-purple-500/8 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #818cf8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-1.5 bg-white/10 backdrop-blur-sm border border-indigo-300/30 text-indigo-300 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
               Get Answers
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Questions
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about Busy on Cloud. Can’t find your
              answer?{" "}
              <a href="#" className="text-indigo-400 underline underline-offset-2">
                Contact support
              </a>
              .
            </p>
          </motion.div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndexes.has(index); // 👈 yahan change

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-400/60 via-purple-400/60 to-cyan-400/60 transition-shadow duration-300"
                  style={{
                    boxShadow: isOpen
                      ? "0 20px 40px -10px rgba(99,102,241,0.2)"
                      : "0 10px 20px -5px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="relative rounded-2xl bg-slate-800/80 backdrop-blur-md overflow-hidden h-full">
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-start gap-4 p-5 sm:p-6 text-left group"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 transition-colors group-hover:bg-indigo-500/20 group-hover:border-indigo-400">
                        {faq.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-white pr-8 transition-colors group-hover:text-indigo-200">
                          {faq.question}
                        </h3>
                      </div>

                      {/* +/- icon with rotation */}
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 mt-1 group-hover:bg-indigo-500/40"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.25rem] text-sm text-slate-300 leading-relaxed border-t border-slate-700/50 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}