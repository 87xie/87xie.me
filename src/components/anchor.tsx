import type { ComponentPropsWithoutRef } from 'react'
import NextLink from 'next/link'
import cn from 'clsx'

type AnchorProps = ComponentPropsWithoutRef<'a'>

const Anchor = ({
  href = '/',
  children,
  className: classNameProp,
  ...props
}: AnchorProps) => {
  const className = cn(classNameProp, 'not-prose underline')
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
