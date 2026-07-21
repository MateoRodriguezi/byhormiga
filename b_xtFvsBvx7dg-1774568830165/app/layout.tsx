import type { Metadata, Viewport } from 'next'
import { Questrial } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { defaultMetadata } from '@/lib/metadata'
import { OrganizationSchema } from '@/components/StructuredData'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import './globals.css'

const questrial = Questrial({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-questrial',
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  themeColor: '#0a0908',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <OrganizationSchema />
      </head>
      <body className={`${questrial.variable} font-sans antialiased bg-[#0a0908] text-white`}>
        <div className="film-grain" aria-hidden="true" />
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
