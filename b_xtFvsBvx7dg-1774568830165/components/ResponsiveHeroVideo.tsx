interface ResponsiveHeroVideoProps {
  videoSrc: string
  mobileVideoSrc: string
  className?: string
}

/**
 * Sirve una version liviana del video en mobile (via <source media=...>, sin
 * JS) y la version completa desde lg: en adelante.
 */
export function ResponsiveHeroVideo({
  videoSrc,
  mobileVideoSrc,
  className = '',
}: ResponsiveHeroVideoProps) {
  return (
    <video autoPlay loop muted playsInline className={className}>
      <source src={videoSrc} media="(min-width: 1024px)" type="video/mp4" />
      <source src={mobileVideoSrc} type="video/mp4" />
    </video>
  )
}
