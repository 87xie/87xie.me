module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/core-modules': ['@reach/router'],
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@styles', './src/styles'],
          ['@layouts', './src/layouts'],
          ['@features', './src/features'],
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
    jest: true,
    browser: true,
    node: true, // defines things like process.env when generating through node
  },
  extends: [
    'airbnb',
    'eslint:recommended', // use recommended configs
    'plugin:react/recommended',
    'plugin:mdx/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    'import/prefer-default-export': 'off',
    'arrow-body-style': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'no-confusing-arrow': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/prop-types': [2, { skipUndeclared: true }],
  },
};
