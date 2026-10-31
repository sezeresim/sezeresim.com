import Image from 'next/image';
import Link from 'next/link';

import { format } from 'date-fns';
import { Clock } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
  readingTime: string;
};

const PostCard = ({
  title,
  description,
  date,
  image,
  url,
  readingTime,
}: Props) => {
  return (
    <Link
      href={url}
      className='group card-surface flex h-full card-glow flex-col overflow-hidden focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none'
    >
      <div className='relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900/80'>
        <Image
          src={image || '/images/no-image-available.png'}
          alt=''
          fill
          sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          className='object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110'
        />
      </div>
      <div className='flex flex-1 flex-col p-5'>
        <div className='flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400'>
          <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
          <span className='inline-flex items-center gap-1'>
            <Clock className='h-3.5 w-3.5' aria-hidden />
            {readingTime}
          </span>
        </div>
        <h3 className='mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-sky-500 dark:group-hover:text-sky-400'>
          {title}
        </h3>
        <p className='mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400'>
          {description}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
