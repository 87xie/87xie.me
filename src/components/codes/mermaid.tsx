'use client'

import { useMermaidResult } from './use-mermaid-result'
import cx from 'clsx'

type MermaidProps = {
  code: string
}

export function Mermaid({ code }: MermaidProps) {
  const result = useMermaidResult(code)

  return (
    <div className="not-prose my-8">
      {result.status === 'success' && (
        <div dangerouslySetInnerHTML={{ __html: result.data.svg }} />
      )}
      {result.status === 'pending' && (
        <div
          className={cx(
            'relative w-70 h-60 grid',
            'before:absolute before:left-[43px] before:h-full before:w-0.5 before:bg-gray-100',
            'after:absolute after:right-[43px] after:h-full after:w-0.5 after:bg-gray-100',
          )}
        >
          <div className="flex justify-between mb-auto">
            <div className="bg-gray-100 rounded-md w-22 h-10" />
            <div className="bg-gray-100 rounded-md w-22 h-10" />
          </div>
          <p className="w-40 mx-auto self-center border-b-1 border-dotted text-center text-sm text-gray-500">
            Rendering diagram...
          </p>
          <div className="flex justify-between mt-auto">
            <div className="bg-gray-100 rounded-md w-22 h-10" />
            <div className="bg-gray-100 rounded-md w-22 h-10" />
          </div>
        </div>
      )}
      {result.status === 'error' && (
        <p className="text-red-500">{result.error.message}</p>
      )}
    </div>
  )
}
