import { allPosts as _allPosts } from 'content-collections'

export const allPosts = _allPosts.toSorted((a, b) => {
  if (!a.date) return 1
  if (!b.date) return -1
  return +new Date(b.date) - +new Date(a.date)
})

export const notes = allPosts.filter(({ category }) => category === 'notes')
