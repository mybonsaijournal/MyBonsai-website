import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Bonsai Journal | Your mind, nurtured daily',
  description: 'A private journal that turns reflection into calm momentum—like growing a bonsai.',
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

