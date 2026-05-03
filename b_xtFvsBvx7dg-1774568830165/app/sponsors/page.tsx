'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

const sponsors = [
  {
    id: 'speed',
    name: 'Speed',
    logo: '/partners/speed.png',
    description: 'Bebida energética oficial de nuestros eventos',
    activations: [
      {
        title: 'Juegos Interactivos',
        description: 'Stands con juegos y retos para ganar premios',
        images: ['/activations/speed-1.jpg', '/activations/speed-2.jpg'],
      },
      {
        title: 'Sampling de Producto',
        description: 'Degustación gratuita en todos nuestros eventos',
        images: ['/activations/speed-3.jpg'],
      },
    ],
  },
  {
    id: 'pilsen',
    name: 'Pilsen',
    logo: '/partners/pilsen.png',
    description: 'Cerveza oficial de ByHormiga',
    activations: [
      {
        title: 'Zonas VIP',
        description: 'Espacios exclusivos con servicio premium',
        images: ['/activations/pilsen-1.jpg'],
      },
    ],
  },
  {
    id: 'coca-cola',
    name: 'Coca Cola',
    logo: '/partners/coca-cola.png',
    description: 'Bebidas oficiales',
    activations: [
      {
        title: 'Photo Booth',
        description: 'Cabinas de fotos personalizadas',
        images: ['/activations/coca-1.jpg'],
      },
    ],
  },
]

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24">
      <div className="max-w-[1600px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
            PARTNERSHIPS
          </span>
          <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
            SPONSORS
          </h1>
          <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Marcas que confían en nosotros para crear experiencias únicas y conectar
            con su audiencia de manera auténtica.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function SponsorCard({ sponsor, index }: { sponsor: typeof sponsors[0]; index: number }) {
  const [showActivations, setShowActivations] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="border border-white/[.08] p-8 lg:p-12"
    >
      {/* Logo placeholder */}
      <div className="h-24 flex items-center justify-center mb-8 border-b border-white/[.08] pb-8">
        <div className="text-4xl font-black text-white uppercase">{sponsor.name}</div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-center mb-8">{sponsor.description}</p>

      {/* Toggle Activations */}
      <button
        onClick={() => setShowActivations(!showActivations)}
        className="w-full border border-white text-white px-6 py-3 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors mb-6"
      >
        {showActivations ? 'OCULTAR SPONSORS' : 'VER SPONSORS'}
      </button>

      {/* Activations */}
      {showActivations && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6 pt-6 border-t border-white/[.08]"
        >
          {sponsor.activations.map((activation, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-lg font-bold text-white uppercase">{activation.title}</h4>
              <p className="text-sm text-gray-400">{activation.description}</p>

              {/* Image placeholders */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {activation.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  >
                    <span className="text-xs text-gray-600 uppercase">Foto {imgIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
                NUESTROS PARTNERS
              </span>
              <h2 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
                MARCAS ALIADAS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
