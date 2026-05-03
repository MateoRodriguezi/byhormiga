export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ByHormiga',
    description:
      'Productora de eventos líder en Uruguay. Creamos experiencias inolvidables que conectan a las personas a través de la música, el arte y la cultura.',
    url: 'https://byhormiga.com',
    logo: 'https://byhormiga.com/images/logo-hormiga.png',
    foundingDate: '1996',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montevideo',
      addressCountry: 'UY',
    },
    sameAs: ['https://www.instagram.com/byhormiga'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contacto@byhormiga.com',
      contactType: 'customer service',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function EventSchema({
  name,
  description,
  date,
  location,
  image,
}: {
  name: string
  description: string
  date?: string
  location?: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    image: image || 'https://byhormiga.com/images/og-image.jpg',
    organizer: {
      '@type': 'Organization',
      name: 'ByHormiga',
      url: 'https://byhormiga.com',
    },
    ...(date && { startDate: date }),
    ...(location && {
      location: {
        '@type': 'Place',
        name: location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Montevideo',
          addressCountry: 'UY',
        },
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
