import Link from 'next/link';

import { allPosts } from 'contentlayer/generated';
import { compareDesc, format } from 'date-fns';
import { ArrowRight, ArrowUpRight, FolderGit2, PenLine } from 'lucide-react';

import BentoTile from '@/components/Bento/BentoTile';
import HeroBackground from '@/components/Hero/HeroBackground';
import UnstyledLink from '@/components/Links/UnstyledLink';
import Marquee from '@/components/Marquee/Marquee';
import { Stagger, StaggerItem } from '@/components/Motion/Stagger';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Reveal from '@/components/Reveal/Reveal';
import Section from '@/components/Section/Section';
import Terminal, { type TerminalLine } from '@/components/Terminal/Terminal';
import WordReveal from '@/components/Text/WordReveal';
import { Button } from '@/components/ui/button';
import { HOME, PROFILES, projects, SITE, socialAccounts } from '@/constants';

const LATEST_POSTS = 3;
const FEATURED_PROJECTS = 3;

export default function Home() {
  const posts = [...allPosts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const latestPosts = posts.slice(0, LATEST_POSTS);
  const featuredProjects = projects.slice(0, FEATURED_PROJECTS);
  const github = socialAccounts.find((s) => s.name === 'Github');

  const terminal: TerminalLine[] = [
    { cmd: 'whoami', out: [`${SITE.name} — ${SITE.role}`] },
    { cmd: 'cat stack.txt', out: [HOME.stack.join(' · ')] },
    { cmd: 'ls projects/', out: [projects.map((p) => p.id).join('  ')] },
    {
      cmd: 'echo $STATUS',
      out: ['Building things and writing about them.'],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className='relative py-16 sm:py-24'>
        <HeroBackground />
        <div className='grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]'>
          <div>
            <Reveal>
              <p className='font-mono text-sm text-sky-600 dark:text-sky-400'>
                {HOME.greeting}
              </p>
              <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-6xl'>
                <span className='animate-shimmer text-gradient'>
                  {SITE.name}
                </span>
                <span className='mt-2 block text-2xl font-normal text-slate-600 sm:text-3xl dark:text-slate-400'>
                  {SITE.role}
                </span>
              </h1>
            </Reveal>

            <WordReveal
              text={HOME.intro}
              delay={0.25}
              className='mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400'
            />

            <Reveal delay={0.5}>
              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <Button asChild size='lg'>
                  <Link href='/posts'>
                    Read the blog
                    <ArrowRight className='ml-2 h-4 w-4' aria-hidden />
                  </Link>
                </Button>
                <Button asChild size='lg' variant='outline'>
                  <Link href='/projects'>
                    <FolderGit2 className='mr-2 h-4 w-4' aria-hidden />
                    See projects
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3} className='lg:w-full lg:justify-self-end'>
            <Terminal lines={terminal} />
          </Reveal>
        </div>
      </section>

      {/* Bento */}
      <Stagger className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {latestPosts[0] ? (
          <StaggerItem className='sm:col-span-2'>
            <Link href={latestPosts[0].url} className='group block h-full'>
              <BentoTile className='h-full justify-between'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-xs tracking-wider text-sky-600 uppercase dark:text-sky-400'>
                    Latest post
                  </span>
                  <ArrowUpRight
                    className='h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-500'
                    aria-hidden
                  />
                </div>
                <div className='mt-8'>
                  <h3 className='text-2xl font-semibold tracking-tight transition-colors group-hover:text-sky-500 dark:group-hover:text-sky-400'>
                    {latestPosts[0].title}
                  </h3>
                  <p className='mt-2 line-clamp-2 text-slate-600 dark:text-slate-400'>
                    {latestPosts[0].description}
                  </p>
                  <p className='mt-4 text-xs text-slate-500'>
                    {format(new Date(latestPosts[0].date), 'MMMM d, yyyy')} ·{' '}
                    {latestPosts[0].readingTime.text}
                  </p>
                </div>
              </BentoTile>
            </Link>
          </StaggerItem>
        ) : null}

        <StaggerItem>
          <UnstyledLink
            href={
              github?.url ?? `https://github.com/${PROFILES.github.username}`
            }
            className='group block h-full'
            aria-label='GitHub profile'
          >
            <BentoTile className='h-full justify-between'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400'>
                  Open source
                </span>
                <ArrowUpRight
                  className='h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-500'
                  aria-hidden
                />
              </div>
              {github ? (
                <github.icon
                  className='mt-6 h-12 w-12 text-slate-900 transition-transform duration-500 group-hover:rotate-[360deg] dark:text-white'
                  aria-hidden
                />
              ) : null}
              <p className='mt-4 font-mono text-sm'>
                @{PROFILES.github.username}
              </p>
            </BentoTile>
          </UnstyledLink>
        </StaggerItem>

        <StaggerItem>
          <BentoTile className='h-full justify-between'>
            <span className='font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400'>
              By the numbers
            </span>
            <dl className='mt-6 grid grid-cols-2 gap-4'>
              <div>
                <dt className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400'>
                  <PenLine className='h-3.5 w-3.5' aria-hidden /> Posts
                </dt>
                <dd className='mt-1 text-4xl font-bold tracking-tight'>
                  {posts.length}
                </dd>
              </div>
              <div>
                <dt className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400'>
                  <FolderGit2 className='h-3.5 w-3.5' aria-hidden /> Projects
                </dt>
                <dd className='mt-1 text-4xl font-bold tracking-tight'>
                  {projects.length}
                </dd>
              </div>
            </dl>
          </BentoTile>
        </StaggerItem>

        <StaggerItem className='sm:col-span-2 lg:col-span-3'>
          <BentoTile className='h-full justify-center px-0'>
            <span className='px-6 font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400'>
              Tools I reach for
            </span>
            <Marquee items={[...HOME.stack, ...HOME.tools]} className='mt-4' />
          </BentoTile>
        </StaggerItem>

        <StaggerItem>
          <BentoTile className='h-full justify-between'>
            <span className='font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400'>
              Say hi
            </span>
            <ul
              className='mt-6 grid grid-cols-4 gap-2'
              aria-label='Social links'
            >
              {socialAccounts.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                  <UnstyledLink
                    href={url}
                    aria-label={name}
                    className='flex aspect-square items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-500 dark:border-white/10 dark:text-slate-300 dark:hover:border-sky-400/50'
                  >
                    <Icon className='h-5 w-5' aria-hidden />
                  </UnstyledLink>
                </li>
              ))}
            </ul>
          </BentoTile>
        </StaggerItem>
      </Stagger>

      {/* Projects */}
      <Section
        id='projects'
        title='Projects'
        description='A few things I have built and shipped.'
        href='/projects'
        linkLabel='All projects'
      >
        <Stagger className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id} className='h-full'>
              <ProjectCard {...project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Writing */}
      {latestPosts.length > 0 ? (
        <Section
          id='posts'
          title='Writing'
          description='Notes on web development, tooling and things I learn.'
          href='/posts'
          linkLabel='All posts'
        >
          <Stagger className='divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10'>
            {latestPosts.map((post, i) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={post.url}
                  className='group flex items-baseline gap-6 py-5 transition-colors hover:text-sky-500 dark:hover:text-sky-400'
                >
                  <span className='font-mono text-sm text-slate-400'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className='flex-1'>
                    <span className='block text-lg font-semibold tracking-tight sm:text-xl'>
                      {post.title}
                    </span>
                    <span className='mt-1 block text-sm text-slate-500 dark:text-slate-400'>
                      {format(new Date(post.date), 'MMM d, yyyy')} ·{' '}
                      {post.readingTime.text}
                    </span>
                  </span>
                  <ArrowRight
                    className='h-5 w-5 shrink-0 self-center text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-sky-500'
                    aria-hidden
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}
    </>
  );
}
