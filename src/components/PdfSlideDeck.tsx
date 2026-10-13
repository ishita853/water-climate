import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

interface PdfSlideDeckProps {
  src: string
  /** Only load and render once the parent slide is actually in view. */
  active: boolean
}

/** Renders a multi-page PDF (an exported slide deck) as a paged in-card viewer, so a real
 * presentation can be shown natively instead of flattening it into a single image. */
function PdfSlideDeck({ src, active }: PdfSlideDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const docRef = useRef<PDFDocumentProxy | null>(null)
  const renderTaskRef = useRef<RenderTask | null>(null)

  const [numPages, setNumPages] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!active || docRef.current) return
    let cancelled = false
    setStatus('loading')
    getDocument({ url: src })
      .promise.then((doc) => {
        if (cancelled) return
        docRef.current = doc
        setNumPages(doc.numPages)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [active, src])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setContainerSize({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const doc = docRef.current
    const canvas = canvasRef.current
    if (status !== 'ready' || !doc || !canvas || containerSize.width === 0 || containerSize.height === 0) return

    let cancelled = false
    doc.getPage(pageIndex + 1).then((page) => {
      if (cancelled) return
      const unscaled = page.getViewport({ scale: 1 })
      const scale = Math.min(containerSize.width / unscaled.width, containerSize.height / unscaled.height)
      const dpr = window.devicePixelRatio || 1
      const viewport = page.getViewport({ scale: scale * dpr })
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.style.width = `${viewport.width / dpr}px`
      canvas.style.height = `${viewport.height / dpr}px`
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      renderTaskRef.current?.cancel()
      const task = page.render({ canvasContext: ctx, viewport, canvas })
      renderTaskRef.current = task
      task.promise.catch(() => {})
    })
    return () => {
      cancelled = true
    }
  }, [status, pageIndex, containerSize])

  useEffect(() => {
    return () => {
      renderTaskRef.current?.cancel()
      docRef.current?.loadingTask.destroy()
      docRef.current = null
    }
  }, [])

  function goTo(delta: number) {
    setPageIndex((current) => Math.min(Math.max(current + delta, 0), numPages - 1))
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-stone-50 p-2 sm:p-3 dark:bg-stone-800"
    >
      {status === 'ready' ? (
        <canvas ref={canvasRef} className="rounded-md shadow-sm" />
      ) : status === 'error' ? (
        <div className="flex flex-col items-center gap-2 text-stone-700 dark:text-stone-200">
          <FileText className="h-6 w-6" />
          <p className="text-sm">Couldn&apos;t load the slide deck.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-stone-700 dark:text-stone-200">
          <FileText className="h-6 w-6 animate-pulse" />
          <p className="text-sm">Loading slides&hellip;</p>
        </div>
      )}

      {status === 'ready' && numPages > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(-1)}
            disabled={pageIndex === 0}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm transition-colors hover:text-teal-700 disabled:opacity-0 dark:bg-stone-900/90 dark:text-stone-200 dark:hover:text-teal-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            disabled={pageIndex === numPages - 1}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm transition-colors hover:text-teal-700 disabled:opacity-0 dark:bg-stone-900/90 dark:text-stone-200 dark:hover:text-teal-400"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 text-[0.8125rem] font-medium tabular-nums text-stone-700 shadow-sm dark:bg-stone-900/90 dark:text-stone-200">
            {pageIndex + 1} / {numPages}
          </div>
        </>
      )}
    </div>
  )
}

export default PdfSlideDeck
