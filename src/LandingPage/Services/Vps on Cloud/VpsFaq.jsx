import { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  ShieldCheck,
  Zap,
  CreditCard,
  Server,
  Globe,
  Clock,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const faqCategories = [
  { name: 'General', icon: HelpCircle },
  { name: 'Performance', icon: Zap },
  { name: 'Security', icon: ShieldCheck },
  { name: 'Billing', icon: CreditCard },
  { name: 'Technical', icon: Server },
];

const faqItems = [
  {
    question: 'What is a Cloud VPS and how does it work?',
    answer:
      'A Cloud VPS (Virtual Private Server) is a virtual machine that runs its own copy of an operating system on a shared physical server. Unlike shared hosting, you get dedicated resources (CPU, RAM, storage) and full root access, giving you control similar to a dedicated server at a much lower cost. Our cloud infrastructure ensures high availability by automatically migrating your VPS to another node if hardware fails.',
    category: 'General',
  },
  {
    question: 'How quickly can I deploy a VPS after ordering?',
    answer:
      'Most VPS plans are provisioned automatically within 2–5 minutes after payment confirmation. You will receive your server IP, root/administrator password, and access details instantly via email. Custom OS installations or manual checks may take up to 30 minutes.',
    category: 'General',
  },
  {
    question: 'Can I upgrade my VPS resources later?',
    answer:
      'Absolutely. You can scale your CPU, RAM, or storage at any time from your client area. Upgrades are seamless and typically require only a short reboot. Our support team can also assist with migration if you need a completely new plan.',
    category: 'Performance',
  },
  {
    question: 'What type of storage do you use?',
    answer:
      'All our plans run on enterprise NVMe SSDs with RAID 10 configuration. This provides up to 3 GB/s sequential read speeds and excellent random I/O performance, crucial for databases and high-traffic applications.',
    category: 'Performance',
  },
  {
    question: 'How do you protect my VPS from DDoS attacks?',
    answer:
      'Every VPS includes free L3/L4 DDoS mitigation. We scrub malicious traffic before it reaches your server. Additionally, we provide firewall templates, and you can configure custom rules via your control panel. For advanced L7 protection, we recommend using a web application firewall (WAF).',
    category: 'Security',
  },
  {
    question: 'Is my data backed up regularly?',
    answer:
      'We offer optional automated weekly or daily backup add‑ons. These backups are stored off‑server in a separate secure storage cluster. You can restore any backup with one click from your control panel. We also encourage users to set up their own remote backups for critical data.',
    category: 'Security',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI, all major credit/debit cards, net banking, and PayPal. Invoices are generated automatically, and you can pay via our secure portal. For long‑term plans, you may contact us for bank transfer options.',
    category: 'Billing',
  },
  {
    question: 'Can I get a refund if I’m not satisfied?',
    answer:
      'Yes, we offer a 7‑day money‑back guarantee on all VPS plans (excluding add‑ons and domain registrations). If you’re not happy, simply request a cancellation within the first week for a full refund.',
    category: 'Billing',
  },
  {
    question: 'What operating systems are supported?',
    answer:
      'You can choose from a wide range of Linux distributions (Ubuntu, CentOS, Debian, AlmaLinux, Rocky Linux) and Windows Server editions (2019, 2022, 2025). Custom ISOs can be mounted via our control panel as well.',
    category: 'Technical',
  },
  {
    question: 'Do you provide support for server management?',
    answer:
      'Our core support covers hardware, network, and virtualization layer issues. For OS‑level management (software installation, security hardening, migrations), we offer optional managed services. Our 24/7 technical team is always available via live chat and ticket.',
    category: 'Technical',
  },
  {
    question: 'What is the difference between KVM and LXC virtualization?',
    answer:
      'KVM (Kernel‑based Virtual Machine) provides true isolation with a dedicated kernel for each VPS, giving you full control and the ability to run any OS. LXC (Linux Containers) shares the host kernel, making it more lightweight but limited to Linux. Our Linux plans use KVM for best performance and compatibility.',
    category: 'Technical',
  },
  {
    question: 'How many IP addresses do I get with a VPS?',
    answer:
      'Every VPS comes with one dedicated IPv4 and one IPv6 address by default. Additional IPv4 addresses can be purchased for a small monthly fee (subject to justification).',
    category: 'Technical',
  },
];

export default function VpsFaq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const filteredFaqs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#f4fbf8_48%,#fff7ed_100%)] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-9xl px-4 sm:px-6 lg:px-8">
        {/* Outer card */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fbff] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-5 lg:p-6">
          {/* Header gradient card */}
          <div className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#e0e7ff_0%,#dff7ef_52%,#fff0d6_100%)] p-5 sm:p-7 lg:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700 shadow-sm">
              <HelpCircle size={15} />
              VPS FAQ
            </div>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-indigo-950 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
              Find quick answers to common questions about our Cloud VPS hosting. If you
              don’t see your question here, our support team is ready to help 24/7.
            </p>

            {/* Search bar */}
            <div className="mt-6 relative max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search your question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl border border-indigo-200 bg-white/80 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                activeCategory === 'All'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
            >
              All
            </button>
            {faqCategories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                  activeCategory === name
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                <Icon size={14} />
                {name}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="mt-8 space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span className="text-base font-bold text-slate-900 pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-5 text-sm leading-6 text-slate-600 border-t border-slate-100 pt-4">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 rounded-2xl border border-slate-200 bg-white">
                <HelpCircle size={40} className="mx-auto text-slate-300" />
                <p className="mt-3 text-slate-500 font-medium">
                  No questions match your search.
                </p>
                <p className="text-sm text-slate-400">
                  Try a different keyword or browse categories.
                </p>
              </div>
            )}
          </div>

          {/* Still need help? CTA */}
          <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <h4 className="text-lg font-extrabold text-indigo-950">
                Still have questions?
              </h4>
              <p className="text-sm text-slate-600">
                Our VPS experts are online 24/7 to help you choose the right plan and answer technical questions.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-extrabold text-white shadow-md hover:bg-indigo-700 transition"
            >
              Contact Support
              <ChevronDown size={16} className="rotate-270" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}