
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Database,
  FileText,
  Headphones,
  LockKeyhole,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Users,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Marg ERP on Cloud',
    description:
      'Run Marg ERP from a secure cloud server so your billing, stock, purchase and sales data stays accessible from office or branch locations.',
  },
  {
    icon: ServerCog,
    title: 'Cloud Hosting Ready',
    description:
      'Deploy on reliable VPS or cloud hosting environments with resources planned according to users, data size and daily workload.',
  },
  {
    icon: Database,
    title: 'Data Backup Support',
    description:
      'Protect important business data with scheduled backup planning and restore assistance for better continuity.',
  },
  {
    icon: Users,
    title: 'Multi-user Access',
    description:
      'Allow accounts, billing, inventory and branch teams to work on the same Marg setup with controlled access.',
  },
  {
    icon: LockKeyhole,
    title: 'Secure Remote Login',
    description:
      'Access your Marg application using secure login methods with permissions based on your team structure.',
  },
  {
    icon: Zap,
    title: 'Smooth Daily Performance',
    description:
      'Choose CPU, RAM and storage resources that keep billing, reports and inventory workflows responsive.',
  },
];

const businessWorkflows = [
  {
    icon: ShoppingCart,
    title: 'Retail Billing',
    text: 'Fast billing, GST invoices and counter operations.',
  },
  {
    icon: Truck,
    title: 'Distribution',
    text: 'Sales, purchase, stock and branch coordination.',
  },
  {
    icon: Store,
    title: 'Pharma & FMCG',
    text: 'Inventory visibility for item-heavy businesses.',
  },
  {
    icon: BarChart3,
    title: 'Reports',
    text: 'Access business reports from authorized systems.',
  },
];

const hostingPoints = [
  'Cloud VPS or dedicated server setup',
  'Resource planning for Marg ERP users',
  'Windows server environment support',
  'Data migration and access configuration',
  'Backup and restore planning',
  'Scalable upgrade options',
];

export default function Feature() {
  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#f4f7fb_0%,#eef6f1_45%,#f7f4ee_100%)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200/90 bg-white/80 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.13)] backdrop-blur sm:p-6 lg:p-8">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigo-700 shadow-sm">
                <Cloud size={15} />
                Marg Cloud Features
              </div>

              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                A reliable cloud setup for Marg billing, inventory and business data
              </h2>
            </div>

            <div className="min-w-0">
              <p className="text-base leading-7 text-slate-600 sm:text-lg">
                Marg on Cloud helps retailers, distributors, pharma businesses and growing teams
                work from a centralized hosted environment without depending on one local computer.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  'Access from office or branch',
                  'Secure hosted data',
                  'Better continuity',
                  'Easy plan upgrades',
                ].map((item) => (
                  <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => {
              const accents = [
                'bg-indigo-50 text-indigo-700 border-indigo-100',
                'bg-emerald-50 text-emerald-700 border-emerald-100',
                'bg-amber-50 text-amber-700 border-amber-100',
              ];

              return (
                <article
                  key={title}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_26px_60px_rgba(15,23,42,0.16)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm transition group-hover:scale-105 ${
                      accents[index % accents.length]
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.09)] sm:p-6 lg:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-[0_16px_32px_rgba(15,23,42,0.22)]">
                <ServerCog size={23} />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                Built for cloud data hosting and hosted ERP operations
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Your Marg setup can be hosted on suitable cloud infrastructure such as VPS,
                dedicated cloud server or managed hosting environment. The final configuration
                should be selected based on users, billing load, branches, storage and backup needs.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {hostingPoints.map((point) => (
                  <div key={point} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {businessWorkflows.map(({ icon: Icon, title, text }, index) => {
                const iconColors = ['text-indigo-700', 'text-emerald-700', 'text-amber-700', 'text-slate-700'];

                return (
                  <article
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,23,42,0.14)]"
                  >
                    <Icon size={24} className={iconColors[index % iconColors.length]} />
                    <h4 className="mt-4 text-lg font-extrabold text-slate-950">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-4 rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_62%,#134e4a_100%)] p-5 text-white shadow-[0_24px_68px_rgba(15,23,42,0.22)] sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, text: 'Secure access' },
                  { icon: MonitorSmartphone, text: 'Remote work ready' },
                  { icon: Headphones, text: 'Setup support' },
                  { icon: FileText, text: 'GST and billing workflows' },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100"
                  >
                    <Icon size={14} />
                    {text}
                  </span>
                ))}
              </div>

              <h3 className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">
                Need help choosing the right Marg cloud server?
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Share your user count, current Marg data size and branch requirements. We can
                suggest a balanced hosting configuration for stable daily use.
              </p>
            </div>

            <a
              href="#demo"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100 sm:w-auto"
            >
              Book Free Demo
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}