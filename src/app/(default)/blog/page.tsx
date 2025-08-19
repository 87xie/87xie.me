import { blogPosts } from '@/sorted-content'
import Anchor from '@/components/anchor'

type Post = typeof blogPosts[number]

const yearCollections = blogPosts.reduce((acc, post) => {
  const year = new Date(post.date!).getFullYear()
  if (!acc[year]) {
    acc[year] = []
  }
  acc[year].push(post)
  return acc
}, {} as Record<string, Post[]>)

type PostSectionProps = {
  year: string
  posts: Post[]
}

const entries = Object.entries(yearCollections)

function PostSection({ year, posts }: PostSectionProps) {
  return (
    <section>
      <h2 className="mt-8 mb-2 text-2xl font-medium">{year}</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Anchor href={`/blog/${post.slug}`} className="flex gap-3 items-baseline">
              <span>{post.title}</span>
            </Anchor>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      {entries.length > 0
        ? entries.map(([year, posts]) => (
            <PostSection
              key={year}
              year={year}
              posts={posts}
            />
          ))
        : `🚧`}
    </div>
  )
}
