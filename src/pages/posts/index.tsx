import { format, parseISO } from 'date-fns'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

import { getAllPosts } from '@/lib/mdxapi'

import Seo from '@/components/Seo'

import { PostType } from '@/types/post'

type IndexProps = {
  posts: PostType[]
}

export const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <>
      <Seo templateTitle='Posts' />
      <div className='divide-gray-200 divide-y min-h-main dark:divide-gray-700'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Posts
          </h1>
        </div>
        <div className='container py-12'>
          <div className='gap-x-2 gap-y-6 grid grid-cols-1'>
            {posts.map((post: any) => (
              <article key={post.slug} className='mt-12'>
                <p className='mb-1 text-gray-500 text-sm dark:text-gray-400'>
                  {format(parseISO(post.date), 'MMMM dd, yyyy')}
                </p>
                <h1 className='mb-2 text-xl'>
                  <Link as={`/posts/${post.slug}`} href='/posts/[slug]'>
                    <a className='text-gray-900 dark:hover:text-blue-400 dark:text-white'>
                      {post.title}
                    </a>
                  </Link>
                </h1>
                <p className='mb-3'>{post.description}</p>
                <p>
                  <Link as={`/posts/${post.slug}`} href='/posts/[slug]'>
                    <a>Read More</a>
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title'])

  return {
    props: { posts },
  }
}

export default Index
