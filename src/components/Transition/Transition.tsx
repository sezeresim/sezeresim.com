import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import { TransitionProps } from './Transition.types';

const Transition: FC<TransitionProps> = (props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 10, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{
          delay: 0.2,
          x: { duration: 1 },
          default: { ease: 'linear' },
        }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
