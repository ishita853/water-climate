import activities from '../../data/activities.json'
import Reveal from '../components/Reveal'
import MaskedHeading from '../components/MaskedHeading'
import { cardHover } from '../data/cardPalette'

const CARD = `rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 ${cardHover}`

function OtherActivities() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
          Beyond the Lab
        </p>
        <MaskedHeading as="h1" className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
          Other Activities
        </MaskedHeading>
      </div>

      <Reveal>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
            Invited Lectures
          </h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {activities.invitedLectures.map((lecture) => (
              <li key={lecture.title} className={CARD}>
                <p className="font-medium text-stone-900 dark:text-stone-100">{lecture.title}</p>
                {lecture.venue && <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">{lecture.venue}</p>}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
            Workshops &amp; Short Courses Coordinated
          </h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {activities.workshops.map((workshop) => (
              <li key={workshop.title} className={CARD}>
                <p className="font-medium text-stone-900 dark:text-stone-100">{workshop.title}</p>
                <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">
                  {[workshop.venue, workshop.date].filter(Boolean).join(' · ')}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
            Scientific Committee Memberships
          </h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {activities.committees.map((committee) => (
              <li key={`${committee.role}-${committee.event}`} className={CARD}>
                <p className="font-medium text-stone-900 dark:text-stone-100">{committee.role}</p>
                <p className="mt-1 text-sm text-stone-700 dark:text-stone-200">
                  {[committee.event, committee.date].filter(Boolean).join(' · ')}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
            Professional Memberships
          </h2>
          <ul className="flex flex-wrap gap-2">
            {activities.memberships.map((membership) => (
              <li
                key={membership}
                className="rounded bg-stone-100 px-3 py-1 text-sm text-stone-700 transition-colors duration-300 hover:bg-teal-50 hover:text-teal-800 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-teal-950 dark:hover:text-teal-300"
              >
                {membership}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  )
}

export default OtherActivities
