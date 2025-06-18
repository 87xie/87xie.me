import Link from 'next/link'
import { allNotes } from 'content-collections'

const sortedNotes = allNotes.sort(
  (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
)

export function NoteList() {
  return (
    <ul className="not-prose space-y-3">
      {sortedNotes.map((note) => (
        <li key={note.slug}>
          <Link
            href={`/notes/${note.slug}`}
            className="flex flex-col gap-1 w-full md:flex-row md:items-center md:gap-2"
          >
            <span>{note.title}</span>
            <span className="text-xs text-gray-400">{note.date}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
