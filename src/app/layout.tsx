import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cx from 'clsx'
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
    <html className={cx(inter.className, 'scroll-pt-14')}>
      <body>
        {children}
      </body>
    </html>
  )
}
