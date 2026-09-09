/** The institutes this lab's alumni now work at — shown as a logo strip above the Alumni
 * grid. IIT entries are listed first, then NIT entries, then other institutes. */
interface InstitutionLogo {
  name: string
  logo: string
  /** Some source logo files ship with heavy white padding around the actual crest — this
   * scales the image up inside its circular frame (which clips the overflow) so the crest
   * reads at roughly the same visual size as the other institutes. */
  zoomClass?: string
}

export const institutionLogos: InstitutionLogo[] = [
  { name: 'IIT Indore', logo: '/assets/images/iit-i.png' },
  { name: 'IIT Roorkee', logo: '/assets/images/iit-r.png' },
  { name: 'IIT Bhubaneswar', logo: '/assets/images/iit-b.jpeg', zoomClass: 'scale-150' },
  { name: 'NIT Durgapur', logo: '/assets/images/nit-durgapur.png' },
  { name: 'MANIT Bhopal', logo: '/assets/images/manit-bhopal.png' },
  { name: 'NIH Roorkee', logo: '/assets/images/nih-roorkee.jpeg' },
]
