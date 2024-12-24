'use server'

import {
  type RawCode,
  type AnnotationHandler,
  type InlineAnnotation,
  Pre,
  InnerLine,
  highlight,
} from 'codehike/code'
import cx from 'clsx'

type BlockCodeProps = {
  codeblock: RawCode
}

const lineNumbers: AnnotationHandler = {
  name: 'line-numbers',
  Line(props) {
    return (
      <div className="flex w-full">
        <span className="w-[5ch] text-gray-500 text-right">
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="flex-auto ml-[2ch]" />
      </div>
    )
  },
}

const mark: AnnotationHandler = {
  name: 'mark',
  Line({ annotation, ...props }) {
    const color = annotation?.query || "rgb(14 165 233)"
    return (
      <div
        
        style={{
          borderLeft: 'solid 2px transparent',
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
        }}
      >
        <InnerLine merge={props} />
      </div>
    )
  },
  Inline({ annotation, children }) {
    const color = annotation?.query || "rgb(14 165 233)"
    return (
      <span
        style={{
          outline: `solid 1px rgb(from ${color} r g b / 0.5)`,
          background: `rgb(from ${color} r g b / 0.13)`,
        }}
      >
        {children}
      </span>
    )
  },
}

const callout: AnnotationHandler = {
  name: 'callout',
  transform(annotation: InlineAnnotation) {
    // transform inline annotation to block annotation
    const { name, query, lineNumber, fromColumn, toColumn } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: {
        ...annotation.data,
        column: (fromColumn + toColumn) / 2,
      },
    }
  },
  AnnotatedLine: ({ annotation, ...props }) => {
    const { column } = annotation.data
    const { indentation, children } = props
    return (
      <InnerLine merge={props}>
        {children}
        <div
          style={{
            minWidth: `${column + 4}ch`,
            marginLeft: `${indentation}ch`,
          }}
          className={cx(
            'relative w-fit my-1 py-0.5',
            'border rounded border-gray-400 bg-gray-50',
            'whitespace-break-spaces'
          )}
        >
          <div
            style={{ left: `${column - indentation - 1}ch` }}
            className={cx(
              'absolute w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px]',
              'border-l border-t border-gray-400 bg-gray-50',
            )}
          />
          {annotation.data.children || (
            <div className="px-2">{annotation.query}</div>
          )}
        </div>
      </InnerLine>
    )
  },
}

async function BlockCode({ codeblock }: BlockCodeProps) {
  const highlighted = await highlight(codeblock, 'github-light')
  return (
    <div
      className={cx(
        'not-prose',
        'rounded-md border-1 border-gray-200 py-4',
        'text-sm',
      )}
    >
      <Pre
        code={highlighted}
        handlers={[mark, lineNumbers, callout]}
      />
    </div>
  )
}

export default BlockCode
