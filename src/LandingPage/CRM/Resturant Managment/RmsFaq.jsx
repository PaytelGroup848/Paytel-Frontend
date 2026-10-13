import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What makes Cloudedata the best billing software for restaurant outlets across India?",
    answer: "Cloudedata stands out as the ultimate restaurants billing software because it combines ultra-fast offline billing, remote cloud dashboards, multi-region database backups, and deep aggregator integrations into one single, unified subscription plan without costly add-on charges."
  },
  {
    question: "How does the digital kitchen order ticket system improve internal operations?",
    answer: "Our kitchen order ticket pipeline automates raw communication. The second a customer or waiter places an order, it flashes on your kitchen display system monitors, removing missing order complaints, cutting wait times, and building perfect coordination between front staff and kitchen chefs."
  },
  {
    question: "Can I use this cloud platform as a standalone billing system for restaurant chains with disconnected sub-brands?",
    answer: "Yes. Our enterprise billing system for restaurant chains lets you control different sub-brands (such as fine dining, sweet shops, or fast-food stalls) from a central system while maintaining independent localized legal tax invoices for each separate brand location."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex justify-between items-center text-left group"
      >
        <span className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors pr-6">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-red-50/30 py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about Cloudedata's restaurant ERP software.
          </p>
        </div>

        {/* FAQ List with Microdata */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <div
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="divide-y divide-gray-100"
          >
            {faqs.map((faq, index) => (
              <div key={index} itemProp="name" content={faq.question}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text" style={{ display: "none" }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA (optional, matches other sections) */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Still have questions?{" "}
            <a href="/contact" className="text-red-600 font-semibold hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}