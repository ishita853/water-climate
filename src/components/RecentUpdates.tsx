import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from 'lucide-react'
import updates from '../../data/linkedinUpdates.json'
import profile from '../../data/profile.json'
import Reveal from './Reveal'
import LinkedinIcon from './icons/LinkedinIcon'
import type { LinkedInUpdate } from '../types'

// pdfjs-dist is a heavy dependency (~1MB) needed by only one slide — code-split it out of
// the main bundle rather than paying its parse cost on every page load.
const PdfSlideDeck = lazy(() => import('./PdfSlideDeck'))

function PdfDeckFallback() {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-stone-50 p-2 sm:p-3 dark:bg-stone-800">
      <div className="flex flex-col items-center gap-2 text-stone-400 dark:text-stone-500">
        <FileText className="h-6 w-6 animate-pulse" />
        <p className="text-sm">Loading slides&hellip;</p>
      </div>
    </div>
  )
}

const AUTOPLAY_MS = 6500
const TRANSITION_MS = 2000
const EASE = [0.22, 1, 0.36, 1] as const
const GAP_PX = 24

/** Active-slide width by measured breakpoint. `vw` here is the breakout viewport's own
 * measured width, which already excludes its horizontal padding. */
function getCardWidth(vw: number) {
  if (vw === 0) return 0
  if (vw < 640) return vw * 0.94
  if (vw < 1024) return vw * 0.9
  return Math.min(vw * 0.85, 1400)
}

function formatDate(date: string) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()
}

const captionContainer = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const captionChild = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

