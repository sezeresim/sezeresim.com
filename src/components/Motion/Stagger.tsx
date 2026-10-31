'use client';
import { motion, useReducedMotion, type Variants } from 'motion/react';

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child. */
  gap?: number;
  /** Animate once when the element scrolls into view instead of on mount. */
  inView?: boolean;
};

const container: Variants = {
  hidden: {},
  show: (gap: number) => ({
    transition: { staggerChildren: gap, delayChildren: 0.05 },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Parent that reveals its StaggerItem children one after another. */
export const Stagger = ({
  children,
  className,
  gap = 0.08,
  inView = true,
}: StaggerProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={container}
      custom={gap}
      initial='hidden'
      {...(inView
        ? { whileInView: 'show', viewport: { once: true, margin: '-80px' } }
        : { animate: 'show' })}
    >
      {children}
    </motion.div>
  );
};

type ItemProps = { children: React.ReactNode; className?: string };

export const StaggerItem = ({ children, className }: ItemProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
};
