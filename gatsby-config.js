const { siteMetadata } = require('./config/website');

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-emotion',
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
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx'],
        exclude: ['node_modules', '.cache', 'public', 'static'],
      },
    },
  ],
};
