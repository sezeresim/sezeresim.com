'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

import { X } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';

import { startFlight } from './flight-scene';

type Props = {
  targets: string[];
  onExit: () => void;
  onCollect?: () => void;
};

/** Full-screen Three.js flight. Loaded on demand; see Resume.tsx. */
const PlaneFlight = ({ targets, onExit, onCollect }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [score, setScore] = useState({ count: 0, total: targets.length });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return startFlight({
      canvas,
      dark: resolvedTheme === 'dark',
      targets,
      callbacks: {
        onCollect: (count, total) => {
          setScore({ count, total });
          onCollect?.();
        },
        onExit,
      },
    });
    // The scene is created once per flight; theme/targets are read at launch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = score.count === score.total;

  return (
    <motion.div
      className='fixed inset-0 z-50 font-mono print:hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role='dialog'
      aria-label='Paper plane flight'
    >
      <canvas ref={canvasRef} className='block h-full w-full' />

      {/* HUD */}
      <div className='pointer-events-none absolute inset-x-0 top-4 flex items-start justify-between px-4 text-[12px] text-slate-700 dark:text-slate-200'>
        <div className='rounded border border-slate-900/15 bg-white/70 px-3 py-2 backdrop-blur-sm dark:border-white/15 dark:bg-slate-950/60'>
          <p className='font-semibold'>
            <kbd className='keycap-sm'>W</kbd>{' '}
            <kbd className='keycap-sm'>S</kbd> pitch ·{' '}
            <kbd className='keycap-sm'>A</kbd>{' '}
            <kbd className='keycap-sm'>D</kbd> turn ·{' '}
            <kbd className='keycap-sm'>Shift</kbd> boost ·{' '}
            <kbd className='keycap-sm'>Esc</kbd> land
          </p>
          <p className='mt-1 text-slate-500 dark:text-slate-400'>
            Collect the floating keys.
          </p>
        </div>
        <div className='pointer-events-auto flex items-center gap-2'>
          <span
            aria-live='polite'
            className='rounded border border-slate-900/15 bg-white/70 px-3 py-2 tabular-nums backdrop-blur-sm dark:border-white/15 dark:bg-slate-950/60'
          >
            {done ? (
              <span className='text-ribbon'>All {score.total} collected ✓</span>
            ) : (
              <>
                {score.count} / {score.total}
              </>
            )}
          </span>
          <Button variant='outline' size='sm' onClick={onExit}>
            <X className='mr-1.5 h-4 w-4' aria-hidden />
            Land
          </Button>
        </div>
      </div>

      {done ? (
        <motion.div
          aria-hidden
          className='stamp pointer-events-none absolute bottom-10 left-1/2 text-base'
          initial={{ opacity: 0, scale: 2.2, rotate: -22, x: '-50%' }}
          animate={{ opacity: 1, scale: 1, rotate: -8, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 600, damping: 24 }}
        >
          full stack · cleared
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default PlaneFlight;
