'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Sponsor } from '@/lib/types'

const defaultSponsors: Sponsor[] = [
  { id: 1, name: 'Speed', logo: null },
  { id: 2, name: 'Pilsen', logo: null },
  { id: 3, name: 'Coca Cola', logo: null },
  { id: 4, name: 'Absolut', logo: null },
  { id: 5, name: 'Red Bull', logo: null },
  { id: 6, name: 'Beats', logo: null },
]

export function PartnersSection({ sponsors }: { sponsors: Sponsor[] }) {
  const displaySponsors = sponsors?.length > 0 ? sponsors : defaultSponsors

  const renderSponsor = (sponsor: Sponsor) => (
    <div className="flex flex-col items-center justify-center gap-4">
      {sponsor.logo ? (
        <div className="relative h-28 w-48 lg:h-36 lg:w-60 opacity-100 hover:opacity-90 transition-opacity">
          <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain brightness-0 invert" />
        </div>
      ) : null}

      <div className="text-white text-lg lg:text-xl font-bold text-center uppercase tracking-[0.25em]">
        {sponsor.name}
      </div>
    </div>
  )

  return (
    <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/[.08]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
