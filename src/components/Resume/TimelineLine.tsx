'use client';
import { motion, useReducedMotion } from 'motion/react';

/** Vertical dashed rule that draws itself downward when it enters view. */
const TimelineLine = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ transformOrigin: 'top' }}
      initial={reduceMotion ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};

export default TimelineLine;
