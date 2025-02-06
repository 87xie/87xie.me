import {
  type AnnotationHandler,
  type InlineAnnotation,
  InnerLine,
} from 'codehike/code'
import cx from 'clsx'

export const callout: AnnotationHandler = {
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
            'border rounded border-gray-200 bg-gray-50',
            'whitespace-break-spaces',
          )}
        >
          {/* callout arrow */}
          <span
            className={cx(
              'absolute -top-[1px] w-2 h-2 rotate-45 -translate-y-1/2',
              'border-l border-t border-gray-200 bg-gray-50',
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