function SlideCard({ item, isActive }: { item: LinkedInUpdate; isActive: boolean }) {
  const date = formatDate(item.date)

  // Replays the caption's entrance animation only on the transition INTO active —
  // not on every render — so neighboring slides keep their dimmed "peek" text static.
  const wasActiveRef = useRef(isActive)
  const [enterKey, setEnterKey] = useState(0)
  useEffect(() => {
    if (isActive && !wasActiveRef.current) setEnterKey((key) => key + 1)
    wasActiveRef.current = isActive
  }, [isActive])

  const kenBurns: CSSProperties = isActive ? { animation: 'carousel-kenburns 7s ease-out forwards' } : {}

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      {item.video ? (
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-stone-50 p-2 sm:p-3 dark:bg-stone-800">
          <video
            src={item.video}
            controls
            preload="metadata"
            className="max-h-full max-w-full rounded-md object-contain"
          />
        </div>
      ) : item.pdf ? (
        <Suspense fallback={<PdfDeckFallback />}>
          <PdfSlideDeck src={item.pdf} active={isActive} />
        </Suspense>
      ) : item.image ? (
        <div className="relative flex min-h-0 flex-1 gap-2 overflow-hidden bg-stone-50 p-2 sm:gap-3 sm:p-3 dark:bg-stone-800">
          <div className="relative flex min-h-0 flex-[3] items-center justify-center overflow-hidden rounded-md">
            <img
              src={item.image}
              alt={item.title}
              loading={isActive ? 'eager' : 'lazy'}
              decoding="async"
              className="max-h-full max-w-full object-contain"
              style={kenBurns}
            />
          </div>
          {item.gallery && item.gallery.length > 0 && (
            <div className="hidden min-h-0 flex-[2] flex-col gap-2 sm:flex sm:gap-3">
              {item.gallery.slice(0, 2).map((src) => (
                <div key={src} className="relative min-h-0 flex-1 overflow-hidden rounded-md">
                  <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden bg-stone-50 p-8 sm:p-10 dark:bg-stone-950/40">
          <LinkedinIcon className="h-6 w-6 text-teal-600/70 dark:text-teal-400/70" />
          <p className="mt-6 font-serif text-2xl font-semibold leading-snug text-stone-800 sm:text-3xl dark:text-stone-100">
            &ldquo;{item.title}&rdquo;
          </p>
          <div className="mt-6 h-px w-12 bg-teal-600/60 dark:bg-teal-400/60" />
        </div>
      )}

      {/* Compact editorial caption — supports the image, never competes with it.
          Keyed on enterKey so the stagger only replays when this slide becomes active. */}
      <motion.div
        key={enterKey}
        initial="hidden"
        animate="visible"
        variants={captionContainer}
        className="shrink-0 border-t border-stone-200 px-6 py-5 sm:px-8 sm:py-6 dark:border-stone-800"
      >
        <motion.p
          variants={captionChild}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400"
        >
          From the Professor
        </motion.p>
        <motion.p variants={captionChild} className="mt-1 text-xs font-medium text-stone-400 dark:text-stone-500">
          {profile.name}
          {item.category && <> &middot; {item.category}</>}
        </motion.p>

        <motion.h3
          variants={captionChild}
          className="mt-3 line-clamp-2 font-serif text-xl font-semibold leading-snug text-stone-900 sm:text-2xl dark:text-stone-50"
        >
          {item.title}
        </motion.h3>

        {item.excerpt && (
          <motion.p
            variants={captionChild}
            className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400"
          >
            {item.excerpt}
          </motion.p>
        )}

        <motion.div variants={captionChild} className="mt-4 flex items-center justify-between gap-3">
          {date ? (
            <span className="text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">
              {date}
            </span>
          ) : (
            <span />
          )}
          <a
            href={item.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Read on LinkedIn
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </article>
  )
}

function RecentUpdates() {
  const items = updates as LinkedInUpdate[]
  const total = items.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [trackIndex, setTrackIndex] = useState(1)
  const [instant, setInstant] = useState(true)
  const [viewportWidth, setViewportWidth] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => setViewportWidth(entries[0].contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const paginate = useCallback(
    (delta: number) => {
      setActiveIndex((current) => (current + delta + total) % total)
      setTrackIndex((current) => current + delta)
      setInstant(false)
    },
    [total],
  )

  // Autoplay — resets on every slide change (manual or automatic), so a manual
  // click restarts the dwell time rather than fighting an in-flight timer. Runs
  // continuously and is never paused by hover/focus/scroll/touch.
  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [total, paginate, activeIndex])

  // Infinite-loop illusion: after sliding onto a cloned edge slide, snap the track
  // back to the equivalent real slide with transitions off for exactly one frame.
  useEffect(() => {
    if (total <= 1) return
    if (trackIndex !== 0 && trackIndex !== total + 1) return
    const id = setTimeout(() => {
      setInstant(true)
      setTrackIndex(trackIndex === 0 ? total : 1)
    }, TRANSITION_MS)
    return () => clearTimeout(id)
  }, [trackIndex, total])

  useEffect(() => {
    if (!instant) return
    const raf = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(raf)
  }, [instant])

  if (total === 0) return null

  const paddedItems = total > 1 ? [items[total - 1], ...items, items[0]] : items
  const cardWidth = getCardWidth(viewportWidth)
  const step = cardWidth + GAP_PX
  const sidePadding = (viewportWidth - cardWidth) / 2
  const trackX = sidePadding - trackIndex * step
  const skipTransition = instant || viewportWidth === 0

  return (
    <Reveal>
      <section aria-label="Recent updates from LinkedIn">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              From the Professor
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
              Recent Updates
            </h2>
            <p className="mt-2 max-w-xl text-sm text-stone-600 dark:text-stone-400">
              Selected research, achievements, announcements, and professional updates.
            </p>
          </div>
        </div>

        {/* Breaks out beyond the site's normal reading column so the active post can read
            as large and dominant, per the brief — body's overflow-x-hidden keeps this safe. */}
        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div
            ref={viewportRef}
            className="relative mx-auto max-w-[1500px] overflow-hidden"
            style={{ perspective: 1600 }}
          >
            <motion.div
              className="flex"
              animate={{ x: trackX }}
              transition={skipTransition ? { duration: 0 } : { duration: TRANSITION_MS / 1000, ease: EASE }}
            >
              {paddedItems.map((item, i) => {
                const distance = total > 1 ? i - trackIndex : 0
                const isSlideActive = distance === 0
                const tilt = distance === 0 ? 0 : distance > 0 ? -6 : 6
                return (
                  <motion.div
                    key={`${item.id}-${i}`}
                    className="shrink-0 sm:h-[560px] lg:h-[620px] xl:h-[660px]"
                    style={{ width: cardWidth || '100%', marginRight: GAP_PX, transformPerspective: 1600 }}
                    animate={{
                      scale: isSlideActive ? 1 : 0.88,
                      opacity: isSlideActive ? 1 : 0.6,
                      rotateY: tilt,
                      filter: isSlideActive ? 'blur(0px)' : 'blur(1.5px)',
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
                  >
                    <SlideCard item={item} isActive={isSlideActive} />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous update"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-teal-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-teal-400"
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.button>

              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium tracking-wide text-stone-400 dark:text-stone-500">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </p>
                <div className="h-[3px] w-24 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                  <div
                    key={activeIndex}
                    className="h-full origin-left rounded-full bg-teal-600 dark:bg-teal-500"
                    style={{
                      animationName: 'carousel-progress-fill',
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationTimingFunction: 'linear',
                      animationFillMode: 'forwards',
                    }}
                  />
                </div>
              </div>

              <motion.button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next update"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-teal-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-teal-400"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </Reveal>
  )
}

export default RecentUpdates
