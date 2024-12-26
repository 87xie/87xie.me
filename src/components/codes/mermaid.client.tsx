'use client'

import {
  useEffect,
  useState,
  useId,
} from 'react'
import mermaid from 'mermaid'
import type { RenderResult } from 'mermaid'

function useMermaidRenderResult(code: string) {
  const [result, setResult] = useState<RenderResult>()
  const id = useId().replace(/:/g, '_')

  useEffect(() => {
    console.log('start initialize', Date.now())
    mermaid.initialize({
      startOnLoad: false,
      fontFamily: 'inherit',
      look: 'handDrawn',
    })
  }, [])

  useEffect(() => {
    const start = Date.now()
    console.log('start render', start)
    mermaid.render(id, code)
      .then((_result) => setResult(_result))
      .catch(() => {})
      .finally(() => {
        const end = Date.now()
        console.log('finish render', end)
        console.log('duration: ', end - start)
      })
  }, [code, id])

  return result
}

type MermaidProps = {
  code: string
}

function Mermaid({ code }: MermaidProps) {
  const result = useMermaidRenderResult(code)

  if (!result) return null

  return (
    <div
      className="not-prose"
      dangerouslySetInnerHTML={{
        __html: result.svg
      }}
    />
  )
}

export default Mermaid
