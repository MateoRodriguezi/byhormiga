'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Imágenes de fondo que van rotando
const backgroundImages = [
  '/mock-photos/event-1.jpeg',
  '/mock-photos/event-2.jpeg',
  '/mock-photos/event-3.jpeg',
  '/mock-photos/event-4.jpeg',
  '/mock-photos/event-5.jpg',
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Cambiar imagen de fondo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="nosotros" className="relative bg-[#0a0908] py-16 sm:py-24 lg:py-32 overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
            Quienes Somos
          </h2>
        </motion.div>

        {/* Section 1: Estadísticas - Image Left, Text Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
          >
            {/* Placeholder - reemplazar con imagen real */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="text-6xl font-black text-white">500+</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Hemos producido más de{' '}
              <span className="text-white font-bold text-2xl lg:text-3xl">500 eventos</span>,
              trabajado con más de{' '}
              <span className="text-white font-bold text-2xl lg:text-3xl">200 artistas</span>{' '}
              nacionales e internacionales, y creando{' '}
              <span className="text-white font-bold">experiencias para miles de personas</span> que
              confían en nosotros para los momentos más importantes de sus vidas.
            </p>
          </motion.div>
        </div>

        {/* Section 2: Filosofía - Text Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 lg:order-1"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Nuestra filosofía es simple: cada evento es una oportunidad para crear algo
              extraordinario.{' '}
              <span className="text-white font-bold">
                Combinamos creatividad, tecnología y pasión
              </span>{' '}
              para entregar experiencias que superan las expectativas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800 via-black to-gray-900 lg:order-2"
          >
            {/* Placeholder - reemplazar con imagen real */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="text-6xl font-black text-white">∞</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
