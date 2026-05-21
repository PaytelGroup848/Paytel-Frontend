
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Database,
  FileText,
  Headphones,
  LockKeyhole,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
} from 'lucide-react';

const benefits = [
  'Secure cloud access',
  'Multi-user ERP performance',
  'Daily backup support',
  'Quick setup assistance',
];

const businessTypes = [
  'Retail',
  'Distribution',
  'Pharmacy',
  'FMCG',
  'Manufacturing',
  'Other',
];

const featureCards = [
  {
    icon: FileText,
    title: 'Billing & GST',
    text: 'Run invoicing, reports and tax workflows from a secure cloud setup.',
  },
  {
    icon: Database,
    title: 'Inventory Control',
    text: 'Access stock, sales and purchase data across office and branch teams.',
  },
  {
    icon: ShieldCheck,
    title: 'Protected Data',
    text: 'Reduce local-system dependency with managed access and backup support.',
  },
];

export default function Banner() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#edf7f4_0%,#f8fafc_42%,#e9f0fb_100%)]">
      <div
        className="absolute right-0 top-0 hidden h-full w-1/2 bg-cover bg-center opacity-10 lg:block"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80")',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_18%_14%,rgba(20,184,166,0.16),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(37,99,235,0.12),transparent_28%)]" />

      <div className="relative mx-auto grid min-h-[680px] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="min-w-0 text-slate-950">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-bold uppercase text-teal-700 shadow-sm">
            <Cloud size={15} className="shrink-0" />
            <span className="truncate">Marg ERP on secure cloud</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Marg on Cloud for faster billing, inventory and business control
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Move your Marg ERP setup to a reliable cloud server and let your team access
            billing, inventory, GST reports and business data from office, branch or remote
            locations with better continuity.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 size={17} className="shrink-0 text-teal-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                <Icon size={22} className="text-slate-700" />
                <h3 className="mt-3 text-sm font-extrabold">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#demo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-extrabold text-white shadow-lg shadow-slate-300/60 transition hover:bg-slate-800"
            >
              Book Free Demo
              <ArrowRight size={17} />
            </a>
            <a
              href="#plans"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-5 text-sm font-bold text-slate-800 transition hover:bg-white"
            >
              View Cloud Plans
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:justify-self-end">
          <form
            id="demo"
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:p-6 lg:p-7"
          >
            <div className="mb-5">
              <p className="text-sm font-bold uppercase text-teal-700">Book Free Demo</p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Get Marg cloud consultation
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your details and our team will suggest the right cloud setup for your
                users, branches and business type.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Email address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Business type</span>
                <select
                  name="businessType"
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                >
                  <option value="" disabled>Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Number of users</span>
                <select
                  name="users"
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                >
                  <option value="" disabled>Select users</option>
                  <option value="1-3">1-3 users</option>
                  <option value="4-6">4-6 users</option>
                  <option value="7-12">7-12 users</option>
                  <option value="12+">12+ users</option>
                </select>
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Current setup</span>
                <select
                  name="currentSetup"
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                >
                  <option value="" disabled>Select setup</option>
                  <option value="Local computer">Local computer</option>
                  <option value="Office server">Office server</option>
                  <option value="Existing cloud">Existing cloud</option>
                  <option value="New setup">New setup</option>
                </select>
              </label>

              <label className="min-w-0 sm:col-span-2">
                <span className="mb-1.5 block text-xs font-bold text-slate-600">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about branches, users, data size or current Marg setup"
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-extrabold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Submit Demo Request
              <ArrowRight size={17} />
            </button>

            <div className="mt-5 grid grid-cols-1 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-3">
              {[
                { icon: MonitorSmartphone, text: 'Any location' },
                { icon: LockKeyhole, text: 'Secure login' },
                { icon: Headphones, text: 'Setup help' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Icon size={15} className="shrink-0 text-slate-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>

      <div className="relative border-t border-slate-200 bg-white/70">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 px-4 py-4 text-sm font-semibold text-slate-700 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ServerCog size={17} className="text-teal-700" />
            Cloud server setup
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-teal-700" />
            Backup and access control
          </div>
          <div className="flex items-center gap-2">
            <Database size={17} className="text-teal-700" />
            Marg data migration support
          </div>
        </div>
      </div>
    </section>
  );
}
