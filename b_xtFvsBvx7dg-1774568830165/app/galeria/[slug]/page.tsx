import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { getGallery } from '@/lib/api'
import { getGalleryCoverImage } from '@/lib/gallery'

interface GalleryDetailPageProps {
  params: Promise<{ slug: string }>
}

async function getGalleryItem(slug: string) {
  const items = await getGallery()
  return items.find((item) => item.slug === slug)
}

export async function generateStaticParams() {
  const items = await getGallery()
  return items.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getGalleryItem(slug)

  if (!item) {
    return { title: 'Galería no encontrada | BYHORMIGA' }
  }

  return {
    title: `${item.event_name} | Galería BYHORMIGA`,
    description: `Archivo visual de ${item.event_name}.`,
  }
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params
  const item = await getGalleryItem(slug)

  if (!item) {
    notFound()
  }

  const coverImage = getGalleryCoverImage(item)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Link
            href="/galeria"
            className="mb-8 inline-block text-[10px] tracking-[.2em] text-gray-500 uppercase transition-colors hover:text-white"
          >
            ← VOLVER A GALERÍA
          </Link>

          <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,420px)] lg:items-end lg:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0a0908] via-[#1a1a1a] to-[#0f0f0f]">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={item.event_name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </div>

            <div>
              <span className="block text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
                ARCHIVO VISUAL
              </span>
              <h1 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
                {item.event_name}
              </h1>
              <p className="mt-4 text-[11px] tracking-[.2em] text-gray-400 uppercase">{item.date}</p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-gray-400">
                Registro visual del evento con una selección de escenas, atmósferas y momentos capturados en vivo.
              </p>
            </div>
          </div>

          {item.photos.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {item.photos.map((photo) => (
                <figure key={photo.id} className="relative overflow-hidden bg-[#111111]">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.image}
                      alt={photo.caption || item.event_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {photo.caption ? (
                    <figcaption className="border-t border-white/[.08] px-4 py-3 text-sm text-gray-400">
                      {photo.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : (
            <div className="border border-white/[.08] bg-[#111111] px-6 py-10 text-center">
              <p className="text-sm text-gray-400">Todavía no hay fotos adicionales publicadas para esta galería.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
