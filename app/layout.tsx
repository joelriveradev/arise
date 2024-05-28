import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arise',
  description:
    'Arise is a cutting-edge platform for modern, historic Seventh-Day Adventist Sabbath School lessons.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
