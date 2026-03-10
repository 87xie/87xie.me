import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from '@content-collections/core'
import { getToc } from '@/utils/toc-parser'
import { z } from 'zod'
import type { MDXContent } from 'mdx/types'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content',
  include: '**/*.mdx',
  parser: 'frontmatter',
  schema: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
  transform: ({ _meta, content, ...post }) => {
    return {
      date: post.date,
      tags: post.tags ?? [],
      title: post.title ?? '',
      toc: getToc(content),
      slug: _meta.fileName.replace(/\.(md|mdx)$/, ''),
      category: _meta.directory === '.' ? 'uncategory' : _meta.directory,
      mdxContent: createDefaultImport<MDXContent>(`@/content/${_meta.filePath}`),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
