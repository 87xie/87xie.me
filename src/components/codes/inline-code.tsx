'use server'

import {
  type RawCode,
  Pre,
  highlight
} from 'codehike/code'

type BlockCodeProps = {
  codeblock: RawCode
}

async function BlockCode({ codeblock }: BlockCodeProps) {
  const highlighted = await highlight(codeblock, 'github-light')
  return (
    <div className="not-prose">
      <Pre code={highlighted} />
    </div>
  )
}

export default BlockCode
