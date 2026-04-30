export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Event {
  slug: string
  name: string
  venue: string
  day?: string
  month?: string
  weekday?: string
  status: 'en-venta' | 'agotado' | 'proximamente'
  featured?: boolean
  date?: string
  price?: string
  ticket_url?: string
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
  slug: string
  title: string
  date: string
  description?: string
  image?: string
}

export interface ContactSuccessResponse {
  success: boolean
  message: string
}

export type ContactErrorResponse = Partial<Record<keyof ContactFormData, string[]>>

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
