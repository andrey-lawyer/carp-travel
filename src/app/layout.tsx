

import type { Metadata } from 'next'
import  {Inter} from 'next/font/google'

import { Header } from '@/header/Header'
import { Footer } from '@/footer/Footer'

import '@/styles/globals.css'
const inter = Inter({ subsets: ['latin', ] })

export const metadata: Metadata = {
  title: 'СarpTravel',
  description: 'СarpTravel site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer/>
         <div id='modal' />
        </body>
    </html>
  )
}
