import {
  useId,
  useEffect,
  useReducer,
} from 'react'
import type { RenderResult } from 'mermaid'

type Action =
| { type: 'render:success'; payload: RenderResult }
| { type: 'render:error'; payload: Error }

type DataState =
| { status: 'pending'; data: undefined; error: undefined }
| { status: 'success'; data: RenderResult; error: undefined }
| { status: 'error'; data: undefined; error: Error }

function reducer(state: DataState, action: Action): DataState {
  switch (action.type) {
    case 'render:success':
      return { status: 'success', data: action.payload, error: undefined }
    case 'render:error':
      return { status: 'error', data: undefined, error: action.payload }
    default:
      return state
  }
}

export function useMermaidResult(code: string) {
  const id = useId()
  const [state, dispatch] = useReducer(reducer, {
    status: 'pending',
    data: undefined,
    error: undefined,
  })
  useEffect(() => {
    let ignore = false
    renderMermaid(id, code)
      .then((result) => {
        if (ignore) return
        dispatch({ type: 'render:success', payload: result })
      })
      .catch((error) => {
        if (ignore) return
        dispatch({ type: 'render:error', payload: error })
      })

    return () => {
      ignore = true
    }
  }, [id, code])

  return state
}

let initialized = false
let activeCount = 0
const MAX_CONCURRENT = 1
const DELAY_MS = 200
const queue: {
  id: string
  code: string
  resolve: (value: RenderResult) => void
  reject: (error: Error) => void
}[] = []

async function processQueue() {
  if (activeCount >= MAX_CONCURRENT || queue.length === 0) return
  const task = queue.shift()!
  activeCount++

  try {
    const mermaid = (await import('mermaid')).default
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        fontFamily: 'inherit',
        look: 'handDrawn',
      })
      initialized = true
    }
    const result = await mermaid.render(task.id, task.code)
    task.resolve(result)
  } catch (error) {
    task.reject(error as Error)
  } finally {
    activeCount--
    setTimeout(() => {
      processQueue()
    }, DELAY_MS)
  }
}

function renderMermaid(id: string, code: string) {
  return new Promise<RenderResult>((resolve, reject) => {
    queue.push({ id, code, resolve, reject })
    setTimeout(() => {
      processQueue()
    }, DELAY_MS)
  })
}
