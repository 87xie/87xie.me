import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PostPageProps) {
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) {
    return notFound()
  }

  const MdxContent = post.mdxContent
  return (
    <MdxContent />
  )
}
