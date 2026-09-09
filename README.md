# Professor Portfolio

A simple, fast academic portfolio website built with React, TypeScript, Tailwind CSS,
and React Router. It has eight pages: Home, Distinctions, Student Supervision,
Publications, Research, Teaching, Other Activities, and Positions Available.

**You do not need to know how to code to update this site.** Almost everything you'll
want to change lives in the `data/` folder as plain JSON files, and images/PDFs live in
`public/assets/`.

## Quick start

### 1. Install dependencies

Requires [Node.js](https://nodejs.org/) 18 or newer. From this folder, run:

```bash
npm install
```

You only need to do this once (and again any time `package.json` changes).

### 2. Run the site locally

```bash
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`). The page
automatically reloads whenever you save a file or edit a JSON file in `data/`.

### 3. Build the site for deployment

```bash
npm run build
```

This creates a `dist/` folder containing the final, static website — plain HTML, CSS,
and JS files. Upload the **contents** of `dist/` to any static host:

- **Vercel** — drag and drop the `dist/` folder, or connect the repo and set the build
  command to `npm run build` and the output directory to `dist`.
- **Netlify** — same idea: build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — push the contents of `dist/` to your `gh-pages` branch (or use a
  GitHub Action that runs `npm run build` and publishes `dist/`).

You can preview the production build locally before deploying with:

```bash
npm run preview
```

## Updating content (no coding required)

All editable content lives in the `data/` folder as JSON files. Open a file in any text
editor, change the text between the quotes, save, and refresh your browser (the dev
server updates automatically).

> **Tip:** JSON is strict about formatting. Keep the quotes `"..."` around text, keep
> commas between items, and don't leave a trailing comma after the last item in a list.
> If the site breaks after an edit, check for a missing comma or quote first — most
> text editors will highlight JSON errors in red.

### `data/profile.json`

Name, titles, department, contact info, bio, research interest tags, credentials, the
homepage highlight banner, and social links. Powers the Home page hero, the sidebar
profile card, the navbar name/initials, and the footer.

### `data/publications.json`

A list of publications. Each entry looks like:

```json
{
  "id": "pub-2020-glof-himalayas",
  "title": "Glacial Lake Outburst Flood (GLOF) Hazard, Downstream Impact, and Risk over the Indian Himalayas",
  "authors": "Dubey, S., and Goyal, M. K.",
  "venue": "Water Resources Research",
  "year": 2020,
  "link": "https://doi.org/...",
  "pdf": "/assets/pdfs/glof-2020.pdf"
}
```

- `id` — a short, unique label for this entry (no spaces). Only used internally.
- `link` and `pdf` are optional — delete either line if you don't have one.
- To add a new publication, copy an existing entry, paste it above or below (inside the
  `[ ... ]` brackets), edit the fields, and make sure entries are separated by commas.

### `data/distinctions.json`

Awards, honors, and other dated achievements — shown on the Distinctions page and as a
preview in the homepage sidebar. Each entry has an `id`, `date` (a full `YYYY-MM-DD`, a
bare year like `"2025"`, or `"N/A"` if there's no date), `title`, and `description`. They
sort newest-first automatically; `"N/A"` entries sort to the end.

### `data/students.json`

Supervised students, grouped by degree and status: `phdCompleted`, `phdOngoing`,
`mtechCompleted`, `mtechOngoing`, `btechOngoing` (each a list of `{ name, year, topic,
currentPosition }`, all fields but `name` optional), `btechNote` (a plain summary
paragraph), and `internationalFellows`.

### `data/research.json`

Research areas (`name` + `description`), a `projectStats` count of completed/ongoing
projects, `currentProjects` (`title` + `agency`), and a list of `tools` (interactive
platforms you've built).

### `data/activities.json`

`invitedLectures`, `workshops`, `committees`, and a flat list of professional
`memberships`.

### `data/positions.json`

Open positions (`openings`), a `qualifications` list, `howToApply` text, and a
`contactEmail`.

### `data/courses.json`

Courses you teach, shown on the Teaching page. Each entry needs `id` and `title`; `code`,
`semester`, `description`, and `syllabus` (a PDF link) are all optional — leave them out
if you don't have that detail.

## Adding images and PDFs

Put files in the matching folder under `public/assets/`:

- `public/assets/images/` — profile photo, etc.
- `public/assets/pdfs/` — CV, syllabi, publication PDFs.

Then reference them in a JSON file using a path that starts with `/assets/...`, for
example:

```json
"photo": "/assets/images/profile.jpg"
```

```json
"pdf": "/assets/pdfs/glof-2020.pdf"
```

File names are case-sensitive and should not contain spaces — use dashes or
underscores instead (e.g. `my-photo.jpg`, not `My Photo.jpg`).

## Project structure

```
professor-portfolio/
├─ data/                  # Edit these JSON files to update content
│  ├─ profile.json
│  ├─ publications.json
│  ├─ distinctions.json
│  ├─ students.json
│  ├─ research.json
│  ├─ activities.json
│  ├─ positions.json
│  └─ courses.json
├─ public/assets/         # Put images and PDFs here
│  ├─ images/
│  └─ pdfs/
├─ src/
│  ├─ components/         # Reusable UI pieces (navbar, footer, lists)
│  ├─ pages/               # One file per page
│  ├─ App.tsx              # Page routing
│  ├─ main.tsx              # App entry point
│  └─ index.css             # Tailwind CSS setup
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
└─ vite.config.ts
```

## For developers

- Built with [Vite](https://vite.dev/), React 19, and TypeScript.
- Styling uses [Tailwind CSS](https://tailwindcss.com/) utility classes directly in
  the components.
- Routing uses [react-router-dom](https://reactrouter.com/).
- Content is loaded via direct JSON imports (`import profile from '../../data/profile.json'`),
  so TypeScript can type-check the data shape (see `src/types.ts`) and Vite bundles it
  at build time — no backend or API calls needed.
