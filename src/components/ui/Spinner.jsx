import { motion } from 'framer-motion';

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 28,
};

export default function Spinner({ size = 'md', color = 'currentColor' }) {
  const px = sizeMap[size] ?? sizeMap.md;

  return (
    <motion.div
      aria-label="Loading"
      role="status"
      className="inline-block rounded-full border-2 border-white/20 border-t-white/90"
      style={{ width: px, height: px, borderTopColor: color }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
    />
  );
}

