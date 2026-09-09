import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import publications from '../../data/publications.json'
import PubList from './PubList'

function PublicationsPreview() {
  const recent = [...publications].sort((a, b) => b.year - a.year).slice(0, 4)

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Selected Publications
        </h2>
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
