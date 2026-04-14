export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={[
        'bg-surface border border-white/10 rounded-xl p-6',
        onClick ? 'cursor-pointer hover:border-white/20 transition-colors' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

