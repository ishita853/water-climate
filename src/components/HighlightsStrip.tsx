import type { LucideIcon } from 'lucide-react'
import { Award, BookOpen, Building2, Quote } from 'lucide-react'
import profile from '../../data/profile.json'
import Reveal from './Reveal'
import { cardStyle } from '../data/cardPalette'

const deanLine = profile.secondaryTitles.find((line) => line.includes('Dean'))

interface Highlight {
  icon: LucideIcon
  value: string
  label: string
}

const highlights: Highlight[] = [
  { icon: Award, value: 'Top 2%', label: profile.highlight?.title ?? 'Scientists Worldwide' },
  {
    icon: BookOpen,
    value: String(profile.publicationSummary.total),
    label: 'Publications & Patents',
  },
  { icon: Building2, value: 'Former Dean', label: deanLine ?? 'Infrastructure Development' },
  {
    icon: Quote,
    value: String(profile.bibliometrics.citations),
    label: `Citations · h-index ${profile.bibliometrics.hIndex}`,
  },
]

function HighlightsStrip() {
  return (
    <Reveal>
      <section>
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">Highlights</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const style = cardStyle(i)
            return (
              <div
                key={item.label}
                className={`rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
              >
                <item.icon className="h-6 w-6" style={{ color: style.dot }} strokeWidth={1.5} />
                <p className="mt-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-stone-600 dark:text-stone-400">{item.label}</p>
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

export default HighlightsStrip
