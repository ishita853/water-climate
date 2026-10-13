import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import profile from '../../data/profile.json'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useMagnetic } from '../hooks/useMagnetic'

const MotionLink = motion.create(Link)
const MOUSE_RANGE_PX = 14
const AUTOPLAY_MS = 6500
const ENTER_MS = 1300
const EXIT_MS = 1100
const EASE = [0.22, 1, 0.36, 1] as const

interface HeroSlide {
  image: string
  alt: string
  eyebrow: string
  heading: string
  body: string
}

// Every slide pairs one of the lab's real hero visuals with verified copy already published
// elsewhere on the site (the mission tagline, the bio, the Research page intro) — no invented
// statements, just a different verified facet of the same research identity per slide.
const slides: HeroSlide[] = [
  {
    image: '/assets/images/hero-water-climate.jpg',
    alt: 'Satellite and aerial view of a Himalayan river system flowing to the coast, overlaid with climate and hydrology data: mountains, monsoon clouds, a river basin, and an urban delta',
    eyebrow: 'Water · Climate · Sustainability',
    heading: 'Water, climate and environmental research for resilient futures.',
    body: `${profile.lab.name}. We build research tools for a sustainable future, applying big data, remote sensing, and AI-driven modeling to hydrology, air quality, and climate resilience across India.`,
  },
  {
    image: '/assets/images/research-intro.jpg',
    alt: 'Satellite view of the Indian subcontinent with hydrological and climate data overlays across mountains, river basins and coastline',
    eyebrow: 'Water · Climate · Sustainability',
    heading: 'Research at the intersection of water resources, climate change, and artificial intelligence.',
    body: `Led by ${profile.name}, ${profile.title}, ${profile.department}, ${profile.institution}.`,
  },
  {
    image: '/assets/images/hero-sustainability.jpg',
    alt: 'Aerial view of a river valley, dam, city and renewable infrastructure with sustainability data overlays',
    eyebrow: 'Water · Climate · Sustainability',
    heading: 'Six domains, two decades of hydro-climate science, turning data into public resilience.',
    body: 'From Himalayan cryosphere risk to deployable AI systems: big data, AI, and remote sensing applied to hydrology, climate extremes, and smart, sustainable cities.',
  },
]

const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.09,
    clipPath: direction >= 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
  }),
  center: { opacity: 1, scale: 1.02, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: {
    opacity: 0,
    scale: 1.06,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: EXIT_MS / 1000, ease: EASE },
  },
}

function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 90])

  // Extremely subtle cursor-driven drift, desktop only — the visitor should feel the image is
  // alive without consciously noticing a gimmick, so the range is tiny and heavily damped.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.6 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.6 })
  const combinedY = useTransform([parallaxY, springY], ([sy, my]: number[]) => sy + my)

  const [[index, direction], setIndex] = useState<[number, number]>([0, 1])
  const total = slides.length

  const researchMagnetic = useMagnetic<HTMLAnchorElement>()
  const applicationsMagnetic = useMagnetic<HTMLAnchorElement>()

  const paginate = useCallback((newDirection: number) => {
    setIndex(([current]) => [(current + newDirection + total) % total, newDirection])
  }, [total])

  function goTo(target: number) {
    setIndex(([current]) => [target, target > current ? 1 : -1])
  }

  // Content keeps advancing even when the visitor prefers reduced motion — only the
  // transition itself simplifies (see the duration overrides below), matching the same
  // pattern already used by the Recent Events slideshow.
  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [index, total, paginate])

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relX * MOUSE_RANGE_PX)
    mouseY.set(relY * MOUSE_RANGE_PX)
  }

  function handlePointerLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const slide = slides[index]

  return (
    <section className="relative isolate -mt-10 md:-mt-14">
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      >
        <div className="relative h-[560px] sm:h-[620px] lg:h-[calc(100vh-5rem)] lg:max-h-[820px] lg:min-h-[620px]">
          <motion.div style={{ y: combinedY, x: springX }} className="absolute inset-0 h-[calc(100%+90px)]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: prefersReducedMotion ? 0.2 : ENTER_MS / 1000, ease: EASE },
                  clipPath: { duration: prefersReducedMotion ? 0.2 : ENTER_MS / 1000, ease: EASE },
                  scale: { duration: prefersReducedMotion ? 0.2 : AUTOPLAY_MS / 1000, ease: 'linear' },
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent lg:from-black/45"
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-page px-5 pb-10 sm:px-6 sm:pb-14 md:px-8 md:pb-16 lg:px-12 lg:pb-20 xl:px-16 2xl:px-[72px]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white">{slide.eyebrow}</p>

              <div className="relative mt-3 min-h-[3.6em] max-w-3xl sm:min-h-[2.4em]">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={slide.heading}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14, transition: { duration: 0.3, ease: EASE } }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="font-serif text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
                  >
                    {slide.heading}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <div className="relative mt-4 min-h-[4.5em] max-w-xl sm:min-h-[3.5em]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={slide.body}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE } }}
                    transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                    className="text-[1.0625rem] leading-[1.7] text-white sm:text-base"
                  >
                    {slide.body}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <MotionLink
                  to="/research"
                  {...researchMagnetic}
                  className="inline-flex h-11 items-center justify-center gap-1.5 bg-white px-5 text-sm font-semibold text-stone-900 transition-colors hover:bg-white/90"
                >
                  Explore Research
                  <ArrowRight className="h-3.5 w-3.5" />
                </MotionLink>
                <MotionLink
                  to="/applications"
                  {...applicationsMagnetic}
                  className="inline-flex h-11 items-center justify-center gap-1.5 border border-white/50 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Explore Applications
                  <ArrowRight className="h-3.5 w-3.5" />
                </MotionLink>
              </motion.div>

              {total > 1 && (
                <div className="mt-8 flex max-w-xs items-center gap-2.5">
                  {slides.map((s, i) => (
                    <button
                      key={s.image}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Show slide ${i + 1}`}
                      aria-current={i === index}
                      className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25"
                    >
                      {i === index && (
                        <motion.span
                          key={index}
                          className="absolute inset-y-0 left-0 rounded-full bg-white"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={
                            prefersReducedMotion ? { duration: 0 } : { duration: AUTOPLAY_MS / 1000, ease: 'linear' }
                          }
                        />
                      )}
                      {i < index && <span className="absolute inset-0 rounded-full bg-white/60" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-4 text-xs text-stone-700 dark:text-stone-200"
      >
        Led by{' '}
        <Link to="/student-supervision" className="font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
          {profile.name}
        </Link>
        , {profile.title}, {profile.department}
      </motion.p>
    </section>
  )
}

export default Hero
