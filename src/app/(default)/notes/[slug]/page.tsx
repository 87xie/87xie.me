import { allNotes } from 'content-collections'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allNotes.map((post) => ({
    slug: post.slug,
  }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const note = allNotes.find((_note) => _note.slug === slug)
  if (!note) {
    return notFound()
  }

  const MdxContent = note.mdxContent
  return (
    <MdxContent />
  )
}
