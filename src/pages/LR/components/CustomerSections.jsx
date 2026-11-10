import { ArrowRight, ChevronDown, Star, Zap } from "lucide-react";
import { questions, testimonials } from "../data/pageContent";
import { Eyebrow, SectionTitle } from "./SectionTitle";

export default function CustomerSections() {
  return (
    <>
      <section
          className="bg-slate-50 py-20 sm:py-24"
          aria-label="Sample customer testimonials"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle
              eyebrow="Sample customer stories"
              title="A more flexible way to work"
              description="Illustrative testimonials showing how remote access can support teams and their everyday workflows."
              centered
            />
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7"
                  key={testimonial.name}
                >
                  <div
                    className="mb-5 flex gap-1 text-amber-400"
                    aria-label="Sample five-star rating"
                    role="img"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        aria-hidden="true"
                        fill="currentColor"
                        key={index}
                        size={15}
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-7 text-slate-600">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {testimonial.role} <span aria-hidden="true">·</span>{" "}
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24" id="faq">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <Eyebrow>Good to know</Eyebrow>
              <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
                Questions?
                <br />
                <span className="text-sky-700">We have answers.</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-slate-600">
                Need help planning your remote workspace? Our team can help you
                work out what fits.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900"
              >
                Get in touch <ArrowRight size={16} />
              </a>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {questions.map(({ question, answer }, index) => (
                <details
                  key={question}
                  open={index === 0}
                  className="group py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-bold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span>{question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-180 group-open:bg-sky-100 group-open:text-sky-700">
                      <ChevronDown size={17} />
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-10 pt-4 text-sm leading-7 text-slate-600">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

      
    </>
  );
}
