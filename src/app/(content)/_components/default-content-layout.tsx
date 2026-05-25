import cx from 'clsx'

import { Toc } from '@/components/toc'

import { BackLink } from './back-link'

type DefaultContentLayoutProps = {
  category: string
  toc: React.ComponentProps<typeof Toc>['toc']
  children: React.ReactNode
}

export function DefaultContentLayout({
  category,
  toc,
  children,
}: DefaultContentLayoutProps) {
  return (
    <div
      className={cx(
        'max-w-4xl mx-auto py-16 px-6',
        'md:flex',
      )}
    >
      <main className="md:w-3/4">
        <BackLink category={category} />
        {children}
      </main>
      <aside
        className={cx(
          'hidden self-start sticky top-14 w-1/4 ml-12',
          'md:block',
        )}
      >
        <Toc toc={toc} />
      </aside>
    </div>
  )
}
