import fs from 'node:fs'
import path from 'node:path'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeGithubAlert from 'rehype-github-alert'
import matter from 'gray-matter'

import type { CodeHikeConfig } from 'codehike/mdx'
import type { MDXContent } from 'mdx/types'

const chConfig = {
  components: {
    code: 'BlockCode',
    inlineCode: 'InlineCode',
  },
} satisfies CodeHikeConfig

const CONTENT_DIR = path.join(process.cwd(), 'src/content')

export async function compileMdx(filePath: string): Promise<MDXContent> {
  const fullPath = path.resolve(CONTENT_DIR, filePath)
  if (!fullPath.startsWith(CONTENT_DIR)) {
    throw new Error('Invalid file path')
  }
  const source = fs.readFileSync(fullPath, 'utf-8')
  const { content } = matter(source)

  const compiled = await compile(content, {
    outputFormat: 'function-body',
    remarkPlugins: [
      remarkGfm,
      [remarkCodeHike, chConfig],
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeGithubAlert,
    ],
    recmaPlugins: [
      [recmaCodeHike, chConfig],
    ],
  })

  const { default: Content } = await run(String(compiled), {
    ...(runtime as Record<string, unknown>),
    baseUrl: import.meta.url,
  })

  return Content as MDXContent
}
