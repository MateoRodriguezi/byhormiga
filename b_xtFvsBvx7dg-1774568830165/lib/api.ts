import type { Event, GalleryItem, Post, ContactFormData } from './types'

// TODO: Replace with real API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Mock data for events
export const mockEvents: Event[] = [
  {
    id: '1',
    slug: 'hormiga-negra-x',
    name: 'HORMIGA NEGRA X',
    venue: 'Cine Universitario',
    date: '2026-04-12',
    day: '12',
    month: 'ABR',
    weekday: 'SÁB',
    price: '$U 350 anticipadas',
    status: 'en-venta',
    featured: true,
    description: 'La décima edición de nuestra experiencia más icónica. Una noche de arte, música electrónica y conexiones genuinas en el emblemático Cine Universitario.',
  },
  {
    id: '2',
    slug: 'subterranea-vol4',
    name: 'SUBTERRANEA VOL.4',
    venue: 'La Trastienda',
    date: '2026-04-19',
    day: '19',
    month: 'ABR',
    weekday: 'VIE',
    price: '$U 300 anticipadas',
    status: 'en-venta',
    description: 'Cuarta edición de nuestra serie underground. Experiencia audiovisual única en La Trastienda con los mejores DJs de la escena local.',
  },
  {
    id: '3',
    slug: 'open-air-otono',
    name: 'OPEN AIR OTOÑO',
    venue: 'Parque Rodó',
    date: '2026-05-03',
    day: '03',
    month: 'MAY',
    weekday: 'SÁB',
    price: '',
    status: 'agotado',
    description: 'Festival al aire libre en el corazón del Parque Rodó. SOLD OUT. Una experiencia única que celebra la música y la cultura uruguaya.',
  },
  {
    id: '4',
    slug: 'hormiga-sessions-01',
    name: 'HORMIGA SESSIONS 01',
    venue: 'Club Azul',
    date: '2026-05-17',
    day: '17',
    month: 'MAY',
    weekday: 'SÁB',
    price: '$U 400 anticipadas',
    status: 'en-venta',
    featured: true,
    description: 'Primera edición de nuestra nueva serie de experiencias íntimas. Arte, música experimental y conexiones genuinas en un espacio único.',
  },
  {
    id: '5',
    slug: 'aniversario-30-anos',
    name: 'ANIVERSARIO 30 AÑOS',
    venue: 'TBA',
    date: '2026-06-07',
    day: '07',
    month: 'JUN',
    weekday: 'SÁB',
    price: '',
    status: 'proximamente',
    description: 'Celebración especial de 30 años de byhormiga. Una noche inolvidable para conmemorar tres décadas transformando la escena de eventos en Uruguay. Detalles próximamente.',
  },
]

// Mock data for gallery
export const mockGallery: GalleryItem[] = [
  {
    id: '1',
    eventName: 'HORMIGA NEGRA IX',
    date: 'MAR 2026',
    image: '/gallery/event-1.jpg',
    span: { cols: 5, rows: 2 },
  },
  {
    id: '2',
    eventName: 'SUBTERRANEA VOL.3',
    date: 'FEB 2026',
    image: '/gallery/event-2.jpg',
  },
  {
    id: '3',
    eventName: 'OPEN AIR VERANO',
    date: 'ENE 2026',
    image: '/gallery/event-3.jpg',
  },
  {
    id: '4',
    eventName: 'NYE 2026',
    date: 'DIC 2025',
    image: '/gallery/event-4.jpg',
  },
  {
    id: '5',
    eventName: 'HORMIGA NEGRA VIII',
    date: 'NOV 2025',
    image: '/gallery/event-5.jpg',
  },
]

// Mock data for posts
export const mockPosts: Post[] = [
  {
    id: '1',
    slug: 'byhormiga-trastienda-nueva-era',
    title: 'BYHORMIGA Y LA TRASTIENDA: UNA NUEVA ERA PARA LOS EVENTOS EN MONTEVIDEO',
    excerpt: 'El icónico venue montevideano y byhormiga unen fuerzas para crear experiencias inolvidables que redefinen la escena de eventos en Uruguay.',
    date: '18 MAR 2026',
    content: 'La alianza estratégica entre byhormiga y La Trastienda marca un antes y después en la producción de eventos en Montevideo. Esta colaboración promete llevar la escena cultural uruguaya a nuevos niveles, combinando la experiencia de 30 años de byhormiga con el prestigio de uno de los venues más emblemáticos de la ciudad.',
  },
  {
    id: '2',
    slug: '30-anos-byhormiga-fernando-herrero',
    title: '30 AÑOS DE BYHORMIGA: CÓMO FERNANDO HERRERO TRANSFORMÓ LA ESCENA DE EVENTOS EN URUGUAY',
    excerpt: 'Un recorrido por tres décadas de innovación, creatividad y pasión por las experiencias que conectan a las personas.',
    date: '05 FEB 2026',
    content: 'Fernando Herrero fundó byhormiga en 1996 con una visión clara: crear experiencias que trasciendan el evento mismo. Tres décadas después, byhormiga se ha consolidado como la agencia de eventos más innovadora de Uruguay, habiendo producido más de 500 eventos que han marcado la cultura y el entretenimiento del país.',
  },
  {
    id: '3',
    slug: 'mejores-momentos-hormiga-negra-ix',
    title: 'LOS MEJORES MOMENTOS DE HORMIGA NEGRA IX EN EL CINE UNIVERSITARIO',
    excerpt: 'Revivimos la novena edición de nuestro evento más emblemático a través de imágenes y testimonios de quienes lo vivieron.',
    date: '20 ENE 2026',
    content: 'Hormiga Negra IX superó todas las expectativas. El Cine Universitario fue testigo de una noche mágica donde la música electrónica, el arte visual y las conexiones humanas se fusionaron en una experiencia inolvidable. Más de 2000 asistentes disfrutaron de sets de DJs locales e internacionales en un ambiente único.',
  },
]

// TODO: Replace with actual API calls
export async function getEvents(): Promise<Event[]> {
  // TODO: Uncomment when API is ready
  // const res = await fetch(`${API_BASE_URL}/api/events/`, {
  //   next: { revalidate: 60 }
  // })
  // return res.json()

  return mockEvents
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  // TODO: Uncomment when API is ready
  // const res = await fetch(`${API_BASE_URL}/api/events/${slug}`, {
  //   next: { revalidate: 60 }
  // })
  // return res.json()

  return mockEvents.find(event => event.slug === slug)
}

export async function getGallery(): Promise<GalleryItem[]> {
  // TODO: Uncomment when API is ready
  // const res = await fetch(`${API_BASE_URL}/api/gallery/`, {
  //   next: { revalidate: 60 }
  // })
  // return res.json()

  return mockGallery
}

export async function getPosts(): Promise<Post[]> {
  // TODO: Uncomment when API is ready
  // const res = await fetch(`${API_BASE_URL}/api/posts/`, {
  //   next: { revalidate: 60 }
  // })
  // return res.json()

  return mockPosts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // TODO: Uncomment when API is ready
  // const res = await fetch(`${API_BASE_URL}/api/posts/${slug}`, {
  //   next: { revalidate: 60 }
  // })
  // return res.json()

  return mockPosts.find(post => post.slug === slug)
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  // TODO: Uncomment when API is ready
  // const res = await fetch(`${API_BASE_URL}/api/contact/`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // })
  // return res.json()

  console.log('Contact form submitted:', data)
  return { success: true }
}
