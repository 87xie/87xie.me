'use client'

import Link from 'next/link'
import cx from 'clsx'
import { usePathname } from 'next/navigation'
import {
  BookIcon,
  CodeIcon,
  LightBulbIcon,
} from '@primer/octicons-react'

const items = [
  {
    href: '/notes/quick-overview',
    label: 'Quick overivew',
    icon: LightBulbIcon,
  },
  {
    href: '/notes/book-reviews',
    label: 'Book reviews',
    icon: BookIcon,
  },
  {
    href: '/notes/snippets',
    label: 'Snippets',
    icon: CodeIcon,
  },
]

export function CategoryNav() {
  const pathname = usePathname()

  return (
    <>
      <nav>
        <ul>
          {items.map(({ href, label, icon: Icon }) => (
            <li
              key={href}
              className={cx(
                'px-3 py-1.5 rounded-sm text-sm',
                pathname === href && 'bg-gray-200/70',
              )}
            >
              <Link href={href} className="flex items-center gap-3">
                <Icon />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
