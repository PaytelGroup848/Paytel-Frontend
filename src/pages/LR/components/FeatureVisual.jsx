import { createElement } from "react";
import { LockKeyhole } from "lucide-react";

export default function FeatureVisual({ item }) {
  const Icon = item.icon;

  return (
    <div className="relative min-h-[310px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-5 sm:min-h-[380px] sm:p-8">
      <div className="absolute -right-14 -top-20 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-violet-100/60 blur-3xl" />
      <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[340px]">
        <div className="absolute h-52 w-52 rounded-full border border-sky-200/70" />
        <div className="absolute h-40 w-40 rounded-full border border-dashed border-blue-200" />
        <div className="relative w-full max-w-[330px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-300/50">
          <div className="mb-5 flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <i className="h-2 w-2 rounded-full bg-rose-300" />
            <i className="h-2 w-2 rounded-full bg-amber-300" />
            <i className="h-2 w-2 rounded-full bg-emerald-300" />
            <span className="ml-2 truncate text-[9px] font-semibold text-slate-400">
              {item.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-700">
              {createElement(Icon, { size: 27 })}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-sky-700">
                REMOTE WORKSPACE
              </p>
              <h4 className="mt-1 text-sm font-bold text-slate-900">
                {item.title}
              </h4>
              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                {item.body}
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <span className="h-8 rounded-md bg-sky-50" />
            <span className="h-8 rounded-md bg-violet-50" />
            <span className="h-8 rounded-md bg-orange-50" />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[9px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <LockKeyhole size={11} /> Secure session
            </span>
            <span>Ready to connect</span>
          </div>
        </div>
      </div>
    </div>
  );
}
