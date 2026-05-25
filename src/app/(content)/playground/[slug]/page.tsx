import { allPlaygrounds } from 'content-collections'
import { notFound } from 'next/navigation'

import { DefaultContentLayout } from '../../_components/default-content-layout'

export const dynamicParams = false

export async function generateStaticParams() {
  return allPlaygrounds.map((playground) => ({
    slug: playground.slug,
  }))
}

type PlaygroundPageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PlaygroundPageProps) {
  const { slug } = await params
  const playground = allPlaygrounds.find((playground) => playground.slug === slug)
  if (!playground) {
    return notFound()
  }

  const MdxContent = playground.mdxContent

  return (
    <DefaultContentLayout category="playground" toc={playground.toc}>
      <MdxContent />
    </DefaultContentLayout>
  )
}
