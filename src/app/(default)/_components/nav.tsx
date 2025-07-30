'use client'
import Link from 'next/link'
import cx from 'clsx'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/notes', label: 'Notes' },
  { href: '/playground', label: 'Playground' },
]

export function Nav() {
  const pathname = usePathname()
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="pb-12 md:w-40 md:pb-0 md:mr-4">
      <ul
        className={cx(
          'flex space-x-3',
          'md:block md:space-x-0 md:space-y-2',
        )}
      >
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cx(
                'text-zinc-500 hover:text-zinc-700',
                isActive(href) && 'text-zinc-700 font-medium',
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
