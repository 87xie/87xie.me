import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <article className="prose max-w-none text-gray-700 leading-relaxed">
      <h1 className="not-prose">About</h1>
      <p>Hi there</p>
    </article>
  )
}
