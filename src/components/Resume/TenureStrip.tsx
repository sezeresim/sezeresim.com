'use client';
import { differenceInMonths } from 'date-fns';
import { motion, useReducedMotion } from 'motion/react';

import type { ResumeEntry } from '@/constants/resume';

import { parseMonth } from './resume-utils';

type Props = { work: ResumeEntry[]; education: ResumeEntry[] };

/** Year ruler with one bar per role (solid red) and per degree (hollow). */
const TenureStrip = ({ work, education }: Props) => {
  const reduceMotion = useReducedMotion();
  const all = [...work, ...education];
  const start = all.reduce<Date>(
    (min, e) => (parseMonth(e.start) < min ? parseMonth(e.start) : min),
    parseMonth(all[0].start),
  );
  const startYear = start.getFullYear();
  const now = new Date();
  const total = differenceInMonths(now, new Date(startYear, 0, 1)) + 1;
  const x = (d: Date) =>
    (differenceInMonths(d, new Date(startYear, 0, 1)) / total) * 100;
  const years = Array.from(
    { length: now.getFullYear() - startYear + 1 },
    (_, i) => startYear + i,
  );
  const rows = [
    ...work.map((e) => ({ e, kind: 'work' as const })),
    ...education.map((e) => ({ e, kind: 'edu' as const })),
  ];

  return (
    <figure className='mb-7 text-[10px] text-ink/60 print:break-inside-avoid'>
      <figcaption className='sr-only'>
        Timeline of roles and studies from {startYear} to today
      </figcaption>
      <div className='relative ml-0 sm:ml-[11rem]'>
        {/* year ruler */}
        <div className='relative h-4 border-b border-dashed border-ink/25'>
          {years.map((y, i) => (
            <span
              key={y}
              className={
                i % 2 === 0
                  ? 'absolute -translate-x-1/2 tabular-nums'
                  : 'absolute hidden -translate-x-1/2 tabular-nums md:inline print:hidden'
              }
              style={{ left: `${x(new Date(y, 0, 1))}%` }}
            >
              {y}
            </span>
          ))}
          <span
            aria-hidden
            className='absolute top-0 bottom-0 w-px bg-ribbon'
            style={{ left: `${x(now)}%` }}
          />
        </div>
        {/* bars */}
        <ul className='mt-1.5 space-y-1'>
          {rows.map(({ e, kind }) => {
            const left = x(parseMonth(e.start));
            const width = Math.max(x(parseMonth(e.end)) - left, 0.8);
            return (
              <li key={`${e.org}-${e.start}`} className='relative h-2.5'>
                <motion.span
                  title={`${e.title} — ${e.org}`}
                  className={
                    kind === 'work'
                      ? 'absolute top-0.5 h-1.5 rounded-sm bg-ribbon/80'
                      : 'absolute top-0.5 h-1.5 rounded-sm border border-ink/40'
                  }
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    transformOrigin: 'left',
                  }}
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </li>
            );
          })}
        </ul>
        <p className='mt-1.5 text-[10px] text-ink/50'>
          <span className='mr-1 inline-block h-1.5 w-3 rounded-sm bg-ribbon/80 align-middle' />{' '}
          roles{' '}
          <span className='mr-1 ml-3 inline-block h-1.5 w-3 rounded-sm border border-ink/40 align-middle' />{' '}
          studies · red line = today
        </p>
      </div>
    </figure>
  );
};

export default TenureStrip;
