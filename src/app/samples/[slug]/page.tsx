import { notFound } from 'next/navigation'
import { allSamples } from 'content-collections'

export async function generateStaticParams() {
  return allSamples.map(({ slug }) => ({
    slug,
  }))
}

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PostPageProps) {
  const { slug } = await params
  const sample = allSamples.find((_sample) => _sample.slug === slug)
  if (!sample) {
    return notFound()
  }

  const MdxContent = sample.mdxContent
  return (
    <MdxContent />
  )
}
