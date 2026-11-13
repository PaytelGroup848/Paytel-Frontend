import { AppWindow, LockKeyhole, Monitor, Network, Printer, Users } from "lucide-react";

export default function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] pb-10 pt-4 sm:pt-8">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
      <div className="absolute -right-3 top-10 h-32 w-32 rounded-full border border-cyan-200/30" />
      <div className="absolute -bottom-1 left-4 h-24 w-24 rounded-full border border-blue-200/30" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl shadow-blue-950/40">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Secure
            session
          </span>
        </div>
        <div className="grid min-h-[300px] grid-cols-[115px_1fr] sm:grid-cols-[155px_1fr]">
          <aside className="relative flex flex-col border-r border-slate-100 bg-slate-50 p-3 sm:p-4">
            <div className="mb-2 flex items-center gap-2 rounded-lg bg-sky-100 px-2 py-2 text-[10px] font-bold text-sky-800 sm:text-xs">
              <Monitor size={14} /> My desktop
            </div>
            <div className="mb-2 flex items-center gap-2 px-2 py-2 text-[10px] text-slate-500 sm:text-xs">
              <AppWindow size={14} /> Applications
            </div>
            <div className="flex items-center gap-2 px-2 py-2 text-[10px] text-slate-500 sm:text-xs">
              <Users size={14} /> Team access
            </div>
            <div className="mt-auto flex items-center gap-2 border-t border-slate-200 pt-4">
          
              <span className="hidden min-w-0 sm:block">
                <b className="block truncate text-[10px] text-slate-700">
                  Alex Morgan
                </b>
                <small className="text-[9px] text-slate-400">
                  Workspace user
                </small>
              </span>
            </div>
          </aside>
          <div className="min-w-0 p-4 sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[9px] font-bold tracking-[0.18em] text-sky-700">
                  YOUR WORKSPACE
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-xl">
                  Good morning, Alex
                </h3>
                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Pick up right where you left off.
                </p>
              </div>
             
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-2">
                <i className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <i className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <i className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span className="ml-2 text-[9px] font-medium text-slate-300">
                  Finance workspace
                </span>
                <span className="ml-auto text-slate-400">•••</span>
              </div>
              <div className="grid grid-cols-[24px_1fr] sm:grid-cols-[35px_1fr]">
                <div className="flex flex-col items-center gap-3 bg-slate-100 py-3 text-slate-400">
                  <Monitor size={12} />
                  <AppWindow size={12} />
                  <Network size={12} />
                  <Printer size={12} />
                </div>
                <div className="p-3 sm:p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="h-2 w-20 rounded bg-slate-200 sm:w-28" />
                    <span className="h-5 w-14 rounded-md bg-sky-100" />
                  </div>
                  <div className="grid h-20 grid-cols-8 items-end gap-1 border-b border-slate-100 px-1 sm:h-28 sm:gap-2">
                    {[35, 58, 44, 78, 53, 88, 65, 96].map((height, i) => (
                      <span
                        key={i}
                        className="rounded-t-sm bg-gradient-to-t from-sky-700 to-cyan-400"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((n) => (
                      <div
                        key={n}
                        className="rounded-md border border-slate-100 p-2"
                      >
                        <span className="mb-2 block h-1.5 w-8 rounded bg-slate-200" />
                        <span className="block h-2 w-12 rounded bg-slate-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[9px] text-slate-400">
              <span className="flex items-center gap-1">
                <LockKeyhole size={10} /> Encrypted connection
              </span>
              <span>Connected just now</span>
            </div>
          </div>
        </div>
      </div>
      {" "}
    </div>
  );
}
