import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Transition = (props: Props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 10, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{
          delay: 0.5,
          x: { duration: 1 },
          default: { ease: 'linear' },
        }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Transition
