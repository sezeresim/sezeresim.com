'use client';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: 'p' | 'h1' | 'h2' | 'span';
};

/** Reveals a sentence one word at a time. */
const WordReveal = ({ text, className, delay = 0, as = 'p' }: Props) => {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(' ');

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial='hidden'
      animate='show'
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className='inline-block'
          variants={{
            hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
};

export default WordReveal;
