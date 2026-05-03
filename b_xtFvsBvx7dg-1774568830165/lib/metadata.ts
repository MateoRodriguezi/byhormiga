import { Metadata } from 'next'

export const siteConfig = {
  name: 'ByHormiga',
  description: 'Productora de eventos líder en Uruguay. Creamos experiencias inolvidables que conectan a las personas a través de la música, el arte y la cultura.',
  url: 'https://byhormiga.com',
  ogImage: '/images/og-image.jpg',
  links: {
    instagram: 'https://www.instagram.com/byhormiga',
    email: 'contacto@byhormiga.com',
  },
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Productora de Eventos en Uruguay`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'eventos Uruguay',
    'productora de eventos',
    'fiestas Montevideo',
    'eventos corporativos',
    'eventos musicales',
    'ByHormiga',
    'entertainment Uruguay',
    'organizacion de eventos',
    'sponsors eventos',
    'relajo pero con orden',
  ],
  authors: [{ name: 'ByHormiga' }],
  creator: 'ByHormiga',
  publisher: 'ByHormiga',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@byhormiga',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
}

export function generatePageMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
}: {
  title: string
  description: string
  image?: string
  url?: string
  noIndex?: boolean
}): Metadata {
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const ogImage = image || siteConfig.ogImage

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}
