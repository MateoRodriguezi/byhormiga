import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getEvents } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Eventos | BYHORMIGA',
  description: 'Próximas fiestas y eventos de BYHORMIGA en Montevideo.',
}

export default async function EventosPage() {
  const events = await getEvents()

  const statusLabels: Record<string, string> = {
    'en-venta': 'EN VENTA',
    'agotado': 'AGOTADO',
    'proximamente': 'PRÓXIMAMENTE',
  }

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
              AGENDA COMPLETA
            </span>
            <h1 className="mt-4 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
              EVENTOS
            </h1>
          </div>

          {/* Events List */}
          <div className="border-t border-white/[.08]">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative border-b border-white/[.08] hover:bg-white/[.025] transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300" />

                <div className="flex flex-col lg:flex-row lg:items-center py-8 lg:py-10 px-4 lg:px-8 gap-4 lg:gap-0">
                  {/* Date Column */}
                  <div className="w-full lg:w-[120px] shrink-0">
                    <div className="text-4xl lg:text-5xl font-black text-white">{event.day}</div>
                    <div className="text-[10px] tracking-[.2em] text-gray-500 uppercase">
                      {event.month} · {event.weekday}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 lg:pl-8">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-wide">
                        {event.name}
                      </h2>
                      {event.featured && (
                        <span className="text-[8px] tracking-[.2em] text-white/40 uppercase border border-white/20 px-2 py-0.5">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs tracking-wide">{event.venue}</span>
                    </div>
                    {event.description && (
                      <p className="mt-3 text-sm text-gray-500 max-w-xl">{event.description}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="lg:w-[140px] shrink-0">
                    <span
                      className={`inline-block text-[10px] tracking-[.15em] uppercase px-3 py-1.5 border ${
                        event.status === 'en-venta'
                          ? 'border-white text-white'
                          : event.status === 'agotado'
                          ? 'border-gray-600 text-gray-500'
                          : 'border-gray-700 text-gray-600'
                      }`}
                    >
                      {statusLabels[event.status]}
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center gap-6 lg:w-[200px] shrink-0 lg:justify-end">
                    {event.price && (
                      <span className="text-sm text-gray-400">{event.price}</span>
                    )}
                    {event.status === 'en-venta' && (
                      <Link
                        href={`/eventos/${event.slug}`}
                        className="bg-white text-[#0a0908] px-6 py-3 text-[10px] font-bold tracking-[.15em] uppercase hover:bg-white/90 transition-colors"
                      >
                        COMPRAR
                      </Link>
                    )}
                  </div>
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
