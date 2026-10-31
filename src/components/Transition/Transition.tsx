'use client';
import { FC } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import { TransitionProps } from './Transition.types';

const Transition: FC<TransitionProps> = ({ children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
