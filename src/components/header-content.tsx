'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import cx from 'clsx'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/notes', label: 'Notes' },
  { href: '/guides', label: 'Guides' },
]

export function HeaderContent() {
  const pathname = usePathname()

  return (
    <nav className="grid grid-flow-col gap-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cx(
            pathname === href || pathname.startsWith(`${href}/`)
              ? 'text-gray-900 text-shadow-2xs text-shadow-gray-200'
              : 'text-gray-500',
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
