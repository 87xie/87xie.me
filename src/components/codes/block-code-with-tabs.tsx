import { Block, CodeBlock, parseProps } from 'codehike/blocks'
import {
  Pre,
  highlight,
} from 'codehike/code'
import { z } from 'zod'
import cx from 'clsx'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
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
      className={classes.blockCodeRoot}
    >
      <ArkTabs.List className="py-1.5 px-0.5">
        {tabDatas.map((tabData) => (
          <ArkTabs.Trigger
            key={tabData.rawMeta}
            value={tabData.rawMeta}
            className={cx(
              'py-1 px-3',
              'cursor-pointer',
              'data-selected:underline',
              'decoration-2 decoration-blue-500 underline-offset-4',
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
          <div className={classes.blockCodeBody}>
            <Pre
              code={highlighted[i]}
              handlers={tabData.handlers}
            />
          </div>
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  )
}
