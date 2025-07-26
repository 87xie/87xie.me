import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import cx from 'clsx'
import { TocList } from '../../_components/toc-list'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}

type PostPageProps = {
  params: Promise<{ slug: string, category: string }>
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
        <MdxContent />
      </main>
      <aside
        className={cx(
          'hidden self-start sticky top-14 w-1/4 ml-12',
          'md:block',
        )}
      >
        <p className="font-medium mb-3">
          Table of contents
        </p>
        {post.toc.length > 0
          ? (<TocList toc={post.toc} />)
          : (<p className="text-sm text-zinc-500">No headings found</p>)}
      </aside>
    </div>
  )
}
