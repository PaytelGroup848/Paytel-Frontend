export default function SkeletonCard({ height = 120 }) {
  return (
    <div
      className="animate-pulse bg-white/10 rounded-xl border border-white/10"
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    />
  );
}

