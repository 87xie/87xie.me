import type {
  TabsRootProps as ArkTabsRootProps,
  TabListProps as ArkTabListProps,
  TabContentProps as ArkTabContentProps,
} from '@ark-ui/react'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import cx from 'clsx'

export function Tabs(props: ArkTabsRootProps) {
  return (
    <ArkTabs.Root {...props} />
  )
}

type TabListProps = {
  items: string[]
} & ArkTabListProps

export function TabList({
  items,
  className,
  ...arkTabListProps
}: TabListProps) {
  return (
    <ArkTabs.List
      {...arkTabListProps}
      className={cx(
        className,
        'relative mb-6',
        'shadow-[0_-1px_0_0_inset_var(--color-gray-300)]',
      )}
    >
      {items.map((item) => (
        <ArkTabs.Trigger
          key={item}
          value={item}
          className={cx(
            'min-w-10 py-2 px-4 cursor-pointer text-gray-500',
            'data-selected:text-(--tw-prose-body)',
          )}
        >
          {item}
        </ArkTabs.Trigger>
      ))}
      <ArkTabs.Indicator className="absolute w-[var(--width)] h-[2px] bottom-0 bg-gray-500" />
    </ArkTabs.List>
  )
}

export function TabContent(props: ArkTabContentProps) {
  return (
    <ArkTabs.Content {...props} />
  )
}
