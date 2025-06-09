import type { MDXComponents } from 'mdx/types'
import NextLink from 'next/link'

type AnchorComponent = Exclude<MDXComponents['a'], undefined>

const Anchor: AnchorComponent = ({
  href = '/',
  children,
  ...props
}) => {
  if (href.startsWith('/')) {
    return (
      <NextLink {...props} href={href}>
        {children}
      </NextLink>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a href={href}>
        {children}
      </a>
    )
  }
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export default Anchor
