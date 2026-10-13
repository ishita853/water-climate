import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface MaskedHeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 }

/** The "masked upward reveal" used for section/page headings sitewide — distinct from the
 * plain fade+translate `Reveal` used for body copy, and from the Hero's own bespoke
 * slideshow-synced reveal. Clips the heading from below and slides it up into place at once,
 * rather than a simple fade, so major headings read as "emerging" rather than "appearing". */
function MaskedHeading({ children, as = 'h2', className, delay = 0 }: MaskedHeadingProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const MotionTag = tags[as]

  return (
    <MotionTag
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 35, clipPath: 'inset(100% 0 0 0)' }
      }
      whileInView={
        prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }
      }
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

export default MaskedHeading
