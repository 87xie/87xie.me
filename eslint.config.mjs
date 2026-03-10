import stylistic from '@stylistic/eslint-plugin'
import tanstackRouter from '@tanstack/eslint-plugin-router'

const eslintConfig = [
  {
    ignores: [
      '.content-collections/**',
      '.output/**',
      '.tanstack/**',
      '.nitro/**',
      'src/routeTree.gen.ts',
    ],
  },
  ...tanstackRouter.configs['flat/recommended'],
  stylistic.configs.customize({
    semi: false,
    arrowParens: 'always',
    braceStyle: '1tbs',
  }),
  {
    rules: {
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/member-delimiter-style': ['error', {
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
      }],
    },
  },
]

export default eslintConfig
