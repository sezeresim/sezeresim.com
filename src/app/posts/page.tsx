import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { allPosts } from 'contentlayer/generated';
import { compareDesc, format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';

import { Stagger, StaggerItem } from '@/components/Motion/Stagger';
import PageTitle from '@/components/PageTitle/PageTitle';
import Transition from '@/components/Transition/Transition';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Articles and notes on web development, tooling and more.',
  alternates: { canonical: '/posts' },
};

export default function PostsPage() {
  const posts = [...allPosts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const years = [...new Set(posts.map((p) => new Date(p.date).getFullYear()))];

  return (
    <Transition>
      <PageTitle description='Articles and notes on web development, tooling and more.'>
        Posts
      </PageTitle>

      <div className='py-8'>
        {years.map((year) => (
          <section
            key={year}
            className='grid gap-4 border-b border-slate-200 py-8 first:pt-0 last:border-b-0 md:grid-cols-[8rem_1fr] dark:border-white/10'
          >
            <h2 className='font-mono text-sm text-slate-400'>{year}</h2>
            <Stagger
              inView={false}
              className='divide-y divide-slate-200 dark:divide-white/10'
            >
              {posts
                .filter((p) => new Date(p.date).getFullYear() === year)
                .map((post) => (
                  <StaggerItem key={post.slug}>
                    <Link
                      href={post.url}
                      className='group flex items-center gap-5 py-5 first:pt-0'
                    >
                      <div className='relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:block dark:bg-white/5'>
                        <Image
                          src={post.image || '/images/no-image-available.png'}
                          alt=''
                          fill
                          sizes='96px'
                          className='object-contain p-2 transition-transform duration-500 group-hover:scale-110'
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <h3 className='text-lg font-semibold tracking-tight transition-colors group-hover:text-sky-500 sm:text-xl dark:group-hover:text-sky-400'>
                          {post.title}
                        </h3>
                        <p className='mt-1 line-clamp-1 text-sm text-slate-600 dark:text-slate-400'>
                          {post.description}
                        </p>
                        <p className='mt-1 font-mono text-xs text-slate-500'>
                          {format(new Date(post.date), 'MMM d')} ·{' '}
                          {post.readingTime.text}
                        </p>
                      </div>
                      <ArrowUpRight
                        className='h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-500'
                        aria-hidden
                      />
                    </Link>
                  </StaggerItem>
                ))}
            </Stagger>
          </section>
        ))}
      </div>
    </Transition>
  );
}
