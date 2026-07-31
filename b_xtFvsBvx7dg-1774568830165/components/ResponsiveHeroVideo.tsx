interface ResponsiveHeroVideoProps {
  videoSrc: string
  mobileVideoSrc: string
  posterSrc: string
  className?: string
}

/**
 * Sirve una version liviana del video en mobile (via <source media=...>, sin
 * JS) y la version completa desde lg: en adelante. El poster se ve al
 * instante mientras cualquiera de las dos descarga.
 */
export function ResponsiveHeroVideo({
  videoSrc,
  mobileVideoSrc,
  posterSrc,
  className = '',
}: ResponsiveHeroVideoProps) {
  return (
    <video autoPlay loop muted playsInline poster={posterSrc} className={className}>
      <source src={videoSrc} media="(min-width: 1024px)" type="video/mp4" />
      <source src={mobileVideoSrc} type="video/mp4" />
    </video>
  )
}
