import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import profile from '../../data/profile.json'
import { buttonHover } from '../data/cardPalette'
import { CONTAINER, HEADER_HEIGHT } from '../lib/layout'
import ThemeToggle from './ThemeToggle'

const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/distinctions', label: 'About' },
  { to: '/student-supervision', label: 'Team' },
  { to: '/publications', label: 'Publications' },
  { to: '/events', label: 'Events' },
  { to: '/research', label: 'Research' },
  { to: '/applications', label: 'Applications' },
  { to: '/teaching', label: 'Teaching' },
]

const moreLinks = [
  { to: '/other-activities', label: 'Other Activities' },
  { to: '/positions-available', label: 'Positions Available' },
]

const allLinks = [...primaryLinks, ...moreLinks]

function NavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink to={to} end={end} className="group relative shrink-0 whitespace-nowrap py-2 text-[13.5px] font-medium">
      {({ isActive }) => (
        <>
          <span
            className={`transition-colors ${
              isActive
                ? 'text-teal-700 dark:text-teal-400'
                : 'text-stone-600 group-hover:text-teal-700 dark:text-stone-400 dark:group-hover:text-teal-400'
            }`}
          >
            {label}
          </span>
          {isActive ? (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-teal-600 dark:bg-teal-400"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 rounded-full bg-teal-600/60 transition-transform duration-200 ease-out group-hover:scale-x-100 dark:bg-teal-400/60"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

const initials = profile.name
  .replace(/^(Prof\.|Dr\.)\s*/i, '')
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded px-3 py-2 text-sm font-medium ${
      isActive
        ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400'
        : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
    }`

  const location = useLocation()
  const isMoreActive = moreLinks.some((link) => location.pathname === link.to)

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[box-shadow,border-color,background-color] duration-200 ${
        isScrolled
          ? 'border-stone-200 bg-stone-50 shadow-sm dark:border-stone-800 dark:bg-stone-950'
          : 'border-stone-200/60 bg-stone-50/90 dark:border-stone-800/60 dark:bg-stone-950/90'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`${CONTAINER} ${HEADER_HEIGHT} flex items-center justify-between gap-4 xl:grid xl:grid-cols-[minmax(316px,1fr)_auto_minmax(160px,1fr)] xl:gap-8`}
      >
        {/* Left: brand */}
        <NavLink to="/" end className="group flex shrink-0 items-center gap-3 xl:justify-self-start">
          <img
            src="/assets/images/iit-indore-logo.png"
            alt="IIT Indore"
            className="hidden h-11 w-11 shrink-0 object-contain sm:block"
          />
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white shadow-sm transition-colors group-hover:bg-teal-700 dark:bg-teal-500 dark:group-hover:bg-teal-400">
            {initials}
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="whitespace-nowrap font-serif text-base font-semibold leading-tight text-stone-900 transition-colors group-hover:text-teal-700 dark:text-stone-50 dark:group-hover:text-teal-400 lg:text-[17px]">
              {profile.name}
            </span>
            <span className="hidden whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-stone-500 dark:text-stone-500 lg:block">
              {profile.department}
            </span>
          </span>
        </NavLink>

        {/* Center: nav links */}
        <div className="hidden items-center gap-5 xl:flex xl:justify-self-center">
          {primaryLinks.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} end={link.to === '/'} />
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen((open) => !open)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
              className={`group relative flex shrink-0 items-center gap-1 whitespace-nowrap py-2 text-[13.5px] font-medium transition-colors ${
                isMoreActive
                  ? 'text-teal-700 dark:text-teal-400'
                  : 'text-stone-600 hover:text-teal-700 dark:text-stone-400 dark:hover:text-teal-400'
              }`}
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-teal-600 transition-transform duration-200 ease-out dark:bg-teal-400 ${
                  isMoreActive ? 'scale-x-100' : 'origin-left scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>
            {isMoreOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-lg border border-stone-200 bg-white py-1.5 shadow-lg dark:border-stone-800 dark:bg-stone-900">
                {moreLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMoreOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400'
                          : 'text-stone-600 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: theme toggle + CTA */}
        <div className="hidden items-center justify-end gap-3 xl:flex xl:justify-self-end">
          <ThemeToggle />
          <div className="h-5 w-px bg-stone-200 dark:bg-stone-800" />
          <Link
            to="/contact"
            className={`inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 ${buttonHover}`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-stone-200 dark:border-stone-800 xl:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {allLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={mobileLinkClass}
                  end={link.to === '/'}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-teal-600 px-3 py-2.5 text-center text-sm font-semibold text-white dark:bg-teal-500"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
