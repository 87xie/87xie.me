'use client'
import Link from 'next/link'
import cx from 'clsx'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/playground', label: 'Playground' },
]

export function Nav() {
  const pathname = usePathname()
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="pb-12 md:pb-0 md:pr-16">
      <ul className="flex space-x-3 md:block md:space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cx(
                'text-zinc-500 hover:text-zinc-700',
                isActive(href) && 'text-zinc-700 font-medium underline underline-offset-4 decoration-wavy decoration-zinc-500',
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
