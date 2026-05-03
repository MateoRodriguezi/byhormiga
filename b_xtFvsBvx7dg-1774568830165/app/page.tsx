import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Ticker } from '@/components/Ticker'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeaturedEventsSection } from '@/components/sections/FeaturedEventsSection'
import { EventsSection } from '@/components/sections/EventsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { PressSection } from '@/components/sections/PressSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { getEvents, getGallery, getPosts, getSponsors } from '@/lib/api'

export default async function HomePage() {
  const [events, gallery, posts, sponsors] = await Promise.all([
    getEvents(),
    getGallery(),
    getPosts(),
    getSponsors(),
  ])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Ticker />
        <StatsSection />
        <FeaturedEventsSection events={events} />
        <EventsSection events={events} />
        <GallerySection items={gallery} />
        <PressSection posts={posts} />
        <PartnersSection sponsors={sponsors} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
