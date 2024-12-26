'use server'

import {
  type RawCode,
  Inline,
  highlight
} from 'codehike/code'

type InlineCodeProps = {
  codeblock: RawCode
}

async function InlineCode({ codeblock }: InlineCodeProps) {
  const highlighted = await highlight(codeblock, 'github-light')
  return (
    <Inline
      code={highlighted}
      style={{ ...highlighted.style, background: undefined }}
      className="not-prose rounded-md py-1 px-2 border-[0.5px] border-gray-300 bg-gray-50 text-sm "
    />
  )
}

export default InlineCode
