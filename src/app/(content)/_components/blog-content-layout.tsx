import { BackLink } from './back-link'

type BlogContentLayoutProps = {
  children: React.ReactNode
}

export function BlogContentLayout({ children }: BlogContentLayoutProps) {
  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <BackLink category="blog" />
      {children}
    </main>
  )
}
