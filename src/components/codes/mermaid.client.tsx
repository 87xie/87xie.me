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
    mermaid.initialize({
      startOnLoad: false,
      fontFamily: 'inherit',
      look: 'handDrawn',
    })
  }, [])

  useEffect(() => {
    mermaid.render(id, code)
      .then((_result) => setResult(_result))
      .catch(() => {})
  }, [code, id])

  return result
}

type MermaidProps = {
  code: string
}

export function Mermaid({ code }: MermaidProps) {
  const result = useMermaidRenderResult(code)

  if (!result) return null

  return (
    <div
      className="not-prose my-8"
      dangerouslySetInnerHTML={{
        __html: result.svg
      }}
    />
  )
}
