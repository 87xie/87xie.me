import type { ComponentPropsWithoutRef } from 'react'
import { LinkIcon } from '@primer/octicons-react'
import cx from 'clsx'

type LinkedHeadingProps = {
  level: 1 | 2 | 3
} & ComponentPropsWithoutRef<'h1' | 'h2' | 'h3'>

function LinkedHeading({
  id,
  level,
  children,
}: LinkedHeadingProps) {
  const Heading = `h${level}` as const
  const linkAriaLabel = typeof children === 'string'
    ? `Permalink: ${children}`
    : undefined

  return (
    <Heading
      className={cx(
        'group relative',
        level === 1 && 'text-3xl',
        level <= 2 && 'border-b-1 border-gray-200 pb-1',
      )}
    >
      {children}
      {id && (
        <a
          id={id}
          href={`#${id}`}
          aria-label={linkAriaLabel}
          className={cx(
            'hidden lg:inline-block',
            'absolute top-[calc(50%-8px)] -left-6',
            'opacity-0 group-hover:opacity-100 focus:opacity-100',
          )}
        >
          <LinkIcon size={16} />
        </a>
      )}
    </Heading>
  )
}

export default LinkedHeading
