import PageTitle from '@/components/PageTitle/PageTitle';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Transition from '@/components/Transition/Transition';
import { projects } from '@/constants';

async function getProjects() {
  return projects;
}

const Projects = async () => {
  const projects = await getProjects();

  return (
    <Transition>
      <PageTitle>Projects</PageTitle>
      <div className='py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5'>
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
    </Transition>
  );
};

export default Projects;
