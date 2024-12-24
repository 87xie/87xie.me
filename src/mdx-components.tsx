import type { MDXComponents } from 'mdx/types'

import LinkedHeading from './components/linked-heading'
import Anchor from './components/anchor'

import BlockCode from './components/codes/block-code'

const components = {
  h1({ id = '', children }) {
    return (
      <LinkedHeading id={id} level={1}>
        {children}
      </LinkedHeading>
    )
  },
  h2({ id = '', children }) {
    return (
      <LinkedHeading id={id} level={2}>
        {children}
      </LinkedHeading>
    )
  },
  h3({ id = '', children }) {
    return (
      <LinkedHeading id={id} level={3}>
        {children}
      </LinkedHeading>
    )
  },
  a: Anchor,
  BlockCode,
} satisfies MDXComponents

export const useMDXComponents = () => components
