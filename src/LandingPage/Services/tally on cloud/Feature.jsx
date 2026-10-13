import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Cloud,
  Database,
  Headphones,
  IndianRupee,
  LockKeyhole,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Access Tally Anywhere',
    description: 'Use TallyPrime securely from office, home, branches or while travelling without carrying local data.',
    tone: 'bg-sky-50 text-sky-700',
  },
  {
    icon: Users,
    title: 'Multi-user Workflows',
    description: 'Let accountants, business owners and branch teams work on the same Tally data with controlled access.',
    tone: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Cloud Server',
    description: 'Your Tally data runs on protected cloud infrastructure with encrypted access and user permissions.',
    tone: 'bg-indigo-50 text-indigo-700',
  },
  {
    icon: Database,
    title: 'Automatic Backups',
    description: 'Reduce data-loss risk with scheduled backups and quick restore support when your business needs it.',
    tone: 'bg-amber-50 text-amber-700',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized cloud resources keep Tally responsive for billing, reports, GST work and daily accounting.',
    tone: 'bg-rose-50 text-rose-700',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Get help for setup, user access, migration and cloud troubleshooting from a trained support team.',
    tone: 'bg-violet-50 text-violet-700',
  },
];

const highlights = [
  'Quick setup for TallyPrime',
  'No office server maintenance',
  'Works with existing Tally license',
  'Scales as your users grow',
];

const steps = [
  {
    label: 'Tell us your need',
    text: 'Share users, branches and current Tally setup.',
  },
  {
    label: 'We configure cloud',
    text: 'Server, security and backup plan are prepared.',
  },
  {
    label: 'Start using Tally',
    text: 'Your team logs in and works from anywhere.',
  },
];

export default function Feature() {
  return (
    <section className="w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700">
              <ServerCog size={15} />
              Tally cloud features
            </div>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Everything your team needs to run Tally smoothly on cloud
            </h2>
          </div>

          <div className="min-w-0">
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Tally on Cloud helps your business remove dependency on one office computer,
              improve data safety and give your team reliable access to accounting from any location.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                  <span className="min-w-0">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, tone }) => (
            <article
              key={title}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              <LockKeyhole size={15} />
              Simple, safe and scalable
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
              Move from local Tally to cloud without confusing your team
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Your familiar Tally experience stays the same. The difference is better access,
              stronger protection and less dependency on local hardware.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <MonitorSmartphone size={20} className="text-sky-300" />
                <p className="mt-2 text-sm font-bold">Any location</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <Clock3 size={20} className="text-emerald-300" />
                <p className="mt-2 text-sm font-bold">Faster daily work</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <IndianRupee size={20} className="text-amber-300" />
                <p className="mt-2 text-sm font-bold">Lower IT cost</p>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-3">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className="flex min-w-0 gap-4 rounded-xl border border-white/10 bg-white p-4 text-slate-900"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-extrabold text-white">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-950">{step.label}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}

            <a
              href="#demo"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-extrabold text-slate-950 transition hover:bg-emerald-400"
            >
              Book a free cloud demo
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}