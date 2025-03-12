import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

import cx from 'clsx'
import LinkedHeading from './components/linked-heading'
import Anchor from './components/anchor'

import { BlockCode } from './components/codes/block-code'
import { InlineCode } from './components/codes/inline-code'
import { CodeWithTabs } from './components/codes/block-code-with-tabs'

const components = {
  wrapper({ children }: { children: ReactNode }) {
    return (
      <article
        className={cx(
          'prose max-w-3xl mx-auto py-12 px-5',
          // unordered list
          'prose-ul:marker:text-gray-600',
          // ordered list
          'prose-ul:marker:text-gray-600',
        )}
      >
        {children}
      </article>
    )
  },
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
  code(props) {
    return (
      <code
        {...props}
        className="not-prose rounded-md py-0.5 px-1.5 border-[0.5px] border-gray-300 bg-gray-50 text-sm"
      />
    )
  },
  a: Anchor,
  BlockCode,
  InlineCode,
  CodeWithTabs,
} satisfies MDXComponents

export const useMDXComponents = () => components
