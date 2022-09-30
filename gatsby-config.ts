const remarkGfm = require('remark-gfm');
const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  jsxImportSource: '@emotion/react',
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',

    // mdx
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

    // chakra-ui
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true,
      },
    },

    // source filesystem
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`,
      },
    },
  ],
};
