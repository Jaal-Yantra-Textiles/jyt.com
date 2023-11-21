import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jaal Yantra - A multi brand ethical toolsets and libraries for your sucessful shop',
  description: 'Made by designers and fashion lovers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
        <Navbar />
        {children}
    </body>
    </html>
  )
}
