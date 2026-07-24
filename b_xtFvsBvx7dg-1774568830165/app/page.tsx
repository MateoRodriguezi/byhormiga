import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Ticker } from '@/components/Ticker'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeaturedEventsSection } from '@/components/sections/FeaturedEventsSection'
import { GallerySection } from '@/components/sections/GallerySection'
// import { PressSection } from '@/components/sections/PressSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { getEvents, getGallery } from '@/lib/api'
import type { GalleryItem } from '@/lib/types'

// Slugs que van primero en la grilla de Momentos, en este orden
const PINNED_GALLERY_SLUGS = ['hit-the-beach', 'oversize-el-jaguel-punta-del-este']

function withPinnedGalleryOrder(items: GalleryItem[]): GalleryItem[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]))
  const pinned = PINNED_GALLERY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (item): item is GalleryItem => Boolean(item),
  )
  const pinnedSlugs = new Set(pinned.map((item) => item.slug))
  const rest = items.filter((item) => !pinnedSlugs.has(item.slug))
  return [...pinned, ...rest]
}

export default async function HomePage() {
  const [events, gallery] = await Promise.all([
    getEvents(),
    getGallery(),
  ])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Ticker />
        <AboutSection />
        <StatsSection />
        <FeaturedEventsSection events={events} />
        <GallerySection items={withPinnedGalleryOrder(gallery)} />
        {/* Ocultada temporalmente: todavia no hay contenido de noticias/prensa cargado */}
        {/* <PressSection posts={posts} /> */}
        <PartnersSection sponsors={[]} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
