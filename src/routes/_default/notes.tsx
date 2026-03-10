import { Link, createFileRoute } from '@tanstack/react-router'
import { notes } from '@/sorted-content'

export const Route = createFileRoute('/_default/notes')({
  component: NotesPage,
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

function NotesPage() {
  return (
    <div>
      <h1>Notes</h1>
      <ul className="space-y-4">
        {notes.map((note: typeof notes[number]) => (
          <li key={note.slug}>
            <Link
              className="grid"
              to="/$category/$slug"
              params={{ category: 'notes', slug: note.slug }}
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
