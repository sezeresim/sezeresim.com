import type { Metadata } from 'next';

import { Stagger, StaggerItem } from '@/components/Motion/Stagger';
import PageTitle from '@/components/PageTitle/PageTitle';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Transition from '@/components/Transition/Transition';
import { projects } from '@/constants';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open source tools, apps and experiments I have built.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <Transition>
      <PageTitle description='Open source tools, apps and experiments I have built.'>
        Projects
      </PageTitle>
      <Stagger
        inView={false}
        className='grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3'
      >
        {projects.map((project, i) => (
          <StaggerItem
            key={project.id}
            className={i === 0 ? 'h-full sm:col-span-2' : 'h-full'}
          >
            <ProjectCard {...project} featured={i === 0} />
          </StaggerItem>
        ))}
      </Stagger>
    </Transition>
  );
}
