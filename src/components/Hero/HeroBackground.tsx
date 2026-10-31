'use client';
import { motion, useReducedMotion } from 'motion/react';

const orbs = [
  {
    className:
      'left-[-10%] top-[-10%] h-[28rem] w-[28rem] bg-sky-300/50 dark:bg-sky-500/25',
    x: [0, 60, -30, 0],
    y: [0, 40, 80, 0],
    duration: 26,
  },
  {
    className:
      'right-[-5%] top-[10%] h-[22rem] w-[22rem] bg-violet-300/40 dark:bg-violet-500/20',
    x: [0, -50, 20, 0],
    y: [0, 60, -20, 0],
    duration: 30,
  },
  {
    className:
      'bottom-[-20%] left-[30%] h-[20rem] w-[20rem] bg-cyan-200/50 dark:bg-cyan-400/15',
    x: [0, 40, -40, 0],
    y: [0, -40, 20, 0],
    duration: 34,
  },
];

/** Soft, slowly drifting colour orbs behind the hero. Decorative only. */
const HeroBackground = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className='pointer-events-none absolute top-0 left-1/2 -z-10 h-[46rem] w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]'
    >
      <div className='absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]' />
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={reduceMotion ? undefined : { x: orb.x, y: orb.y }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default HeroBackground;
