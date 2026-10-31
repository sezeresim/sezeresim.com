import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import type { IconProps } from '@radix-ui/react-icons/dist/types';

export type ISocialAccount = {
  name: 'Linkedin' | 'Github' | 'Twitter' | 'Instagram';
  url: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
};

export type IProject = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  githubLink: string;
  tags?: string[];
};
