'use client';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

import GrommetIconsGithub from '@/components/Icons/GrommetIconsGithub';
import UnstyledLink from '@/components/Links/UnstyledLink';
import { Button } from '@/components/ui/button';

import { IProjectCard } from './ProjectCard.types';

const ProjectCard: FC<IProjectCard> = ({
  link,
  image,
  name,
  description,
  githubLink,
}) => {
  return (
    <div className='bg-white dark:bg-slate-900 overflow-hidden rounded-md shadow-md'>
      <UnstyledLink href={link}>
        <div className='aspect-square relative w-full'>
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
        <div className='h-20 text-base text-slate-900 dark:text-white'>
          {description}
        </div>
        <div className='justify-center flex gap-2 mt-2 pt-2 '>
          <UnstyledLink href={githubLink} aria-label='Go Github'>
            <Button variant='outline'>
              <GrommetIconsGithub className='mr-2' /> Github
            </Button>
          </UnstyledLink>
          <UnstyledLink href={link} aria-label='See Project'>
            <Button variant='outline'>
              <ArrowUpRight className='mr-2' /> Visit
            </Button>
          </UnstyledLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
