/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FC } from 'react';

import { IPost } from '@/types';

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
          {thumbnail && (
            <img
              alt='title'
              src={thumbnail}
              className='duration-300 h-40 min-w-full object-cover transition-all hover:object-scale-down'
              loading='lazy'
              onError={(e: any) => {
                e.target.src = '/images/no-image-available.png';
              }}
            />
          )}
        </Link>
        <div className='h-16 px-2 py-3'>
          <div className='font-bold mb-2 text-m'>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
