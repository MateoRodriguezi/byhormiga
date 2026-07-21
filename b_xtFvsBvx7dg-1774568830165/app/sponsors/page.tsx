'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Sponsor } from '@/lib/types'

const defaultSponsors: Sponsor[] = [
  { id: 1, name: 'Absolut', logo: '/sponsors/absolut.png', website_url: 'https://www.absolut.com' },
  { id: 2, name: 'Animal', logo: '/sponsors/animal.png', website_url: 'https://www.instagram.com/animal.uy' },
  { id: 3, name: 'AXE', logo: '/sponsors/axe.png', website_url: 'https://www.axe.com' },
  { id: 4, name: 'Baly', logo: '/sponsors/baly.png', website_url: 'https://www.baly.com.uy' },
  { id: 5, name: 'Beefeater', logo: '/sponsors/beefeater.png', website_url: 'https://www.beefeatergin.com' },
  { id: 6, name: 'Buhero Fernet', logo: '/sponsors/buherofernet.png', website_url: 'https://www.instagram.com/buherofernet' },
  { id: 7, name: 'Burger King', logo: '/sponsors/burgerking.png', website_url: 'https://www.burgerking.com.uy' },
  { id: 8, name: 'Chivas', logo: '/sponsors/chivas.png', website_url: 'https://www.chivas.com' },
  { id: 9, name: 'Dr Lemon', logo: '/sponsors/drlemon.png', website_url: 'https://www.instagram.com/drlemon.uy' },
  { id: 10, name: 'Estrella Galicia', logo: '/sponsors/estrellagalicia.png', website_url: 'https://www.estrellagalicia.es' },
  { id: 11, name: 'Jameson', logo: '/sponsors/james.png', website_url: 'https://www.jamesonwhiskey.com' },
  { id: 12, name: 'Johnnie Walker', logo: '/sponsors/johnnie.png', website_url: 'https://www.johnniewalker.com' },
  { id: 13, name: 'McDonald\'s', logo: '/sponsors/mc.png', website_url: 'https://www.mcdonalds.com.uy' },
  { id: 14, name: 'Planet 01', logo: '/sponsors/planet.png', website_url: 'https://www.instagram.com/planet01.uy' },
  { id: 15, name: 'Relajo', logo: '/sponsors/relajo.png', website_url: 'https://www.instagram.com/relajo.uy' },
  { id: 16, name: 'Santander', logo: '/sponsors/santander.png', website_url: 'https://www.santander.com.uy' },
  { id: 17, name: 'Speed', logo: '/sponsors/speed.png', website_url: 'https://www.speed.com.uy' },
  { id: 18, name: 'Takis', logo: '/sponsors/takis.png', website_url: 'https://www.takis.com' },
  { id: 19, name: 'Topline', logo: '/sponsors/topline.png', website_url: 'https://www.instagram.com/topline.uy' },
  { id: 20, name: 'Travel Rock', logo: '/sponsors/travelrock.png', website_url: 'https://www.travelrock.com.uy' },
]

function SponsorCard({ sponsor, index }: { sponsor: Sponsor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="border border-white/[.08] p-8 lg:p-12"
    >
      {/* Logo */}
      <div className="h-24 flex items-center justify-center mb-8 border-b border-white/[.08] pb-8">
        {sponsor.logo ? (
          <div className="relative h-16 w-44">
            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
          </div>
        ) : (
          <div className="text-4xl font-black text-white tracking-[-0.035em]">{sponsor.name}</div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-center">Partner oficial de BYHORMIGA</p>

      {/* Activaciones de marca */}
      {sponsor.activations && sponsor.activations.length > 0 && (
        <div className="mt-8 pt-8 border-t border-white/[.08] space-y-6">
          {sponsor.activations.map((activation, i) => (
            <div key={i}>
              {activation.images && activation.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {activation.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative aspect-square overflow-hidden">
                      <Image src={image} alt={activation.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm font-bold text-white uppercase tracking-wide mb-1">{activation.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{activation.description}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function SponsorsPage() {
  const sponsors = defaultSponsors

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#0a0908] py-32 lg:py-40 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <span className="text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono">
                MARCAS ALIADAS
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-[-0.035em] text-white">
                Marcas que eligen experiencias auténticas
              </h1>
            </motion.div>

            {/* Video general + texto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 lg:mb-32"
            >
              <video autoPlay loop muted playsInline className="w-full aspect-video object-cover">
                <source src="/videos/hero-background.mp4" type="video/mp4" />
              </video>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                Desarrollamos acciones de marca que reflejan la esencia de cada sponsor y elevan la experiencia del evento.
              </p>
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
