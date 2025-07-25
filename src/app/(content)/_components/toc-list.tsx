import cx from 'clsx'
import type { TocItem } from '@/utils/toc-parser'

type TocListProps = {
  toc: TocItem[]
}

export function TocList({ toc }: TocListProps) {
  return (
    <ul className="ml-1 border-l pl-3 border-zinc-300 space-y-1">
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={cx(
              'inline-block w-full text-zinc-500 text-sm',
              heading.level === 3 && 'pl-3',
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
