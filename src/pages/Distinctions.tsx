import distinctions from '../../data/distinctions.json'
import profile from '../../data/profile.json'
import DistinctionsList from '../components/DistinctionsList'
import Reveal from '../components/Reveal'
import MaskedHeading from '../components/MaskedHeading'

const stats = [
  { value: String(profile.bibliometrics.citations), label: 'Citations' },
  { value: String(profile.bibliometrics.hIndex), label: 'h-index' },
  { value: String(profile.bibliometrics.i10Index), label: 'i10-index' },
  { value: String(profile.publicationSummary.total), label: 'Publications & Patents' },
]

function Distinctions() {
  return (
    <div className="flex flex-col gap-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          About the Lab
        </p>
        <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          About
        </MaskedHeading>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="font-serif text-2xl font-semibold leading-[1.3] text-stone-900 dark:text-stone-50 sm:text-3xl">
            {profile.lab.name} is a research group working at the intersection of water
            resources, climate change, and artificial intelligence.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-base leading-[1.75] text-stone-700 dark:text-stone-200">{profile.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.credentials.map((credential) => (
              <span
                key={credential}
                className="rounded-full border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-700 dark:border-stone-700 dark:text-stone-200"
              >
                {credential}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Reveal>
        <div className="flex flex-col gap-6 border-y border-stone-200 py-6 dark:border-stone-800 sm:flex-row sm:items-center sm:gap-10">
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-32 w-32 shrink-0 rounded-2xl border border-stone-200 object-cover object-top dark:border-stone-700"
          />
          <div>
            <p className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-50">{profile.name}</p>
            <p className="text-sm text-stone-700 dark:text-stone-200">{profile.title}</p>
            <p className="text-sm text-stone-700 dark:text-stone-200">
              {profile.department} &middot; {profile.institution}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i > 0 ? 'border-stone-200 dark:border-stone-800 sm:border-l sm:pl-6' : ''}>
            <p className="font-serif text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-stone-700 dark:text-stone-200">{stat.label}</p>
          </div>
        ))}
      </div>

      <section>
        <MaskedHeading as="h2" className="mb-8 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
          Recognition
        </MaskedHeading>
        <DistinctionsList items={distinctions} />
      </section>
    </div>
  )
}

export default Distinctions
