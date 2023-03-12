import { GetStaticProps } from 'next';

import ProjectCard from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';

import { projects } from '@/constants';

type IndexProps = {
  posts: any[];
};

const Projects = ({ posts }: IndexProps) => {
  return (
    <Transition>
      <Seo templateTitle='Projects' />
      <div className='divide-gray-200 divide-y min-h-main dark:divide-gray-700'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Projects
          </h1>
        </div>
        <div className='container py-12'>
          <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
            {posts.map((el) => (
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
    </Transition>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: projects },
  };
};

export default Projects;
