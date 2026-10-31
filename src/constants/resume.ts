/**
 * Resume content. Served only at /cv/<CV_TOKEN> (see src/app/cv/[token]).
 * Phone number is intentionally left out of the public site.
 */
export type ResumeEntry = {
  title: string;
  org: string;
  location?: string;
  /** "MMM yyyy" */
  start: string;
  /** "MMM yyyy" or "Present" */
  end: string;
  note?: string;
  bullets?: string[];
  /** Skills explicitly mentioned in this entry (used for hover highlighting). */
  tags?: string[];
  /** Short engagements shown collapsed by default. */
  minor?: boolean;
};

export const RESUME = {
  name: 'Sezer Esim',
  role: 'Software Engineer',
  location: 'Türkiye',
  email: 'sezeresim@gmail.com',
  summary:
    'Motivated software engineer passionate about building efficient, high-quality applications. Enjoys working in teams and solving problems with creative solutions.',
  links: [
    {
      label: 'linkedin.com/in/sezeresim',
      url: 'https://www.linkedin.com/in/sezeresim',
    },
    { label: 'github.com/sezeresim', url: 'https://github.com/sezeresim' },
  ],
  /** Shown as keycaps; everything else is listed as text. */
  coreSkills: [
    'TypeScript',
    'React.js',
    'Next.js',
    'Node.js',
    'Microfrontend',
    'GitLab CI',
    'Docker',
    'AWS',
  ],
  experience: [
    {
      title: 'Software Engineer',
      org: 'Hepsiburada',
      location: 'Istanbul, Türkiye',
      start: 'Jun 2022',
      end: 'Present',
      bullets: [
        'Led the frontend development of all delivery and shipping screens, overseeing the entire project lifecycle.',
        'Developed and maintained Hepsimat projects, including a microfrontend architecture and iOS/Android mobile applications.',
        'Built and maintained Node.js Backend-for-Frontend (BFF) services.',
        'Implemented GitLab CI pipelines to automate build, test and deployment.',
        'Assisted backend developers on small-scale projects in Go and .NET.',
        'Provided after-sales support for frontend projects.',
        'Collaborated closely with product, backend and UX teams.',
      ],
      tags: ['Microfrontend', 'Node.js', 'GitLab CI', 'Go', 'C#', 'React.js'],
    },
    {
      title: 'Software Engineer',
      org: 'Ideall Technology',
      location: 'Bursa, Türkiye',
      start: 'Jul 2020',
      end: 'Jun 2022',
      note: 'Software agency',
      bullets: [
        'Developed a booking system with B2C, B2B and back-office frontends, while supporting backend developers and doing R&D.',
        'Designed and managed the project infrastructure and architecture on AWS, including planning, deployment and scalability.',
        'Provided development and maintenance support for various in-house projects.',
      ],
      tags: ['AWS'],
    },
    {
      title: 'Software Engineer Intern',
      org: 'Vidco Software',
      location: 'Istanbul, Türkiye',
      start: 'Jun 2020',
      end: 'Jul 2020',
      bullets: ['Completed a project with React.js.'],
      tags: ['React.js'],
      minor: true,
    },
    {
      title: 'Software Engineer Intern',
      org: 'ASE Bilişim',
      location: 'Gaziantep, Türkiye',
      start: 'Jun 2018',
      end: 'Aug 2018',
      bullets: ['Worked with PHP, MySQL and Laravel.'],
      minor: true,
    },
  ] satisfies ResumeEntry[],
  education: [
    {
      title: 'Computer Engineering',
      org: 'Çukurova University',
      location: 'Adana, Türkiye',
      start: 'Sep 2015',
      end: 'Jun 2020',
    },
    {
      title: 'Computer Science (Erasmus)',
      org: 'University of Łódź',
      location: 'Łódź, Poland',
      start: 'Sep 2019',
      end: 'Feb 2020',
    },
  ] satisfies ResumeEntry[],
  skills: [
    { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Go', 'C#'] },
    {
      group: 'Frontend',
      items: [
        'React.js',
        'Next.js',
        'Vue.js',
        'SCSS/CSS',
        'Microfrontend',
        'Figma',
      ],
    },
    {
      group: 'Backend',
      items: [
        'Node.js',
        'Fastify',
        'Express',
        'MongoDB',
        'Microservices',
        'Serverless',
        'Swagger',
      ],
    },
    { group: 'Testing', items: ['Jest', 'Vitest', 'Cypress'] },
    {
      group: 'DevOps & Tooling',
      items: [
        'GitLab CI',
        'Docker',
        'Kubernetes',
        'AWS',
        'Sentry',
        'Kibana',
        'OpenSearch',
        'Git',
      ],
    },
    { group: 'Ways of working', items: ['Scrum', 'Jira', 'Miro'] },
  ],
  languages: [
    { name: 'Turkish', level: 'Native' },
    { name: 'English', level: 'Professional working proficiency' },
  ],
  interests: [
    'Computer science',
    'Fitness',
    'Walking',
    'Travelling',
    'Economy',
  ],
};
