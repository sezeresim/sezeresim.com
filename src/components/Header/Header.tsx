'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BrainCircuit } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import ThemeSwitch from '@/components/ThemeSwitch';
import { SITE } from '@/constants';
import { cn } from '@/lib/utils';

const links = [
  { href: '/posts', label: 'Posts' },
  { href: '/projects', label: 'Projects' },
];

const Header = () => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <header className='sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-slate-950/60 print:hidden'>
      <div className='layout flex h-16 items-center justify-between'>
        <Link
          href='/'
          className='group flex items-center gap-2 rounded-md font-semibold tracking-tight transition-colors hover:text-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none'
          aria-label='Home page'
        >
          <BrainCircuit
            className='h-5 w-5 transition-transform duration-300 group-hover:rotate-12'
            aria-hidden
          />
          <span>{SITE.name}</span>
        </Link>

        <nav aria-label='Main navigation' className='flex items-center gap-1'>
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none',
                  active
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId='nav-active'
                    aria-hidden
                    className='absolute inset-0 -z-10 rounded-md bg-slate-100 dark:bg-white/10'
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 30 }
                    }
                  />
                ) : null}
                {label}
              </Link>
            );
          })}
          <div className='ml-2'>
            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
