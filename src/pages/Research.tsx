import research from '../../data/research.json'
import patentsData from '../../data/patents.json'
import { domains } from '../data/researchDomainsData'
import ResearchDomainsEditorial from '../components/ResearchDomainsEditorial'
import ResearchAreasList from '../components/ResearchAreasList'
import MaskedHeading from '../components/MaskedHeading'
import SponsoredProjectsTimeline from '../components/SponsoredProjectsTimeline'
import PatentsList from '../components/PatentsList'
import { useScrollToHash } from '../hooks/useScrollToHash'
import type { Patent } from '../types'

const patents = patentsData as Patent[]

/** Projects only carry a free-text duration ("2013-2015", "Jan 2022-Jan 2025"), not a
 * clean date — pull the first four-digit year out of it so we can sort most-recent-first. */
function projectSortKey(duration: string) {
  const match = duration.match(/\d{4}/)
  return match ? parseInt(match[0], 10) : 0
}

const sortedProjects = [...research.nationalProjects].sort(
  (a, b) => projectSortKey(b.duration) - projectSortKey(a.duration),
)

// This page only surfaces patents that have actually been granted; filed applications
// are tracked separately (see the Applications page).
const grantedPatents = patents.filter((patent) => patent.status === 'Granted')

function SectionHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <MaskedHeading as="h2" className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
        {label}
      </MaskedHeading>
      <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
        {count}
      </span>
      <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
    </div>
  )
}

function Research() {
  useScrollToHash()

  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Our Laboratory
        </p>
        <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Research
        </MaskedHeading>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-stone-700 dark:text-stone-200">
          Six domains, two decades of hydro-climate science, from Himalayan cryosphere risk to
          deployable AI systems, unified by one mission: turning data into public resilience.
        </p>
      </div>

      <div className="flex flex-col gap-20 sm:gap-28">
        <section id="research-domains">
          <SectionHeading label="Research Domains" count={domains.length} />
          <ResearchDomainsEditorial />
        </section>

        <section id="research-areas">
          <SectionHeading label="Research Areas" count={research.areas.length} />
          <ResearchAreasList areas={research.areas} />
        </section>

        <section id="sponsored-projects">
          <SectionHeading label="Sponsored Research Projects" count={sortedProjects.length} />
          <SponsoredProjectsTimeline projects={sortedProjects} />
        </section>

        <section id="patents">
          <SectionHeading label="Patents & Technology Transfer" count={grantedPatents.length} />
          <PatentsList patents={grantedPatents} />
        </section>
      </div>
    </div>
  )
}

export default Research
