import { CategoryNav } from './_components/category-nav'
import type { ReactNode } from 'react'

type NotesLayoutProps = {
  children: ReactNode
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-44">
        <p className="mb-3">Categroies</p>
        <CategoryNav />
      </div>
      <div className="mt-5 md:flex-grow md:mt-0 md:ml-5">
        {children}
      </div>
    </div>
  )
}
