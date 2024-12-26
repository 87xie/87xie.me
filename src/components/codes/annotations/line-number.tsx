import {
  type AnnotationHandler,
  InnerLine,
} from 'codehike/code'

export const lineNumbers: AnnotationHandler = {
  name: 'line-numbers',
  Line(props) {
    const computedMinWidth = `${props.totalLines.toString().length + 1}ch`
    return (
      <div className="flex">
        <span
          style={{ minWidth: computedMinWidth }}
          className="mr-[2ch] text-gray-500 text-right"
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="flex-1" />
      </div>
    )
  },
}
