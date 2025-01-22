'use server'

import {
  type RawCode,
  Inline,
  highlight,
} from 'codehike/code'

type InlineCodeProps = {
  codeblock: RawCode
}

export async function InlineCode({ codeblock }: InlineCodeProps) {
  const highlighted = await highlight(codeblock, 'github-light')
  return (
    <Inline
      code={highlighted}
      style={{ ...highlighted.style, background: undefined }}
      className="not-prose rounded-md py-0.5 px-1.5 border-[0.5px] border-gray-300 bg-gray-50 text-sm "
    />
  )
}
