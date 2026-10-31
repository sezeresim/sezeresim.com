'use client';
import { motion, useScroll, useSpring } from 'motion/react';

/** Thin bar under the header that fills as the reader scrolls. */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className='fixed inset-x-0 top-16 z-30 h-0.5 origin-left bg-gradient-to-r from-sky-500 via-violet-500 to-sky-500'
    />
  );
};

export default ReadingProgress;
