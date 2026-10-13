import profile from '../../data/profile.json'
import Reveal from './Reveal'

const deanLine = profile.secondaryTitles.find((line) => line.includes('Dean'))

interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: 'Top 2%', label: profile.highlight?.title ?? 'Scientists Worldwide' },
  { value: String(profile.publicationSummary.total), label: 'Publications & Patents' },
  { value: String(profile.bibliometrics.citations), label: `Citations · h-index ${profile.bibliometrics.hIndex}` },
  { value: String(profile.publicationSummary.patents), label: 'Patents' },
]

function HighlightsStrip() {
  return (
    <Reveal>
      <section className="border-y border-stone-200 py-10 dark:border-stone-800 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? 'border-stone-200 dark:border-stone-800 sm:border-l sm:pl-6' : ''}>
              <p className="font-serif text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-base leading-snug text-stone-700 dark:text-stone-200 sm:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
        {deanLine && (
          <p className="mt-8 text-base text-stone-800 dark:text-stone-100 sm:text-lg">
            {deanLine} &middot; {profile.department}, {profile.institution}
          </p>
        )}
      </section>
    </Reveal>
  )
}

export default HighlightsStrip
