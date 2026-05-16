import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getGalleryCoverImage } from '@/lib/gallery'
import { getGallery } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Galería | BYHORMIGA',
  description: 'Momentos capturados en los eventos de BYHORMIGA.',
}

export default async function GaleriaPage() {
  const gallery = await getGallery()

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
            <span className="block text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono mt-8">
              ARCHIVO VISUAL
            </span>
            <h1 className="mt-4 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
              GALERÍA
            </h1>
          </div>

          {/* Gallery Grid */}
          {gallery.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[3px]">
              {gallery.map((item, index) => (
              <Link
                key={item.id}
                href={`/galeria/${item.slug}`}
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xs lg:text-sm font-bold text-white uppercase tracking-wide">
                    {item.event_name}
                  </h3>
					<p className="mt-1 text-[10px] lg:text-[12px] tracking-[.2em] text-gray-400 uppercase">
                    {item.date}
                  </p>
                </div>
              </Link>
              ))}
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
