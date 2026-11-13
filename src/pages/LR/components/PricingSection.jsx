import { createElement, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Cloud, Monitor, Sparkles } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export default function PricingSection() {
  const [billing, setBilling] = useState("subscription");
  const plans = [
    {
      icon: Monitor,
      title: "Desktop Edition",
      copy: "Remote desktops for people who need a consistent workspace.",
      purchase: "Own your license",
      subscription: "Pay as you go",
      purchaseNote: "One-time licensing",
      subscriptionNote: "Flexible subscription",
      items: [
        "Updates & Support (1 year)",
        "Remote Desktop Access",
        "Application Delivery",
        "Remote Printing",
      ],
      button: "Know More",
    },
    {
      icon: Sparkles,
      title: "Web Mobile Edition",
      copy: "Flexible application access for teams with more users and more to manage.",
      purchase: "Scale with confidence",
      subscription: "Built to grow",
      purchaseNote: "Perpetual license options",
      subscriptionNote: "Monthly or yearly options",
      items: [
        "Updates & Support (1 year)",
        "Remote Desktop Access",
        "Application Delivery",
        "Remote Printing",
        "Web Portal",
        "HTML5 Client",
      ],
      button: "Know More",
      featured: true,
    },
    {
      icon: Cloud,
      title: "Enterprise Edition",
      copy: "Have a specific infrastructure, compliance, or rollout requirement?",
      purchase: "Let's plan it together",
      subscription: "Let's plan it together",
      purchaseNote: "Solutions tailored to your needs",
      subscriptionNote: "Solutions tailored to your needs",
      items: [
        "Updates & Support (1 year)",
        "Remote Desktop Access",
        "Application Delivery",
        "Remote Printing",
        "Web Portal",
        "HTML5 Client",
        "Farm Manager",
        "Gateway",
      ],
      button: "Know More",
    },
  ];
  return (
    <section className="bg-slate-50 py-20 sm:py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Straightforward choices"
          title="A plan that works for your team"
          description="Choose the way you want to get started. Our team can help you find the right fit for your setup."
          centered
        />
        <div
          className="mx-auto mb-10 flex w-fit rounded-full border border-slate-200 bg-white p-1 shadow-sm"
          role="group"
          aria-label="Choose a licensing option"
        >
          {/* <button
            type="button"
            onClick={() => setBilling("purchase")}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${billing === "purchase" ? "bg-slate-950 text-white shadow" : "text-slate-600 hover:text-slate-950"}`}
          >
            One-time purchase
          </button> */}
          <button
            type="button"
            onClick={() => setBilling("subscription")}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${billing === "subscription" ? "bg-slate-950 text-white shadow" : "text-slate-600 hover:text-slate-950"}`}
          >
            Subscription
          </button>
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map(
            ({
              icon: Icon,
              label,
              title,
              copy,
              purchase,
              subscription,
              purchaseNote,
              subscriptionNote,
              items,
              button,
              featured,
            }) => (
              <article
                key={title}
                className={`relative flex flex-col rounded-2xl border p-7 transition hover:-translate-y-1 hover:shadow-xl sm:p-8 ${featured ? "border-sky-600 bg-white shadow-xl shadow-sky-900/10 ring-1 ring-sky-600" : "border-slate-200 bg-white shadow-sm"}`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sky-700 px-4 py-1.5 text-[10px] font-extrabold tracking-[0.12em] text-white">
                    POPULAR CHOICE
                  </span>
                )}
               
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {title}
                </h3>
                
                
                <ul className="my-6 flex-1 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm text-slate-600"
                    >
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${featured ? "bg-sky-700 text-white hover:bg-sky-800" : "border border-slate-300 text-slate-800 hover:border-slate-950 hover:bg-slate-50"}`}
                >
                  {button}
                  <ArrowRight size={16} />
                </a>
              </article>
            ),
          )}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Need help comparing options?{" "}
          <a href="/contact" className="font-bold text-sky-700 hover:underline">
            Our team is happy to help{" "}
            <ArrowUpRight size={13} className="inline" />
          </a>
        </p>
      </div>
    </section>
  );
}
