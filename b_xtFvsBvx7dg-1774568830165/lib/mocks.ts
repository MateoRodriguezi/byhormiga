import type { Event, GalleryItem, Post, Sponsor } from './types'

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
    image: '/mock-photos/event-1.jpeg',
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
    image: '/mock-photos/event-2.jpeg',
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
    image: '/mock-photos/event-3.jpeg',
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
    image: '/mock-photos/event-4.jpeg',
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
    image: '/mock-photos/event-5.jpg',
  },
]

// Mock data for gallery
export const mockGallery: GalleryItem[] = [
  {
    id: '1',
    slug: 'hormiga-negra-ix',
    event_name: 'HORMIGA NEGRA IX',
    date: 'MAR 2026',
    image: '/mock-photos/event-1.jpeg',
    photos: [
      {
        id: '1-1',
        image: '/mock-photos/event-1.jpeg',
        caption: 'Momento épico en HORMIGA NEGRA IX',
        order: 1,
      },
      {
        id: '1-2',
        image: '/mock-photos/event-2.jpeg',
        caption: 'La multitud vibrando al unísono',
        order: 2,
      },
      {
        id: '1-3',
        image: '/mock-photos/event-3.jpeg',
        caption: 'Luces y música en perfecta armonía',
        order: 3,
      },
      {
        id: '1-4',
        image: '/mock-photos/event-4.jpeg',
        caption: 'DJ set inolvidable',
        order: 4,
      },
    ],
  },
  {
    id: '2',
    slug: 'subterranea-vol-3',
    event_name: 'SUBTERRANEA VOL.3',
    date: 'FEB 2026',
    image: '/mock-photos/event-2.jpeg',
    photos: [
      {
        id: '2-1',
        image: '/mock-photos/event-2.jpeg',
        caption: 'Subterránea en su máxima expresión',
        order: 1,
      },
      {
        id: '2-2',
        image: '/mock-photos/event-3.jpeg',
        caption: 'Underground vibes',
        order: 2,
      },
      {
        id: '2-3',
        image: '/mock-photos/event-4.jpeg',
        caption: 'La Trastienda en modo electrónico',
        order: 3,
      },
    ],
  },
  {
    id: '3',
    slug: 'open-air-verano-2026',
    event_name: 'OPEN AIR VERANO',
    date: 'ENE 2026',
    image: '/mock-photos/event-3.jpeg',
    photos: [
      {
        id: '3-1',
        image: '/mock-photos/event-3.jpeg',
        caption: 'Festival al aire libre',
        order: 1,
      },
      {
        id: '3-2',
        image: '/mock-photos/event-4.jpeg',
        caption: 'Miles vibrando bajo el sol',
        order: 2,
      },
      {
        id: '3-3',
        image: '/mock-photos/event-5.jpg',
        caption: 'Parque Rodó en su mejor momento',
        order: 3,
      },
      {
        id: '3-4',
        image: '/mock-photos/event-1.jpeg',
        caption: 'Puesta de sol perfecta',
        order: 4,
      },
    ],
  },
  {
    id: '4',
    slug: 'nye-2026',
    event_name: 'NYE 2026',
    date: 'DIC 2025',
    image: '/mock-photos/event-4.jpeg',
    photos: [
      {
        id: '4-1',
        image: '/mock-photos/event-4.jpeg',
        caption: 'Fin de año épico',
        order: 1,
      },
      {
        id: '4-2',
        image: '/mock-photos/event-5.jpg',
        caption: 'La cuenta regresiva más esperada',
        order: 2,
      },
      {
        id: '4-3',
        image: '/mock-photos/event-1.jpeg',
        caption: 'Celebración inolvidable',
        order: 3,
      },
    ],
  },
  {
    id: '5',
    slug: 'hormiga-negra-viii',
    event_name: 'HORMIGA NEGRA VIII',
    date: 'NOV 2025',
    image: '/mock-photos/event-5.jpg',
    photos: [
      {
        id: '5-1',
        image: '/mock-photos/event-5.jpg',
        caption: 'Octava edición legendaria',
        order: 1,
      },
      {
        id: '5-2',
        image: '/mock-photos/event-1.jpeg',
        caption: 'Energía desbordante',
        order: 2,
      },
      {
        id: '5-3',
        image: '/mock-photos/event-2.jpeg',
        caption: 'Conexión total con la música',
        order: 3,
      },
    ],
  },
]

// Mock data for sponsors
export const mockSponsors: Sponsor[] = [
  {
    id: 1,
    name: 'Speed',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Speed_Energy.svg/200px-Speed_Energy.svg.png',
  },
  {
    id: 2,
    name: 'Pilsen',
    logo: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=100&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Coca Cola',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
  },
  {
    id: 4,
    name: 'Absolut',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Absolut_Vodka_logo.svg/200px-Absolut_Vodka_logo.svg.png',
  },
  {
    id: 5,
    name: 'Red Bull',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Red_Bull_logo.svg/200px-Red_Bull_logo.svg.png',
  },
  {
    id: 6,
    name: 'Beats',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Beats_logo_2021.svg/200px-Beats_logo_2021.svg.png',
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
    image: '/mock-photos/event-2.jpeg',
  },
  {
    slug: '30-anos-byhormiga-fernando-herrero',
    title: '30 AÑOS DE BYHORMIGA: CÓMO FERNANDO HERRERO TRANSFORMÓ LA ESCENA DE EVENTOS EN URUGUAY',
    description:
      'Un recorrido por tres décadas de innovación, creatividad y pasión por las experiencias que conectan a las personas.',
    date: '05 FEB 2026',
    image: '/mock-photos/event-4.jpeg',
  },
  {
    slug: 'mejores-momentos-hormiga-negra-ix',
    title: 'LOS MEJORES MOMENTOS DE HORMIGA NEGRA IX EN EL CINE UNIVERSITARIO',
    description:
      'Revivimos la novena edición de nuestro evento más emblemático a través de imágenes y testimonios de quienes lo vivieron.',
    date: '20 ENE 2026',
    image: '/mock-photos/event-1.jpeg',
  },
]
