const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-mdx',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    // 'gatsby-plugin-webpack-bundle-analyser-v2',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: { resetCSS: true },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@': 'src',
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
