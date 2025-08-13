'use client'
import Link from 'next/link'
import cx from 'clsx'
import { usePathname } from 'next/navigation'

const links = [
  ['About', '/'],
  ['Blog', '/blog'],
  ['Notes', '/notes'],
  ['Playground', '/playground'],
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="pb-12 md:w-38 md:pb-0">
      <ul
        className={cx(
          'flex space-x-3',
          'md:block md:space-x-0 md:space-y-2',
        )}
      >
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className={cx('link-gray', pathname === href && 'link-active')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
