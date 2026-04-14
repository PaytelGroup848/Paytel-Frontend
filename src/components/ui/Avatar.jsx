const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const getInitials = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return (first + last).toUpperCase();
};

export default function Avatar({ name, src, size = 'md' }) {
  return (
    <div
      className={[
        'rounded-full overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center font-semibold text-textPrimary',
        sizeMap[size] ?? sizeMap.md,
      ].join(' ')}
    >
      {src ? <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" /> : getInitials(name)}
    </div>
  );
}

