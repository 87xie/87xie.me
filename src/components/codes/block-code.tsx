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
import Mermaid from './mermaid.client'

const lineNumbers: AnnotationHandler = {
  name: 'line-numbers',
  Line(props) {
    const computedMinWidth = `${props.totalLines.toString().length + 1}ch`
    return (
      <div className="flex">
        <span
          style={{ minWidth: computedMinWidth }}
          className=" text-gray-500 text-right"
        >
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
    return {
      name: annotation.name,
      query: annotation.query,
      fromLineNumber: annotation.lineNumber,
      toLineNumber: annotation.lineNumber,
      data: {
        ...annotation.data,
        column: (annotation.fromColumn + annotation.toColumn) / 2,
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
          data-callout=""
          style={{
            minWidth: `${column + 4}ch`,
            marginLeft: `${indentation}ch`,
          }}
          className={cx(
            'relative w-fit my-1',
            'border rounded border-gray-300 bg-gray-50',
            'whitespace-break-spaces'
          )}
        >
          {/* callout arrow */}
          <span
            className={cx(
              'absolute -top-[1px] w-2 h-2 rotate-45 -translate-y-1/2',
              'border-l border-t border-gray-300 bg-gray-50',
            )}
            style={{ left: `${column - indentation}ch` }}
          />
          {/* callout content */}
          {annotation.data.children || (
            <div className="py-1 px-2">
              {annotation.query}
            </div>
          )}
        </div>
      </InnerLine>
    )
  },
}

type BlockCodeProps = {
  codeblock: RawCode
}

async function BlockCode({ codeblock }: BlockCodeProps) {
  if (codeblock.lang === 'mermaid') {
    return (
      <Mermaid code={codeblock.value} />
    )
  }

  const highlighted = await highlight(codeblock, 'github-light')
  return (
    <div
      className={cx(
        'not-prose overflow-x-auto',
        'rounded-b-md border-1 border-gray-200 py-4 text-sm',
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
