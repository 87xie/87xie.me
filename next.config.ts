import { withContentCollections } from '@content-collections/next'
import createMdx from '@next/mdx'
import createBundlerAnalyzer from '@next/bundle-analyzer'
import { resolve } from 'node:path'

import type { CodeHikeConfig } from 'codehike/mdx'

const chConfig = {
  components: {
    code: 'BlockCode',
    inlineCode: 'InlineCode',
  },
} satisfies CodeHikeConfig

const withMdx = createMdx({
  options: {
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      'remark-mdx-frontmatter',
      [resolve(process.cwd(), 'src/plugins/remark-codehike.mjs'), chConfig],
    ],
    rehypePlugins: [
      'rehype-slug',
      'rehype-github-alert',
    ],
    recmaPlugins: [
      [resolve(process.cwd(), 'src/plugins/recma-codehike.mjs'), chConfig],
    ],
  },
})

const withBundleAnalyzer = createBundlerAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer(
  withMdx({
    output: 'export',
    pageExtensions: ['mdx', 'tsx'],
    experimental: {
      optimizePackageImports: ['@ark-ui/react'],
    },
  }),
)

export default withContentCollections(nextConfig)
