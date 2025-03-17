import {
  Pre,
  highlight,
  type RawCode,
} from 'codehike/code'
import cx from 'clsx'
import { Mermaid } from './mermaid.client'
import { mark } from './annotations/mark'
import { diff } from './annotations/diff'
import { callout } from './annotations/callout'
import { collapseHandlers } from './annotations/collapse'
import { lineNumbers } from './annotations/line-numbers'

type BlockCodeProps = {
  codeblock: RawCode
}

export const classes = {
  blockCodeRoot: cx(
    'not-prose', // remove prose styles
    'rounded-md border border-gray-200',
    'px-0.5 pb-0.5 bg-gray-50 text-sm',
  ),
  blockCodeHeader: 'py-1.5 px-4',
  blockCodeBody: 'rounded-md border-1 border-gray-200 bg-white overflow-x-scroll py-4',
}

export async function BlockCode({ codeblock }: BlockCodeProps) {
  if (codeblock.lang === 'mermaid') {
    return (
      <Mermaid code={codeblock.value} />
    )
  }

  const highlighted = await highlight(codeblock, 'github-light')
  const meta = parseMeta(codeblock.meta)
  const handlers = getHandlers(meta)

  return (
    <div className={cx(classes.blockCodeRoot, 'my-6')}>
      <div className={classes.blockCodeHeader}>
        {meta.filename || highlighted.lang}
      </div>
      <div className={classes.blockCodeBody}>
        <Pre
          code={highlighted}
          handlers={handlers}
        />
      </div>
    </div>
  )
}

// utils
function praseFileName(meta: string) {
  const filenameReg = /filename="([^"]+)"/
  const filenameMatch = meta.match(filenameReg)
  return filenameMatch?.[1] ?? ''
}

function parseLineNumbers(meta: string) {
  const lineNumbersReg = /\s?--n\s?/
  return lineNumbersReg.test(meta)
}

export function parseMeta(meta: string) {
  const filename = praseFileName(meta)
  const showLineNumbers = parseLineNumbers(meta)

  return {
    filename,
    showLineNumbers,
  }
}

type ParsedMeta = ReturnType<typeof parseMeta>

export function getHandlers(options: Pick<ParsedMeta, 'showLineNumbers'>) {
  return [
    mark,
    diff,
    ...options.showLineNumbers ? [lineNumbers] : [],
    ...collapseHandlers,
    callout,
  ]
}
