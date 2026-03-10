import { Outlet, createFileRoute } from '@tanstack/react-router'
import cx from 'clsx'

import { Nav } from '@/components/nav'

export const Route = createFileRoute('/_default')({
  component: DefaultLayout,
})

function DefaultLayout() {
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
        <Outlet />
      </main>
    </div>
  )
}
