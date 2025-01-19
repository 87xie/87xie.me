import type { ReactNode } from 'react'
import cx from 'clsx'

type StepsProps = {
  children: ReactNode
}

export function Steps({ children }: StepsProps) {
  return (
    <div
      className={cx(
        'prose-ol:pl-0',
        'prose-li:relative prose-li:my-0 prose-li:pb-6 prose-li:ps-10 prose-li:list-none',
        'prose-ol:[counter-reset:steps-counter] prose-li:[counter-increment:steps-counter]',
        // before
        '[&_li::before]:content-[counter(steps-counter)] [&_li::before]:absolute [&_li::before]:top-0.5 [&_li::before]:start-0',
        '[&_li::before]:w-7 [&_li::before]:h-7',
        '[&_li::before]:inline-flex [&_li::before]:justify-center [&_li::before]:items-center',
        '[&_li::before]:border [&_li::before]:border-gray-300 [&_li::before]:rounded-md',
        '[&_li::before]:text-sm [&_li::before]:font-semibold',
        // after
        '[&_li::after]:content-[""] [&_li::after]:absolute [&_li::after]:top-10 [&_li::after]:bottom-2 [&_li::after]:start-[12px]',
        '[&_li::after]:inline-flex [&_li::after]:w-[1px] [&_li::after]:bg-gray-300',
      )}
    >
      {children}
    </div>
  )
}
