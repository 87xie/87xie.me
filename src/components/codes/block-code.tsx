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
import { lineNumbers } from './annotations/line-number'
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
  const parsedMeta = parseMeta(codeblock.meta)

  return (
    <div
      className={cx(
        'not-prose overflow-x-auto',
        'rounded-b-md border-1 border-gray-200 text-sm',
      )}
    >
      <div className="py-2 px-4 border-b-1 border-gray-200 bg-gray-50 text-xs">
        {parsedMeta.filename || highlighted.lang.toUpperCase()}
      </div>
      <Pre
        code={highlighted}
        handlers={[
          mark,
          lineNumbers,
          diff,
          callout
        ]}
        className="py-4"
      />
    </div>
  )
}

function parseMeta(meta: string) {
  const filenameReg = /filename="([^"]+)"/
  const filenameMatch = meta.match(filenameReg)

  return {
    filename: filenameMatch?.[1] ?? '',
  }
}

export default BlockCode
