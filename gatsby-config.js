const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        isResettingCSS: true,
        isUsingColorMode: true,
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@': 'src/',
          '@layouts': 'src/layouts',
          '@components': 'src/components',
        },
      },
    },
  ],
};
