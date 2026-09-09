import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import VerticalPhotoTrack from './VerticalPhotoTrack'

const IMAGE_INTERVAL_MS = 1500
const TRANSITION_S = 0.6

interface EventGalleryProps {
  photos: string[]
  eventName: string
}

/** Compact archive-card gallery — uses the same VerticalPhotoTrack mechanism as the Recent
 * Events hero (one reusable slideshow implementation, not two). One instance per event card,
 * cycling only that event's own photos. Gated by IntersectionObserver so only on/near-screen
 * cards animate — once a card becomes visible its timer starts immediately, and each instance
 * owns its own index/timer (no shared/global state), which is what makes every multi-photo
 * event in the archive cycle independently. Pure timer: no hover/focus/drag handling of any
 * kind, so nothing mouse-related can ever pause or interfere with it. */
function EventGallery({ photos, eventName }: EventGalleryProps) {
  const count = photos.length
  const hasMultiple = count > 1
  const [index, setIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  function advance() {
    setIndex((i) => (i + 1) % count)
  }

  const advanceRef = useRef(advance)
  advanceRef.current = advance

  useEffect(() => {
    const el = containerRef.current
    if (!el || !hasMultiple) return
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: '150px',
      threshold: 0.2,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMultiple])

  // Keeps advancing even when the visitor prefers reduced motion — the content itself is
  // still meant to update automatically; VerticalPhotoTrack is what turns the *animation*
  // off in that case (instant swap instead of a slide), not this timer.
  useEffect(() => {
    if (!hasMultiple || !isInView) return
    const id = setInterval(() => advanceRef.current(), IMAGE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [hasMultiple, isInView])

  if (count === 0) return null

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800"
    >
      <VerticalPhotoTrack
        photos={photos}
        activeIndex={index}
        altPrefix={eventName}
        reducedMotion={prefersReducedMotion}
        durationS={TRANSITION_S}
      />

      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${eventName}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventGallery
