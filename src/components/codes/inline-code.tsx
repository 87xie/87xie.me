import { use, Suspense } from 'react'
import {
  type RawCode,
  Inline,
} from 'codehike/code'
import { cachedHighlight } from './cached-highlight'

type InlineCodeProps = {
  codeblock: RawCode
}

function InlineCodeInner({ codeblock }: InlineCodeProps) {
  const highlighted = use(cachedHighlight(codeblock, 'github-light'))
  return (
    <Inline
      code={highlighted}
      style={{ ...highlighted.style, background: undefined }}
    />
  )
}

export function InlineCode({ codeblock }: InlineCodeProps) {
  return (
    <Suspense fallback={<code>{codeblock.value}</code>}>
      <InlineCodeInner codeblock={codeblock} />
    </Suspense>
  )
}
