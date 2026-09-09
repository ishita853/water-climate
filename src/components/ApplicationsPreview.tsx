import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { applications } from '../data/applicationsData'
import ApplicationsCarousel from './ApplicationsCarousel'
import Reveal from './Reveal'

function ApplicationsPreview() {
  return (
    <Reveal>
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              Digital Platforms
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
              We build research tools for a sustainable future.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-stone-600 dark:text-stone-400">
              Our platforms span climate, water, and air quality, making complex environmental
              data accessible and actionable for India.
            </p>
          </div>
          <Link
            to="/applications"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            All applications
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-5">
          <ApplicationsCarousel apps={applications} />
        </div>
      </section>
    </Reveal>
  )
}

export default ApplicationsPreview
