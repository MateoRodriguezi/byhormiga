export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Event {
  id: string
  slug: string
  name: string
  venue: string
  date: string
  day: string
  month: string
  weekday: string
  price: string
  status: 'en-venta' | 'agotado' | 'proximamente'
  featured?: boolean
  description?: string
  image?: string
}

export interface GalleryPhoto {
  id: string
  image: string
  caption: string
  order: number
}

export interface GalleryItem {
  id: string
  event_name: string
  date: string
  image: string
  photos: GalleryPhoto[]
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  date: string
  author?: string
  image?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
