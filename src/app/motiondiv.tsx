'use client';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

const MotionDivProvider = (props: Props) => {
  return (
    <motion.div
      animate={{ zoom: [0, 1.2, 1] }}
      transition={{ ease: 'easeOut', duration: 2 }}
    >
      {props.children}
    </motion.div>
  );
};

export default MotionDivProvider;
