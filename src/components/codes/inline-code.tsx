import {
  type HighlightedCode,
  Inline,
} from 'codehike/code'

type InlineCodeProps = {
  codeblock: HighlightedCode
}

export function InlineCode({ codeblock }: InlineCodeProps) {
  return (
    <Inline
      code={codeblock}
      style={{ ...codeblock.style, background: undefined }}
    />
  )
}
