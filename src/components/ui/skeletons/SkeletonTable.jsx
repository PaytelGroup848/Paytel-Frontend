export default function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="bg-surface border border-white/10 rounded-xl p-6">
      <div className="animate-pulse bg-white/10 rounded h-10 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {Array.from({ length: cols }).map((__, c) => (
              <div key={c} className="animate-pulse bg-white/10 rounded h-8" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

