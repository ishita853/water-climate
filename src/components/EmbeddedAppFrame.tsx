import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Loader2, Maximize2, Minimize2 } from 'lucide-react'

interface EmbeddedAppFrameProps {
  url: string
  title: string
  accent: string
}

const SLOW_LOAD_MS = 8000

/** Embedded application workspace: an iframe with fullscreen / open-externally controls.
 * Only ever rendered for applications already verified embeddable — this component doesn't
 * attempt to detect or recover from framing failures, since that's decided upstream. */
function EmbeddedAppFrame({ url, title, accent }: EmbeddedAppFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  // Some embedded apps never fire the iframe's native `load` event (long-lived
  // connections, service workers, etc.) even though their content has already rendered —
  // observed directly on one of these apps. Rather than leave the loading overlay blocking
  // an already-usable app indefinitely, stop waiting after a generous timeout.
  useEffect(() => {
    if (isLoaded) return
    const id = setTimeout(() => setIsLoaded(true), SLOW_LOAD_MS)
    return () => clearTimeout(id)
  }, [isLoaded])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-hidden border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 ${
        isFullscreen ? 'h-screen rounded-none' : 'h-[88vh] min-h-[720px] rounded-2xl'
      }`}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-stone-200 px-4 py-2.5 dark:border-stone-800">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
          <p className="truncate text-sm font-medium text-stone-700 dark:text-stone-200">{title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open externally"
            title="Open externally"
            className="flex h-8 w-8 items-center justify-center rounded-md text-stone-700 transition-colors hover:bg-stone-100 hover:text-teal-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-teal-400"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            className="flex h-8 w-8 items-center justify-center rounded-md text-stone-700 transition-colors hover:bg-stone-100 hover:text-teal-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-teal-400"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-stone-50 dark:bg-stone-950/40">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-stone-50 text-stone-700 dark:bg-stone-950 dark:text-stone-200">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Loading application&hellip;</p>
          </div>
        )}
        <iframe
          src={url}
          title={title}
          onLoad={() => setIsLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  )
}

export default EmbeddedAppFrame
