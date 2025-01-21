import {
  Pre,
  highlight,
  type RawCode,
} from 'codehike/code'
import cx from 'clsx'

import { Mermaid } from './mermaid.client'
// annotations
import { mark } from './annotations/mark'
import { diff } from './annotations/diff'
import { lineNumbers } from './annotations/line-numbers'
import { callout } from './annotations/callout'

type BlockCodeProps = {
  codeblock: RawCode
}

async function BlockCode({ codeblock }: BlockCodeProps) {
  if (codeblock.lang === 'mermaid') {
    return (
      <Mermaid code={codeblock.value} />
    )
  }

  const highlighted = await highlight(codeblock, 'github-light')
  const meta = parseMeta(codeblock.meta)

  return (
    <div
      className={cx(
        'not-prose overflow-x-auto my-8',
        'rounded-md border border-gray-200 text-sm',
      )}
    >
      <div className="py-2 px-4 border-b-1 border-gray-200 bg-gray-50 text-xs">
        {meta.filename || highlighted.lang.toUpperCase()}
      </div>
      <Pre
        code={highlighted}
        handlers={[
          mark,
          ...meta.showLineNumbers ? [lineNumbers] : [],
          diff,
          callout,
        ]}
        className="py-4"
      />
    </div>
  )
}

function praseFileName(meta: string) {
  const filenameReg = /filename="([^"]+)"/
  const filenameMatch = meta.match(filenameReg)
  return filenameMatch?.[1] ?? ''
}

function parseLineNumbers(meta: string) {
  const lineNumbersReg = /\s?--n\s?/
  return lineNumbersReg.test(meta)
}

function parseMeta(meta: string) {
  return {
    filename: praseFileName(meta),
    showLineNumbers: parseLineNumbers(meta),
  }
}

export default BlockCode
