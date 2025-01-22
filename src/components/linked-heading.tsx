import type { ReactNode } from 'react'
import { LinkIcon } from '@primer/octicons-react'
import cx from 'clsx'

type LinkedHeadingProps = {
  id: string
  level: 1 | 2 | 3
  children: ReactNode
}

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
      <a
        id={id}
        href={`#${id}`}
        aria-label={linkAriaLabel}
        className={cx(
          'inline-flex absolute top-[calc(50%-0.5rem)] -left-6',
          'opacity-0 group-hover:opacity-100 focus:opacity-100',
        )}
      >
        <LinkIcon />
      </a>
      {children}
    </Heading>
  )
}

export default LinkedHeading
