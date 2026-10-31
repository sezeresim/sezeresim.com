'use client';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type Heading = { level: number; text: string; slug: string };

type Props = { headings: Heading[] };

/** Sticky table of contents that highlights the heading currently in view. */
const Toc = ({ headings }: Props) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label='Table of contents' className='text-sm'>
      <p className='mb-3 font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400'>
        On this page
      </p>
      <ul className='space-y-1 border-l border-slate-200 dark:border-white/10'>
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              className={cn(
                '-ml-px block border-l-2 py-1 pl-3 transition-colors',
                h.level > 2 && 'pl-6',
                active === h.slug
                  ? 'border-sky-500 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Toc;
