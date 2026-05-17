'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Placeholder gradients hasta que se agreguen imágenes reales
const backgroundGradients = [
  'linear-gradient(135deg, #1a1a1a 0%, #0a0908 50%, #1a1a1a 100%)',
  'linear-gradient(225deg, #0f0f0f 0%, #0a0908 50%, #1f1f1f 100%)',
  'linear-gradient(315deg, #171717 0%, #0a0908 50%, #141414 100%)',
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Cambiar imagen de fondo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundGradients.length)
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
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0"
              style={{
                background: backgroundGradients[currentBgIndex],
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/80 via-[#0a0908]/60 to-[#0a0908]" />
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

        {/* Intro con texto destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20 lg:mb-32"
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed text-center">
            ByHormiga nació en 1996 con una misión clara:{' '}
            <span className="text-white font-bold">
              crear momentos únicos que las personas recordarán para siempre.
            </span>{' '}
            Lo que comenzó como una pequeña productora de eventos se ha convertido en la empresa
            líder de entretenimiento en Uruguay.
          </p>
        </motion.div>

        {/* Section 1: Blending the Physical & Digital - Image Left, Text Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
          >
            {/* Placeholder - reemplazar con imagen real */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="text-6xl font-black text-white">01</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
              Blending the Physical & Digital
            </h3>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
              Reunimos lo físico y lo digital para crear experiencias inmersivas que conectan con las personas. Cada detalle cuenta, desde la iluminación hasta el diseño sonoro, creando momentos que resuenan en el corazón de quienes los viven.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-20 lg:mb-32 text-center"
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

        {/* Section 2: Creativity Meets Technology - Image Right, Text Left */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6 lg:order-1"
          >
            <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
              Creativity Meets Technology
            </h3>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
              Sabemos que la creatividad y la tecnología trabajan juntas. Cada proyecto es una oportunidad para innovar, experimentar con nuevas ideas y llevar los límites de lo posible a nuevos horizontes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-gradient-to-br from-gray-800 via-black to-gray-900 lg:order-2"
          >
            {/* Placeholder - reemplazar con imagen real */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="text-6xl font-black text-white">02</span>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Philosophy - Image Left, Text Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800"
          >
            {/* Placeholder - reemplazar con imagen real */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="text-6xl font-black text-white">03</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="space-y-6"
          >
            <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
              Pushing the Boundaries of Innovation
            </h3>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
              Nuestra filosofía es simple: cada evento es una oportunidad para crear algo
              extraordinario.{' '}
              <span className="text-white font-bold">
                Combinamos creatividad, tecnología y pasión
              </span>{' '}
              para entregar experiencias que superan las expectativas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
