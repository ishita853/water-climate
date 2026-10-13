import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import profile from '../../data/profile.json'
import students from '../../data/students.json'
import Reveal from './Reveal'
import { cardHover } from '../data/cardPalette'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { StudentEntry } from '../types'

interface TeamCard {
  key: string
  name: string
  role: string
  photo?: string
  detail?: string
}

const leadership: TeamCard = {
  key: 'pi',
  name: profile.name,
  role: 'Principal Investigator',
  photo: profile.photo,
  detail: profile.title,
}

const scholarCards: TeamCard[] = (students.phdOngoing as StudentEntry[]).map((entry) => ({
  key: entry.name,
  name: entry.name,
  role: 'Ph.D. Scholar',
  photo: entry.photo,
  detail: entry.topic,
}))

const cards: TeamCard[] = [leadership, ...scholarCards]

function initials(name: string) {
  return name
    .replace(/^(Prof\.|Dr\.|Mr\.|Ms\.)\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

function PersonCard({ person }: { person: TeamCard }) {
  return (
    <motion.li
      variants={item}
      className={`group flex w-[230px] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:w-[250px] ${cardHover}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-3xl font-semibold text-stone-700 dark:text-stone-200">
            {initials(person.name)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-teal-700 dark:text-teal-400">
          {person.role}
        </p>
        <p className="mt-1.5 font-serif text-base font-semibold leading-snug text-stone-900 dark:text-stone-50">
          {person.name}
        </p>
        {person.detail && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-700 dark:text-stone-200">
            {person.detail}
          </p>
        )}
      </div>
    </motion.li>
  )
}

function TeamPreview() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const trackRef = useRef<HTMLUListElement>(null)

  function scrollByCards(direction: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <Reveal>
      <section aria-label="Our team">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              Our Team
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl dark:text-stone-50 sm:text-3xl">
              People behind the research
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-200 sm:text-lg">
              A multidisciplinary research group working across water, climate, hydrology, remote
              sensing, AI and environmental systems.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll team left"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:border-teal-300 hover:text-teal-700 dark:border-stone-700 dark:text-stone-200 dark:hover:border-teal-700 dark:hover:text-teal-400"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Scroll team right"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:border-teal-300 hover:text-teal-700 dark:border-stone-700 dark:text-stone-200 dark:hover:border-teal-700 dark:hover:text-teal-400"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <Link
              to="/student-supervision"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              View Our Team
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <motion.ul
          ref={trackRef}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((person) => (
            <PersonCard key={person.key} person={person} />
          ))}
        </motion.ul>
      </section>
    </Reveal>
  )
}

export default TeamPreview
