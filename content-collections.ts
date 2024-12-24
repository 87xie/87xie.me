import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from '@content-collections/core';
import type { MDXContent } from 'mdx/types';

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content',
  include: '**/*.mdx',
  parser: 'frontmatter-only',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  transform: ({ _meta, ...post }) => {
    const mdxContent = createDefaultImport<MDXContent>(`@/content/${_meta.filePath}`);

    return {
      ...post,
      mdxContent,
    };
  },
});
 
export default defineConfig({
  collections: [posts],
});
