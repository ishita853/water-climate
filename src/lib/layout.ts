/** Single source of truth for the site's horizontal frame. Used identically by the header,
 * `<main>`, and footer so their content edges always line up, and by nothing else — pages
 * inherit width from `<main>` rather than adding their own nested max-width wrapper. */
export const CONTAINER = 'mx-auto w-full max-w-page px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[72px]'

/** Header row height: compact on mobile, a touch taller on tablet, standard academic-site
 * height on desktop. */
export const HEADER_HEIGHT = 'h-16 md:h-[4.75rem] lg:h-[5.5rem]'
