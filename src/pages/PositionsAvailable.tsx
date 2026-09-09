import positions from '../../data/positions.json'
import Reveal from '../components/Reveal'
import { cardHover } from '../data/cardPalette'

const CARD = `rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 ${cardHover}`

function PositionsAvailable() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
        Positions Available
      </h1>

      <Reveal>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">Open Positions</h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {positions.openings.map((opening) => (
              <li key={opening.title} className={CARD}>
                <p className="font-medium text-stone-900 dark:text-stone-100">{opening.title}</p>
                {opening.description && (
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{opening.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">Qualifications</h2>
          <ul className="flex flex-col gap-1 text-stone-700 dark:text-stone-300">
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
    </div>
  )
}

export default PositionsAvailable
