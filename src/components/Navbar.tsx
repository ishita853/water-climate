import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTAINER, HEADER_HEIGHT } from '../lib/layout'
import { useMagnetic } from '../hooks/useMagnetic'
import ThemeToggle from './ThemeToggle'

const MotionLink = motion.create(Link)
const EASE = [0.22, 1, 0.36, 1] as const

interface SectionLink {
  id: string
  label: string
}

interface PrimaryLink {
  to: string
  label: string
  sections?: SectionLink[]
}

const primaryLinks: PrimaryLink[] = [
  { to: '/', label: 'Home' },
  { to: '/distinctions', label: 'About' },
  {
    to: '/research',
    label: 'Research',
    sections: [
      { id: 'research-domains', label: 'Research Domains' },
      { id: 'research-areas', label: 'Research Areas' },
      { id: 'sponsored-projects', label: 'Sponsored Research Projects' },
      { id: 'patents', label: 'Patents & Technology Transfer' },
    ],
  },
  { to: '/applications', label: 'Applications' },
  {
    to: '/publications',
    label: 'Publications',
    sections: [
      { id: 'general-articles', label: 'Journal Articles' },
      { id: 'books', label: 'Books' },
      { id: 'books-chapters', label: 'Book Chapters' },
    ],
  },
  {
    to: '/student-supervision',
    label: 'Team',
    sections: [
      { id: 'overview', label: 'Overview' },
      { id: 'alumni', label: 'Alumni' },
      { id: 'phd-scholars', label: 'Ph.D. Scholars' },
      { id: 'students', label: 'Students' },
    ],
  },
  { to: '/events', label: 'Events' },
  { to: '/teaching', label: 'Teaching' },
]

const moreLinks = [
  { to: '/other-activities', label: 'Other Activities' },
  { to: '/positions-available', label: 'Positions Available' },
]

const allLinks = [...primaryLinks, ...moreLinks]

/** Nav item for a page that has multiple in-page sections (Research, Team). The label itself
 * is a normal Link (click it, land on the page). The adjacent chevron opens a dropdown of jump
 * links to each section — clicking one while already on that page just smooth-scrolls there;
 * clicking it from elsewhere navigates to `${to}#${id}` and lets `useScrollToHash` on the
 * destination page scroll to it once mounted. */
