import { NodeInput } from 'gatsby';

export interface PostFrontmatter {
  tags: string[];
  title: string;
  slug: string;
  date: string;
}

export interface PostNode extends NodeInput {
  frontmatter: PostFrontmatter
}
