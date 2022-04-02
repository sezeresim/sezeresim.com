import React from 'react'

import Seo from '@/components/Seo'

import { IPost } from '@/interfaces'

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
export async function getStaticPaths() {
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sezeresim'
  )
  const results = await res.json()
  const paths = results.items.map((el: any) => ({
    params: {
      id: el.guid.split('https://medium.com/p/')[1],
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sezeresim'
  )
  const results = await res.json()
  const post = results.items
    .map(
      (item: any): IPost => ({
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail,
        author: item.author,
        pubDate: item.pubDate,
        id: item.guid.split('https://medium.com/p/')[1],
      })
    )
    .find((el: any) => el.id === params.id)

  return {
    props: {
      post,
    },
  }
}

export default BlogPost
