import type {
  ContactFormData,
  ContactSuccessResponse,
  Event,
  GalleryItem,
  PaginatedResponse,
  Post,
} from './types'
import { mockGallery, mockPosts } from './mocks'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured')
  }

  return API_BASE_URL.replace(/\/$/, '')
}

async function apiRequest<T>(path: string, init?: NextRequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${path}`
  const response = await fetch(url, init)

  if (!response.ok) {
    const details = await response.text()
    throw new ApiError(`Request failed (${response.status}) for ${path}${details ? `: ${details}` : ''}`, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

type NextRequestInit = RequestInit & {
  next?: {
    revalidate?: number
  }
}

type ListResponse<T> = Pick<PaginatedResponse<T>, 'count' | 'results'> &
  Partial<Pick<PaginatedResponse<T>, 'next' | 'previous'>>

async function apiGetList<T>(path: string): Promise<T[]> {
  const response = await apiRequest<ListResponse<T>>(path, {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' },
  } satisfies NextRequestInit)

  return response.results
}

async function apiGetBySlug<T>(
  path: string,
): Promise<T | undefined> {
  try {
    return await apiRequest<T>(path, {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' },
    } satisfies NextRequestInit)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return undefined
    }

    throw error
  }
}

export async function getEvents(): Promise<Event[]> {
  return apiGetList<Event>('/api/events/')
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  return apiGetBySlug<Event>(`/api/events/${slug}/`)
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    return await apiGetList<GalleryItem>('/api/gallery/')
  } catch (error) {
    console.warn('Gallery API failed, using mock data:', error)
    return mockGallery
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await apiGetList<Post>('/api/posts/')
  } catch (error) {
    console.warn('Posts API failed, using mock data:', error)
    return mockPosts
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return apiGetBySlug<Post>(`/api/posts/${slug}/`)
}

export async function submitContactForm(data: ContactFormData): Promise<ContactSuccessResponse> {
  return apiRequest<ContactSuccessResponse>('/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
