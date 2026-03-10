import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import contentCollections from '@content-collections/vite'
import path from 'node:path'

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

const chConfig: CodeHikeConfig = {
  components: {
    code: 'BlockCode',
    inlineCode: 'InlineCode',
  },
}

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    conditions: ['default', 'module', 'import'],
  },
  server: {
    port: 3000,
  },
  plugins: [
    contentCollections(),
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      srcDirectory: 'src',
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: false,
      },
    }),
    {
      enforce: 'pre',
      ...mdx({
        include: /\.mdx$/,
        providerImportSource: '@mdx-js/react',
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
      }),
    },
    viteReact(),
  ],
})
