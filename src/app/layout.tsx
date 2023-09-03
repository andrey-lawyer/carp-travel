

import type { Metadata } from 'next'
import  {Inter} from 'next/font/google'

import { Header } from '@/header/Header'
import { Footer } from '@/footer/Footer'

import '@/styles/globals.css'
const inter = Inter({ subsets: ['latin', ] })

export const metadata: Metadata = {
  metadataBase: new URL("https://carp-travel-three.vercel.app"),
  title: 'СarpTravel',
  description: 'СarpTravel site',
  openGraph: {
    title: "CarpTravel",
    description: "СarpTravel site",
    url: "https://carp-travel-three.vercel.app",
    siteName: "СarpTravel",
    type: "website",
  },
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
