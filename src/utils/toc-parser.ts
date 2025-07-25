import GithubSlugger from 'github-slugger'

export function getToc(content: string) {
  const lines = content.split('\n')
  const toc: TocItem[] = []
  const sluger = new GithubSlugger()

  for (const line of lines) {
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
