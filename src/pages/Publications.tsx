import profile from '../../data/profile.json'
import publications from '../../data/publications.json'
import books from '../../data/books.json'
import bookChapters from '../../data/bookChapters.json'
import PubList from '../components/PubList'
import BookList from '../components/BookList'
import BookChapterList from '../components/BookChapterList'
import MaskedHeading from '../components/MaskedHeading'
import { useScrollToHash } from '../hooks/useScrollToHash'

function SectionHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <MaskedHeading as="h2" className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
        {label}
      </MaskedHeading>
      <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
        {count}
      </span>
      <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
    </div>
  )
}

function Publications() {
  useScrollToHash()

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            {publications.length} Peer-Reviewed Works
          </p>
          <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            Publications
          </MaskedHeading>
        </div>
        {profile.socialLinks.googleScholar && (
          <a
            href={profile.socialLinks.googleScholar}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
          >
            Full list on Google Scholar →
          </a>
        )}
      </div>

      <div className="flex flex-col gap-20">
        <section id="general-articles">
          <SectionHeading label="Journal Articles" count={publications.length} />
          <PubList publications={publications} />
        </section>

        <section id="books">
          <SectionHeading label="Books" count={books.length} />
          <BookList books={books} />
        </section>

        <section id="books-chapters">
          <SectionHeading label="Book Chapters" count={bookChapters.length} />
          <BookChapterList chapters={bookChapters} />
        </section>
      </div>
    </div>
  )
}

export default Publications
