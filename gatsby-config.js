const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  jsxRuntime: 'automatic',
  plugins: [
    'gatsby-plugin-mdx',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: { resetCSS: true },
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
