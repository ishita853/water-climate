import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import VerticalPhotoTrack from './VerticalPhotoTrack'
import type { EventItem } from '../types'

const IMAGE_INTERVAL_MS = 1500
const IMAGE_TRANSITION_S = 0.6
const EVENT_TRANSITION_S = 0.6
const EASE = [0.22, 1, 0.36, 1] as const

interface RecentEventsSlideshowProps {
  events: EventItem[]
}

const eventVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%' }),
}

const captionVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

interface SlideshowState {
  eventIndex: number
  imageIndex: number
  direction: 1 | -1
}

function RecentEventsSlideshow({ events }: RecentEventsSlideshowProps) {
  const total = events.length
  const prefersReducedMotion = usePrefersReducedMotion()
  const [state, setState] = useState<SlideshowState>({ eventIndex: 0, imageIndex: 0, direction: 1 })
  const { eventIndex, imageIndex, direction: eventDirection } = state

  const event = events[eventIndex]
  const photoCount = event?.photos.length ?? 0

  // The single rule the whole component is built around: only advance the event once every
  // image of the current one has been shown. `advance` is the only place that changes either
  // index — and it's a single, pure updater (one setState call, no nested setState side
  // effects) so it stays correct even under StrictMode's double-invoke-to-check-purity in dev.
  function advance(delta: 1 | -1) {
    setState((s) => {
      const currentPhotoCount = events[s.eventIndex].photos.length
      if (delta === 1) {
        if (s.imageIndex < currentPhotoCount - 1) return { ...s, imageIndex: s.imageIndex + 1 }
        return { eventIndex: (s.eventIndex + 1) % total, imageIndex: 0, direction: 1 }
      }
      if (s.imageIndex > 0) return { ...s, imageIndex: s.imageIndex - 1 }
      const prevEventIndex = (s.eventIndex - 1 + total) % total
      return { eventIndex: prevEventIndex, imageIndex: events[prevEventIndex].photos.length - 1, direction: -1 }
    })
  }

  const advanceRef = useRef(advance)
  advanceRef.current = advance

  // Keeps advancing even when the visitor prefers reduced motion — the content itself is
  // still meant to update automatically; VerticalPhotoTrack is what turns the *animation*
  // off in that case (instant swap instead of a slide), not this timer.
  useEffect(() => {
    if (total === 0 || (total === 1 && photoCount <= 1)) return
    const id = setInterval(() => advanceRef.current(1), IMAGE_INTERVAL_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, photoCount])

  // Preload the next photo (or the next event's first photo) so the cadence never shows a
  // blank/loading frame.
  useEffect(() => {
    if (!event) return
    const nextSrc =
      imageIndex < photoCount - 1 ? event.photos[imageIndex + 1] : events[(eventIndex + 1) % total].photos[0]
    if (!nextSrc) return
    const img = new Image()
    img.src = nextSrc
  }, [event, events, eventIndex, imageIndex, photoCount, total])

  if (!event || photoCount === 0) return null

  function goToImage(target: number) {
    setState((s) => ({ ...s, imageIndex: target, direction: target >= s.imageIndex ? 1 : -1 }))
  }

  function handleKeyDown(keyEvent: KeyboardEvent<HTMLDivElement>) {
    if (keyEvent.key === 'ArrowDown') {
      keyEvent.preventDefault()
      advance(1)
    } else if (keyEvent.key === 'ArrowUp') {
      keyEvent.preventDefault()
      advance(-1)
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Recent events"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-md focus:outline-none dark:border-teal-900/40 dark:bg-stone-900"
    >
      {/* A slim gradient accent marks this as the featured/highlighted presentation — the
          same visual language as the profile card's top bar, not a one-off decoration. */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 dark:from-teal-500 dark:via-teal-400 dark:to-teal-300" />

      <div className="relative h-[300px] w-full overflow-hidden bg-stone-100 dark:bg-stone-800 sm:h-[400px] lg:h-[460px]">
        {/* Event level: a horizontal push, only mounted/unmounted when the event itself
            changes — each event's vertical image track lives entirely inside this. */}
        <AnimatePresence initial={false} custom={eventDirection}>
          <motion.div
            key={eventIndex}
            custom={eventDirection}
            variants={eventVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0 : EVENT_TRANSITION_S, ease: EASE }}
            className="absolute inset-0 overflow-hidden"
          >
            <VerticalPhotoTrack
              photos={event.photos}
              activeIndex={imageIndex}
              altPrefix={event.name}
              reducedMotion={prefersReducedMotion}
              durationS={IMAGE_TRANSITION_S}
            />
          </motion.div>
        </AnimatePresence>

        {photoCount > 1 && (
          <>
            <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
              <button
                type="button"
                onClick={() => advance(-1)}
                aria-label="Previous image"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md transition-colors hover:text-teal-700 dark:bg-stone-900/90 dark:text-stone-200 dark:hover:text-teal-400"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => advance(1)}
                aria-label="Next image"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md transition-colors hover:text-teal-700 dark:bg-stone-900/90 dark:text-stone-200 dark:hover:text-teal-400"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-stone-900/60 px-2.5 py-1 backdrop-blur-sm">
              <span className="text-[0.8125rem] font-medium tabular-nums tracking-wide text-white">
                {String(imageIndex + 1).padStart(2, '0')} / {String(photoCount).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1">
                {event.photos.map((photo, i) => (
                  <button
                    key={photo}
                    type="button"
                    onClick={() => goToImage(i)}
                    aria-label={`Go to image ${i + 1} of ${event.name}`}
                    aria-current={i === imageIndex}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === imageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Event info — keyed by eventIndex, so it only animates when the event actually
          changes, staying put while cycling through that event's own images. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={eventIndex}
          variants={captionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: prefersReducedMotion ? 0.1 : EVENT_TRANSITION_S, ease: EASE }}
          className="flex flex-col gap-3 border-t border-teal-100 p-6 dark:border-teal-900/40 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            Recent Event &middot; Event {String(eventIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h3 className="font-serif text-xl font-semibold leading-snug text-stone-900 dark:text-stone-50 sm:text-2xl">
            {event.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-stone-700 dark:text-stone-200">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
              {event.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
              {event.place}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      <span className="sr-only" role="status" aria-live="polite">
        Event {eventIndex + 1} of {total}: {event.name}. Image {imageIndex + 1} of {photoCount}.
      </span>
    </div>
  )
}

export default RecentEventsSlideshow
