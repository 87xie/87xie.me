import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'
import stylistic from '@stylistic/eslint-plugin'

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
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
