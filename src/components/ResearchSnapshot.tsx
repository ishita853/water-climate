import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BrainCircuit, MountainSnow, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Reveal from './Reveal'

interface Snapshot {
  icon: LucideIcon
  title: string
  sentence: string
  accent: string
  tint: string
  darkTint: string
}

const snapshots: Snapshot[] = [
  {
    icon: Waves,
    title: 'Hydrology & Water Systems',
    sentence:
      'Physically based hydrological models translating river-basin data into water-security intelligence for India.',
    accent: '#0F766E',
    tint: '#F0FDFA',
    darkTint: '#0F2E2B',
  },
  {
    icon: MountainSnow,
    title: 'Cryosphere & Climate Risk',
    sentence:
      'Glacial lake outburst flood hazard research and snowmelt modeling across the Himalayan cryosphere.',
    accent: '#0369A1',
    tint: '#F0F9FF',
    darkTint: '#0C2B3D',
  },
  {
    icon: BrainCircuit,
    title: 'AI & Decision Intelligence',
    sentence:
      'Deployable AI systems (flood tools, water portals, and patents) turning research into public infrastructure.',
    accent: '#4338CA',
    tint: '#EEF2FF',
    darkTint: '#1E1B4B',
  },
]

function ResearchSnapshot() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Reveal>
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Research Snapshot
        </h2>
        <Link
          to="/research"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          View full research
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {snapshots.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: isDark ? item.darkTint : item.tint }}
            >
              <item.icon className="h-5 w-5" style={{ color: item.accent }} strokeWidth={1.5} />
            </div>
            <h3 className="mt-3 font-serif text-base font-semibold text-stone-900 dark:text-stone-50">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {item.sentence}
            </p>
          </div>
        ))}
      </div>
    </section>
    </Reveal>
  )
}

export default ResearchSnapshot
