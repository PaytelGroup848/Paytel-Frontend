import { createElement, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "./SectionTitle";
import FeatureVisual from "./FeatureVisual";

export default function FeatureAccordionGroup({ group, groupIndex }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = group.items[selectedIndex];

  return (
    <section aria-labelledby={`lr-feature-group-${groupIndex}`}>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <FeatureVisual item={selected} />
        <div>
          <div className="mb-6">
            <Eyebrow>Remote Access feature</Eyebrow>
            <h3
              className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
              id={`lr-feature-group-${groupIndex}`}
            >
              {group.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {group.description}
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {group.items.map(({ title, body, icon: Icon }, index) => {
              const isOpen = index === openIndex;
              const isSelected = index === selectedIndex;
              return (
                <article className="py-1" key={title}>
                  <button
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 py-4 text-left"
                    onClick={() => {
                      if (isOpen) {
                        setOpenIndex(-1);
                      } else {
                        setOpenIndex(index);
                        setSelectedIndex(index);
                      }
                    }}
                    type="button"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition ${isSelected ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {createElement(Icon, { size: 18 })}
                    </span>
                    <span
                      className={`flex-1 text-sm font-bold sm:text-base ${isSelected ? "text-slate-950" : "text-slate-600"}`}
                    >
                      {title}
                    </span>
                    <ChevronDown
                      className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-sky-700" : ""}`}
                      size={18}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 pl-12 pr-8 text-sm leading-6 text-slate-600">
                      {body}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
