'use client'
import type { ReactElement, ReactNode } from 'react'
import { Children, isValidElement, useMemo } from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import cn from 'clsx'

type TabsProps = {
  children?: ReactNode
  defaultValue?: string
}

export function Tabs({
  children,
  defaultValue: defaultValueProp,
}: TabsProps) {
  const labels = useMemo(() => {
    const filtered = Children.toArray(children).filter(hasLabelProp)
    return filtered.map(({ props }) => props.label)
  }, [children])
  const defaultValue = defaultValueProp ?? labels?.[0] ?? ''

  return (
    <BaseTabs.Root defaultValue={defaultValue}>
      <BaseTabs.List
        className={cn(
          'relative mb-6',
          'shadow-[0_-1px_0_0_inset_var(--color-gray-300)]',
        )}
      >
        {labels.map((label) => (
          <BaseTabs.Tab
            key={label}
            value={label}
            className={cn(
              'min-w-10 py-2 px-4 cursor-pointer text-gray-500 font-medium',
              'data-active:text-(--tw-prose-body)',
            )}
          >
            {label}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator className="absolute left-[var(--active-tab-left)] w-[var(--active-tab-width)] h-[2px] bottom-0 bg-gray-500" />
      </BaseTabs.List>
      {children}
    </BaseTabs.Root>
  )
}

type TabItemProps = {
  label: string
  children: ReactNode
}

export function TabItem({ label, children }: TabItemProps) {
  return (
    <BaseTabs.Panel value={label}>
      {children}
    </BaseTabs.Panel>
  )
}

function hasLabelProp(element: ReactNode): element is ReactElement<TabItemProps> {
  const isValid = isValidElement(element)
  if (!isValid) return false
  const props = element.props as TabItemProps
  return typeof props?.label === 'string'
}
