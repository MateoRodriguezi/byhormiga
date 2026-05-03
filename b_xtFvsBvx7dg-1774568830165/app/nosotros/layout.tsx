import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Nosotros - 30 Años Creando Experiencias Inolvidables',
  description:
    'Desde 1996, ByHormiga ha transformado la escena de eventos en Uruguay. Conocé nuestra historia, equipo y la pasión que nos impulsa a crear momentos únicos.',
  url: '/nosotros',
})

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
