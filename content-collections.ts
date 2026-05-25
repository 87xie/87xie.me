import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from '@content-collections/core'
import { getToc } from '@/utils/toc-parser'
import { z } from 'zod'
import type { MDXContent } from 'mdx/types'

const getSlug = (fileName: string) => fileName.replace(/\.(md|mdx)$/, '')

const blogs = defineCollection({
  name: 'blogs',
  directory: 'src/content/blog',
  include: '*.mdx',
  parser: 'frontmatter',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: ({ _meta, ...post }) => {
    return {
      date: post.date,
      tags: post.tags ?? [],
      title: post.title,
      slug: getSlug(_meta.fileName),
      mdxContent: createDefaultImport<MDXContent>(`@/content/blog/${_meta.fileName}`),
    }
  },
})

const notes = defineCollection({
  name: 'notes',
  directory: 'src/content/notes',
  include: '*.mdx',
  parser: 'frontmatter',
  schema: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: ({ _meta, content, ...note }) => {
    return {
      date: note.date,
      tags: note.tags ?? [],
      title: note.title ?? '',
      toc: getToc(content),
      slug: getSlug(_meta.fileName),
      mdxContent: createDefaultImport<MDXContent>(`@/content/notes/${_meta.fileName}`),
    }
  },
})

const playgrounds = defineCollection({
  name: 'playgrounds',
  directory: 'src/content/playground',
  include: '*.mdx',
  parser: 'frontmatter',
  schema: z.object({
    title: z.string().optional(),
    content: z.string(),
  }),
  transform: ({ _meta, content, ...playground }) => {
    return {
      title: playground.title ?? '',
      toc: getToc(content),
      slug: getSlug(_meta.fileName),
      mdxContent: createDefaultImport<MDXContent>(`@/content/playground/${_meta.fileName}`),
    }
  },
})

export default defineConfig({
  content: [blogs, notes, playgrounds],
})
