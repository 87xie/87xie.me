'use client'

import Link from 'next/link'
import cx from 'clsx'
import { titleCase } from 'scule'
import { usePathname } from 'next/navigation'

type CategoryNavProps = {
  categories: string[]
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={cx(
              'px-3 py-1.5 rounded-sm text-sm',
              // pathname === href && 'bg-gray-200/70',
            )}
          >
            <Link
              href={`${pathname}?category=${category}`}
              className="flex items-center gap-3"
            >
              {titleCase(category)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
