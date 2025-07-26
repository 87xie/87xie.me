import cx from 'clsx'

import { Nav } from './_components/nav'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div
      className={cx(
        'grid max-w-4xl mx-auto py-16 px-6',
        'md:grid-cols-[min-content_1fr]',
      )}
    >
      <div className="md:sticky md:top-14 md:self-start">
        <Nav />
      </div>
      <main>
        {children}
      </main>
    </div>
  )
}
