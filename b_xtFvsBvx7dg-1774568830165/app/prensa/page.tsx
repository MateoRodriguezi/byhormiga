import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getPosts } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Prensa | BYHORMIGA',
  description: 'Noticias y novedades de BYHORMIGA.',
}

export default async function PrensaPage() {
  const posts = await getPosts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="text-[10px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-4 inline-block"
            >
              ← VOLVER AL INICIO
            </Link>
            <span className="block text-[10px] tracking-[.25em] text-gray-500 uppercase font-mono mt-8">
              NOTICIAS Y NOVEDADES
            </span>
            <h1 className="mt-4 text-5xl lg:text-7xl font-black tracking-tight text-white uppercase">
              PRENSA
            </h1>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-white/[.08]">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className="group relative bg-[#0a0908] p-8 lg:p-12 hover:bg-[#111111] transition-colors"
              >
                {/* Top border reveal animation */}
                <div className="absolute top-0 left-0 right-0 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Index number */}
                <span className="absolute top-8 lg:top-12 right-8 lg:right-12 text-[10px] tracking-[.2em] text-gray-800 font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Date */}
                <time className="block text-[10px] tracking-[.2em] text-gray-500 uppercase mb-6">
                  {post.date}
                </time>

                {/* Title */}
                <h2 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-wide leading-tight mb-6 pr-8">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-lg">
                  {post.excerpt}
                </p>

                {/* Read more link */}
                <Link
                  href={`/prensa/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[10px] tracking-[.2em] text-white uppercase group/link"
                >
                  LEER NOTA
                  <span className="inline-block transition-transform group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
