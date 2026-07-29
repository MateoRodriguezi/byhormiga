import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BrandPage } from '@/components/BrandPage'
import { getProductionBySlug, getProductions } from '@/lib/api'

interface BrandRouteProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const productions = await getProductions()
  return productions.map((production) => ({ slug: production.slug }))
}

export async function generateMetadata({ params }: BrandRouteProps): Promise<Metadata> {
  const { slug } = await params
  const production = await getProductionBySlug(slug)

  if (!production) {
    return { title: 'No encontrado | BYHORMIGA' }
  }

  return {
    title: `${production.name} | BYHORMIGA`,
    description: production.card_description,
  }
}

export default async function BrandRoute({ params }: BrandRouteProps) {
  const { slug } = await params
  const production = await getProductionBySlug(slug)

  if (!production) {
    notFound()
  }

  return <BrandPage brand={production} />
}
