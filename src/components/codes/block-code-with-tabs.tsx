import { Block, CodeBlock, parseProps } from 'codehike/blocks'
import {
  Pre,
  highlight,
} from 'codehike/code'
import { z } from 'zod'
import cx from 'clsx'
import { Tabs as ArkTabs } from '@ark-ui/react'
import {
  classes,
  parseMeta,
  getHandlers,
} from './block-code'

const Schema = Block.extend({ tabs: z.array(CodeBlock) })

export async function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema)
  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, 'github-light')),
  )
  const tabDatas = tabs.map((tab, index) => {
    const parsedMeta = parseMeta(tab.meta)

    return {
      code: highlighted[index],
      filename: parsedMeta.filename,
      handlers: getHandlers(parsedMeta),
      rawMeta: tab.meta,
      language: tab.lang,
    }
  })

  return (
    <ArkTabs.Root
      defaultValue={tabs[0]?.meta}
      className={classes.codeBlockRoot}
    >
      <ArkTabs.List className={classes.codeBlockHeader}>
        {tabDatas.map((tabData) => (
          <ArkTabs.Trigger
            key={tabData.rawMeta}
            value={tabData.rawMeta}
            className={cx(
              'cursor-pointer',
              'py-2 px-4',
              'data-selected:border-b-2 border-blue-500',
              'data-selected:bg-gray-200/70',
            )}
          >
            {tabData.filename || tabData.rawMeta}
          </ArkTabs.Trigger>
        ))}
      </ArkTabs.List>
      {tabDatas.map((tabData, i) => (
        <ArkTabs.Content
          key={tabData.rawMeta}
          value={tabData.rawMeta}
        >
          <Pre
            code={highlighted[i]}
            handlers={tabData.handlers}
            className={classes.codeBlockPre}
          />
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  )
}
