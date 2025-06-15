import Link from 'next/link'
// import { CategoryNav } from './_components/category-nav'
import { allNotes } from 'content-collections'

export default async function NotesPage() {
  // const categories = [...new Set(allNotes.map((note) => note.category))]

  return (
    <div className="flex flex-col md:flex-row">
      {/* <div className="w-full md:w-44">
        <p className="mb-3">Categroies</p>
        <CategoryNav categories={categories} />
      </div> */}
      <ul className="mt-5 md:flex-grow md:mt-0">
        {allNotes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="flex items-center gap-2 w-full py-2 text-md"
            >
              <span>{note.title}</span>
              <span className="text-xs text-gray-400">{note.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
