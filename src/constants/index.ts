import { IProject, ISocialAccount } from '@/types';

export const socialAccounts: ISocialAccount[] = [
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/sezeresim',
  },
  {
    name: 'Github',
    url: 'https://www.github.com/sezeresim',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/sezeeresim',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/sezeresim',
  },
];

export const projects: IProject[] = [
  {
    id: 'react-context-cli',
    name: 'rca-cli',
    description: 'A cli tool to creating react context api',
    image: '',
    link: 'https://github.com/sezeresim/react-context-cli',
    githubLink: 'https://github.com/sezeresim/react-context-cli',
  },
  {
    id: 'domates',
    name: 'Domates',
    description: `This is a android application for managing your daily tasks.Also it is a pomodoro timer.`,
    image: '/images/pomodoro.webp',
    link: 'https://play.google.com/store/apps/details?id=com.pomodorotracking',
    githubLink: 'https://github.com/sezeresim/domates-rn',
  },
  {
    id: 'memoryGame',
    name: 'Memory Game',
    description: `This is a memory game.`,
    image: '/images/memoryGame.png',
    link: 'https://matching-game-five.vercel.app/',
    githubLink: 'https://github.com/sezeresim/matching-game-react',
  },
];
