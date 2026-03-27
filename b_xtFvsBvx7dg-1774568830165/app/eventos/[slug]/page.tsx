import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, Clock } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getEventBySlug, getEvents } from '@/lib/api'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return {
      title: 'Evento no encontrado | BYHORMIGA',
    }
  }

  return {
    title: `${event.name} | BYHORMIGA`,
    description: event.description || `${event.name} en ${event.venue}`,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

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
          {/* Back link */}
          <Link
            href="/eventos"
            className="text-[10px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-8 inline-block"
          >
            ← VOLVER A EVENTOS
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-8">
            {/* Left - Event Image Placeholder */}
            <div
              className="aspect-square lg:aspect-[4/5]"
              style={{
                background: 'linear-gradient(135deg, #0a0908 0%, #1a1a1a 50%, #0f0f0f 100%)',
              }}
            />

            {/* Right - Event Details */}
            <div className="flex flex-col justify-center">
              {/* Date */}
              <div className="mb-6">
                <span className="text-6xl lg:text-8xl font-black text-white">{event.day}</span>
                <span className="ml-4 text-xl lg:text-2xl font-bold text-gray-500 uppercase">
                  {event.month} · {event.weekday}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
                {event.name}
              </h1>

              {/* Status badge */}
              <div className="mb-8">
                <span
                  className={`inline-block text-[10px] tracking-[.15em] uppercase px-4 py-2 border ${
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

              {/* Details */}
              <div className="space-y-4 mb-8 border-t border-b border-white/[.08] py-8">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-white">{event.venue}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-white">{event.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-white">23:00 - 06:00</span>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <p className="text-gray-400 leading-relaxed mb-8">{event.description}</p>
              )}

              {/* Price & CTA */}
              <div className="flex items-center gap-8">
                {event.price && (
                  <div>
                    <span className="block text-[10px] tracking-[.2em] text-gray-500 uppercase mb-1">
                      Precio
                    </span>
                    <span className="text-2xl font-bold text-white">{event.price}</span>
                  </div>
                )}

                {event.status === 'en-venta' && (
                  <a
                    href="#"
                    className="flex-1 lg:flex-none bg-white text-[#0a0908] px-12 py-4 text-[11px] font-bold tracking-[.15em] uppercase text-center hover:bg-white/90 transition-colors"
                  >
                    COMPRAR ENTRADAS
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
