import { Block, HighlightedCodeBlock, parseProps } from 'codehike/blocks'
import {
  Pre,
  type HighlightedCode,
} from 'codehike/code'
import { z } from 'zod'
import cx from 'clsx'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import {
  classes,
  parseMeta,
  getHandlers,
} from './block-code'

const Schema = Block.extend({ tabs: z.array(HighlightedCodeBlock) })

export function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema)
  const tabDatas = tabs.map((tab) => {
    const parsedMeta = parseMeta(tab.meta)

    return {
      code: tab as HighlightedCode,
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
      {tabDatas.map((tabData) => (
        <ArkTabs.Content
          key={tabData.rawMeta}
          value={tabData.rawMeta}
        >
          <div className={classes.blockCodeBody}>
            <Pre
              code={tabData.code}
              handlers={tabData.handlers}
            />
          </div>
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  )
}
