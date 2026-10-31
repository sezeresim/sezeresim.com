'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = { children: React.ReactNode };

/** The red stamp slams down when it scrolls into view. Static in print. */
const StampSlam = ({ children }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className='relative inline-block'>
      {/* ink bleed under the stamp */}
      <motion.span
        aria-hidden
        className='absolute -inset-3 -z-10 rounded-full bg-ribbon/25 blur-md print:hidden'
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.32, duration: 0.25 }}
      />
      <motion.div
        className='stamp'
        initial={reduceMotion ? false : { opacity: 0, scale: 2.4, rotate: -22 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          delay: 0.25,
          type: 'spring',
          stiffness: 700,
          damping: 26,
          mass: 0.7,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StampSlam;
