import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Noticias - Últimas Novedades de ByHormiga',
  description:
    'Enterate de las últimas noticias, anuncios y logros de ByHormiga. Eventos, expansión regional, récords históricos y más.',
  url: '/noticias',
})

export default function NoticiasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
