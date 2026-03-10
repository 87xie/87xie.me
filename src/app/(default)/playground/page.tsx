import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1>Playground</h1>
      <p>Features and syntax for writing content in MDX.</p>
      <h2>Writing Content</h2>
      <ul>
        <li><Link href="/playground/lists">Lists</Link></li>
        <li><Link href="/playground/tables">Tables</Link></li>
        <li><Link href="/playground/footnotes">Footnotes</Link></li>
        <li><Link href="/playground/github-alerts">GitHub alerts</Link></li>
        <li><Link href="/playground/mermaid-diagrams">Mermaid diagrams</Link></li>
        <li><Link href="/playground/syntax-highlighting">Syntax highlighting</Link></li>
      </ul>
      <h2>Components</h2>
      <ul>
        <li><Link href="/playground/tabs">Tabs</Link></li>
        <li><Link href="/playground/steps">Steps</Link></li>
        <li><Link href="/playground/details">Details</Link></li>
      </ul>
    </>
  )
}
