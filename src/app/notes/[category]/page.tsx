export async function generateStaticParams() {
  return [
    { category: 'snippets' },
    { category: 'quick-overview' },
    { category: 'book-reviews' },
  ]
}

export default async function Page() {
  return (
    <div>
      📝 Work in progress
    </div>
  )
}
