import {
  type AnnotationHandler,
  type BlockAnnotation,
  InnerLine,
} from 'codehike/code'

function getDiffColor(query: string) {
  switch (query) {
    case '-': return 'var(--color-rose-400)'
    case '+': return 'var(--color-green-400)'
    default: return '#fff'
  }
}

export const diff: AnnotationHandler = {
  name: 'diff',
  onlyIfAnnotated: true,
  transform: (annotation: BlockAnnotation) => {
    return [annotation, {
      ...annotation,
      name: 'mark',
      query: getDiffColor(annotation.query)
    }]
  },
  Line: ({ annotation, ...props }) => (
    <>
      <div className="min-w-[1ch] box-content opacity-70 px-2">
        {annotation?.query}
      </div>
      <InnerLine merge={props} />
    </>
  ),
}
