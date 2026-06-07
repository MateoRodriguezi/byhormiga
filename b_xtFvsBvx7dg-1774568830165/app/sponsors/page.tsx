'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Sponsor } from '@/lib/types'

const defaultSponsors: Sponsor[] = [
  { id: 1, name: 'Absolut', logo: '/sponsors/absolut.png' },
  { id: 2, name: 'Animal', logo: '/sponsors/animal.png' },
  { id: 3, name: 'AXE', logo: '/sponsors/axe.png' },
  { id: 4, name: 'Baly', logo: '/sponsors/baly.png' },
  { id: 5, name: 'Beefeater', logo: '/sponsors/beefeater.png' },
  { id: 6, name: 'Buhero Fernet', logo: '/sponsors/buherofernet.png' },
  { id: 7, name: 'Burger King', logo: '/sponsors/burgerking.png' },
  { id: 8, name: 'Chivas', logo: '/sponsors/chivas.png' },
  { id: 9, name: 'Dr Lemon', logo: '/sponsors/drlemon.png' },
  { id: 10, name: 'Estrella Galicia', logo: '/sponsors/estrellagalicia.png' },
  { id: 11, name: 'Jameson', logo: '/sponsors/james.png' },
  { id: 12, name: 'Johnnie Walker', logo: '/sponsors/johnnie.png' },
  { id: 13, name: 'McDonald\'s', logo: '/sponsors/mc.png' },
  { id: 14, name: 'Planet 01', logo: '/sponsors/planet.png' },
  { id: 15, name: 'Relajo', logo: '/sponsors/relajo.png' },
  { id: 16, name: 'Santander', logo: '/sponsors/santander.png' },
  { id: 17, name: 'Speed', logo: '/sponsors/speed.png' },
  { id: 18, name: 'Takis', logo: '/sponsors/takis.png' },
  { id: 19, name: 'Topline', logo: '/sponsors/topline.png' },
  { id: 20, name: 'Travel Rock', logo: '/sponsors/travelrock.png' },
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
          <div className="text-4xl font-black text-white uppercase">{sponsor.name}</div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-center mb-8">Partner oficial de BYHORMIGA</p>

      {sponsor.website_url && (
        <Link
          href={sponsor.website_url}
          target="_blank"
          rel="noreferrer"
			className="w-full inline-flex items-center justify-center border border-white text-white px-6 py-3 text-[12px] font-bold tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
        >
          VER SITIO
        </Link>
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
              <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
                SPONSORS
              </h1>
              <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Marcas que confían en nosotros para crear experiencias únicas y conectar
                con su audiencia de manera auténtica.
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
