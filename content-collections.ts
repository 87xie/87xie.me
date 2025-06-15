import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from '@content-collections/core'
import type { MDXContent } from 'mdx/types'

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

const notes = defineCollection({
  name: 'notes',
  directory: 'src/notes',
  include: '**/*.{md,mdx}',
  parser: 'frontmatter-only',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
  transform: ({ _meta, ...post }) => {
    return {
      ...post,
      category: _meta.directory,
      slug: _meta.fileName.replace(/\.(md|mdx)$/, ''),
      mdxContent: createDefaultImport<MDXContent>(`@/notes/${_meta.filePath}`),
    }
  },
})

export default defineConfig({
  collections: [posts, notes],
})
