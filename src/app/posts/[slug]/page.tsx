import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, UserCircle } from 'lucide-react';

import MdxContent from '@/components/Mdx/MdxContent';
import ReadingProgress from '@/components/ReadingProgress/ReadingProgress';
import Toc, { type Heading } from '@/components/Toc/Toc';

type Params = Promise<{ slug: string }>;

const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: post.url,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
};

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = post.headings as Heading[];

  return (
    <div className='relative py-10 xl:grid xl:grid-cols-[1fr_14rem] xl:gap-12'>
      <ReadingProgress />
      <article className='mx-auto w-full max-w-3xl'>
        <Link
          href='/posts'
          className='inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-sky-500 dark:text-slate-400'
        >
          <ArrowLeft className='h-4 w-4' aria-hidden />
          All posts
        </Link>

        <header className='mt-6 border-b border-slate-200 pb-8 dark:border-slate-800'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            {post.title}
          </h1>
          <p className='mt-4 text-lg text-slate-600 dark:text-slate-400'>
            {post.description}
          </p>
          <dl className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400'>
            <div className='flex items-center gap-2'>
              <dt className='sr-only'>Author</dt>
              <UserCircle className='h-4 w-4' aria-hidden />
              <dd>{post.author}</dd>
            </div>
            <div className='flex items-center gap-2'>
              <dt className='sr-only'>Published</dt>
              <Calendar className='h-4 w-4' aria-hidden />
              <dd>
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
              </dd>
            </div>
            <div className='flex items-center gap-2'>
              <dt className='sr-only'>Reading time</dt>
              <Clock className='h-4 w-4' aria-hidden />
              <dd>{post.readingTime.text}</dd>
            </div>
          </dl>
        </header>

        <div className='prose mt-8 prose-slate dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-sky-600 dark:prose-a:text-sky-400'>
          <MdxContent code={post.body.code} />
        </div>
      </article>
      <aside className='hidden xl:block'>
        <div className='sticky top-24'>
          <Toc headings={headings} />
        </div>
      </aside>
    </div>
  );
}
