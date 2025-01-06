import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from '@content-collections/core'
import type { MDXContent } from 'mdx/types'

const samples = defineCollection({
  name: 'samples',
  directory: 'src/samples',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string().optional(),
  }),
  transform: ({ _meta, ...post }) => {
    return {
      ...post,
      slug: _meta.fileName.replace(/\.(md|mdx)$/, ''),
      mdxContent: createDefaultImport<MDXContent>(`@/samples/${_meta.filePath}`),
    }
  },
})

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content',
  include: '**/*.mdx',
  parser: 'frontmatter-only',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  transform: ({ _meta, ...post }) => {
    return {
      ...post,
      slug: _meta.fileName.replace(/\.(md|mdx)$/, ''),
      mdxContent: createDefaultImport<MDXContent>(`@/content/${_meta.filePath}`),
    }
  },
})

export default defineConfig({
  collections: [samples, posts],
})
