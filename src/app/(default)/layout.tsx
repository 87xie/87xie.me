import cx from 'clsx'

import { Nav } from './_components/nav'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div
      className={cx(
        'grid',
        'md:grid-cols-[min-content_1fr]',
        'max-w-4xl mx-auto py-14 px-6',
      )}
    >
      <div className="md:sticky md:top-14 md:self-start">
        <Nav />
      </div>
      <main
        className={cx('[&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-6')}
      >
        {children}
      </main>
    </div>
  )
}
