import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import contentCollections from '@content-collections/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
  syntaxHighlighting: {
    theme: 'github-light',
  },
}

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
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
    (() => {
      // Workaround: CodeHike's syntaxHighlighting generates AST nodes without
      // source positions during MDX compilation. The @mdx-js/rollup plugin
      // enables SourceMapGenerator by default, causing astring to crash when
      // serializing these nodes. We override SourceMapGenerator to undefined
      // and remove the plugin's config hook so that processors are created in
      // the transform fallback path where our override takes effect.
      const plugin = mdx({
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
        ...({ SourceMapGenerator: undefined } as Record<string, unknown>),
      })
      delete (plugin as Record<string, unknown>).config
      return { enforce: 'pre' as const, ...plugin }
    })(),
    viteReact(),
  ],
})
