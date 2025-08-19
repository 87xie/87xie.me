import GithubSlugger from 'github-slugger'

export function getToc(content: string) {
  const lines = content.split('\n')
  const toc: TocItem[] = []
  const sluger = new GithubSlugger()
  const footnoteRefs = new Set<string>()
  const footnotes = new Map<string, string>()
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
    // match footnote reference
    const footnoteRefMatch = line.match(/^\[\^([^\]]+)\]/)
    if (footnoteRefMatch) {
      footnoteRefs.add(footnoteRefMatch[1])
    }
    // match footnote definition
    const footnoteDefMatch = line.match(/^\[\^([^\]]+)\]:\s+(.*)$/)
    if (footnoteDefMatch) {
      const footnoteRef = footnoteDefMatch[1]
      if (footnoteRefs.has(footnoteRef)) {
        const footnoteDef = footnoteDefMatch[2]
        footnotes.set(footnoteRef, footnoteDef)
      }
    }
  }

  if (footnotes.size > 0) {
    toc.push({
      id: 'footnote-label',
      text: 'Footnotes',
      level: 2,
    })
  }
  return toc
}

export type TocItem = {
  id: string
  text: string
  level: number
}
