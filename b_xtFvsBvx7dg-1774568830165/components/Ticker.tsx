'use client'

import Image from 'next/image'
import type { Sponsor } from '@/lib/types'

interface TickerProps {
  sponsors: Sponsor[]
}

export function Ticker({ sponsors }: TickerProps) {
  // Si no hay sponsors con logo, usar defaults
  const displaySponsors = sponsors?.filter(s => s.logo).length > 0
    ? sponsors.filter(s => s.logo)
    : []

  if (displaySponsors.length === 0) {
    return null
  }

  const tickerContent = (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center shrink-0">
          {displaySponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex items-center mx-8 lg:mx-12">
              <div className="relative h-12 w-32 lg:h-16 lg:w-40 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src={sponsor.logo!}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )

  return (
    <div className="w-full bg-white border-y border-black/10 py-6 lg:py-8 overflow-hidden">
      <div className="flex animate-ticker">
        {tickerContent}
        {tickerContent}
      </div>
    </div>
  )
}
