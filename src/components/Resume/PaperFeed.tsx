'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = { children: React.ReactNode; className?: string };

/** Slides the sheet in from the top, like paper being fed into a typewriter. */
const PaperFeed = ({ children, className }: Props) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { y: -80, opacity: 0, rotate: -0.6 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PaperFeed;
