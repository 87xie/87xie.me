import Link from 'next/link'
import { ArrowLeftIcon } from '@primer/octicons-react'

type BackLinkProps = {
  category: string
}

export function BackLink({ category }: BackLinkProps) {
  return (
    <Link
      className="link-gray inline-flex items-center gap-2 mb-6 text-sm"
      href={`/${category}`}
    >
      <ArrowLeftIcon size={14} />
      {`Back to ${category}`}
    </Link>
  )
}
