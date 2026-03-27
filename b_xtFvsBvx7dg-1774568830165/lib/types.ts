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

export interface GalleryItem {
  id: string
  eventName: string
  date: string
  image: string
  span?: {
    cols: number
    rows: number
  }
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
