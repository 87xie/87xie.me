import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '87xie.me',
  description: 'Personal writing by 87xie',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
