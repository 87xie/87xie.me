import type { MDXComponents } from 'mdx/types'
import NextLink from 'next/link'

type AnchorComponent = Exclude<MDXComponents['a'], undefined>

const Anchor: AnchorComponent = ({
  href = '/',
  children,
  ...props
}) => {
  const className = 'not-prose underline'
  if (href.startsWith('/')) {
    return (
      <NextLink
        {...props}
        prefetch={false}
        href={href}
        className={className}
      >
        {children}
      </NextLink>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a {...props} href={href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <a
      {...props}
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export default Anchor
