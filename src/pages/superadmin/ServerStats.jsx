import { useEffect, useState } from 'react';
import { Cpu, MemoryStick, HardDrive, Activity } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { useServerStats } from '../../hooks/useAdminServers';

// ─── Parsers ─────────────────────────────────────────────────────────────────

function parsePercent(val) {
  const match = String(val ?? '').match(/(\d+(\.\d+)?)\s*%/);
  return match ? parseFloat(match[1]) : null;
}

function parseUptime(raw) {
  if (!raw) return null;
  const time   = raw.match(/^[\d:]+/)?.[0] ?? null;
  const days   = raw.match(/(\d+)\s+day/)?.[1] ?? '0';
  const users  = raw.match(/(\d+)\s+user/)?.[1] ?? '0';
  const lm     = raw.match(/load average:\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
  return { time, days, users, load: lm ? [lm[1], lm[2], lm[3]] : null };
}

function parseMemory(raw) {
  if (!raw) return null;
  const lines  = raw.trim().split('\n').filter(Boolean);
  const header = lines[0]?.trim().split(/\s+/) ?? [];
  const rows   = lines.slice(1).map(line => {
    const parts = line.trim().split(/\s+/);
    return { label: parts[0], values: parts.slice(1) };
  });
  return { header, rows };
}

function parseDisk(raw) {
  if (!raw) return null;
  const lines = raw.trim().split('\n').filter(Boolean);
  return lines.slice(1).map(line => {
    const p = line.trim().split(/\s+/);
    return { fs: p[0], size: p[1], used: p[2], avail: p[3], usePct: p[4], mount: p.slice(5).join(' ') };
  });
}

// ─── Colors ──────────────────────────────────────────────────────────────────

function barColor(pct) {
  if (pct == null) return 'bg-blue-500';
  if (pct < 60)   return 'bg-emerald-500';
  if (pct < 85)   return 'bg-amber-500';
  return 'bg-red-500';
}

function pctTextColor(str) {
  const n = parseFloat(str);
  if (isNaN(n)) return 'text-white/40';
  if (n < 60)   return 'text-emerald-400';
  if (n < 85)   return 'text-amber-400';
  return 'text-red-400';
}

function pctBadgeColor(str) {
  const n = parseFloat(str);
  if (isNaN(n)) return 'bg-white/5 text-white/40';
  if (n < 60)   return 'bg-emerald-500/10 text-emerald-400';
  if (n < 85)   return 'bg-amber-500/10 text-amber-400';
  return 'bg-red-500/10 text-red-400';
}

// ─── Shared progress bar ──────────────────────────────────────────────────────

function ProgressBar({ pct }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (pct == null) return;
    const t = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  if (pct == null) return null;
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <div
        className={`h-full rounded-full transition-all duration-[1000ms] ease-out ${barColor(pct)}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Content renderers ────────────────────────────────────────────────────────

function UptimeContent({ raw }) {
  const p = parseUptime(raw);
  if (!p) return <pre className="font-mono text-[11px] text-white/50 whitespace-pre-wrap break-words">{raw || '—'}</pre>;

  const items = [
    { label: 'Time',   value: p.time  ?? '—' },
    { label: 'Uptime', value: `${p.days} day${p.days === '1' ? '' : 's'}` },
    { label: 'Users',  value: p.users },
    { label: 'Load',   value: p.load ? p.load.join('  ·  ') : '—' },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">{label}</span>
          <span className="font-mono text-[12px] text-white/75">{value}</span>
        </div>
      ))}
    </div>
  );
}

function MemoryContent({ raw }) {
  const p = parseMemory(raw);
  if (!p) return <pre className="font-mono text-[11px] text-white/50 whitespace-pre-wrap break-words">{raw || '—'}</pre>;

  return (
    <table className="w-full" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className="text-left font-mono text-[9px] uppercase tracking-widest text-white/25 pb-2 font-normal w-14" />
          {p.header.map(h => (
            <th key={h} className="text-right font-mono text-[9px] uppercase tracking-wider text-white/25 pb-2 px-2 font-normal">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {p.rows.map(({ label, values }) => (
          <tr key={label} className="border-t border-white/[0.05]">
            <td className="font-mono text-[10px] text-white/35 py-1.5 pr-2 text-left">{label}</td>
            {values.map((v, i) => (
              <td key={i} className="font-mono text-[11px] text-white/65 px-2 py-1.5 text-right">{v || '—'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DiskContent({ raw }) {
  const rows = parseDisk(raw);
  if (!rows) return <pre className="font-mono text-[11px] text-white/50 whitespace-pre-wrap break-words">{raw || '—'}</pre>;

  return (
    <table className="w-full" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['Filesystem', 'Size', 'Used', 'Avail', 'Use%', 'Mount'].map((h, i) => (
            <th key={h} className={`font-mono text-[9px] uppercase tracking-wider text-white/25 pb-2 font-normal
              ${i === 0 || i === 5 ? 'text-left' : 'text-right'}
              ${i === 0 ? 'pr-3' : i === 5 ? 'pl-3' : 'px-2'}
            `}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-white/[0.05]">
            <td className="font-mono text-[10px] text-white/40 pr-3 py-1.5 text-left max-w-[90px] truncate">{row.fs}</td>
            <td className="font-mono text-[11px] text-white/60 px-2 py-1.5 text-right">{row.size}</td>
            <td className="font-mono text-[11px] text-white/60 px-2 py-1.5 text-right">{row.used}</td>
            <td className="font-mono text-[11px] text-white/60 px-2 py-1.5 text-right">{row.avail}</td>
            <td className="py-1.5 px-2 text-right">
              <span className={`inline-block font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded ${pctBadgeColor(row.usePct)}`}>
                {row.usePct}
              </span>
            </td>
            <td className="font-mono text-[10px] text-white/40 pl-3 py-1.5 text-left max-w-[90px] truncate">{row.mount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

const CONTENT_MAP = { cpu: UptimeContent, memory: MemoryContent, disk: DiskContent };

function StatCard({ statKey, label, icon: Icon, rawValue, delay }) {
  const pct = parsePercent(rawValue);
  const [mounted, setMounted] = useState(false);
  const ContentComponent = CONTENT_MAP[statKey];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`
      w-full rounded-xl border border-white/[0.07] bg-white/[0.03]
      transition-all duration-500 ease-out
      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}>
      {/* Card header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06]">
            <Icon size={12} className="text-white/50" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
            {label}
          </span>
        </div>
        {pct != null && (
          <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md ${pctBadgeColor(String(pct))}`}>
            {pct}%
          </span>
        )}
      </div>

      {/* Progress bar (full width, flush) */}
      {pct != null && (
        <div className="px-5 pb-3">
          <ProgressBar pct={pct} />
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/[0.05]" />

      {/* Content */}
      <div className="px-5 py-4 ">
        <ContentComponent raw={rawValue} />
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-white/[0.06] animate-pulse" />
          <div className="h-2.5 w-20 rounded bg-white/[0.06] animate-pulse" />
        </div>
        <div className="h-5 w-10 rounded-md bg-white/[0.05] animate-pulse" />
      </div>
      <div className="px-5 pb-3">
        <div className="h-1 w-full rounded-full bg-white/[0.05] animate-pulse" />
      </div>
      <div className="border-t border-white/[0.05]" />
      <div className="px-5 py-4 flex flex-col gap-2.5">
        <div className="h-2 w-full rounded bg-white/[0.05] animate-pulse" />
        <div className="h-2 w-4/5 rounded bg-white/[0.04] animate-pulse" />
        <div className="h-2 w-3/5 rounded bg-white/[0.04] animate-pulse" />
      </div>
    </div>
  );
}

// ─── Live badge ───────────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400">LIVE</span>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const STATS = [
  { key: 'cpu',    label: 'CPU / Uptime', icon: Cpu,         dataKey: 'uptime'  },
  { key: 'memory', label: 'RAM',          icon: MemoryStick, dataKey: 'memory'  },
  { key: 'disk',   label: 'Disk',         icon: HardDrive,   dataKey: 'disk'    },
];

const LEGEND = [
  { color: 'bg-emerald-500', label: '< 60%'  },
  { color: 'bg-amber-500',   label: '60–85%' },
  { color: 'bg-red-500',     label: '> 85%'  },
];

export default function ServerStats({ serverId, isOpen, onClose }) {
  const { data, isLoading } = useServerStats(serverId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" className="w-full max-w-2xl">
      <div className="w-full pb-1">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-white tracking-tight">Live Server Stats</h2>
            <p className="mt-0.5 font-mono text-[11px] text-white/30">
              {serverId ?? 'srv-001'} · metrics stream
            </p>
          </div>
          <LiveBadge />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {isLoading
            ? STATS.map((_, i) => <SkeletonCard key={i} />)
            : STATS.map(({ key, label, icon, dataKey }, i) => (
                <StatCard
                  key={key}
                  statKey={key}
                  label={label}
                  icon={icon}
                  rawValue={data?.[dataKey]}
                  delay={i * 80}
                />
              ))
          }
        </div>

        {/* Footer */}
        {/* <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
          <div className="flex items-center gap-1.5 text-white/20">
            <Activity size={10} />
            <span className="font-mono text-[10px]">updated just now</span>
          </div>
          <div className="flex items-center gap-3">
            {LEGEND.map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                <span className="font-mono text-[10px] text-white/30">{label}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Modal>
  );
}