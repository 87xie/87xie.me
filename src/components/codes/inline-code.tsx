import {
  type RawCode,
  Inline,
  highlight,
} from 'codehike/code'

type InlineCodeProps = {
  codeblock: RawCode
}

export async function InlineCode({ codeblock }: InlineCodeProps) {
  const highlighted = await highlight(codeblock, 'github-from-css')
  return (
    <Inline
      code={highlighted}
      style={{ ...highlighted.style, background: undefined }}
    />
  )
}
