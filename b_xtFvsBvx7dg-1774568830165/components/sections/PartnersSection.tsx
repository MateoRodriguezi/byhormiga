'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const partners = [
  { name: 'Speed', logo: '/partners/speed.png' },
  { name: 'Pilsen', logo: '/partners/pilsen.png' },
  { name: 'Coca Cola', logo: '/partners/coca-cola.png' },
  { name: 'Absolut', logo: '/partners/absolut.png' },
  { name: 'Red Bull', logo: '/partners/redbull.png' },
  { name: 'Beats', logo: '/partners/beats.png' },
]

export function PartnersSection() {
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
          <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
            MARCAS QUE CONFIARON EN NOSOTROS
          </span>
        </motion.div>

        {/* Scrolling Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-partners">
            {/* First set */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 lg:mx-12 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                  <div className="text-white/40 hover:text-white transition-colors text-2xl font-bold">
                    {partner.name}
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 lg:mx-12 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                  <div className="text-white/40 hover:text-white transition-colors text-2xl font-bold">
                    {partner.name}
                  </div>
                </div>
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
            className="inline-flex items-center justify-center border border-white text-white px-8 py-4 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
          >
            VER ACTIVACIONES
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
