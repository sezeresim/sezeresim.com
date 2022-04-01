/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { FC } from 'react'

import { IPost } from '@/interfaces'

const BlogCard: FC<IPost> = ({
  id = '',
  thumbnail = '',
  title,
  author = '',
  pubDate = '',
}) => {
  return (
    <div className='bg-gray md'>
      <div className='bg-white border overflow-hidden rounded-md shadow-2xl'>
        <div className='border-b border-gray-900 flex items-center justify-between p-3'>
          <p className='text-xl'>{author}</p>
          <p>{pubDate}</p>
        </div>
        <Link href='/blog/[slug]' as={`/blog/${id}`}>
          <a>
            {thumbnail && <img alt='title' src={thumbnail} height='160px' />}
          </a>
        </Link>
        <div className='px-6 py-6'>
          <div className='font-bold mb-2 text-xl'>{title}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
