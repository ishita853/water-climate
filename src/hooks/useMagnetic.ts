import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const RANGE_PX = 5

/** Extremely subtle magnetic pull for primary CTAs/arrow links — desktop mouse only, a few
 * pixels of spring-damped movement toward the cursor. Almost subconscious: the point is that
 * the element feels alive, not that anyone consciously notices a "magnetic" effect. */
export function useMagnetic<T extends HTMLElement = HTMLElement>() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 })
  const ref = useRef<T>(null)

  function onPointerMove(event: ReactPointerEvent<T>) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * RANGE_PX * 2)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * RANGE_PX * 2)
  }

  function onPointerLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, style: { x: springX, y: springY }, onPointerMove, onPointerLeave }
}
