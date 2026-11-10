import { createElement } from "react";
import { reasons } from "../data/reasons";
import { SectionTitle } from "./SectionTitle";

export default function WhyRemoteAccessSection() {
  return (
    <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle
              eyebrow="One platform, more possibilities"
              title="Remote work without the complexity"
              description="Bring your people and business applications together with a remote access experience designed to feel effortless."
              centered
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map(({ icon: Icon, title, body }, index) => (
                <article
                  key={title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
                >
                  <div className="mb-7 flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-sky-50 text-sky-700 transition group-hover:bg-sky-700 group-hover:text-white">
                      {createElement(Icon, { size: 22 })}
                    </span>
                    <span className="text-sm font-extrabold text-slate-200">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {body}
                  </p>
                  <span className="absolute bottom-0 left-6 right-6 h-0.5 origin-left scale-x-0 bg-sky-600 transition-transform group-hover:scale-x-100 sm:left-7 sm:right-7" />
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
