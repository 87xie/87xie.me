import GithubSlugger from 'github-slugger'

export function getToc(content: string) {
  const lines = content.split('\n')
  const toc: TocItem[] = []
  const sluger = new GithubSlugger()
  let isInCodeBlock = false

  for (const _line of lines) {
    const line = _line.trim()
    if (
      line.startsWith('```') ||
      line.startsWith('~~~')
    ) {
      isInCodeBlock = !isInCodeBlock
      continue
    }
    if (isInCodeBlock) continue

    // match headings (h2 and h3)
    const matched = line.match(/^(#{2,3})\s+(.*)$/)
    if (matched) {
      const level = matched[1].length
      const text = matched[2].trim()
      toc.push({
        id: sluger.slug(text),
        text,
        level,
      })
    }
  }

  return toc
}

export type TocItem = {
  id: string
  text: string
  level: number
}
