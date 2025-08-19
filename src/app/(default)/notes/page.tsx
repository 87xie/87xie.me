import Link from 'next/link'
import { notes } from '@/sorted-content'

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

export default function NotesPage() {
  return (
    <div>
      <h1>Notes</h1>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              className="grid"
              href={`/notes/${note.slug}`}
            >
              {note.date && (
                <time
                  dateTime={note.date}
                  className="text-black/60 text-xs"
                >
                  {formatter.format(new Date(note.date))}
                </time>
              )}
              <span className="underline">{note.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
