const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-mdx',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@': 'src',
          '@styles': 'src/styles',
          '@layouts': 'src/layouts',
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
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets\/svgs/,
        },
      },
    },
  ],
};
