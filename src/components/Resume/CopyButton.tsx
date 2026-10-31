'use client';
import { useState } from 'react';

import { Copy } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type Props = { value: string; label: string };

/** Copies a value; confirms with a small red "COPIED" stamp (announced politely). */
const CopyButton = ({ value, label }: Props) => {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard blocked: the visible text can still be selected manually.
    }
  };

  return (
    <span className='relative inline-flex align-middle print:hidden'>
      <button
        type='button'
        onClick={copy}
        aria-label={copied ? 'Copied' : label}
        className='ml-1 inline-flex items-center rounded p-0.5 text-ink/50 transition-colors hover:text-ribbon focus-visible:ring-2 focus-visible:ring-ribbon focus-visible:outline-none'
      >
        <Copy className='h-3.5 w-3.5' aria-hidden />
        <span aria-live='polite' className='sr-only'>
          {copied ? 'Copied to clipboard' : ''}
        </span>
      </button>
      <AnimatePresence>
        {copied ? (
          <motion.span
            aria-hidden
            className='stamp pointer-events-none absolute -top-5 left-1/2 px-1.5 py-0 text-[9px]'
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.8, rotate: -14, x: '-50%' }
            }
            animate={{ opacity: 1, scale: 1, rotate: -8, x: '-50%' }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 18 }}
          >
            copied
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
};

export default CopyButton;
