import React, { useEffect, useState } from 'react'

import BlogCard from '@/components/BlogCard'
import Seo from '@/components/Seo'

interface IPost {
  title?: string
  description?: string
  link?: string
  thumbnail?: string
  guid?: string
  author?: string
  pubDate?: string
}

const BlogPost = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  useEffect(() => {
    fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sezeresim',
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items)
        const results = data.items.map((item: any): IPost => {
          return {
            title: item.title,
            description: item.description,
            thumbnail: item.thumbnail,
            guid: item.guid,
            link: item.link,
            author: item.author,
            pubDate: item.pubDate,
          }
        })
        setPosts(results)
      })
  }, [])
  return (
    <>
      <Seo templateTitle='Blogs' />
      <div className='divide-gray-200 divide-y dark:divide-gray-700'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Blogs
          </h1>
        </div>
        <div className='container py-12'>
          <div className='gap-y-6 grid grid-cols-1'>
            {posts?.map((post: any) => (
              <BlogCard
                key={post.guid}
                title={post.title}
                thumbnail={post.thumbnail}
                link={post.link}
                author={post.author}
                pubDate={post.pubDate}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPost
