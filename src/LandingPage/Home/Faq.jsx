import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "General",
    question: "What makes CloudeData different from other cloud providers?",
    answer:
      "We combine enterprise NVMe storage, 3+ redundant data centres, and a 99.99% uptime SLA with affordable pricing and 24/7 Indian support. Over 11k clients already trust us for Tally on Cloud, VPS, and more.",
  },
  {
    category: "General",
    question: "Can I scale my resources as my business grows?",
    answer:
      "Absolutely! All our plans are flexible – you can upgrade VPS, add email accounts, or expand your cloud infrastructure instantly without any downtime.",
  },
  {
    category: "Security",
    question: "How secure is my data on CloudeData?",
    answer:
      "We follow industry‑best security practices: encrypted storage, DDoS protection, regular backups, and isolated environments. Your data is completely safe with us.",
  },
  {
    category: "Billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and NEFT. Invoices are GST compliant for Indian businesses.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm mb-4">
            <HelpCircle size={18} className="text-indigo-500" />
            <span className="text-sm font-semibold text-indigo-600">Need Help?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto">
            Can't find what you're looking for? Reach out to our 24/7 support team.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative max-w-md mx-auto mb-10"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-700 placeholder-slate-400 transition-all"
          />
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500 py-8"
            >
              No questions found. Try a different search.
            </motion.p>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div
                  className={`relative bg-white/70 backdrop-blur-lg rounded-2xl border transition-all duration-300 ${
                    activeIndex === idx
                      ? "border-indigo-200/70 shadow-xl ring-1 ring-indigo-100/50"
                      : "border-white/40 shadow-md hover:shadow-lg hover:border-white/60"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          activeIndex === idx
                            ? "bg-indigo-500 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                        }`}
                      >
                        {activeIndex === idx ? (
                          <Minus size={14} />
                        ) : (
                          <Plus size={14} />
                        )}
                      </span>
                      <span className="text-base md:text-lg font-semibold text-slate-800">
                        {faq.question}
                      </span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-16 text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm mb-3">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-blue-700 transition-all"
          >
            Contact Support
            <HelpCircle size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}