import { Metadata } from 'next';
import { getMDXComponent } from 'next-contentlayer/hooks';

import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { Calendar, TimerIcon, UserCircle } from 'lucide-react';

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title } as Metadata;
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const Content = getMDXComponent(post.body.code);

  return (
    <div className='dark:divide-slate-700'>
      <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
        <h1 className='font-extrabold leading-9 text-3xl text-slate-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-slate-100'>
          {post.title}
        </h1>
        <p className='mb-10 text-slate-500 text-sm dark:text-slate-400 flex items-center'>
          <UserCircle className='mr-2' /> {post.author}
        </p>
        <p className='mb-10 text-slate-500 text-sm dark:text-slate-400 flex items-center'>
          <Calendar className='mr-2' />
          {format(parseISO(post.date as string), 'MMMM dd, yyyy')}
        </p>
        <p className='mb-10 text-slate-500 text-sm dark:text-slate-400 flex items-center'>
          <TimerIcon className='mr-2' /> {post.readingTime.text}
        </p>
      </div>
      <article>
        <div className='prose'>
          <Content />
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
