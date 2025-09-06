import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'

import cx from 'clsx'
import LinkedHeading from './components/linked-heading'
import Anchor from './components/anchor'
import { Details } from './components/details'
import { BlockCode } from './components/codes/block-code'
import { InlineCode } from './components/codes/inline-code'
import { CodeWithTabs } from './components/codes/block-code-with-tabs'

const components = {
  wrapper({ children }: { children: ReactNode }) {
    return (
      <article
        className={cx(
          'prose max-w-none text-gray-700 leading-relaxed',
          // marker
          'prose-ol:marker:text-gray-700',
          'prose-ul:marker:text-gray-700',
          // code
          'prose-code:rounded-md prose-code:border-[0.5px] prose-code:border-gray-300',
          'prose-code:py-0.5 prose-code:px-1.5',
          'prose-code:bg-gray-50 prose-code:text-sm prose-code:font-normal',
          'prose-code:before:content-none prose-code:after:content-none',
        )}
      >
        {children}
      </article>
    )
  },
  h1(props) {
    return (
      <h1 {...props} className="not-prose" />
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
  table(props) {
    return (
      <div
        className={cx(
          'my-6 rounded-md border-1 border-(--tw-prose-th-borders)',
          'overflow-x-auto',
          // table
          'prose-table:my-0',
          // th
          'prose-th:py-2 prose-th:px-4 prose-th:bg-gray-100',
          'prose-th:align-middle',
          // td
          'prose-td:py-2 prose-td:px-4 prose-td:align-middle',
        )}
      >
        <table {...props} />
      </div>
    )
  },
  section(props) {
    if (props['data-footnotes'] === undefined) {
      return (
        <section {...props} />
      )
    }

    return (
      <>
        <hr className="not-prose my-5 border-gray-500/30" />
        <section
          {...props}
          className={cx(
            'text-sm text-gray-500/80!',
            'prose-p:my-2',
            'marker:text-gray-500/80! prose-li:my-2',
          )}
        />
      </>
    )
  },
  Details,
  a: Anchor,
  BlockCode,
  InlineCode,
  CodeWithTabs,
} satisfies MDXComponents

export const useMDXComponents = () => components
