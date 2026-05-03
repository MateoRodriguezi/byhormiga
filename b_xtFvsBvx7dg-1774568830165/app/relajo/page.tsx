'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export default function RelajoPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-screen bg-[#0a0908] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 pt-24 pb-20">
          <div className="max-w-[1200px] mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
                RELAJO
              </span>
              <h1 className="mt-6 text-6xl lg:text-8xl font-black tracking-tight text-white uppercase">
                BUZOS<br />PERSONALIZADOS
              </h1>
              <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Buzos de egresados y buzos personalizados para cualquier ocasión.
                Diseño, calidad y estilo único.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-16">
                <div className="border border-white/[.08] p-8">
                  <div className="text-4xl font-black text-white mb-4">01</div>
                  <h3 className="text-lg font-bold text-white uppercase mb-3">Buzos de Egresados</h3>
                  <p className="text-sm text-gray-400">Diseños únicos para tu generación</p>
                </div>
                <div className="border border-white/[.08] p-8">
                  <div className="text-4xl font-black text-white mb-4">02</div>
                  <h3 className="text-lg font-bold text-white uppercase mb-3">Buzos Personalizados</h3>
                  <p className="text-sm text-gray-400">Para empresas, eventos y más</p>
                </div>
                <div className="border border-white/[.08] p-8">
                  <div className="text-4xl font-black text-white mb-4">03</div>
                  <h3 className="text-lg font-bold text-white uppercase mb-3">Calidad Premium</h3>
                  <p className="text-sm text-gray-400">Los mejores materiales</p>
                </div>
              </div>

              {/* CTA to external site */}
              <Link
                href="https://www.relajoperoconorden.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#0a0908] px-12 py-5 text-[11px] font-bold tracking-[.2em] uppercase hover:bg-white/90 transition-colors"
              >
                VISITAR SITIO WEB
                <ExternalLink className="w-4 h-4" />
              </Link>

              <p className="mt-6 text-xs text-gray-500">
                Te redirigiremos a relajoperoconorden.com
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
