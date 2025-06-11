import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cx from 'clsx'
import { Header } from '@/components/header'
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
            'w-full h-full mx-auto px-4',
            'grid grid-rows-[min-content] grid-cols-1',
          )}
        >
          <Header />
          <main className="w-full max-w-4xl mx-auto py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
