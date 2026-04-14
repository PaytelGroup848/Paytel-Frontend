export default function SkeletonList({ rows = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 bg-surface border border-white/10 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full animate-pulse bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded animate-pulse bg-white/10" />
            <div className="h-3 w-2/3 rounded animate-pulse bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

