'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { Post } from '@/lib/types'

interface PressSectionProps {
  posts: Post[]
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
          03 — PRENSA
        </span>
        <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase">
          NOTICIAS
        </h2>
      </div>
      <Link
        href="/prensa"
        className="text-[10px] tracking-[.2em] text-white/60 uppercase hover:text-white transition-colors group"
      >
        Ver todas{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  )
}

function ArticleCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative p-4 sm:p-6 lg:p-8 hover:bg-[#111111] transition-colors"
    >
      {/* Top border reveal animation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      {/* Index number */}
      <span className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 text-[9px] sm:text-[10px] tracking-[.15em] sm:tracking-[.2em] text-gray-800 font-mono">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Date */}
      <time className="block text-[9px] sm:text-[10px] tracking-[.15em] sm:tracking-[.2em] text-gray-500 uppercase mb-3 sm:mb-4">
        {post.date}
      </time>

      {/* Title */}
      <h3 className="text-sm sm:text-[17px] font-bold text-white uppercase tracking-wide leading-tight mb-3 sm:mb-4 pr-6 sm:pr-8">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mb-4 sm:mb-6">
        {post.excerpt}
      </p>

      {/* Read more link */}
      <Link
        href={`/prensa/${post.slug}`}
        className="inline-flex items-center gap-2 text-[10px] tracking-[.2em] text-white uppercase group/link"
      >
        LEER NOTA
        <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
      </Link>
    </motion.article>
  )
}

export function PressSection({ posts }: PressSectionProps) {
  return (
    <section id="prensa" className="bg-[#0a0908] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <SectionHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/[.08]">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`${index < posts.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-white/[.08]' : ''}`}
            >
              <ArticleCard post={post} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
