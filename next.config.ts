import { withContentCollections } from '@content-collections/next'
import createBundlerAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = createBundlerAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  output: 'export',
  experimental: {
    optimizePackageImports: ['@ark-ui/react'],
  },
})

export default withContentCollections(nextConfig)
