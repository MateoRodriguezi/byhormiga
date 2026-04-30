import type { Event, GalleryItem, Post } from './types'

// Mock data for events
export const mockEvents: Event[] = [
  {
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
    event_name: 'HORMIGA NEGRA IX',
    date: 'MAR 2026',
    image: '/gallery/event-1.jpg',
    photos: [],
  },
  {
    id: '2',
    event_name: 'SUBTERRANEA VOL.3',
    date: 'FEB 2026',
    image: '/gallery/event-2.jpg',
    photos: [],
  },
  {
    id: '3',
    event_name: 'OPEN AIR VERANO',
    date: 'ENE 2026',
    image: '/gallery/event-3.jpg',
    photos: [],
  },
  {
    id: '4',
    event_name: 'NYE 2026',
    date: 'DIC 2025',
    image: '/gallery/event-4.jpg',
    photos: [],
  },
  {
    id: '5',
    event_name: 'HORMIGA NEGRA VIII',
    date: 'NOV 2025',
    image: '/gallery/event-5.jpg',
    photos: [],
  },
]

// Mock data for posts
export const mockPosts: Post[] = [
  {
    slug: 'byhormiga-trastienda-nueva-era',
    title: 'BYHORMIGA Y LA TRASTIENDA: UNA NUEVA ERA PARA LOS EVENTOS EN MONTEVIDEO',
    description:
      'El icónico venue montevideano y byhormiga unen fuerzas para crear experiencias inolvidables que redefinen la escena de eventos en Uruguay.',
    date: '18 MAR 2026',
  },
  {
    slug: '30-anos-byhormiga-fernando-herrero',
    title: '30 AÑOS DE BYHORMIGA: CÓMO FERNANDO HERRERO TRANSFORMÓ LA ESCENA DE EVENTOS EN URUGUAY',
    description:
      'Un recorrido por tres décadas de innovación, creatividad y pasión por las experiencias que conectan a las personas.',
    date: '05 FEB 2026',
  },
  {
    slug: 'mejores-momentos-hormiga-negra-ix',
    title: 'LOS MEJORES MOMENTOS DE HORMIGA NEGRA IX EN EL CINE UNIVERSITARIO',
    description:
      'Revivimos la novena edición de nuestro evento más emblemático a través de imágenes y testimonios de quienes lo vivieron.',
    date: '20 ENE 2026',
  },
]
