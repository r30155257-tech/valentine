import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BackgroundMusic from '@/components/BackgroundMusic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Our Love Story ❤️',
  description: 'A beautiful journey of us together - Since 14th October',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  )
}