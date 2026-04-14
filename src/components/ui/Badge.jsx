const variantMap = {
  success: 'bg-success/15 text-success border-success/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  danger: 'bg-danger/15 text-danger border-danger/30',
  info: 'bg-secondary/15 text-secondary border-secondary/30',
  default: 'bg-white/10 text-textPrimary border-white/10',
};

export default function Badge({ variant = 'default', children, className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        variantMap[variant] ?? variantMap.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

