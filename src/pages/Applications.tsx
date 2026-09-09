import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { applications } from '../data/applicationsData'
import Reveal from '../components/Reveal'
import { cardHover } from '../data/cardPalette'

function ApplicationCard({ app, index }: { app: (typeof applications)[number]; index: number }) {
  return (
    <Reveal delay={Math.min(index, 4) * 0.05}>
      <Link
        to={`/applications/${app.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 ${cardHover}`}
      >
        <div className="flex items-center justify-between gap-3 p-6 pb-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800"
            style={{ boxShadow: `0 1px 6px ${app.accent}22` }}
          >
            <img src={app.icon} alt="" className="h-full w-full object-cover" />
          </div>
          {app.status === 'unavailable' && (
            <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500 dark:bg-stone-800 dark:text-stone-400">
              Temporarily unavailable
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col px-6 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: app.accent }}>
            {app.domainTag}
          </p>
          <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-stone-900 transition-colors duration-300 group-hover:text-teal-800 dark:text-stone-50 dark:group-hover:text-teal-300">
            {app.title}
          </h3>
          {app.description && (
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{app.description}</p>
          )}
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400">
            Launch Application
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

function Applications() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Digital Platforms
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Applications
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-xl font-semibold text-stone-800 dark:text-stone-100">
          We build research tools for a sustainable future.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-[1.7] text-stone-600 dark:text-stone-400">
          Our platforms span climate, water, and air quality, making complex environmental data
          accessible and actionable for India. Open each one to explore it directly inside the
          portfolio, or launch it in its own tab.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {applications.map((app, index) => (
          <ApplicationCard key={app.slug} app={app} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Applications
