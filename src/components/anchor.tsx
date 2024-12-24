'use server'

import type { MDXComponents } from 'mdx/types'
import NextLink from 'next/link'

type AnchorComponent = Exclude<MDXComponents['a'], undefined>

const Anchor: AnchorComponent = ({
  href = '/',
  children,
  ...props
}) => {
  const propsWithClass = {
    className: 'text-blue-700 hover:text-blue-600',
    ...props
  }

  if (href.startsWith('/')) {
    <NextLink href={href} {...propsWithClass}>
      {children}
    </NextLink>
  }
  if (href.startsWith('#')) {
    return (
      <a href={href} {...propsWithClass}>
        {children}
      </a>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...propsWithClass}
    >
      {children}
    </a>
  )
}

export default Anchor
