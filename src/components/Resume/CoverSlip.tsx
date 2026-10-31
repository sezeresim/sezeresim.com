'use client';
import { type CSSProperties, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { motion, useReducedMotion } from 'motion/react';

import { sanitizeRecipient } from './resume-utils';

type Props = { updated: string };

const Slip = ({ updated }: Props) => {
  const params = useSearchParams();
  const reduceMotion = useReducedMotion();
  const to = sanitizeRecipient(params.get('to'));
  if (!to) return null;

  const text = `For the attention of ${to}`;

  return (
    <motion.aside
      aria-label='Cover note'
      className='slip mx-auto mb-5 max-w-md -rotate-1 px-5 py-3 text-[13px] text-ink print:hidden'
      initial={reduceMotion ? false : { y: -40, opacity: 0, rotate: 3 }}
      animate={{ y: 0, opacity: 1, rotate: -1 }}
      transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className='typed'
        style={{ '--n': text.length, '--delay': '0.9s' } as CSSProperties}
      >
        {text}
      </span>
      <span className='mt-1 block text-[11px] text-ink/50'>
        typed {updated}
      </span>
    </motion.aside>
  );
};

/** Personal slip shown when the link carries ?to=Company. Static page, so the
 *  recipient is read on the client only and never stored. */
const CoverSlip = (props: Props) => (
  <Suspense fallback={null}>
    <Slip {...props} />
  </Suspense>
);

export default CoverSlip;
