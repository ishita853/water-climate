export interface Publication {
  id: string
  type?: string
  title: string
  authors: string
  venue: string
  year: number
  link?: string
  pdf?: string
  impactFactor?: string
}

export interface Distinction {
  id: string
  /** Either a full "YYYY-MM-DD" date, a "YYYY" year, or "N/A" if undated. */
  date: string
  title: string
  description: string
}

export interface Course {
  id: string
  title: string
  code?: string
  semester?: string
  duration?: string
  level?: 'UG' | 'PG'
  description?: string
  syllabus?: string
}

export interface DesignedCourse {
  id: string
  code: string
  title: string
  uniqueFeatures: string
  methodology: string
  practicalComponent?: string
}

export interface TeachingPhilosophyItem {
  id: string
  approach: string
  description: string
  mode: string
}

export interface StudentEntry {
  name: string
  year?: string
  photo?: string
  topic?: string
  currentPosition?: string
}

export interface ResearchArea {
  name: string
  description: string
}

export interface ResearchProject {
  title: string
  role: string
  duration: string
  agency: string
}

export interface InvitedLecture {
  title: string
  venue?: string
}

export interface Workshop {
  title: string
  date?: string
  venue?: string
}

export interface Committee {
  role: string
  event: string
  date?: string
}

export interface Position {
  title: string
  description?: string
}

export interface Patent {
  id: string
  title: string
  inventors: string
  status: 'Granted' | 'Filed'
  patentNumber?: string
  applicationNumber?: string
  year?: number
  commercialization?: string
}

export interface Book {
  id: string
  title: string
  authors: string
  publisher: string
  year: number
  isbn?: string
  doi?: string
  /** Path under /assets/images. */
  cover?: string
}

export interface BookChapter {
  id: string
  title: string
  authors: string
  /** Title of the edited volume the chapter appears in. */
  bookTitle: string
  year: number
  /** Raw "month/volume/pages" detail as supplied — only shown when it carries more
   * information than the bare year (e.g. "October 2023, Pages 257–270"). */
  yearDetail?: string
  /** Full DOI URL, kept exactly as supplied (a few entries only have an ISBN instead). */
  link?: string
  isbn?: string
}

export interface LinkedInUpdate {
  id: string
  /** ISO "YYYY-MM-DD", or '' if unknown. */
  date: string
  category: string
  title: string
  excerpt: string
  image?: string
  /** Extra photos from the same post, shown as smaller thumbnails beside the main image. */
  gallery?: string[]
  /** Takes priority over `image` when present — rendered as a native, controllable video player. */
  video?: string
  /** A slide deck exported as PDF. Takes priority over `image`/`gallery` — rendered as a paged in-card viewer. */
  pdf?: string
  linkedinUrl: string
}

export interface ConferenceEvent {
  id: string
  title: string
  year: number
  date: string
  type?: string
  duration?: string
  organizer?: string
  role?: string
  participants?: string
  venue?: string
}

export interface EventItem {
  id: string
  name: string
  date: string
  place: string
  /** Paths under /assets/images. 1–3 photos render as a static collage; 4+ become an auto-advancing slideshow. */
  photos: string[]
}
