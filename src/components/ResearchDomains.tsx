import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { domains } from '../data/researchDomainsData'
import type { Domain } from '../data/researchDomainsData'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const AUTO_ADVANCE_MS = 6000
const TRANSITION_MS = 4000
const EASE = [0.22, 1, 0.36, 1] as const

const captionContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const captionChild = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/** Fills the fixed-height stage exactly. Text renders at its natural size; the image
 * shrinks (never crops, via object-contain) to whatever space remains. Remounts fresh
 * on every slide change (parent keys on activeIndex), so the Ken Burns zoom and the
 * caption stagger both replay automatically — no manual re-trigger bookkeeping needed. */
function DomainCardBody({ domain, reducedMotion }: { domain: Domain; reducedMotion: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-stone-50 dark:bg-stone-800">
        <img
          src={domain.image}
          alt={domain.title}
          className="max-h-full max-w-full object-contain"
          style={reducedMotion ? undefined : { animation: 'carousel-kenburns 8s ease-out forwards' }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={captionContainer}
        className="flex shrink-0 flex-col p-6 sm:p-8"
      >
        <motion.p
          variants={captionChild}
          className="text-xs font-semibold uppercase tracking-[0.12em]"
          style={{ color: domain.accent }}
        >
          {domain.eyebrow}
        </motion.p>
        <motion.h3
          variants={captionChild}
          className="mt-2 font-serif text-[22px] font-semibold leading-snug text-stone-900 dark:text-stone-50 sm:text-2xl"
        >
          {domain.title}
        </motion.h3>
        <motion.p variants={captionChild} className="mt-3 text-[1.0625rem] leading-[1.7] text-stone-700 dark:text-stone-200">
          {domain.description}
        </motion.p>
      </motion.div>
    </article>
  )
}

function ProgressIndicator({
  active,
  total,
  onSelect,
  reducedMotion,
}: {
  active: number
  total: number
  onSelect: (index: number) => void
  reducedMotion: boolean
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-3 pt-6">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={`Show domain ${i + 1}`}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${
              i === active
                ? 'w-6 bg-teal-600 dark:bg-teal-500'
                : 'w-1.5 bg-stone-300 hover:bg-stone-400 dark:bg-stone-700 dark:hover:bg-stone-600'
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-medium tracking-wide text-stone-700 dark:text-stone-200">
        {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <div className="h-[3px] w-24 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
        <div
          key={active}
          className="h-full origin-left rounded-full bg-teal-600 dark:bg-teal-500"
          style={
            reducedMotion
              ? { transform: 'scaleX(1)' }
              : {
                  animationName: 'carousel-progress-fill',
                  animationDuration: `${AUTO_ADVANCE_MS}ms`,
                  animationTimingFunction: 'linear',
                  animationFillMode: 'forwards',
                }
          }
        />
      </div>
    </div>
  )
}

function ResearchDomains() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = domains.length
  const prefersReducedMotion = usePrefersReducedMotion()

  // Runs continuously — never paused by hover, focus, or scroll, and never stopped by
  // reduced-motion (only the transition itself simplifies below) — so the section is
  // always visibly advancing on its own.
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [total])

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[600px] w-full max-w-6xl overflow-hidden sm:h-[640px] lg:h-[680px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 60, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -60, scale: 0.96, filter: 'blur(6px)' }}
            transition={{ duration: prefersReducedMotion ? 0.15 : TRANSITION_MS / 1000, ease: EASE }}
          >
            <DomainCardBody domain={domains[activeIndex]} reducedMotion={prefersReducedMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

      <ProgressIndicator
        active={activeIndex}
        total={total}
        onSelect={setActiveIndex}
        reducedMotion={prefersReducedMotion}
      />
    </div>
  )
}

export default ResearchDomains
