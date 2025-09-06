import type { ComponentPropsWithoutRef } from 'react'
import { LinkIcon } from '@primer/octicons-react'
import cn from 'clsx'

type LinkedHeadingProps = {
  level: 2 | 3
} & ComponentPropsWithoutRef<'h2' | 'h3'>

function LinkedHeading({
  id,
  level,
  children,
}: LinkedHeadingProps) {
  // id from remark-gfm
  if (id === 'footnote-label') return (
    <h2 className="sr-only">Footnotes</h2>
  )

  const Heading = `h${level}` as const
  const linkAriaLabel = typeof children === 'string'
    ? `Permalink: ${children}`
    : undefined

  return (
    <Heading
      className={cn(
        'group relative font-medium',
        level === 2 && 'text-2xl not-first:mt-10',
        level === 3 && 'text-xl',
      )}
    >
      {children}
      {id && (
        <a
          id={id}
          href={`#${id}`}
          aria-label={linkAriaLabel}
          className={cn(
            'inline-block absolute top-[calc(50%-8px)] -left-6',
            'opacity-0 lg:group-hover:opacity-100 lg:focus:opacity-100',
          )}
        >
          <LinkIcon size={16} />
        </a>
      )}
    </Heading>
  )
}

export default LinkedHeading
