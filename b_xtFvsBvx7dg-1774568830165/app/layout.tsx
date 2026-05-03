import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { defaultMetadata } from '@/lib/metadata'
import { OrganizationSchema } from '@/components/StructuredData'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0908] text-white`}>
        <div className="film-grain" aria-hidden="true" />
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
