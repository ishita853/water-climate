import { ExternalLink } from 'lucide-react'
import positions from '../../data/positions.json'
import Reveal from '../components/Reveal'
import MaskedHeading from '../components/MaskedHeading'
import { cardHover } from '../data/cardPalette'

const CARD = `rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 ${cardHover}`

function PositionsAvailable() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Join the Lab
        </p>
        <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Positions Available
        </MaskedHeading>
      </div>

      <Reveal>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">Open Positions</h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {positions.openings.map((opening) => (
              <li key={opening.title} className={CARD}>
                <p className="font-medium text-stone-900 dark:text-stone-100">{opening.title}</p>
                {opening.description && (
                  <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{opening.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">Qualifications</h2>
          <ul className="flex flex-col gap-1 text-stone-700 dark:text-stone-200">
            {positions.qualifications.map((qualification) => (
              <li key={qualification} className="flex gap-2">
                <span className="text-teal-600 dark:text-teal-400">&bull;</span>
                {qualification}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="rounded-r-lg border-l-4 border-teal-600 bg-teal-50 p-4 dark:border-teal-500 dark:bg-teal-950/30">
          <p className="text-sm text-teal-900 dark:text-teal-200">{positions.howToApply}</p>
          <a
            href={`mailto:${positions.contactEmail}`}
            className="mt-2 inline-block text-sm font-medium text-teal-700 underline hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
          >
            {positions.contactEmail}
          </a>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <a
          href="https://www.iiti.ac.in/careers"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-teal-500"
        >
          View all openings at IIT Indore
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </div>
  )
}

export default PositionsAvailable
