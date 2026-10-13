import React, { useState } from "react";

// SVG icons
const PlusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// FAQ data (customizable)
const faqCategories = [
  {
    id: "general",
    name: "General",
    questions: [
      {
        q: "What is WordPress hosting, and why do I need it?",
        a: "WordPress hosting is a hosting environment optimized specifically for WordPress sites. It includes features like one-click installs, automatic updates, and performance tweaks that make your site faster and more secure.",
      },
      {
        q: "How does CloudData differ from shared hosting?",
        a: "CloudData’s WordPress plans run on isolated cloud containers with dedicated resources. Unlike shared hosting, you get guaranteed CPU, RAM, and NVMe storage – no noisy neighbors slowing you down.",
      },
      {
        q: "Can I host multiple WordPress sites on one plan?",
        a: "Yes, our Premium plan supports up to 3 websites, and our Business plan allows up to 10. Each site runs independently with its own settings and staging area.",
      },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    questions: [
      {
        q: "Is NVMe storage really faster than SSD?",
        a: "Absolutely. NVMe drives deliver up to 3x faster read/write speeds compared to traditional SSDs. That means faster page loads, quicker database queries, and a smoother admin dashboard.",
      },
      {
        q: "What caching stack do you use?",
        a: "We use LiteSpeed web server with Redis object caching and optional Varnish. This multi‑layer caching reduces server response time to under 200ms on average.",
      },
      {
        q: "Will Cloudflare CDN help my site?",
        a: "Yes, every plan includes free Cloudflare CDN integration. It distributes your static content across 300+ global data centers, reducing latency for visitors from anywhere.",
      },
    ],
  },
  {
    id: "security",
    name: "Security",
    questions: [
      {
        q: "Do you provide SSL certificates?",
        a: "All plans include free Let’s Encrypt SSL certificates, automatically installed and renewed. Your site gets HTTPS with a single click.",
      },
      {
        q: "How often are backups taken?",
        a: "We perform automated daily backups and keep them for 30 days. Premium and Business plans also include on‑demand backup creation before major updates.",
      },
      {
        q: "What happens if my site gets hacked?",
        a: "Our security stack includes a web application firewall (WAF), malware scanning, and DDoS protection. If an issue occurs, our support team will help you clean and restore your site at no extra cost.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    questions: [
      {
        q: "Are there any hidden fees?",
        a: "No hidden fees. The price you see includes everything – storage, bandwidth, SSL, CDN, staging, and backups. Domain renewal is the only additional cost if you choose a free domain.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and PayPal. All plans come with a 30‑day money‑back guarantee.",
      },
      {
        q: "Can I upgrade my plan later?",
        a: "Yes, you can upgrade or downgrade anytime from your dashboard. Your site will be moved seamlessly with no downtime.",
      },
    ],
  },
];

const WordPressFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = faqCategories.find((cat) => cat.id === activeCategory);
  const filteredQuestions = currentCategory?.questions.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Everything you need to know about CloudData WordPress hosting.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null); // close all on new search
            }}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm outline-none transition-all"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery("");
                setOpenIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180 text-blue-600" : "text-gray-400"
                  }`}>
                    {openIndex === idx ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-50">
                    {item.a}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">
              No questions found. Try a different search.
            </p>
          )}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Our support team is ready to help you 24/7.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default WordPressFAQ;