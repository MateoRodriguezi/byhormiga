'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const featuredNews = [
  {
    id: 1,
    title: 'BYHORMIGA CELEBRA 30 AÑOS TRANSFORMANDO LA ESCENA DE EVENTOS EN URUGUAY',
    excerpt: 'Tres décadas de experiencias inolvidables que han marcado la cultura del entretenimiento nacional.',
    date: '15 ABR 2026',
    category: 'ANIVERSARIO',
    image: '/news/30-years.jpg',
  },
  {
    id: 2,
    title: 'NUEVA ALIANZA CON LOS VENUES MÁS IMPORTANTES DE MONTEVIDEO',
    excerpt: 'Acuerdos estratégicos que prometen elevar la calidad de producción de eventos en la capital.',
    date: '08 ABR 2026',
    category: 'PARTNERSHIPS',
    image: '/news/venues.jpg',
  },
  {
    id: 3,
    title: 'RÉCORD HISTÓRICO: MÁS DE 2000 PERSONAS EN HORMIGA NEGRA X',
    excerpt: 'La décima edición del evento icónico superó todas las expectativas con un sold out absoluto.',
    date: '01 ABR 2026',
    category: 'EVENTOS',
    image: '/news/hormiga-x.jpg',
  },
  {
    id: 4,
    title: 'EXPANSIÓN REGIONAL: BYHORMIGA LLEGA A ARGENTINA Y BRASIL',
    excerpt: 'Nuevos mercados se suman a la visión de crear experiencias inolvidables en toda Latinoamérica.',
    date: '22 MAR 2026',
    category: 'EXPANSIÓN',
    image: '/news/expansion.jpg',
  },
]

function NewsCard({ news, index }: { news: typeof featuredNews[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group border border-white/[.08] overflow-hidden hover:border-white/20 transition-all"
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] tracking-[.2em] uppercase text-white/60 border border-white/20 px-3 py-1">
            {news.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
          <Calendar className="w-3 h-3" />
          <span>{news.date}</span>
        </div>

        <h3 className="text-xl lg:text-2xl font-black text-white uppercase mb-4 leading-tight group-hover:text-white/80 transition-colors">
          {news.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">{news.excerpt}</p>

        <Link
          href={`/noticias/${news.id}`}
          className="inline-flex items-center text-[10px] font-bold tracking-[.2em] uppercase text-white hover:text-white/60 transition-colors"
        >
          LEER MÁS →
        </Link>
      </div>
    </motion.article>
  )
}

export default function NoticiasPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-[60vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24">
          <div className="max-w-[1600px] mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono">
                ACTUALIDAD
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
                NOTICIAS
              </h1>
              <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Las últimas novedades, anuncios y logros de ByHormiga
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {featuredNews.map((news, index) => (
                <NewsCard key={news.id} news={news} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
