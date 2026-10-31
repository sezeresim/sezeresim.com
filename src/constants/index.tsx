import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

import type { IProject, ISocialAccount } from '@/types';

export const SITE = {
  name: 'Sezer Esim',
  title: 'Sezer Esim',
  role: 'Software Engineer',
  description:
    'Software Engineer building web and mobile products with React, Next.js and React Native.',
  url: 'https://sezeresim.vercel.app',
  locale: 'en',
};

export const HOME = {
  greeting: "Hi, I'm",
  intro:
    'I build web and mobile products with React, Next.js and React Native, and I write about the things I learn along the way.',
  stack: ['TypeScript', 'React', 'Next.js', 'React Native', 'Node.js'],
  tools: ['Tailwind CSS', 'Docker', 'Git', 'Jest', 'MDX', 'Vercel'],
};

export const PROFILES = {
  twitter: { username: 'sezeeresim' },
  github: { username: 'sezeresim' },
};

export const socialAccounts: ISocialAccount[] = [
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/sezeresim',
    icon: LinkedInLogoIcon,
  },
  {
    name: 'Github',
    url: 'https://github.com/sezeresim',
    icon: GitHubLogoIcon,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/sezeeresim',
    icon: TwitterLogoIcon,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/sezeresim',
    icon: InstagramLogoIcon,
  },
];

export const projects: IProject[] = [
  {
    id: 'react-context-cli',
    name: 'rca-cli',
    description:
      'A CLI tool that scaffolds React Context API boilerplate in seconds.',
    image: '',
    link: 'https://github.com/sezeresim/react-context-cli',
    githubLink: 'https://github.com/sezeresim/react-context-cli',
    tags: ['Node.js', 'CLI', 'React'],
  },
  {
    id: 'domates',
    name: 'Domates',
    description:
      'An Android app for managing daily tasks with a built-in Pomodoro timer.',
    image: '/images/pomodoro.webp',
    link: 'https://play.google.com/store/apps/details?id=com.pomodorotracking',
    githubLink: 'https://github.com/sezeresim/domates-rn',
    tags: ['React Native', 'Android'],
  },
  {
    id: 'memoryGame',
    name: 'Memory Game',
    description: 'A small card-matching memory game built with React.',
    image: '/images/memoryGame.png',
    link: 'https://matching-game-five.vercel.app/',
    githubLink: 'https://github.com/sezeresim/matching-game-react',
    tags: ['React', 'Game'],
  },
];
