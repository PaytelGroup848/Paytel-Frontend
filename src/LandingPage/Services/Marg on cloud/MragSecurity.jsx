import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cloud,
  DatabaseBackup,
  Fingerprint,
  LockKeyhole,
  MonitorCheck,
  ShieldCheck,
  ShieldEllipsis,
  UserCheck,
  Zap,
} from 'lucide-react';

const securityFeatures = [
  {
    icon: Zap,
    title: 'Fast, Lightweight & Hassle-Free',
    description:
      'Operate your Marg ERP system smoothly from supported devices with simple access and affordable pricing starting at Rs. 299/user/month.',
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  },
  {
    icon: UserCheck,
    title: 'Secure & Compliant Access',
    description:
      'User management helps ensure only authorized people can view, access or update sensitive accounting and business information.',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    icon: MonitorCheck,
    title: 'Proactive Threat Protection',
    description:
      'Real-time monitoring and malware protection help detect risks early before they interrupt billing, stock or reporting work.',
    accent: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    icon: ShieldEllipsis,
    title: 'Enterprise-Grade Cloud Security',
    description:
      'Firewall protection, secure access controls and DDoS protection help shield your cloud infrastructure from unauthorized activity.',
    accent: 'bg-sky-50 text-sky-700 border-sky-100',
  },
];

const trustPoints = [
  'Controlled user access',
  'Firewall protected hosting',
  'Backup planning support',
  'DDoS protection options',
  'Secure remote login',
  'Monitoring assistance',
];

export default function MargSecurity() {
  return (
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#f4fbf8_46%,#eef4ff_100%)] py-1 sm:py-10 lg:py-2">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[28px] border border-slate-200 bg-[#f8fbff] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase text-emerald-700">
              <ShieldCheck size={15} />
              Marg Cloud Security
            </div>

            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Protect your accounting information with Marg on Cloud
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Keep your Marg ERP data accessible, private and protected with secure cloud access,
              user permissions, monitoring support and infrastructure-level protection.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                  <LockKeyhole size={22} className="text-indigo-700" />
                  <p className="mt-3 text-sm font-extrabold text-slate-950">Private Access</p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <DatabaseBackup size={22} className="text-emerald-700" />
                  <p className="mt-3 text-sm font-extrabold text-slate-950">Data Continuity</p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <AlertTriangle size={22} className="text-amber-700" />
                  <p className="mt-3 text-sm font-extrabold text-slate-950">Risk Monitoring</p>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
                alt="Cloud security monitoring dashboard"
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/18 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/90 p-4 backdrop-blur">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Fingerprint size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-slate-950">
                      Access only for authorized users
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Keep accounting, inventory and GST data safer with role-aware access and
                      controlled cloud login.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <Cloud size={24} className="text-sky-700" />
                <h4 className="mt-4 text-lg font-extrabold text-slate-950">Cloud-ready protection</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Designed for hosted Marg ERP access with practical safeguards for growing teams.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <ShieldCheck size={24} className="text-emerald-700" />
                <h4 className="mt-4 text-lg font-extrabold text-slate-950">Business continuity</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Reduce dependency on one office system and keep work moving during local issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map(({ icon: Icon, title, description, accent }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(15,23,42,0.13)]"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accent}`}>
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl border border-slate-800 bg-[linear-gradient(135deg,#172554_0%,#164e63_52%,#14532d_100%)] p-5 text-white sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
          <div className="min-w-0">
            <h3 className="text-2xl font-extrabold leading-tight">
              Start with secure Marg access from Rs. 299/user/month
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-200">
              Pricing can vary by users, server resources, backup needs and selected cloud setup.
              Book a demo to choose the right configuration.
            </p>
          </div>

          <a
            href="#demo"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 transition hover:bg-slate-100 sm:w-auto"
          >
            Book Security Demo
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}