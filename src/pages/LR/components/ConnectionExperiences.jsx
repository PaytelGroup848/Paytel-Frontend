import { createElement } from "react";
import { connectionExperienceItems } from "../data/featureOptions";
import { Eyebrow } from "./SectionTitle";

export default function ConnectionExperiences() {
  return (
    <section aria-labelledby="lr-connection-experiences">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <Eyebrow>Enable ideal user experiences</Eyebrow>
        <h3
          className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
          id="lr-connection-experiences"
        >
          Connection experiences
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Choose how each person opens a desktop or application, from a familiar
          client to the browser.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connectionExperienceItems.map(({ icon: Icon, title, body, tone }) => (
          <article
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            key={title}
          >
            <div
              className={`relative grid h-36 place-items-center overflow-hidden bg-gradient-to-br ${tone}`}
            >
              <div className="absolute h-28 w-28 rounded-full border border-white/80" />
              <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/70 bg-white/80 text-sky-800 shadow-lg transition group-hover:scale-105">
                {createElement(Icon, { size: 27 })}
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-bold text-slate-600">
                CLOUDEDATA REMOTE
              </span>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-slate-900">{title}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-600">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
