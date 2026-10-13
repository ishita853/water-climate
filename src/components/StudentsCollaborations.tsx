import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import students from '../../data/students.json'
import Reveal from './Reveal'

const stats = [
  { value: students.phdCompleted.length, label: 'Ph.D. Scholars Completed' },
  { value: students.phdOngoing.length, label: 'Ph.D. Scholars Ongoing' },
  {
    value:
      students.mtechCompleted.length +
      students.mtechOngoing.length +
      students.btechCompleted.length +
      students.btechOngoing.length,
    label: 'M.Tech. & B.Tech. Mentees',
  },
  { value: students.internationalFellows.length, label: 'International Doctoral Fellows' },
]

function StudentsCollaborations() {
  return (
    <Reveal>
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
            Students &amp; Collaborations
          </h2>
          <Link
            to="/student-supervision"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Full supervision record
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? 'border-stone-200 dark:border-stone-800 sm:border-l sm:pl-6' : ''}>
              <p className="font-serif text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-stone-700 dark:text-stone-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

export default StudentsCollaborations
