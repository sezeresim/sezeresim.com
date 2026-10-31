'use client';
import { useEffect, useRef } from 'react';

import { useReducedMotion } from 'motion/react';

/** Warm pool of lamp light on the desk that follows the pointer. Decorative. */
const DeskLamp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--lx', `${e.clientX}px`);
        el.style.setProperty('--ly', `${e.clientY}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden
      className='desk-lamp pointer-events-none fixed inset-0 -z-10 print:hidden'
    />
  );
};

export default DeskLamp;
