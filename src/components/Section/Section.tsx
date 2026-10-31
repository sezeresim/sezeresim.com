import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import Reveal from '@/components/Reveal/Reveal';

type Props = {
  id?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
};

const Section = ({
  id,
  title,
  description,
  href,
  linkLabel,
  children,
}: Props) => {
  return (
    <section id={id} className='py-12 sm:py-16'>
      <Reveal inView className='mb-8 flex items-end justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            {title}
          </h2>
          {description ? (
            <p className='mt-2 text-slate-600 dark:text-slate-400'>
              {description}
            </p>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className='group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-sky-600 transition-colors hover:text-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-sky-400'
          >
            {linkLabel ?? 'View all'}
            <ArrowRight
              className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
              aria-hidden
            />
          </Link>
        ) : null}
      </Reveal>
      {children}
    </section>
  );
};

export default Section;
