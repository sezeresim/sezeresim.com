declare global {}

export interface IPost {
  title?: string;
  description?: string;
  thumbnail?: string;
  id?: string;
  author?: string;
  pubDate?: string;
}

export type ISocialAccount = {
  name: 'Linkedin' | 'Github' | 'Twitter' | 'Instagram';
  url: string;
};

export type IProject = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  githubLink: string;
};

export type PostType = {
  date: string;
  description?: string;
  image?: string;
  slug: string;
  title: string;
  author: string;
};
