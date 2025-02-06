import type { MDXComponents } from 'mdx/types'
import NextLink from 'next/link'

type AnchorComponent = Exclude<MDXComponents['a'], undefined>

const classes = {
  link: 'group hover:text-gray-600',
}

const Anchor: AnchorComponent = ({
  href = '/',
  children,
  ...props
}) => {
  if (href.startsWith('/')) {
    return (
      <NextLink
        {...props}
        href={href}
        className={classes.link}
      >
        {children}
      </NextLink>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a href={href} className={classes.link}>
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
      className={classes.link}
    >
      {children}
    </a>
  )
}

export default Anchor
