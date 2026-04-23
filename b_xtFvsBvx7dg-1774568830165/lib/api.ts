import { mockEvents, mockGallery, mockPosts } from './mocks'
import type { ContactFormData, Event, GalleryItem, PaginatedResponse, Post } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const IS_LOCAL_ENV = process.env.NODE_ENV === 'development'

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

async function apiGetList<T>(path: string, mockData: T[]): Promise<T[]> {
  if (IS_LOCAL_ENV) {
    return mockData
  }

  const response = await apiRequest<PaginatedResponse<T>>(path, {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' },
  } satisfies NextRequestInit)

  return response.results
}

async function apiGetBySlug<T>(
  path: string,
  mockData: T[],
  matcher: (item: T) => boolean,
): Promise<T | undefined> {
  if (IS_LOCAL_ENV) {
    return mockData.find(matcher)
  }

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
  return apiGetList<Event>('/api/events/', mockEvents)
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  return apiGetBySlug<Event>(`/api/events/${slug}/`, mockEvents, (event) => event.slug === slug)
}

export async function getGallery(): Promise<GalleryItem[]> {
  return apiGetList<GalleryItem>('/api/gallery/', mockGallery)
}

export async function getPosts(): Promise<Post[]> {
  return apiGetList<Post>('/api/posts/', mockPosts)
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return apiGetBySlug<Post>(`/api/posts/${slug}/`, mockPosts, (post) => post.slug === slug)
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
  if (IS_LOCAL_ENV) {
    return { success: true, message: 'Mock submission successful' }
  }

  const result = await apiRequest<{ success?: boolean; message?: string }>('/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return {
    success: result.success ?? true,
    message: result.message,
  }
}
