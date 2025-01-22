import { withContentCollections } from '@content-collections/next'
import createMdx from '@next/mdx'

import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

import rehypeSlug from 'rehype-slug'
import rehypeGithubAlert from 'rehype-github-alert'

import {
  type CodeHikeConfig,
  remarkCodeHike,
  recmaCodeHike,
} from 'codehike/mdx'

const chConfig = {
  components: {
    code: 'BlockCode',
    inlineCode: 'InlineCode',
  },
} satisfies CodeHikeConfig

const withMdx = createMdx({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      [remarkCodeHike, chConfig],
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeGithubAlert,
    ],
    recmaPlugins: [
      [recmaCodeHike, chConfig],
    ],
  },
})

export default withContentCollections(withMdx({
  output: 'export',
  pageExtensions: ['mdx', 'tsx'],
}))
