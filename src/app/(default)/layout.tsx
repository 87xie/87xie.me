import Link from 'next/link'
import cx from 'clsx'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const links = [
  { href: '/', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/notes', label: 'Notes' },
]

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div
      className={cx(
        'grid',
        'md:grid-cols-[9rem_1fr]',
        'max-w-4xl mx-auto py-14 px-6',
      )}
    >
      <nav>
        <ul className="space-y-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="mt-12 md:mt-0">
        {children}
      </main>
    </div>
  )
}
