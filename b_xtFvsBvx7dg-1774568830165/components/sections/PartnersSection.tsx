'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { Sponsor } from '@/lib/types'

// Imágenes de fondo que van rotando
const backgroundImages = [
  '/mock-photos/event-1.jpeg',
  '/mock-photos/event-2.jpeg',
  '/mock-photos/event-3.jpeg',
  '/mock-photos/event-4.jpeg',
  '/mock-photos/event-5.jpg',
]

const defaultSponsors: Sponsor[] = [
  { id: 1, name: 'Absolut', logo: '/sponsors/absolut.png' },
  { id: 2, name: 'Animal', logo: '/sponsors/animal.png' },
  { id: 3, name: 'Axe', logo: '/sponsors/axe.png' },
  { id: 4, name: 'Baly', logo: '/sponsors/baly.png' },
  { id: 5, name: 'Beefeater', logo: '/sponsors/beefeater.png' },
  { id: 6, name: 'Buhero Fernet', logo: '/sponsors/buherofernet.png' },
  { id: 7, name: 'Burger King', logo: '/sponsors/burgerking.png' },
  { id: 8, name: 'Chivas', logo: '/sponsors/chivas.png' },
  { id: 9, name: 'Dr Lemon', logo: '/sponsors/drlemon.png' },
  { id: 10, name: 'Estrella Galicia', logo: '/sponsors/estrellagalicia.png' },
  { id: 11, name: 'James', logo: '/sponsors/james.png' },
  { id: 12, name: 'Johnnie Walker', logo: '/sponsors/johnnie.png' },
  { id: 13, name: 'McDonald\'s', logo: '/sponsors/mc.png' },
  { id: 14, name: 'Planet', logo: '/sponsors/planet.png' },
  { id: 15, name: 'Relajo', logo: '/sponsors/relajo.png' },
  { id: 16, name: 'Santander', logo: '/sponsors/santander.png' },
  { id: 17, name: 'Speed', logo: '/sponsors/speed.png' },
  { id: 18, name: 'Takis', logo: '/sponsors/takis.png' },
  { id: 19, name: 'Topline', logo: '/sponsors/topline.png' },
  { id: 20, name: 'Travel Rock', logo: '/sponsors/travelrock.png' },
]

export function PartnersSection({ sponsors }: { sponsors: Sponsor[] }) {
  const displaySponsors = sponsors?.length > 0 ? sponsors : defaultSponsors
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Cambiar imagen de fondo cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const renderSponsor = (sponsor: Sponsor) => (
    <div className="flex items-center justify-center">
      {sponsor.logo ? (
        <div className="relative h-16 w-40 lg:h-20 lg:w-48 opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 160px, 192px"
          />
        </div>
      ) : (
        <div className="text-white text-sm lg:text-base font-bold text-center uppercase tracking-[0.2em]">
          {sponsor.name}
        </div>
      )}
    </div>
  )

  return (
    <section className="relative bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08] overflow-hidden">
      {/* Background images con baja opacidad que van cambiando */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
                filter: 'grayscale(0.8)',
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/85 via-[#0a0908]/70 to-[#0a0908]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-24"
        >
          <span className="text-sm sm:text-base lg:text-lg tracking-[.25em] text-white uppercase font-mono font-semibold">
            MARCAS QUE CONFIARON EN NOSOTROS
          </span>
        </motion.div>

        {/* Scrolling Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-partners">
            {/* First set */}
            {displaySponsors.map((sponsor, index) => (
              <div
                key={`first-${sponsor.id}-${index}`}
                className="flex-shrink-0 mx-6 lg:mx-8"
              >
                {renderSponsor(sponsor)}
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {displaySponsors.map((sponsor, index) => (
              <div
                key={`second-${sponsor.id}-${index}`}
                className="flex-shrink-0 mx-6 lg:mx-8"
              >
                {renderSponsor(sponsor)}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/sponsors"
				className="inline-flex items-center justify-center border border-white text-white px-8 py-4 text-[12px] font-bold tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
          >
            VER SPONSORS
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll-partners {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-partners {
          animation: scroll-partners 30s linear infinite;
        }

        .animate-scroll-partners:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
