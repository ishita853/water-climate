import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import profile from '../../data/profile.json'
import { socialLinksMeta } from '../data/socialLinksMeta'
import { CONTAINER } from '../lib/layout'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const explore = [
  { to: '/research', label: 'Research' },
  { to: '/applications', label: 'Applications' },
  { to: '/publications', label: 'Publications' },
  { to: '/student-supervision', label: 'Team' },
]

const connect = [
  { to: '/events', label: 'Events' },
  { to: '/teaching', label: 'Teaching' },
  { to: '/distinctions', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const EASE = [0.22, 1, 0.36, 1] as const

/** Restrained hydrological contour lines — cartographic, not decorative. Static, extremely
 * low-opacity, monochromatic; reads as scientific background texture rather than an
 * illustration. */
function ContourLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-teal-700 dark:text-teal-300"
      preserveAspectRatio="none"
      viewBox="0 0 1000 300"
      fill="none"
    >
      <path d="M0 40 C 200 10, 300 70, 500 40 S 800 10, 1000 45" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <path d="M0 90 C 220 60, 320 120, 520 90 S 820 55, 1000 95" stroke="currentColor" strokeWidth="1" opacity="0.09" />
      <path d="M0 150 C 240 115, 340 175, 540 150 S 840 110, 1000 155" stroke="currentColor" strokeWidth="1" opacity="0.07" />
      <path d="M0 220 C 260 185, 360 245, 560 220 S 860 180, 1000 225" stroke="currentColor" strokeWidth="1" opacity="0.05" />
    </svg>
  )
}

function FooterLinkGroup({ heading, links }: { heading: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-700 dark:text-teal-100">
        {heading}
      </h2>
      <ul className="mt-4 flex flex-col gap-3 text-base">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-stone-700 transition-colors duration-200 hover:text-teal-600 dark:text-teal-100 dark:hover:text-teal-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  const socialLinks = Object.entries(profile.socialLinks)
  const prefersReducedMotion = usePrefersReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <footer className="relative overflow-hidden border-t border-teal-900/[0.08] bg-[linear-gradient(180deg,#F7FAFC_0%,#EAF6FB_55%,#F7FAFC_100%)] dark:border-teal-100/[0.08] dark:bg-[linear-gradient(180deg,#06131F_0%,#071E30_55%,#06131F_100%)]">
      <ContourLines />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className={`relative ${CONTAINER} grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.6fr_0.7fr_0.7fr] lg:gap-10`}
      >
        <motion.div variants={item} className="max-w-md">
          <p className="font-serif text-[1.875rem] font-semibold leading-tight text-stone-900 dark:text-white sm:text-4xl">
            Water, Climate
            <br />
            &amp; Sustainability Lab
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-700 dark:text-teal-100">
            Researching water resources, climate resilience, and AI-driven environmental
            modeling within the {profile.department}, {profile.institution}.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              title="Email"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#71717A' }}
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            {socialLinks.map(([platform, url]) => {
              const meta = socialLinksMeta[platform]
              if (!meta) return null
              const Icon = meta.icon
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={meta.label}
                  title={meta.label}
                  className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                  style={meta.image ? undefined : { backgroundColor: meta.color }}
                >
                  {meta.image ? (
                    <img src={meta.image} alt={meta.label} className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  )}
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div variants={item}>
          <FooterLinkGroup heading="Explore" links={explore} />
        </motion.div>

        <motion.div variants={item}>
          <FooterLinkGroup heading="Connect" links={connect} />
        </motion.div>
      </motion.div>

      <div
        className={`relative ${CONTAINER} flex flex-col gap-2 border-t border-teal-900/[0.08] py-6 text-sm text-stone-700 dark:border-teal-100/[0.08] dark:text-teal-100 sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>
          {profile.institution} &middot; &copy; {year} {profile.lab.name}
        </p>
        <p>
          Led by {profile.name}, {profile.title}
        </p>
      </div>
    </footer>
  )
}

export default Footer
