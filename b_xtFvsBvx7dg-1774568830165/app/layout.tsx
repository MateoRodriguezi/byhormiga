import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'BYHORMIGA | Events · Creative · Corporate · Montevideo',
  description: 'Dedicados a crear momentos únicos y experiencias que no se olvidan. Eventos, diseño audiovisual y alianzas estratégicas en Montevideo, Uruguay.',
  keywords: ['byhormiga', 'eventos', 'creative', 'corporate', 'montevideo', 'uruguay', 'productora', 'branding', 'audiovisual'],
  authors: [{ name: 'BYHORMIGA' }],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'BYHORMIGA | Events · Creative · Corporate',
    description: 'Dedicados a crear momentos únicos y experiencias que no se olvidan.',
    type: 'website',
    locale: 'es_UY',
    siteName: 'BYHORMIGA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYHORMIGA | Events · Creative · Corporate',
    description: 'Dedicados a crear momentos únicos y experiencias que no se olvidan.',
  },
}

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
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0908] text-white`}>
        <div className="film-grain" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
