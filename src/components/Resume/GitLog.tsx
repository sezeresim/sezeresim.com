'use client';
import { format } from 'date-fns';

import { RESUME, type ResumeEntry } from '@/constants/resume';

import { parseMonth } from './resume-utils';

const hash = (s: string) => {
  // Deterministic 7-hex "commit" from the entry text, so it never changes between builds.
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

const Line = ({ e, head }: { e: ResumeEntry; head: boolean }) => {
  const refs = [
    ...(head ? ['HEAD -> main'] : []),
    ...(e.tags ?? []).map((t) => `tag: ${t.toLowerCase()}`),
  ];
  return (
    <li className='grid grid-cols-[1.25rem_1fr] gap-x-2'>
      <span className='text-ribbon select-none'>*</span>
      <div>
        <span className='text-amber-700'>{hash(`${e.org}${e.start}`)}</span>{' '}
        {refs.length > 0 ? (
          <span className='text-ribbon'>({refs.join(', ')})</span>
        ) : null}{' '}
        <span className='font-semibold text-ink'>
          {e.title} @ {e.org}
        </span>
        <div className='text-ink/60'>
          Author: {RESUME.name} &lt;{RESUME.email}&gt;
        </div>
        <div className='text-ink/60'>
          Date: {format(parseMonth(e.start), 'MMM yyyy')} →{' '}
          {e.end === 'Present' ? 'now' : e.end}
        </div>
        {e.bullets ? (
          <ul className='mt-1 mb-2 space-y-0.5 text-ink/80'>
            {e.bullets.map((b) => (
              <li key={b} className='pl-4'>
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <span className='justify-self-center border-l border-dashed border-ink/30' />
      <span />
    </li>
  );
};

/** `git log --graph` rendering of the experience list. Pure data, no new facts. */
const GitLog = ({ entries }: { entries: ResumeEntry[] }) => (
  <div className='rounded border border-ink/20 bg-ink/[0.03] p-4 text-[12.5px] leading-relaxed'>
    <p className='mb-3 text-ink/60'>
      <span className='text-ribbon'>$</span> git log --graph --decorate
      <span className='ml-3 text-ink/40'>(Esc to leave)</span>
    </p>
    <ul className='space-y-0'>
      {entries.map((e, i) => (
        <Line key={`${e.org}-${e.start}`} e={e} head={i === 0} />
      ))}
    </ul>
  </div>
);

export default GitLog;
