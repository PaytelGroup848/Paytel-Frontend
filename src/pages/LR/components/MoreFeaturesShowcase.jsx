import { createElement, useState } from "react";
import { ArrowRight } from "lucide-react";
import { productivityFeatures } from "../data/featureOptions";
import { SectionTitle } from "./SectionTitle";

export default function MoreFeaturesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = productivityFeatures[activeIndex];
  const Icon = selected.icon;

  return (
    <section
      className="mt-16 bg-slate-50 py-16 sm:mt-24 sm:py-20"
      aria-labelledby="lr-more-features-title"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Maximize the productivity of your users"
          title="More amazing features"
          description="Useful extras to make everyday remote sessions easier for your team."
          centered
        />
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[270px_1fr]">
          <div
            aria-label="More remote access features"
            className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
            role="tablist"
          >
            {productivityFeatures.map(({ icon: TabIcon, title }, index) => (
              <button
                aria-selected={activeIndex === index}
                className={`flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3 text-left text-xs font-bold transition lg:w-full ${activeIndex === index ? "bg-sky-700 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-950"}`}
                id={`lr-more-feature-tab-${index}`}
                key={title}
                onClick={() => setActiveIndex(index)}
                role="tab"
                type="button"
              >
                {createElement(TabIcon, { size: 16 })}
                <span>{title}</span>
                <ArrowRight className="ml-auto hidden lg:block" size={14} />
              </button>
            ))}
          </div>
          <div
            aria-labelledby={`lr-more-feature-tab-${activeIndex}`}
            className="grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-12"
            role="tabpanel"
          >
            <div>
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-sky-50 text-sky-700">
                {createElement(Icon, { size: 23 })}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                {selected.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {selected.body}
              </p>
              <a
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900"
                href="/contact"
              >
                Discuss this feature <ArrowRight size={15} />
              </a>
            </div>
            <div className="relative grid min-h-[220px] place-items-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-sky-50 p-6">
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-sky-100/80 blur-2xl" />
              <div className="relative w-full max-w-[330px] rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
                <div className="py-6 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 text-sky-700">
                    {createElement(Icon, { size: 27 })}
                  </span>
                  <p className="mt-3 text-sm font-bold text-slate-800">
                    {selected.title}
                  </p>
                  <p className="mx-auto mt-1 max-w-[240px] text-[10px] leading-4 text-slate-500">
                    {selected.body}
                  </p>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <span className="block h-2 w-2/3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
