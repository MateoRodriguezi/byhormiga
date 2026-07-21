'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar } from 'lucide-react'
import type { Event } from '@/lib/types'

interface EventsSectionProps {
  events: Event[]
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
    >
      <div>
        <span className="text-sm sm:text-base tracking-[.2em] sm:tracking-[.25em] text-gray-400 uppercase font-mono">
          AGENDA
        </span>
        <h2 className="font-heading mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter text-white">
          Próximos eventos
        </h2>
      </div>
      <Link
        href="/eventos"
        className="text-sm tracking-[.2em] text-gray-400 uppercase hover:text-white transition-colors group inline-flex items-center gap-2"
      >
        VER TODOS{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  )
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const statusLabels: Record<string, string> = {
    'en-venta': 'EN VENTA',
    'agotado': 'AGOTADO',
    'proximamente': 'PRÓXIMAMENTE',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#111111] border border-white/[.08] hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-white/10" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

        {/* Date badge */}
        {event.day && event.month && (
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 text-center min-w-[70px]">
            <div className="text-2xl font-black text-white leading-none">{event.day}</div>
            <div className="text-[10px] tracking-[.2em] text-gray-300 uppercase mt-1">{event.month}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Event Name */}
        <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors">
          {event.name}
        </h3>

        {/* Venue */}
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm tracking-wide line-clamp-1">{event.venue}</span>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[.08]">
          {/* Price */}
          {event.price && (
            <span className="text-sm text-gray-400 font-medium">{event.price}</span>
          )}

          {/* CTA */}
          {event.status === 'en-venta' ? (
            <Link
              href={`/eventos/${event.slug}`}
              className="bg-white text-black px-5 py-2.5 text-[11px] font-bold tracking-[.15em] uppercase hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              COMPRAR
            </Link>
          ) : (
            <span
              className={`text-[11px] tracking-[.15em] uppercase px-4 py-2 border ${
                event.status === 'agotado'
                  ? 'border-gray-700 text-gray-600'
                  : 'border-gray-700 text-gray-500'
              }`}
            >
              {statusLabels[event.status]}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="eventos" className="bg-[#0a0908] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <SectionHeader />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={event.slug} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
