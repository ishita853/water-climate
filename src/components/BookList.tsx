import { BookOpen, ExternalLink } from 'lucide-react'
import type { Book } from '../types'
import { cardHover } from '../data/cardPalette'

interface BookListProps {
  books: Book[]
}

function groupByYear(books: Book[]) {
  const sorted = [...books].sort((a, b) => b.year - a.year)
  const groups: { year: number; items: Book[] }[] = []

  for (const book of sorted) {
    const group = groups[groups.length - 1]
    if (group && group.year === book.year) {
      group.items.push(book)
    } else {
      groups.push({ year: book.year, items: [book] })
    }
  }

  return groups
}

function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return <p className="text-stone-700 dark:text-stone-200">No books yet.</p>
  }

  const groups = groupByYear(books)

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.year}>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">{group.year}</h2>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          </div>
          <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {group.items.map((book) => (
              <li
                key={book.id}
                className={`flex gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
              >
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    className="h-28 w-20 shrink-0 rounded-md border border-stone-200 object-cover shadow-sm dark:border-stone-700"
                  />
                ) : (
                  <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
                    <BookOpen className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-medium leading-snug text-stone-900 dark:text-stone-100">{book.title}</p>
                  <p className="mt-1.5 text-sm text-stone-700 dark:text-stone-200">{book.authors}</p>
                  <p className="text-sm italic text-teal-700 dark:text-teal-400">
                    {book.publisher}
                    {book.isbn && (
                      <span className="ml-2 not-italic text-stone-700 dark:text-stone-200">· ISBN {book.isbn}</span>
                    )}
                  </p>
                  {book.doi && (
                    <div className="mt-3 flex gap-4 text-sm">
                      <a
                        href={`https://doi.org/${book.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-stone-700 transition-colors hover:text-teal-700 dark:text-stone-200 dark:hover:text-teal-400"
                      >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                        DOI
                      </a>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default BookList
