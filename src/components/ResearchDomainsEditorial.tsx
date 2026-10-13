import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { domains } from '../data/researchDomainsData'
import type { Domain } from '../data/researchDomainsData'
import MaskedHeading from './MaskedHeading'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

function DomainRow({ domain, index }: { domain: Domain; index: number }) {
  const reversed = index % 2 === 1
  const prefersReducedMotion = usePrefersReducedMotion()
  const rowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-24, 24])

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
        reversed ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08, clipPath: 'inset(0% 0% 0% 100%)' }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease: EASE }}
        className="overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
      >
        <motion.img
          src={domain.image}
          alt={domain.title}
          style={{ y: parallaxY }}
          className="h-full w-full object-contain"
        />
      </motion.div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: domain.accent }}>
          {domain.eyebrow}
        </p>
        <MaskedHeading
          as="h3"
          className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-stone-900 dark:text-stone-50 sm:text-3xl"
        >
          {domain.title}
        </MaskedHeading>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-4 max-w-xl text-base leading-[1.75] text-stone-700 dark:text-stone-200"
        >
          {domain.description}
        </motion.p>
      </div>
    </div>
  )
}

function ResearchDomainsEditorial() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      {domains.map((domain, index) => (
        <DomainRow key={domain.title} domain={domain} index={index} />
      ))}
    </div>
  )
}

export default ResearchDomainsEditorial
