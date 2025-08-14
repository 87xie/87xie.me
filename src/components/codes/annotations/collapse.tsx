import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronDownIcon } from '@primer/octicons-react'
import {
  type AnnotationHandler,
  type BlockAnnotation,
  InnerLine,
} from 'codehike/code'
import cx from 'clsx'

const collapse: AnnotationHandler = {
  name: 'collapse',
  transform: (annotation: BlockAnnotation) => {
    const { fromLineNumber } = annotation
    return [
      annotation,
      {
        ...annotation,
        fromLineNumber: fromLineNumber,
        toLineNumber: fromLineNumber,
        name: 'CollapseTrigger',
      },
      {
        ...annotation,
        fromLineNumber: fromLineNumber + 1,
        name: 'CollapseContent',
      },
    ]
  },
  Block: ({ annotation, children }) => {
    return (
      <Collapsible.Root defaultOpen={annotation.query !== 'collapsed'}>
        {children}
      </Collapsible.Root>
    )
  },
}

const collapseTrigger: AnnotationHandler = {
  name: 'CollapseTrigger',
  onlyIfAnnotated: true,
  AnnotatedLine: ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    annotation,
    ...props
  }) => (
    <Collapsible.Trigger className="group">
      <InnerLine
        merge={props}
        data={{ isAnnotated: true }}
      />
    </Collapsible.Trigger>
  ),
  Line: (props) => {
    const isAnnotated = !!props?.data?.isAnnotated
    return (
      <div className="flex-1 grid grid-cols-[min-content_1fr] px-2">
        <span className="grid w-6">
          {isAnnotated && (
            <ChevronDownIcon
              size={14}
              className={cx(
                'my-auto mr-auto',
                'text-gray-400/70',
                'select-none',
                'group-data-[state=closed]:-rotate-90',
              )}
            />
          )}
        </span>
        <InnerLine merge={{ ...props, className: 'pr-[2ch]' }} />
      </div>
    )
  },
}

const collapseContent: AnnotationHandler = {
  name: 'CollapseContent',
  Block: Collapsible.Content,
}

export const collapseHandlers = [collapse, collapseTrigger, collapseContent]
