import type { ComponentPropsWithoutRef } from 'react'
import cx from 'clsx'

type DetailsProps = {
  summary?: string
} & ComponentPropsWithoutRef<'details'>

export function Details({
  summary = 'Details',
  children,
  ...detailProps
}: DetailsProps) {
  return (
    <details
      {...detailProps}
      className={cx(
        detailProps.className,
        'rounded-md my-6 py-4 px-4',
        'bg-gray-200 text-sm',
        '[&>*:not(summary)]:my-4',
        '[&_li]:my-1.5',
      )}
    >
      <summary className="font-semibold">
        {summary}
      </summary>
      {children}
    </details>
  )
}
