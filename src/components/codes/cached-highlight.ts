import { highlight, type RawCode, type HighlightedCode } from 'codehike/code'

type HighlightParams = Parameters<typeof highlight>

const cache = new Map<string, Promise<HighlightedCode>>()

export function cachedHighlight(codeblock: RawCode, theme: HighlightParams[1]) {
  const key = `${String(theme)}:${codeblock.lang}:${codeblock.meta}:${codeblock.value}`
  if (!cache.has(key)) {
    cache.set(key, highlight(codeblock, theme))
  }
  return cache.get(key)!
}
