'use client'

import { useEffect, useRef } from 'react'

interface ResponsiveHeroVideoProps {
  videoSrc: string
  mobileVideoSrc: string
  className?: string
}

/**
 * Sirve una version liviana del video en mobile (via <source media=...>, sin
 * JS) y la version completa desde lg: en adelante.
 *
 * Algunos navegadores mobile (Safari/iOS sobre todo) a veces bloquean el
 * autoplay en la primera carga de la pagina sin avisar: el video queda
 * pausado en el primer frame. Si eso pasa, se reintenta reproducir apenas
 * el usuario toca/hace click en cualquier parte de la pagina.
 */
export function ResponsiveHeroVideo({
  videoSrc,
  mobileVideoSrc,
  className = '',
}: ResponsiveHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const retryPlay = () => {
      video.play().catch(() => {})
    }

    video.play().catch(() => {
      document.addEventListener('touchstart', retryPlay, { once: true, passive: true })
      document.addEventListener('click', retryPlay, { once: true })
    })

    return () => {
      document.removeEventListener('touchstart', retryPlay)
      document.removeEventListener('click', retryPlay)
    }
  }, [])

  return (
    <video ref={videoRef} autoPlay loop muted playsInline className={className}>
      <source src={videoSrc} media="(min-width: 1024px)" type="video/mp4" />
      <source src={mobileVideoSrc} type="video/mp4" />
    </video>
  )
}
