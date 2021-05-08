module.exports = {
  parser: 'babel-eslint',
  settings: {
    'import/core-modules': ['@reach/router'],
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@styles', './src/styles'],
          ['@layouts', './src/layouts'],
          ['@components', './src/components'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      version: 'detect', // detect react version
    },
  },
  env: {
    node: true, // defines things like process.env when generating through node
  },
  extends: [
    'airbnb',
    'eslint:recommended', // use recommended configs
    'plugin:react/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    'import/prefer-default-export': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'react/require-default-props': 0,
    'no-confusing-arrow': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
