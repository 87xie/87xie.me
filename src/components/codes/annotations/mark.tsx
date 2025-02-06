import {
  type AnnotationHandler,
  InnerLine,
} from 'codehike/code'
import cx from 'clsx'

export const mark: AnnotationHandler = {
  name: 'mark',
  Line({ annotation, ...props }) {
    const color = annotation?.query || 'var(--color-blue-400)'
    return (
      <div
        style={{
          borderLeft: 'solid 2px transparent',
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
        }}
        className="flex"
      >
        <InnerLine
          merge={{
            ...props,
            className: cx(props.className, 'flex-1 px-[2ch]'),
          }}
        />
      </div>
    )
  },
  Inline({ annotation, children }) {
    const color = annotation?.query || 'var(--color-rose-400)'
    return (
      <span
        style={{
          outline: `solid 1px rgb(from ${color} r g b / 0.5)`,
          background: `rgb(from ${color} r g b / 0.13)`,
        }}
        className="rounded-sm p-0.5"
      >
        {children}
      </span>
    )
  },
}
