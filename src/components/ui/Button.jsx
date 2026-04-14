import { motion } from 'framer-motion';
import Spinner from './Spinner';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed';

const variantMap = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  danger: 'bg-danger text-white hover:bg-danger/90',
  ghost: 'bg-white/0 text-textPrimary hover:bg-white/5 border border-white/10',
};

const sizeMap = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
}) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      whileHover={isDisabled ? undefined : { scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      className={[
        base,
        variantMap[variant] ?? variantMap.primary,
        sizeMap[size] ?? sizeMap.md,
        className,
      ].join(' ')}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
    >
      {loading ? <Spinner size="sm" color="#FFFFFF" /> : null}
      <span className={loading ? 'opacity-80' : ''}>{children}</span>
    </motion.button>
  );
}

