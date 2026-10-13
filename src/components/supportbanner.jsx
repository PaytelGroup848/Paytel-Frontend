import { MessageCircle, Headphones, ShieldCheck, ArrowRight, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SupportSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16 sm:py-20">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-10 h-64 w-64 rounded-full bg-indigo-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-purple-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT ── */}
          <div className="flex flex-col">
            {/* Badge */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700">
              <Headphones size={15} />
              24/7 Premium Support
            </span>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl xl:text-5xl">
              Real Experts.{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Real‑Time Help.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
              Whether you need guidance on products or help with an order, our
              specialists are standing by to resolve your queries in
              minutes — not hours.
            </p>

            {/* Feature rows */}
            <div className="mt-8 space-y-4">
              <FeatureRow
                iconBg="bg-indigo-100"
                icon={<MessageCircle className="text-indigo-600" size={20} />}
                title="Instant Live Chat"
                sub="Connect with our team in seconds via WhatsApp."
              />
              <FeatureRow
                iconBg="bg-emerald-100"
                icon={<ShieldCheck className="text-emerald-600" size={20} />}
                title="Trusted Specialists"
                sub="Certified product experts available round the clock."
              />
              <FeatureRow
                iconBg="bg-amber-100"
                icon={<Clock className="text-amber-600" size={20} />}
                title="Fast Response"
                sub="Average reply time under 60 seconds — guaranteed."
              />
            </div>

            {/* Rating strip */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-slate-100 w-fit">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-700">
                4.9 / 5 — 2,400+ happy customers
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
              >
                Contact Support
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* ── RIGHT — Image ── */}
          <div className="relative mt-8 lg:mt-0">
            {/* Image card */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100">
              <img
                src="/support.png"
                alt="Customer Support"
                className="h-full w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <MessageCircle className="text-green-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Live Support Active</p>
                <p className="text-xs text-slate-500">Avg. reply · 45 sec</p>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 shadow-xl">
              <Headphones size={16} className="text-indigo-200" />
              <p className="text-sm font-bold text-white">24 / 7 Available</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureRow({ iconBg, icon, title, sub }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{title}</h4>
        <p className="text-sm text-slate-500 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}