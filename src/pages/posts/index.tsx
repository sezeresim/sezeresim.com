/* eslint-disable @next/next/no-img-element */
import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import PageTitle from '@/components/PageTitle/PageTitle';
import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';
import { getAllPosts } from '@/lib/mdxapi';
import { PostType } from '@/types';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <>
      <Seo templateTitle='Posts' />
      <Transition>
        <PageTitle>Posts</PageTitle>
        <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 min-h-main'>
          {posts.map(({ date, slug, title, image }) => (
            <Link
              as={`/posts/${slug}`}
              href='/posts/[slug]'
              className='group peer relative block w-full focus:outline-dotted focus:outline-2 focus:outline-slate-600 hover:border-dashed hover:border-2 transition-all duration-200 hover:p-3 hover:rounded-md hover:bg-slate-200 hover:dark:bg-slate-800'
              key={slug}
            >
              <div className='rounded-[10px] justify-start items-start'>
                <img
                  className='focus-ring aspect-square w-full rounded-lg object-cover object-center transition-opacity'
                  src={image}
                  title={title}
                  alt={title}
                />
                <div className='flex flex-col'>
                  <div className='mt-8 text-sm font-medium text-slate-500'>
                    {format(parseISO(date), 'MMMM dd, yyyy')}
                  </div>
                  <div className='text-xl font-medium md:text-3xl text-black dark:text-white mt-4'>
                    {title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Transition>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'date',
    'description',
    'slug',
    'title',
    'image',
    'author',
  ]);
  return {
    props: { posts },
  };
};

export default Index;
