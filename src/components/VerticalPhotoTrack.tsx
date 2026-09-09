const EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface VerticalPhotoTrackProps {
  photos: string[]
  activeIndex: number
  altPrefix: string
  reducedMotion: boolean
  durationS?: number
}

/** The one real vertical filmstrip mechanism, shared by the Recent Events hero and every
 * archive card gallery. Deliberately plain CSS, not Framer Motion: every photo is mounted at
 * once as a flex item pinned to exactly 100% of the viewport's height (`flex: 0 0 100%`), so
 * the track's true content height is `photos.length` viewport-heights even though the track
 * element itself is only styled to one viewport-height tall — which is what makes
 * `translate3d(0, -${activeIndex * 100}%, 0)` resolve to exactly "move up by one viewport per
 * step" (CSS resolves a transform's own percentage against the element's own border-box
 * height, not its overflowing content). The parent has `overflow: hidden` so everything past
 * the current slide is clipped, not squeezed. `object-contain` shows the complete photograph
 * — never cropped — on the card's own neutral background; there is no backdrop layer of any
 * kind behind it. */
function VerticalPhotoTrack({ photos, activeIndex, altPrefix, reducedMotion, durationS = 0.6 }: VerticalPhotoTrackProps) {
  const count = photos.length
  if (count === 0) return null

  if (count === 1) {
    return <img src={photos[0]} alt={altPrefix} className="absolute inset-0 h-full w-full object-contain" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transform: `translate3d(0, -${activeIndex * 100}%, 0)`,
          transition: reducedMotion ? 'none' : `transform ${durationS}s ${EASE_CSS}`,
        }}
      >
        {photos.map((photo, i) => (
          <div key={photo} style={{ flex: '0 0 100%', height: '100%' }}>
            <img
              src={photo}
              alt={`${altPrefix}, photo ${i + 1} of ${count}`}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VerticalPhotoTrack
