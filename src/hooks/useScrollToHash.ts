import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the element matching the current URL hash — used by pages that removed their
 * in-page section sidebar in favor of jump-links from the header dropdown. Runs on mount and
 * whenever the hash changes (including from a click while already on the page). */
export function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    // Wait a frame so the target section has actually mounted/laid out first.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [hash])
}
