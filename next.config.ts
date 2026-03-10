import { withContentCollections } from '@content-collections/next'
import createMdx from '@next/mdx'
import createBundlerAnalyzer from '@next/bundle-analyzer'

const withMdx = createMdx({
  options: {
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      'remark-mdx-frontmatter',
    ],
    rehypePlugins: [
      'rehype-slug',
      'rehype-github-alert',
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
