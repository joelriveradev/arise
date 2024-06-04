import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import { cn } from '@/lib/utils'

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
        <body className={cn(inter.className, 'min-h-screen')}>
          <header className='w-full text-lg px-8 py-5 border-b border-b-neutral-200'>
            <nav className='w-full flex items-center justify-between max-w-7xl mx-auto'>
              <Link href='/' className='font-bold' prefetch>
                arise
              </Link>

              <div className='text-base'>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </div>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </nav>
          </header>
          <div className='max-w-7xl mx-auto'>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
