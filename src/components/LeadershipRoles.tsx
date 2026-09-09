import { ArrowRight, Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import distinctions from '../../data/distinctions.json'
import Reveal from './Reveal'
import { cardStyle } from '../data/cardPalette'

const leadershipIds = ['dist-other-chair-professor', 'dist-other-narmada-centre-pi']
const roles = distinctions.filter((item) => leadershipIds.includes(item.id))

function LeadershipRoles() {
  if (roles.length === 0) return null

  return (
    <Reveal>
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
            Leadership &amp; Editorial Roles
          </h2>
          <Link
            to="/distinctions"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            All distinctions
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {roles.map((role, i) => {
            const style = cardStyle(i)
            return (
              <div
                key={role.id}
                className={`flex gap-3 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
              >
                <Landmark className="mt-0.5 h-5 w-5 shrink-0" style={{ color: style.dot }} strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-base font-semibold text-stone-900 dark:text-stone-50">
                    {role.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {role.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

export default LeadershipRoles
