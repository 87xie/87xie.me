'use client'
import type { ReactElement, ReactNode } from 'react'
import { Children, isValidElement, useMemo } from 'react'
import type { TabsRootProps as ArkTabsRootProps } from '@ark-ui/react'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import cn from 'clsx'

export function Tabs({
  children,
  defaultValue: defaultValueProp,
}: ArkTabsRootProps) {
  const labels = useMemo(() => {
    const filtered = Children.toArray(children).filter(hasLabelProp)
    return filtered.map(({ props }) => props.label)
  }, [children])
  const defaultValue = defaultValueProp ?? labels?.[0] ?? ''

  return (
    <ArkTabs.Root defaultValue={defaultValue}>
      <ArkTabs.List
        className={cn(
          'relative mb-6',
          'shadow-[0_-1px_0_0_inset_var(--color-gray-300)]',
        )}
      >
        {labels.map((label) => (
          <ArkTabs.Trigger
            key={label}
            value={label}
            className={cn(
              'min-w-10 py-2 px-4 cursor-pointer text-gray-500 font-medium',
              'data-selected:text-(--tw-prose-body)',
            )}
          >
            {label}
          </ArkTabs.Trigger>
        ))}
        <ArkTabs.Indicator className="absolute w-[var(--width)] h-[2px] bottom-0 bg-gray-500" />
      </ArkTabs.List>
      {children}
    </ArkTabs.Root>
  )
}

type TabItemProps = {
  label: string
  children: ReactNode
}

export function TabItem({ label, children }: TabItemProps) {
  return (
    <ArkTabs.Content value={label}>
      {children}
    </ArkTabs.Content>
  )
}

function hasLabelProp(element: ReactNode): element is ReactElement<TabItemProps> {
  const isValid = isValidElement(element)
  if (!isValid) return false
  const props = element.props as TabItemProps
  return typeof props?.label === 'string'
}
