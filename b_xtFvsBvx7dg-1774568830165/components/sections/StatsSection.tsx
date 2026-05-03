'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItemProps {
  value: string
  label: string
  description: string
  isNumber?: boolean
}

function StatItem({ value, label, description, isNumber = true }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(isNumber ? '0' : value)

  useEffect(() => {
    if (!isInView || !isNumber) return

    const numericValue = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/\d/g, '')
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(numericValue * eased)
      setDisplayValue(`${currentValue}${suffix}`)

      if (currentStep >= steps) {
        clearInterval(interval)
        setDisplayValue(value)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isInView, value, isNumber])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
        {displayValue}
      </div>
      <div className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-bold tracking-[.15em] sm:tracking-[.2em] text-white uppercase">
        {label}
      </div>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  )
}

export function StatsSection() {
  const stats = [
    {
      value: '50+',
      label: 'Eventos Mensuales',
      description: 'Organizamos más de 50 eventos cada mes en todo Uruguay.',
      isNumber: true,
    },
    {
      value: '200+',
      label: 'Artistas',
      description: 'Hemos trabajado con más de 200 artistas nacionales e internacionales.',
      isNumber: true,
    },
    {
      value: '500+',
      label: 'Fiestas Producidas',
      description: 'Más de 500 fiestas producidas en 30 años de trayectoria.',
      isNumber: true,
    },
  ]

  return (
    <section className="bg-[#0a0908] py-12 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
            NUESTROS NÚMEROS
          </span>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${index < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/[.08] pb-8 md:pb-0' : ''}`}
            >
              <StatItem {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
