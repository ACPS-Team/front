import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import QueryClientWrapper from '@/components/QueryClientWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ACPS Aero club',
  description: "Dashboard pour les membres de l'ACPS Aero club"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientWrapper>
  )
}
