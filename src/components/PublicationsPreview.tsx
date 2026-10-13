import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import publications from '../../data/publications.json'
import PubList from './PubList'

function PublicationsPreview() {
  const recent = [...publications].sort((a, b) => b.year - a.year).slice(0, 4)

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            Research Output
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl dark:text-stone-50 sm:text-3xl">
            Selected Publications
          </h2>
        </div>
        <Link
          to="/publications"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          View all {publications.length}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-5">
        <PubList publications={recent} />
      </div>
    </section>
  )
}

export default PublicationsPreview
