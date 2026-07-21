import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getGalleryCoverImage } from '@/lib/gallery'
import { getGallery } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Momentos | BYHORMIGA',
  description: 'Momentos capturados en los eventos de BYHORMIGA.',
}

// Categorías de momentos
const categories = [
  {
    title: 'Antel Arena',
    keywords: ['antel arena', 'polenta antel', 'wonder antel', 'oversize antel', 'mega wonder'],
    subtitle: 'Polenta en Antel Arena · Mega Wonder en Antel Arena (2025) · Oversize en Antel Arena (2025 / 2024)',
  },
  {
    title: 'Floripa',
    keywords: ['floripa'],
    subtitle: '4 años consecutivos formando parte de Floripa, el Festival de Planet 01.',
  },
  {
    title: 'Artistas Internacionales',
    keywords: ['artista internacional', 'internacional'],
    subtitle: 'De la Ghetto, Darell, Guayana, Kevin Roldan, Jere Klein, Lauty Gram, Luck Ra, La Joaqui, L-Gante, FMK.',
  },
  {
    title: 'Artistas Nacionales',
    keywords: ['artista nacional', 'nacional'],
    subtitle: 'Marama, Luana, The La Planta, La Nueva Escuela, Zeballos.',
  },
  {
    title: 'Hit The Beach',
    keywords: ['hit the beach'],
  },
  {
    title: 'Oversize - El Jagüel, Punta Del Este',
    keywords: ['oversize el jaguel', 'el jaguel', 'oversize punta del este'],
  },
]

function GalleryCard({ item, index }: { item: any; index: number }) {
  return (
    <Link
      key={item.id}
      href={`/momentos/${item.slug}`}
      className={`relative overflow-hidden group block ${
        index === 0 ? 'col-span-2 row-span-2' : ''
      }`}
      style={{ minHeight: index === 0 ? '400px' : '200px' }}
    >
      {getGalleryCoverImage(item) ? (
        <Image
          src={getGalleryCoverImage(item)!}
          alt={item.event_name}
          fill
          className="object-cover transition-all duration-500 grayscale-[0.5] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      ) : (
        <div
          className="absolute inset-0 transition-all duration-500 group-hover:scale-[1.04]"
          style={{
            background: `linear-gradient(${135 + index * 25}deg, #0a0908 0%, #1a1a1a ${
              25 + index * 8
            }%, #0f0f0f 100%)`,
          }}
        />
      )}

      {item.recap_video ? (
        <div className="absolute top-3 right-3 lg:top-4 lg:right-4 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
          <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white fill-white" />
        </div>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xs lg:text-sm font-bold text-white uppercase tracking-wide">
          {item.event_name}
        </h3>
      </div>
    </Link>
  )
}

export default async function GaleriaPage() {
  const allGallery = await getGallery()

  // Agrupar galerías por categoría (cada item pertenece a una sola categoría: la primera que matchea)
  const usedItemIds = new Set<string>()
  const categorizedGallery = categories.map(category => {
    const items = allGallery.filter(item =>
      !usedItemIds.has(item.id) &&
      category.keywords.some(keyword =>
        item.event_name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.slug.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    items.forEach(item => usedItemIds.add(item.id))
    return { ...category, items }
  }).filter(cat => cat.items.length > 0)

  // Galerías que no coinciden con ninguna categoría
  const uncategorizedGallery = allGallery.filter(item =>
    !categorizedGallery.some(cat => cat.items.includes(item))
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="text-[12px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-4 inline-block"
            >
              ← VOLVER AL INICIO
            </Link>
            <span className="block text-xs sm:text-sm tracking-[.18em] text-white uppercase font-mono mt-8">
              Galería
            </span>
            <h1 className="mt-4 text-5xl lg:text-7xl font-black tracking-[-0.035em] text-white">
              Momentos
            </h1>
          </div>

          {/* Categorized Gallery Sections */}
          {categorizedGallery.length > 0 ? (
            <div className="space-y-16">
              {categorizedGallery.map((category, catIndex) => (
                <section key={catIndex}>
                  <h2 className={`text-2xl lg:text-3xl font-black text-white tracking-[-0.035em] ${category.subtitle ? 'mb-2' : 'mb-8'}`}>
                    {category.title}
                  </h2>
                  {category.subtitle && (
                    <p className="text-sm text-gray-400 mb-8 max-w-3xl">{category.subtitle}</p>
                  )}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-[3px]">
                    {category.items.map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} />
                    ))}
                  </div>
                </section>
              ))}

              {/* Uncategorized items */}
              {uncategorizedGallery.length > 0 && (
                <section>
                  <h2 className="text-2xl lg:text-3xl font-black text-white tracking-[-0.035em] mb-8">
                    Otros momentos
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-[3px]">
                    {uncategorizedGallery.map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="border border-white/[.08] bg-[#111111] px-6 py-12 text-center">
              <p className="text-sm text-gray-400">Todavía no hay galerías publicadas.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
