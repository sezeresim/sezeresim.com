import Image from 'next/image';
import { FC } from 'react';

import UnstyledLink from '@/components/Links/UnstyledLink';

import { IProjectCard } from './ProjectCard.types';

const ProjectCard: FC<IProjectCard> = ({
  link,
  image,
  name,
  description,
  githubLink,
}) => {
  return (
    <div className='bg-gray'>
      <div className='bg-white overflow-hidden rounded-md shadow-md'>
        <UnstyledLink href={link}>
          <div className='h-36 relative w-full md:h-48'>
            <Image
              alt='title'
              src={image ?? '/images/no-image-available.png'}
              fill
              style={{
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.src = '/images/no-image-available.png';
              }}
            />
          </div>
        </UnstyledLink>
        <div className='px-6 py-6'>
          <div className='font-bold mb-2 text-xl'>{name}</div>
          <div className='h-20 text-base text-gray-900'>{description}</div>
          <div className='border-gray-200 border-t-2 flex gap-2 mt-2 pt-2'>
            <UnstyledLink href={githubLink}>Github</UnstyledLink>
            <UnstyledLink href={link}>Check</UnstyledLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
