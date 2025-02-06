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
import { lineNumbers } from './annotations/line-numbers'

type BlockCodeProps = {
  codeblock: RawCode
}

export const classes = {
  codeBlockRoot: cx(
    'not-prose', // remove prose styles
    'overflow-x-auto', // horizontal scrollbar
    'rounded-md border border-gray-200', // bordered
    'text-sm',
  ),
  codeBlockHeader: cx(
    'border-b-1 border-gray-200 bg-gray-50', // border bottom
  ),
  codeBlockPre: 'py-4',
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
    <div className={cx(classes.codeBlockRoot, 'my-8')}>
      <div className={cx(classes.codeBlockHeader, 'py-2 px-4')}>
        {meta.filename || highlighted.lang.toUpperCase()}
      </div>
      <Pre
        code={highlighted}
        handlers={handlers}
        className={classes.codeBlockPre}
      />
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
    options.showLineNumbers && lineNumbers,
    diff,
    callout,
  ].filter((handler) => !!handler)
}
