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
  time?: string
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
  slug: string
  event_name: string
  date: string
  image?: string
  recap_video?: string
  photos: GalleryPhoto[]
}

export interface Post {
  slug: string
  title: string
  date: string
  description?: string
  content?: string
  image?: string
}

export interface SponsorActivation {
  title: string
  description: string
  images?: string[]
}

export interface Sponsor {
  id: string | number
  name: string
  logo?: string
  website_url?: string
  order?: number
  description?: string
  activations?: SponsorActivation[]
}

export interface StoryBlock {
  title: string
  text: string
  images: string[]
}

export interface Stat {
  value: string
  label: string
  description: string
  is_number: boolean
}

export interface AboutContent {
  hero_title: string
  story_blocks: StoryBlock[]
  stats: Stat[]
}

export type ProductionCategory = 'matinee' | 'plus15' | 'plus18' | 'coproduccion_internacional'

export interface ProductionListItem {
  slug: string
  name: string
  logo?: string
  hero_image?: string
  category: ProductionCategory
}

export interface ProductionSection {
  side: 'left' | 'right' | 'full'
  text: string
  label?: string
  images: string[]
}

export interface ProductionVenue {
  name: string
  image?: string
}

export interface Production {
  slug: string
  name: string
  logo?: string
  category: ProductionCategory
  card_description?: string
  hero_image?: string
  destacado: string
  venues_intro?: string
  venues: ProductionVenue[]
  sections: ProductionSection[]
  closing_text?: string
  closing_image?: string
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
