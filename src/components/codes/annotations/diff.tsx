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
      query: getDiffColor(annotation.query),
    }]
  },
  Line: ({ annotation, ...props }) => (
    <>
      <div className="w-5 opacity-70 text-center">
        {annotation?.query ?? null}
      </div>
      <InnerLine merge={props} />
    </>
  ),
}
