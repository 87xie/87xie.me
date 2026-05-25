import { allNotes } from 'content-collections'
import { notFound } from 'next/navigation'

import { DefaultContentLayout } from '../../_components/default-content-layout'

export const dynamicParams = false

export async function generateStaticParams() {
  return allNotes.map((note) => ({
    slug: note.slug,
  }))
}

type NotePageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: NotePageProps) {
  const { slug } = await params
  const note = allNotes.find((note) => note.slug === slug)
  if (!note) {
    return notFound()
  }

  const MdxContent = note.mdxContent

  return (
    <DefaultContentLayout category="notes" toc={note.toc}>
      <MdxContent />
    </DefaultContentLayout>
  )
}
