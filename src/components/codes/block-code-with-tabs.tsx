import { Block, CodeBlock, parseProps } from 'codehike/blocks'
import {
  Pre,
  highlight,
} from 'codehike/code'
import { z } from 'zod'
import cx from 'clsx'
import { Tabs as ArkTabs } from '@ark-ui/react'
import { mark } from './annotations/mark'
import { diff } from './annotations/diff'
import { callout } from './annotations/callout'

const Schema = Block.extend({ tabs: z.array(CodeBlock) })

async function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema)
  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, 'github-light')),
  )

  return (
    <ArkTabs.Root
      defaultValue={tabs[0]?.meta}
      className="not-prose border border-gray-200 rounded-md overflow-x-auto"
    >
      <ArkTabs.List className="relative border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <ArkTabs.Trigger
            key={tab.meta}
            value={tab.meta}
            className={cx(
              'py-1 px-4',
              'cursor-pointer',
              'data-selected:bg-gray-200 data-selected:font-semibold',
            )}
          >
            {tab.meta}
          </ArkTabs.Trigger>
        ))}
      </ArkTabs.List>
      {tabs.map((tab, i) => (
        <ArkTabs.Content key={tab.meta} value={tab.meta}>
          <Pre
            code={highlighted[i]}
            className="py-4 text-sm"
            handlers={[mark, diff, callout]}
          />
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  )
}

export default CodeWithTabs
