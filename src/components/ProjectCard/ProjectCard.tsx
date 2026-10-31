import { FC } from 'react';
import Image from 'next/image';

import { ArrowUpRight, FolderGit2 } from 'lucide-react';

import GrommetIconsGithub from '@/components/Icons/GrommetIconsGithub';
import UnstyledLink from '@/components/Links/UnstyledLink';
import SpotlightCard from '@/components/Spotlight/SpotlightCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { IProjectCard } from './ProjectCard.types';

const ProjectCard: FC<IProjectCard> = ({
  link,
  image,
  name,
  description,
  githubLink,
  tags,
  featured = false,
}) => {
  return (
    <SpotlightCard
      className={cn(
        'group flex h-full card-glow flex-col overflow-hidden',
        featured && 'sm:flex-row',
      )}
    >
      <UnstyledLink
        href={link}
        aria-label={`Open ${name}`}
        className={cn(
          'relative block aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900/80',
          featured && 'sm:aspect-auto sm:w-1/2',
        )}
      >
        {image ? (
          <Image
            alt={name}
            src={image}
            fill
            sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
            className='object-cover transition-transform duration-500 ease-out group-hover:scale-110'
          />
        ) : (
          <div
            aria-hidden
            className='flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-slate-200 text-slate-400 dark:from-sky-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-500'
          >
            <FolderGit2 className='h-12 w-12 transition-transform duration-300 group-hover:scale-110' />
          </div>
        )}
      </UnstyledLink>
      <div className={cn('flex flex-1 flex-col p-5', featured && 'sm:p-8')}>
        <h3
          className={cn(
            'text-lg font-semibold tracking-tight transition-colors group-hover:text-sky-500 dark:group-hover:text-sky-400',
            featured && 'sm:text-2xl',
          )}
        >
          {name}
        </h3>
        <p className='mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400'>
          {description}
        </p>
        {tags && tags.length > 0 ? (
          <ul className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <li
                key={tag}
                className='rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300'
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className='mt-5 flex gap-2'>
          <Button variant='outline' size='sm' asChild>
            <UnstyledLink href={githubLink} aria-label={`${name} on GitHub`}>
              <GrommetIconsGithub className='mr-2 h-4 w-4' aria-hidden />
              GitHub
            </UnstyledLink>
          </Button>
          <Button variant='outline' size='sm' asChild>
            <UnstyledLink href={link} aria-label={`Visit ${name}`}>
              <ArrowUpRight className='mr-2 h-4 w-4' aria-hidden />
              Visit
            </UnstyledLink>
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;
