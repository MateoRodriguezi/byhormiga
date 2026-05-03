import type { GalleryItem } from './types'

export function getGalleryCoverImage(item: GalleryItem) {
  return item.image ?? item.photos[0]?.image
}
