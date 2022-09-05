const remarkGfm = require('remark-gfm');
const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  jsxRuntime: 'automatic',
  jsxImportSource: '@emotion/react',
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
          ],
        },
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true,
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@': 'src',
          '@layouts': 'src/layouts',
          '@features': 'src/features',
          '@components': 'src/components',
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`,
      },
    },
  ],
};
