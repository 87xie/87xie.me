import { allBlogs, allNotes } from 'content-collections'

const sortByDateDesc = <Post extends { date?: string }>(posts: Post[]) => posts.toSorted((a, b) => {
  if (!a.date) return 1
  if (!b.date) return -1
  return +new Date(b.date) - +new Date(a.date)
})

export const blogPosts = sortByDateDesc(allBlogs)
export const notes = sortByDateDesc(allNotes)
