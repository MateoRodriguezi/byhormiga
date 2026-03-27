import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getPostBySlug, getPosts } from '@/lib/api'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado | BYHORMIGA',
    }
  }

  return {
    title: `${post.title} | BYHORMIGA`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          {/* Back link */}
          <Link
            href="/prensa"
            className="text-[10px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors mb-8 inline-block"
          >
            ← VOLVER A PRENSA
          </Link>

          {/* Article Header */}
          <header className="mt-8 mb-12">
            <time className="block text-[10px] tracking-[.2em] text-gray-500 uppercase mb-6">
              {post.date}
            </time>
            <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Article Image Placeholder */}
          <div
            className="w-full aspect-[16/9] mb-12"
            style={{
              background: 'linear-gradient(135deg, #0a0908 0%, #1a1a1a 50%, #0f0f0f 100%)',
            }}
          />

          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">{post.excerpt}</p>

            {/* Placeholder content */}
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </article>

          {/* Share / Back */}
          <div className="mt-16 pt-8 border-t border-white/[.08] flex justify-between items-center">
            <Link
              href="/prensa"
              className="text-[10px] tracking-[.2em] text-gray-500 uppercase hover:text-white transition-colors"
            >
              ← MÁS NOTICIAS
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
