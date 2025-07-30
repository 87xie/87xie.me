import Link from 'next/link'
import cx from 'clsx'
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
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              className={cx(
                'grid',
                'md:flex md:flex-wrap md:items-baseline md:gap-3',
              )}
              href={`/notes/${note.slug}`}
            >
              {note.title}
              {note.date && (
                <time
                  dateTime={note.date}
                  className="text-black/50 text-xs"
                >
                  {formatter.format(new Date(note.date))}
                </time>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
