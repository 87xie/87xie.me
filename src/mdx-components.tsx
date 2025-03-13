import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

import cx from 'clsx'
import LinkedHeading from './components/linked-heading'
import Anchor from './components/anchor'

import { BlockCode } from './components/codes/block-code'
import { InlineCode } from './components/codes/inline-code'
import { CodeWithTabs } from './components/codes/block-code-with-tabs'

const classes = {
  ul: 'prose-ul:marker:text-(--tw-prose-body)',
  ol: 'prose-ol:marker:text-(--tw-prose-body)',
  code: cx(
    'prose-code:rounded-md prose-code:border-[0.5px] prose-code:border-gray-300',
    'prose-code:py-0.5 prose-code:px-1.5',
    'prose-code:bg-gray-50 prose-code:text-sm prose-code:font-normal',
    'prose-code:before:content-none prose-code:after:content-none',
  ),
}

const components = {
  wrapper({ children }: { children: ReactNode }) {
    return (
      <article
        className={cx(
          'prose max-w-3xl mx-auto py-12 px-5',
          classes.ol,
          classes.ul,
          classes.code,
        )}
      >
        {children}
      </article>
    )
  },
  h1(props) {
    return (
      <LinkedHeading {...props} level={1} />
    )
  },
  h2(props) {
    return (
      <LinkedHeading {...props} level={2} />
    )
  },
  h3(props) {
    return (
      <LinkedHeading {...props} level={3} />
    )
  },
  a: Anchor,
  BlockCode,
  InlineCode,
  CodeWithTabs,
} satisfies MDXComponents

export const useMDXComponents = () => components
