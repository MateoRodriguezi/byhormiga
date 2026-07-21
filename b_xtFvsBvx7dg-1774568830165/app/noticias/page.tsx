import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { getPosts } from '@/lib/api'
import type { Post } from '@/lib/types'

function NewsCard({ news }: { news: Post }) {
  return (
    <article className="group border border-white/[.08] overflow-hidden hover:border-white/20 transition-all">
      <Link href={`/noticias/${news.slug}`} className="block">
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
            <Calendar className="w-3 h-3" />
            <span>{news.date}</span>
          </div>

          <h3 className="text-xl lg:text-2xl font-black text-white tracking-[-0.035em] mb-4 leading-tight group-hover:text-white/80 transition-colors">
            {news.title}
          </h3>

          {news.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{news.description}</p>
          )}

			<span className="inline-flex items-center text-[12px] font-bold tracking-[.2em] uppercase text-white transition-colors group-hover:text-white/60">
            LEER MÁS →
          </span>
        </div>
      </Link>
    </article>
  )
}

export default async function NoticiasPage() {
  const posts = await getPosts()

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-[60vh] bg-[#0a0908] flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24">
          <div className="max-w-[1600px] mx-auto w-full text-center">
            <div>
              <span className="text-xs sm:text-sm tracking-[.18em] text-white uppercase font-mono">
                ACTUALIDAD
              </span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-black tracking-[-0.035em] text-white">
                Noticias
              </h1>
              <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Las últimas novedades, anuncios y logros de ByHormiga
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0908] py-20 lg:py-32 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {posts.map((news) => (
                <NewsCard key={news.slug} news={news} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
