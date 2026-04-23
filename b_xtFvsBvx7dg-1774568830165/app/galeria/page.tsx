import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getGallery } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Galería | BYHORMIGA',
  description: 'Momentos capturados en los eventos de BYHORMIGA.',
}

export default async function GaleriaPage() {
  const gallery = await getGallery()

  // Extended gallery for full page
  const extendedGallery = [
    ...gallery,
    {
      id: '6',
      event_name: 'HORMIGA NEGRA VII',
      date: 'OCT 2025',
      image: '/gallery/event-6.jpg',
      photos: [],
    },
    {
      id: '7',
      event_name: 'SUBTERRANEA VOL.2',
      date: 'SEP 2025',
      image: '/gallery/event-7.jpg',
      photos: [],
    },
    {
      id: '8',
      event_name: 'OPEN AIR PRIMAVERA',
      date: 'AGO 2025',
      image: '/gallery/event-8.jpg',
      photos: [],
    },
    {
      id: '9',
      event_name: 'ANIVERSARIO 29',
      date: 'JUN 2025',
      image: '/gallery/event-9.jpg',
      photos: [],
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="text-[10px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-4 inline-block"
            >
              ← VOLVER AL INICIO
            </Link>
            <span className="block text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono mt-8">
              ARCHIVO VISUAL
            </span>
            <h1 className="mt-4 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
              GALERÍA
            </h1>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[3px]">
            {extendedGallery.map((item, index) => (
              <div
                key={item.id}
                className={`relative overflow-hidden group cursor-pointer ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                style={{ minHeight: index === 0 ? '400px' : '200px' }}
              >
                {/* Abstract dark gradient placeholder */}
                <div
                  className="absolute inset-0 transition-all duration-500 grayscale-[0.5] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-[1.04]"
                  style={{
                    background: `linear-gradient(${135 + index * 25}deg, #0a0908 0%, #1a1a1a ${
                      25 + index * 8
                    }%, #0f0f0f 100%)`,
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xs lg:text-sm font-bold text-white uppercase tracking-wide">
                    {item.event_name}
                  </h3>
                  <p className="mt-1 text-[9px] lg:text-[10px] tracking-[.2em] text-gray-400 uppercase">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
