'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
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
        <span className="text-[9px] sm:text-[10px] tracking-[.2em] sm:tracking-[.25em] text-gray-500 uppercase font-mono">
          01 — AGENDA
        </span>
        <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
          PRÓXIMOS EVENTOS
        </h2>
      </div>
      <Link
        href="/eventos"
        className="text-[10px] tracking-[.2em] text-white/60 uppercase hover:text-white transition-colors group"
      >
        Ver todos{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  )
}

function EventRow({ event, index }: { event: Event; index: number }) {
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
      className="group relative border-b border-white/[.08] hover:bg-white/[.025] transition-colors"
    >
      {/* Hover accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300" />

      <div className="flex flex-col lg:flex-row lg:items-center py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8 gap-3 sm:gap-4 lg:gap-0">
        {/* Date Column */}
        <div className="w-full lg:w-[100px] shrink-0">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">{event.day}</div>
          <div className="text-[9px] sm:text-[10px] tracking-[.15em] sm:tracking-[.2em] text-gray-500 uppercase">
            {event.month} · {event.weekday}
          </div>
        </div>

        {/* Event Info - Flex grow */}
        <div className="flex-1 lg:pl-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white uppercase tracking-wide">
              {event.name}
            </h3>
            {event.featured && (
              <span className="text-[8px] tracking-[.2em] text-white/40 uppercase border border-white/20 px-2 py-0.5">
                FEATURED
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span className="text-xs tracking-wide">{event.venue}</span>
          </div>
        </div>

        {/* Status - Hidden on mobile */}
        <div className="hidden lg:block w-[140px] shrink-0">
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
        <div className="flex items-center gap-4 lg:gap-6 lg:w-[180px] shrink-0 lg:justify-end">
          {event.price && (
            <span className="text-sm text-gray-400">{event.price}</span>
          )}
          {event.status === 'en-venta' ? (
            <Link
              href={`/eventos/${event.slug}`}
              className="bg-white text-[#0a0908] px-5 py-2.5 text-[10px] font-bold tracking-[.15em] uppercase hover:bg-white/90 transition-colors"
            >
              COMPRAR
            </Link>
          ) : event.status === 'agotado' ? (
            <span className="text-[10px] tracking-[.15em] text-gray-600 uppercase lg:hidden">
              AGOTADO
            </span>
          ) : (
            <span className="text-[10px] tracking-[.15em] text-gray-600 uppercase">
              PRÓXIMAMENTE
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
        <div className="border-t border-white/[.08]">
          {events.map((event, index) => (
            <EventRow key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
