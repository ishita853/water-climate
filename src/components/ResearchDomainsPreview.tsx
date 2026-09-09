import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ResearchDomains from './ResearchDomains'
import Reveal from './Reveal'

function ResearchDomainsPreview() {
  return (
    <Reveal>
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              Our Laboratory
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
              Research Domains
            </h2>
          </div>
          <Link
            to="/research"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            All research
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5">
          <ResearchDomains />
        </div>
      </section>
    </Reveal>
  )
}

export default ResearchDomainsPreview
