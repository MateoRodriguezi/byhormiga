import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { getPostBySlug, getPosts } from '@/lib/api'

interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Noticia no encontrada | BYHORMIGA',
    }
  }

  return {
    title: `${post.title} | BYHORMIGA`,
    description: post.description,
  }
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0908] pt-32 pb-24">
        <div className="mx-auto max-w-[980px] px-6 lg:px-12">
          <Link
            href="/noticias"
			className="mb-8 inline-block text-[12px] tracking-[.2em] text-gray-500 uppercase transition-colors hover:text-white"
          >
            ← VOLVER A NOTICIAS
          </Link>

          <header className="mt-8 mb-12 border-b border-white/[.08] pb-10">
			<time className="block text-[12px] tracking-[.2em] text-gray-500 uppercase mb-6">
              {post.date}
            </time>
            <h1 className="text-3xl lg:text-5xl font-black text-white font-heading tracking-[-0.035em] leading-tight">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
                {post.description}
              </p>
            ) : null}
          </header>

          <div className="mb-12 overflow-hidden bg-gradient-to-br from-[#0a0908] via-[#1a1a1a] to-[#0f0f0f]">
            {post.image ? (
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 980px"
                />
              </div>
            ) : (
              <div className="aspect-[16/9]" />
            )}
          </div>

          {post.content ? (
            <article
              className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:font-heading tracking-[-0.035em] prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-white prose-strong:text-white prose-li:text-gray-300 prose-img:rounded-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : post.description ? (
            <article className="max-w-none text-gray-300 leading-relaxed">
              <p>{post.description}</p>
            </article>
          ) : null}

          <div className="mt-16 border-t border-white/[.08] pt-8">
            <Link
              href="/noticias"
				className="text-[12px] tracking-[.2em] text-gray-500 uppercase transition-colors hover:text-white"
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
