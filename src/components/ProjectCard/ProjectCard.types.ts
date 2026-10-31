export interface IProjectCard {
  image: string;
  name: string;
  description: string;
  githubLink: string;
  link: string;
  tags?: string[];
  /** Larger, side-by-side layout on wide screens. */
  featured?: boolean;
}
