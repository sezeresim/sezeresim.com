import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import Terminal from '@/components/Terminal/Terminal';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFoundPage() {
  return (
    <section className='mx-auto flex min-h-main max-w-2xl flex-col justify-center py-16'>
      <p className='font-mono text-sm text-sky-600 dark:text-sky-400'>
        Error 404
      </p>
      <h1 className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
        Page not found
      </h1>
      <p className='mt-3 text-slate-600 dark:text-slate-400'>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className='mt-8'>
        <Terminal
          title='sezer@dev ~ (404)'
          lines={[
            { cmd: 'cd ./this-page', out: ['cd: no such file or directory'] },
            { cmd: 'ls', out: ['posts/  projects/  README.md'] },
            { cmd: 'cd ~', out: ['Back to safety.'] },
          ]}
        />
      </div>
      <Button asChild className='mt-8 self-start'>
        <Link href='/'>
          <ArrowLeft className='mr-2 h-4 w-4' aria-hidden />
          Back to home
        </Link>
      </Button>
    </section>
  );
}
