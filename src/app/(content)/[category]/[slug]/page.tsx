import { allPosts } from '@/sorted-content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from '@primer/octicons-react'
import cx from 'clsx'
import { Toc } from '@/components/toc/toc'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}

type PostPageProps = {
  params: Promise<{ slug: string; category: string }>
}

export default async function Page({ params }: PostPageProps) {
  const { slug, category } = await params
  const post = allPosts.find((post) => post.slug === slug && post.category === category)
  if (!post) {
    return notFound()
  }

  const MdxContent = post.mdxContent
  return (
    <div
      className={cx(
        'max-w-4xl mx-auto py-16 px-6',
        'md:flex',
      )}
    >
      <main className="md:w-3/4">
        <Link
          className="link-gray flex items-center gap-2 mb-6 text-sm"
          href={`/${category}`}
        >
          <ArrowLeftIcon size={14} />
          {`Back to ${category}`}
        </Link>
        <MdxContent />
      </main>
      <aside
        className={cx(
          'hidden self-start sticky top-14 w-1/4 ml-12',
          'md:block',
        )}
      >
        <Toc toc={post.toc} />
      </aside>
    </div>
  )
}
