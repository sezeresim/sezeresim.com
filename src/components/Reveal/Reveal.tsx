'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
};

/** Fades and slides children in. Respects reduced-motion. */
const Reveal = ({ children, delay = 0, className, inView = false }: Props) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      {...(inView
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-80px' },
          }
        : { animate: { opacity: 1, y: 0 } })}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