function NavItemWithSections({ to, label, sections }: { to: string; label: string; sections: SectionLink[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isActive = location.pathname === to

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  function handleSectionClick(event: React.MouseEvent, id: string) {
    setIsOpen(false)
    if (location.pathname !== to) return // let the Link navigate normally to `${to}#${id}`
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={ref} className="relative flex shrink-0 items-center">
      <NavLink to={to} className="group relative whitespace-nowrap py-2 pr-1 text-[0.9375rem] font-medium min-[1600px]:text-[1rem] min-[1800px]:text-[1.125rem] min-[2200px]:text-[1.1875rem]">
        <span
          className={`transition-colors duration-300 ${
            isActive
              ? 'text-teal-600 dark:text-teal-400'
              : 'text-stone-800 group-hover:text-teal-600 dark:text-teal-100 dark:group-hover:text-teal-300'
          }`}
        >
          {label}
        </span>
        {isActive ? (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-0 -bottom-px h-px rounded-full bg-teal-600 dark:bg-teal-400"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 rounded-full bg-teal-600/60 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-teal-400/60"
          />
        )}
      </NavLink>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${label} sections`}
        className={`flex items-center py-2 transition-colors duration-300 ${
          isActive ? 'text-teal-600 dark:text-teal-400' : 'text-stone-700 hover:text-teal-600 dark:text-teal-100 dark:hover:text-teal-300'
        }`}
      >
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-0 top-full z-20 mt-3 w-64 overflow-hidden rounded-lg border border-teal-900/10 bg-white/95 py-1.5 shadow-lg backdrop-blur-sm dark:border-teal-100/10 dark:bg-abyss-900/95"
          >
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`${to}#${section.id}`}
                onClick={(event) => handleSectionClick(event, section.id)}
                className="block px-4 py-2.5 text-base font-medium text-stone-700 transition-colors hover:bg-teal-50/60 dark:text-teal-100 dark:hover:bg-white/5"
              >
                {section.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink to={to} end={end} className="group relative shrink-0 whitespace-nowrap py-2 text-[0.9375rem] font-medium min-[1600px]:text-[1rem] min-[1800px]:text-[1.125rem] min-[2200px]:text-[1.1875rem]">
      {({ isActive }) => (
        <>
          <span
            className={`transition-colors duration-300 ${
              isActive
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-stone-800 group-hover:text-teal-600 dark:text-teal-100 dark:group-hover:text-teal-300'
            }`}
          >
            {label}
          </span>
          {isActive ? (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-0 -bottom-px h-px rounded-full bg-teal-600 dark:bg-teal-400"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 rounded-full bg-teal-600/60 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-teal-400/60"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const contactMagnetic = useMagnetic<HTMLAnchorElement>()

  useEffect(() => {
    if (!isMoreOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMoreOpen])

  // Closes whichever overlay (mobile panel or the More dropdown) is open, so Escape
  // works from anywhere without needing separate listeners per overlay.
  useEffect(() => {
    if (!isOpen && !isMoreOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      setIsMoreOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isMoreOpen])

  // Locks page scroll while the full-height mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const location = useLocation()
  const isMoreActive = moreLinks.some((link) => location.pathname === link.to)

  return (
    <header
      className={`sticky top-0 z-40 border-b border-teal-900/[0.07] bg-[linear-gradient(90deg,#F7FAFC_0%,#EEF7FB_48%,#F8FBFD_100%)] transition-shadow duration-[350ms] dark:border-teal-100/[0.07] dark:bg-[linear-gradient(90deg,#06131F_0%,#071E30_50%,#06131F_100%)] ${
        isScrolled ? 'shadow-[0_1px_0_0_rgba(11,94,142,0.16)]' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className={`${CONTAINER} flex items-center justify-between gap-4 transition-[height] duration-[350ms] min-[1360px]:grid min-[1360px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1360px]:gap-6 ${
          isScrolled ? 'h-16 md:h-[4.5rem] lg:h-[4.75rem]' : `${HEADER_HEIGHT}`
        }`}
      >
        {/* Left: brand */}
        <NavLink to="/" end className="group flex shrink-0 items-center gap-3 min-[1360px]:justify-self-start">
          <img
            src="/assets/images/iit-indore-logo.png"
            alt="IIT Indore"
            className="h-11 w-11 shrink-0 object-contain drop-shadow-sm sm:h-12 sm:w-12 min-[1800px]:h-14 min-[1800px]:w-14 min-[2200px]:h-16 min-[2200px]:w-16"
          />
          <span className="hidden flex-col sm:flex">
            <span className="whitespace-nowrap font-serif text-[1.25rem] font-semibold leading-tight tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-teal-700 dark:text-white lg:text-[1.375rem] min-[1800px]:text-[1.5rem] min-[2200px]:text-[1.625rem]">
              Water, Climate &amp; Sustainability Lab
            </span>
            <span className="hidden whitespace-nowrap text-[0.8125rem] font-semibold uppercase tracking-[0.18em] min-[1800px]:text-[0.875rem] min-[2200px]:text-[0.9375rem] text-teal-700 dark:text-teal-300 lg:block">
              Indian Institute of Technology Indore
            </span>
          </span>
        </NavLink>

        {/* Center: nav links */}
        <div className="hidden items-center gap-3 min-[1360px]:flex min-[1360px]:justify-self-center min-[1600px]:gap-4 min-[1800px]:gap-6 min-[2200px]:gap-8">
          {primaryLinks.map((link) =>
            link.sections ? (
              <NavItemWithSections key={link.to} to={link.to} label={link.label} sections={link.sections} />
            ) : (
              <NavItem key={link.to} to={link.to} label={link.label} end={link.to === '/'} />
            ),
          )}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen((open) => !open)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
              className={`group relative flex shrink-0 items-center gap-1 whitespace-nowrap py-2 text-[0.9375rem] font-medium min-[1600px]:text-[1rem] min-[1800px]:text-[1.125rem] min-[2200px]:text-[1.1875rem] transition-colors duration-300 ${
                isMoreActive
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-stone-800 hover:text-teal-600 dark:text-teal-100 dark:hover:text-teal-300'
              }`}
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-px rounded-full bg-teal-600 transition-transform duration-300 ease-out dark:bg-teal-400 ${
                  isMoreActive ? 'scale-x-100' : 'origin-left scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>
            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="absolute right-0 top-full z-20 mt-3 w-56 overflow-hidden rounded-lg border border-teal-900/10 bg-white/95 py-1.5 shadow-lg backdrop-blur-sm dark:border-teal-100/10 dark:bg-abyss-900/95"
                >
                  {moreLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMoreOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300'
                            : 'text-stone-700 hover:bg-teal-50/60 dark:text-teal-100 dark:hover:bg-white/5'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: theme toggle + CTA */}
        <div className="hidden items-center justify-end gap-3 min-[1360px]:flex min-[1360px]:justify-self-end">
          <ThemeToggle />
          <div className="h-5 w-px bg-teal-900/10 dark:bg-teal-100/10" />
          <MotionLink
            to="/contact"
            {...contactMagnetic}
            className="group/cta relative inline-flex h-11 shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-md bg-gradient-to-r from-teal-700 to-teal-500 px-6 text-[1rem] font-semibold min-[1800px]:text-[1.125rem] min-[2200px]:text-[1.1875rem] text-white shadow-sm transition-all duration-300 hover:from-teal-600 hover:to-teal-400 hover:shadow-md"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
            />
            <span className="relative">Contact</span>
          </MotionLink>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 min-[1360px]:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-teal-600/10 dark:text-teal-100 dark:hover:bg-teal-400/10"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile full-height drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-mineral-50 dark:bg-abyss-950 min-[1360px]:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {allLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-teal-900/10 py-3.5 text-lg font-medium transition-colors dark:border-teal-100/10 ${
                        isActive
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-stone-800 dark:text-teal-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: allLinks.length * 0.04, ease: EASE }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 block rounded-md bg-gradient-to-r from-teal-700 to-teal-500 px-4 py-3 text-center text-base font-semibold text-white shadow-sm"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
