import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/notes', label: 'Notes' },
  { href: '/guides', label: 'Guides' },
]

export function Header() {
  return (
    <header className="sticky z-10 top-0 left-0 grid items-center w-full h-14 max-w-4xl mx-auto bg-white">
      <nav className="inline-flex gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-gray-900 text-gray-500"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
