import ProjectCard from '@/components/ProjectCard'
import Seo from '@/components/Seo'
const Projects = () => {
  const projects = [
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

  return (
    <>
      <Seo templateTitle='Projects' />
      <div className='divide-gray-200 divide-y dark:divide-gray-700'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Projects
          </h1>
        </div>
        <div className='container py-12'>
          <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
            {projects.map((el) => (
              <ProjectCard
                key={el.id}
                link={el.link}
                image={el.image}
                name={el.name}
                description={el.description}
                githubLink={el.githubLink}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
