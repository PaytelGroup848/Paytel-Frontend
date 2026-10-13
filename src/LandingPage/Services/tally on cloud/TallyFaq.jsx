import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Cloud,
  Database,
  Headphones,
  IndianRupee,
  LockKeyhole,
  ServerCog,
  Users,
} from 'lucide-react';

const categories = [
  { key: 'all', label: 'All Questions', icon: CircleHelp },
  { key: 'setup', label: 'Setup', icon: ServerCog },
  { key: 'security', label: 'Security', icon: LockKeyhole },
  { key: 'pricing', label: 'Pricing', icon: IndianRupee },
  { key: 'support', label: 'Support', icon: Headphones },
];

const faqs = [
  {
    id: 'what-is-tally-cloud',
    category: 'setup',
    question: 'What is Tally on Cloud?',
    answer:
      'Tally on Cloud lets you run TallyPrime or ERP software on a secure cloud server. Your team can access the same Tally data from office, home or branch locations without depending on one local computer.',
  },
  {
    id: 'existing-license',
    category: 'setup',
    question: 'Can I use my existing Tally license?',
    answer:
      'Yes, in most cases you can use your existing Tally license with the cloud setup. Our team checks your current license, number of users and data size before recommending the right server plan.',
  },
  {
    id: 'setup-time',
    category: 'setup',
    question: 'How much time does setup take?',
    answer:
      'Basic setup can usually be completed quickly after required details are received. Larger migrations, multiple users or branch access may need extra time for data verification and access configuration.',
  },
  {
    id: 'data-security',
    category: 'security',
    question: 'Is my Tally data secure on cloud?',
    answer:
      'Yes. The cloud environment can be configured with secure remote access, user permissions, password protection and backup support. This reduces the risk of local system failure and unauthorized access.',
  },
  {
    id: 'backup',
    category: 'security',
    question: 'Do you provide backup for Tally data?',
    answer:
      'Yes, backup support is included with the cloud setup. Backup frequency and retention can be planned based on your business needs, data size and compliance requirements.',
  },
  {
    id: 'users',
    category: 'setup',
    question: 'How many users can work at the same time?',
    answer:
      'It depends on the selected plan. Each plan includes a recommended user capacity based on vCPU, RAM and storage. You can upgrade when your team or branch workload grows.',
  },
  {
    id: 'device-access',
    category: 'setup',
    question: 'Can I access Tally from any device?',
    answer:
      'You can access Tally from supported desktops or laptops with the configured remote access method. Mobile devices may be used for limited access depending on your setup and workflow.',
  },
  {
    id: 'pricing-tax',
    category: 'pricing',
    question: 'Are taxes included in the displayed price?',
    answer:
      'No. Displayed prices are usually shown excluding applicable taxes. The final checkout amount is calculated based on selected billing period and taxes.',
  },
  {
    id: 'upgrade-plan',
    category: 'pricing',
    question: 'Can I upgrade my plan later?',
    answer:
      'Yes, you can upgrade to a higher plan when you need more users, better performance, additional RAM or extra storage. The team can suggest the right upgrade based on usage.',
  },
  {
    id: 'support-help',
    category: 'support',
    question: 'What support do I get after purchase?',
    answer:
      'Support can include setup help, login assistance, basic troubleshooting, backup guidance and server-related support. Tally software usage and accounting entries may depend on your service plan.',
  },
];

const quickPoints = [
  'Secure cloud access',
  'Multi-user Tally performance',
  'Backup and restore support',
  'Plan upgrade available',
];

export default function TallyFaq() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(faqs[0].id);

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return faqs;
    return faqs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryKey) => {
    setActiveCategory(categoryKey);

    const firstFaq = categoryKey === 'all'
      ? faqs[0]
      : faqs.find((faq) => faq.category === categoryKey);

    if (firstFaq) {
      setOpenFaqId(firstFaq.id);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 sm:p-5 lg:p-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-7 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase text-slate-200">
                  <Cloud size={15} className="text-slate-300" />
                  Tally on Cloud FAQ
                </div>

                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Clear answers before you move Tally to cloud
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  Understand setup, security, pricing, users and support before choosing the
                  right cloud plan for your business.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {quickPoints.map((point) => (
                  <div
                    key={point}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-semibold text-slate-200"
                  >
                    <CheckCircle2 size={17} className="shrink-0 text-slate-300" />
                    <span className="min-w-0">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="min-w-0">
              <div className="rounded-2xl border border-slate-200 bg-white p-3">
                <p className="px-2 pb-2 text-xs font-extrabold uppercase text-slate-500">
                  Browse by topic
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {categories.map(({ key, label, icon: Icon }) => {
                    const isActive = activeCategory === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleCategoryChange(key)}
                        className={`flex min-h-12 min-w-0 items-center gap-3 rounded-xl border px-3 text-left text-sm font-bold transition ${
                          isActive
                            ? 'border-slate-950 bg-slate-950 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <Icon size={17} className={isActive ? 'shrink-0 text-white' : 'shrink-0 text-slate-500'} />
                        <span className="min-w-0 truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                  <Headphones size={21} />
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                  Need a custom answer?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Share your users, branches and current Tally setup. Our team can suggest the
                  right cloud plan.
                </p>
                <a
                  href="#demo"
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-extrabold text-white transition hover:bg-slate-800"
                >
                  Book Free Demo
                </a>
              </div>
            </aside>

            <div className="min-w-0 space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <article
                    key={faq.id}
                    className={`min-w-0 overflow-hidden rounded-2xl border bg-white transition ${
                      isOpen ? 'border-slate-400' : 'border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="flex w-full min-w-0 items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
                    >
                      <span className="min-w-0 text-base font-extrabold leading-6 text-slate-950 sm:text-lg">
                        {faq.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                          isOpen
                            ? 'border-slate-400 bg-slate-100 text-slate-800'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-4 pb-5 pt-0 sm:px-5">
                        <p className="pt-4 text-sm leading-7 text-slate-600 sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Users size={20} className="text-slate-600" />
                  <p className="mt-3 text-sm font-extrabold text-slate-950">User based plans</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Database size={20} className="text-slate-600" />
                  <p className="mt-3 text-sm font-extrabold text-slate-950">Backup ready</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <ServerCog size={20} className="text-slate-600" />
                  <p className="mt-3 text-sm font-extrabold text-slate-950">Cloud optimized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) 
}