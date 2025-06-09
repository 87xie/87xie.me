import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cx from 'clsx'
import { HeaderContent } from '@/components/header-content'
import './globals.css'

export const metadata: Metadata = {
  title: '87xie.me',
  description: 'Personal writing by 87xie',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full">
      <body className="h-full">
        <div
          className={cx(
            inter.className,
            'w-full h-full max-w-4xl mx-auto px-4',
            'grid grid-rows-[min-content_1fr_min-content]',
          )}
        >
          <header className="flex mt-4 mb-6 md:mt-10 md:mb-10">
            <HeaderContent />
          </header>
          <main className="pb-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
