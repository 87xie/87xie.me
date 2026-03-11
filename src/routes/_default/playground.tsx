import { createFileRoute } from '@tanstack/react-router'
import Anchor from '@/components/anchor'

export const Route = createFileRoute('/_default/playground')({
  component: PlaygroundPage,
})

function PlaygroundPage() {
  return (
    <article className="prose max-w-none text-gray-700 leading-relaxed">
      <h1 className="not-prose">Playground</h1>
      <p>Features and syntax for writing content in MDX.</p>
      <h2>Writing Content</h2>
      <ul>
        <li><Anchor href="/playground/lists">Lists</Anchor></li>
        <li><Anchor href="/playground/tables">Tables</Anchor></li>
        <li><Anchor href="/playground/footnotes">Footnotes</Anchor></li>
        <li><Anchor href="/playground/github-alerts">GitHub alerts</Anchor></li>
        <li><Anchor href="/playground/mermaid-diagrams">Mermaid diagrams</Anchor></li>
        <li><Anchor href="/playground/syntax-highlighting">Syntax highlighting</Anchor></li>
      </ul>
      <h2>Components</h2>
      <ul>
        <li><Anchor href="/playground/tabs">Tabs</Anchor></li>
        <li><Anchor href="/playground/steps">Steps</Anchor></li>
        <li><Anchor href="/playground/details">Details</Anchor></li>
      </ul>
    </article>
  )
}
