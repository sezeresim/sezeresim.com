import React from 'react'

import Seo from '@/components/Seo'

import { getPostById, getPosts } from '@/services/apis'

export async function getStaticPaths() {
  const results = await getPosts()
  const paths = results.map((el: any) => ({
    params: {
      id: el.id,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const post = await getPostById(params.id)
  return {
    props: {
      post,
    },
  }
}

const BlogPost = ({ post }: { post: any }) => {
  return (
    <>
      <Seo templateTitle='Blogs' />
      <div className='divide-gray-200 divide-y dark:divide-gray-700'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            {post.title}
          </h1>
        </div>
        <div className='container py-12'>
          <div className='gap-y-6 grid grid-cols-1'>
            <div
              className='text-gray-900 dark:text-gray-100'
              dangerouslySetInnerHTML={{
                __html: post.description,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPost
