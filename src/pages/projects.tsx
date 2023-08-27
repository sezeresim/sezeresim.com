import { GetStaticProps } from 'next';

import PageTitle from '@/components/PageTitle/PageTitle';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';
import { projects } from '@/constants';
import { IProject } from '@/types';

type IndexProps = {
  posts: IProject[];
};

const Projects = ({ posts }: IndexProps) => {
  return (
    <>
      <Seo templateTitle='Projects' />
      <Transition>
        <PageTitle>Projects</PageTitle>
        <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5'>
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
      </Transition>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: projects },
  };
};

export default Projects;
