import BlogCard from '@/components/BlogCard'
import Seo from '@/components/Seo'

import { IPost } from '@/interfaces'

const Blog = ({ posts }: { posts: IPost[] }) => {
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
          <div className='gap-x-2 gap-y-6 grid grid-cols-1 md:grid-cols-2'>
            {posts?.map((post: any, index: number) => (
              <BlogCard
                key={index}
                title={post.title}
                thumbnail={post.thumbnail}
                id={post.id}
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

export async function getStaticProps() {
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sezeresim'
  )
  let results = await res.json()
  results = results.items.map(
    (item: any): IPost => ({
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      author: item.author,
      pubDate: item.pubDate,
      id: item.guid.split('https://medium.com/p/')[1],
    })
  )
  return {
    props: {
      posts: results,
    },
  }
}

export default Blog
