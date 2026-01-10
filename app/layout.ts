import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2PAC-SHARE - Gangsta File Sharing',
  description: 'All Eyez On Your Files - Thug Life File Sharing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}