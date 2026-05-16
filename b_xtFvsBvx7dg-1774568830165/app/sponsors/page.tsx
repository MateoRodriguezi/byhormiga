'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSponsors } from '@/lib/api'
import type { Sponsor } from '@/lib/types'

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24">
      <div className="max-w-[1600px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono">
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
  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  useEffect(() => {
    let active = true

    getSponsors()
      .then((data) => {
        if (active) {
          setSponsors(data)
        }
      })
      .catch((error) => {
        console.error('Sponsors API failed:', error)
      })

    return () => {
      active = false
    }
  }, [])

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
              <span className="text-xs sm:text-sm tracking-[.25em] text-white uppercase font-mono">
                NUESTROS PARTNERS
              </span>
              <h2 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
                MARCAS ALIADAS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.length === 0 && (
                <div className="md:col-span-2 lg:col-span-3 border border-white/[.08] p-8 text-center text-gray-500 uppercase tracking-[.15em] text-xs">
                  No hay sponsors disponibles por el momento
                </div>
              )}
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
