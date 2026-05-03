'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, MapPin } from 'lucide-react'

const featuredEvents = [
  {
    id: 'china',
    name: 'CHINA',
    venue: 'Cine Universitario',
    date: 'Sábado 15 JUN',
    image: '/events/china.jpg',
    status: 'EN VENTA',
    description: 'La fiesta más esperada del año. Una experiencia única que combina música, arte y cultura.',
  },
  {
    id: 'caserio',
    name: 'CASERÍO',
    venue: 'La Trastienda',
    date: 'Viernes 28 JUN',
    image: '/events/caserio.jpg',
    status: 'EN VENTA',
    description: 'Underground session con los mejores DJs de la escena local e internacional.',
  },
  {
    id: 'maldonado',
    name: 'MALDONADO',
    venue: 'Beach Club',
    date: 'Sábado 13 JUL',
    image: '/events/maldonado.jpg',
    status: 'PRÓXIMAMENTE',
    description: 'Festival de verano en la costa. Música, playa y buena onda.',
  },
]

function EventCard({ event, index }: { event: typeof featuredEvents[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative aspect-[3/4] overflow-hidden"
    >
      {/* Background gradient (placeholder for image) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(${index * 30}, ${index * 20}, ${index * 40}, 0.3), rgba(0, 0, 0, 0.8))`,
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3 }}
          className="absolute top-6 right-6"
        >
          <span
            className={`text-[9px] tracking-[.2em] uppercase px-3 py-1.5 border ${
              event.status === 'EN VENTA'
                ? 'border-white text-white bg-white/10 backdrop-blur-sm'
                : 'border-gray-600 text-gray-400 bg-gray-900/50 backdrop-blur-sm'
            }`}
          >
            {event.status}
          </span>
        </motion.div>

        {/* Event name - Large */}
        <h3 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4 transform group-hover:translate-y-[-8px] transition-transform duration-500">
          {event.name}
        </h3>

        {/* Description - Hidden by default, shown on hover */}
        <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden mb-4">
          <p className="text-sm text-gray-300 leading-relaxed">{event.description}</p>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-6 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.venue}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/eventos/${event.id}`}
          className="inline-flex items-center justify-center bg-white text-[#0a0908] px-6 py-3 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-white/90 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100"
        >
          {event.status === 'EN VENTA' ? 'COMPRAR ENTRADAS' : 'MÁS INFO'}
        </Link>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
    </motion.div>
  )
}

export function FeaturedEventsSection() {
  return (
    <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
            DESTACADOS
          </span>
          <h2 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
            PRÓXIMAS EXPERIENCIAS
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
