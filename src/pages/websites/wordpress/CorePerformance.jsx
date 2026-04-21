import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, RefreshCw } from 'lucide-react';

const PSI_KEY = import.meta.env.VITE_PAGESPEED_API_KEY;

function fetchPageSpeed(url, strategy) {
  return fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${PSI_KEY}`
  ).then(r => r.json());
}

function scoreColor(score) {
  if (score >= 90) return { stroke: '#22c55e', text: 'text-green-500', bg: 'bg-green-50', label: 'Excellent', labelColor: 'text-green-600' };
  if (score >= 50) return { stroke: '#f59e0b', text: 'text-amber-500', bg: 'bg-amber-50', label: 'Needs Work', labelColor: 'text-amber-600' };
  return               { stroke: '#ef4444', text: 'text-red-500',   bg: 'bg-red-50',   label: 'Poor',       labelColor: 'text-red-600'   };
}

function ScoreRing({ score }) {
  const size = 110, r = 44;
  const circumference = 2 * Math.PI * r;
  const colors = scoreColor(score);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={colors.stroke} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-black ${colors.text}`}>{score}</span>
        <span className="text-[9px] font-bold text-slate-400 tracking-wide">/100</span>
      </div>
    </div>
  );
}

function Metric({ label, value, good }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <span className={`text-[12px] font-bold ${good ? 'text-slate-800' : 'text-amber-500'}`}>{value ?? '—'}</span>
    </div>
  );
}

export default function CorePerformance({ siteUrl }) {
  const [strategy, setStrategy] = useState('desktop');

  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['pagespeed', siteUrl, strategy],
    queryFn: () => fetchPageSpeed(siteUrl, strategy),
    staleTime: 1000 * 60 * 5,
    enabled: !!siteUrl,
    retry: 1,
  });

  const lhr    = data?.lighthouseResult;
  const score  = lhr ? Math.round(lhr.categories.performance.score * 100) : null;
  const colors = score != null ? scoreColor(score) : null;

  const metrics = lhr ? [
    { label: 'FCP',   value: lhr.audits['first-contentful-paint'].displayValue,   good: lhr.audits['first-contentful-paint'].score >= 0.9   },
    { label: 'LCP',   value: lhr.audits['largest-contentful-paint'].displayValue, good: lhr.audits['largest-contentful-paint'].score >= 0.9 },
    { label: 'TBT',   value: lhr.audits['total-blocking-time'].displayValue,      good: lhr.audits['total-blocking-time'].score >= 0.9      },
    { label: 'CLS',   value: lhr.audits['cumulative-layout-shift'].displayValue,  good: lhr.audits['cumulative-layout-shift'].score >= 0.9  },
    { label: 'Speed', value: lhr.audits['speed-index'].displayValue,              good: lhr.audits['speed-index'].score >= 0.9              },
  ] : [];

  const lastScanned = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[13px] font-black text-slate-700">PageSpeed Insights</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
            {[{ value: 'desktop', Icon: Monitor }, { value: 'mobile', Icon: Smartphone }].map(({ value, Icon }) => (
              <button
                key={value}
                onClick={() => setStrategy(value)}
                className={`p-1.5 rounded-md transition-all ${strategy === value ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Icon size={13} />
              </button>
            ))}
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <RefreshCw size={13} className={isFetching ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-[110px] h-[110px] rounded-full bg-slate-100 animate-pulse" />
          <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
          <div className="grid grid-cols-3 gap-3 w-full mt-2">
            {[...Array(6)].map((_, i) => <div key={i} className="h-8 rounded-lg bg-slate-100 animate-pulse" />)}
          </div>
        </div>
      ) : score != null ? (
        <>
          <div className="flex flex-col items-center gap-1 mb-4">
            <ScoreRing score={score} />
            <span className={`text-[13px] font-black mt-1 ${colors.labelColor}`}>{colors.label}</span>
            {lastScanned && (
              <span className="text-[10px] text-slate-400">Last scan · {lastScanned}</span>
            )}
          </div>

          <div className={`grid grid-cols-3 gap-3 p-3 rounded-xl ${colors.bg}`}>
            {metrics.map(m => <Metric key={m.label} {...m} />)}
          </div>

          <button
            onClick={() => refetch()}
            className="mt-3 w-full text-[11px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
          >
            Run speed test →
          </button>
        </>
      ) : (
        <p className="text-xs text-slate-400 text-center py-6">
          {data?.error?.message || 'Could not load score.'}
        </p>
      )}
    </div>
  );
}