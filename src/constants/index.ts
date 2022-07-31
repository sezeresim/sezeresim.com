export type ISocialAccount = {
  name: 'Linkedin' | 'Github' | 'Twitter' | 'Instagram'
  url: string
}

export const socialAccounts: ISocialAccount[] = [
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/sezeresim/',
  },
  {
    name: 'Github',
    url: 'https://www.github.com/sezeresim',
  },
  {
    name: 'Twitter',
    url: 'https://www.twitter.com/sezereesim',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/sezereesim',
  },
]

export type IProject = {
  id: string
  name: string
  description: string
  image: string
  link: string
  githubLink: string
}

export const projects: IProject[] = [
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
]
