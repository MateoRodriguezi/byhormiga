'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { GalleryItem } from '@/lib/types'

interface GallerySectionProps {
  items: GalleryItem[]
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
    >
      <div>
        <span className="text-[9px] sm:text-[10px] tracking-[.2em] sm:tracking-[.25em] text-gray-500 uppercase font-mono">
          02 — GALERÍA
        </span>
        <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
          MOMENTOS
        </h2>
      </div>
    </motion.div>
  )
}

function GalleryCell({ item, index }: { item: GalleryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Determine grid span classes based on item position
  const getGridClasses = () => {
    if (index === 0) return 'col-span-2 row-span-2 lg:col-span-5 lg:row-span-2'
    if (index === 1) return 'col-span-1 lg:col-span-4'
    if (index === 2) return 'col-span-1 lg:col-span-3'
    if (index === 3) return 'col-span-1 lg:col-span-4'
    return 'col-span-1 lg:col-span-3'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden group cursor-pointer ${getGridClasses()}`}
      style={{ minHeight: index === 0 ? '400px' : '200px' }}
    >
      {/* Abstract dark gradient placeholder */}
      <div
        className="absolute inset-0 transition-all duration-500 grayscale-[0.5] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-[1.04]"
        style={{
          background: `linear-gradient(${135 + index * 30}deg, #0a0908 0%, #1a1a1a ${30 + index * 10}%, #0f0f0f 100%)`,
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-sm font-bold text-white uppercase tracking-wide">{item.event_name}</h3>
        <p className="mt-1 text-[10px] tracking-[.2em] text-gray-400 uppercase">{item.date}</p>
      </div>
    </motion.div>
  )
}

export function GallerySection({ items }: GallerySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="galeria" className="bg-[#111111] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <SectionHeader />

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-[3px]">
          {items.map((item, index) => (
            <GalleryCell key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <Link
            href="/galeria"
            className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-[10px] font-bold tracking-[.2em] uppercase hover:bg-white hover:text-[#0a0908] transition-colors"
          >
            VER GALERÍA COMPLETA
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
