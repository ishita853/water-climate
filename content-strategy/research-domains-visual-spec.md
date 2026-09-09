# Section Concept

A dark, cinematic bento grid where each domain reads as a live research feed rather than a bio bullet point — full-bleed satellite and field imagery, restrained typography, and a single accent glow per card doing the work of a hundred icons. This feels like a laboratory homepage, not a CV, because the cards show *evidence in motion* (a glacial lake, a flood dashboard, an atmospheric plume) instead of describing credentials in prose — the visitor sees the science before they read a word about the scientist.

# Desktop Layout

**Grid:** CSS Grid, `grid-template-columns: repeat(12, 1fr)`, container max-width 1280px, centered, 80px outer margin, 24px row-gap and column-gap.

**Bento structure (asymmetric, not uniform 3×2):**

| Row | Card | Column span | Height |
|---|---|---|---|
| 1 | Water Resources & Hydrological Modeling *(Featured)* | cols 1–7 (7/12) | 560px |
| 1 | Himalayan Cryosphere & Glacial Hazards *(Featured)* | cols 8–12 (5/12) | 560px |
| 2 | Climate Extremes, Drought & Ecosystem Resilience | cols 1–4 (4/12) | 420px |
| 2 | Atmospheric Rivers, Aerosols & Air Quality | cols 5–8 (4/12) | 420px |
| 2 | Wetlands & Water Quality Remote Sensing | cols 9–12 (4/12) | 420px |
| 3 | AI-Driven Water Systems & Decision Intelligence *(Featured, full-width banner)* | cols 1–12 (12/12) | 480px |

Featured cards carry the persistent accent glow ring and larger type scale (see Card Design System). Row 2 cards are uniform grid cells with identical dimensions for visual calm between the two featured rows.

# Tablet Layout

`grid-template-columns: repeat(2, 1fr)`, 48px outer margin, 20px gap.

| Order | Card | Span | Height |
|---|---|---|---|
| 1 | Water Resources & Hydrological Modeling *(Featured)* | full width (2/2) | 400px |
| 2 | Himalayan Cryosphere & Glacial Hazards | 1/2 | 360px |
| 3 | Climate Extremes, Drought & Ecosystem Resilience | 1/2 | 360px |
| 4 | Atmospheric Rivers, Aerosols & Air Quality | 1/2 | 360px |
| 5 | Wetlands & Water Quality Remote Sensing | 1/2 | 360px |
| 6 | AI-Driven Water Systems & Decision Intelligence *(Featured)* | full width (2/2) | 400px |

# Mobile Layout

Single column, full-width cards (`100vw - 40px`), 20px outer padding, 16px gap between cards. Fixed aspect ratio 4:5 for all cards (uniform on mobile — bento asymmetry collapses for scroll simplicity).

**Priority order (featured-first, not domain-number order):**
1. Water Resources & Hydrological Modeling
2. Himalayan Cryosphere & Glacial Hazards
3. AI-Driven Water Systems & Decision Intelligence
4. Climate Extremes, Drought & Ecosystem Resilience
5. Atmospheric Rivers, Aerosols & Air Quality
6. Wetlands & Water Quality Remote Sensing

# Card Design System

Applies to all six cards; deltas for featured cards are called out inline.

- **Radius:** 20px standard · 24px featured
- **Border:** 1px solid `rgba(255,255,255,0.08)` inner hairline on all cards; featured cards add a second 1px border at `{accent}/25%` opacity, inset 2px
- **Shadow:** Rest `0 20px 40px rgba(0,0,0,0.25)` · Hover `0 30px 60px rgba(0,0,0,0.35)` · Featured adds a colored glow shadow `0 0 60px {accent}/15%` at rest, `{accent}/25%` on hover
- **Overlay:** Base `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)` on every card, plus a unique per-card accent glow (specified individually below)
- **Typography:** Eyebrow 12px uppercase, 0.08em tracking, weight 600, color = accent. Title: serif, weight 700 — 36px featured / 28px standard. Subtitle: 15–16px regular, white/90%. Description: 14px regular, 1.5 line-height, white/75%, max 2 lines with `text-overflow: ellipsis` fallback
- **Icon treatment:** Circular glass badge, `backdrop-filter: blur(8px)`, background `rgba(255,255,255,0.12)`, border `1px solid rgba(255,255,255,0.2)` — 48px diameter featured / 44px standard, icon stroke-width 1.5, icon size 24px featured / 20px standard, color white
- **CTA treatment:** Featured cards use a pill button — `rgba(255,255,255,0.1)` background, `backdrop-filter: blur(8px)`, 1px border at `{accent}/40%`, 8px vertical / 16px horizontal padding, full pill radius. Standard cards use a text-link CTA — weight 600, white, animated underline + arrow that translates 4px right on hover
- **Hover animation:** Background image scales to 1.08× (featured) / 1.06× (standard); overlay darkens an additional 10%; card lifts `translateY(-6px)`; shadow escalates to hover state; CTA underline draws in (standard) or pill background brightens to `rgba(255,255,255,0.18)` (featured)
- **Transition curve:** Hover-in 450ms `cubic-bezier(0.22, 1, 0.36, 1)` · Hover-out 300ms `ease-out`

# Featured Card Strategy

**Featured:** Water Resources & Hydrological Modeling, Himalayan Cryosphere & Glacial Hazards, AI-Driven Water Systems & Decision Intelligence.

They differ from the other three in six concrete ways: (1) larger grid footprint — 7/12 and 12/12 column spans vs. 4/12 for standard cards; (2) larger type scale — 36px vs. 28px titles; (3) persistent accent glow ring at rest (`box-shadow: 0 0 60px {accent}/15%`), which standard cards only receive on hover; (4) pill-button CTA vs. plain text-link CTA; (5) larger icon badge (48px vs. 44px) and stronger hover scale (1.08× vs. 1.06×); (6) guaranteed first-priority placement in both the desktop bento (row 1 + full-width row 3) and the mobile stack (positions 1, 2, 3). This creates a clear three-tier scan path: a visitor's eye lands on Water Resources first (widest card, top-left), sweeps to Himalayan Cryosphere, then is drawn down to the full-width AI Systems banner — the three cards that carry the strongest publication depth, disaster-risk resonance, and translational/funder appeal, respectively.

# Detailed Card Specifications

## Water Resources & Hydrological Modeling

### Visual Story
The viewer should feel scientific gravity and scale — a sense of standing above a living river system that generations of careful measurement have made legible.

### Background Image Prompt
Ultra-realistic cinematic aerial photograph of a vast braided Himalayan river basin at golden hour, shot from a high-altitude drone with a 35mm lens, warm directional side-light raking across silver water channels and sediment bars, a faint glowing cartographic flow-line overlay tracing the water's path, color grading in deep teal and amber, atmospheric haze softening the horizon, satellite-grade sharpness, 4:5 portrait aspect ratio, no text, no people.

### Overlay & Lighting
`linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 85%)` base, plus a directional teal glow `radial-gradient(circle at 15% 85%, #0F766E 0%, transparent 55%)` at 30% opacity anchored bottom-left, intensifying to 45% on hover.

### Content
- **Eyebrow:** Hydrology
- **Title:** Water Resources & Hydrological Modeling
- **Subtitle:** Physically based models translating river-basin hydrology into water-security intelligence.
- **Description:** Two decades of peer-reviewed streamflow and water-balance research across Himalayan, peninsular, and eastern Indian basins — the foundation for every domain here.
- **CTA:** View Research →

### Icon
`Waves`, 48px badge, 24px icon.

### Accent Color
`#0F766E`

### Hover Behavior
Image scales to 1.08× over 450ms; teal radial glow intensifies from 30% to 45% opacity and expands 10%; card lifts `translateY(-6px)`; pill CTA background brightens from `rgba(255,255,255,0.1)` to `rgba(255,255,255,0.18)`; title shifts up 4px as the description fades in beneath it.

### Accessibility
- Minimum contrast: 4.5:1 for description/subtitle text, 3:1 for title, verified against the darkest overlay stop
- Safe text area: bottom 45% of card height reserved for text stack, 32px padding on all sides (featured)
- Mobile crop guidance: focal point centered-lower third (the braided channel convergence); on 4:5 mobile crop, bias the crop downward to keep the water pattern in frame rather than empty sky

---

## Himalayan Cryosphere & Glacial Hazards

### Visual Story
The viewer should feel awe tinged with urgency — sublime, fragile, and precarious, like witnessing a landscape mid-transformation.

### Background Image Prompt
Ultra-realistic cinematic aerial photograph of a turquoise glacial lake cupped beneath jagged snow-capped Himalayan peaks, telephoto compression flattening the ridgelines behind it, fractured blue-white glacial ice visible in the foreground, thin high-altitude atmospheric haze diffusing the light, cool cyan and steel-blue color grading, crisp alpine clarity, dramatic scale contrast between lake and mountains, 4:5 portrait aspect ratio, no text, no people.

### Overlay & Lighting
`linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 85%)` base, plus an icy-cyan glow `radial-gradient(circle at 50% 0%, #38BDF8 0%, transparent 50%)` at 25% opacity anchored top-center (glacier-light effect), intensifying to 40% on hover.

### Content
- **Eyebrow:** Cryosphere
- **Title:** Himalayan Cryosphere & Glacial Hazards
- **Subtitle:** Tracking glacial lake outburst floods and snowmelt risk across the Himalayan cryosphere.
- **Description:** Landmark GLOF hazard research and two DST-funded snowmelt projects in Sikkim and Teesta, extended through CMIP5/CMIP6 climate-extreme trend analysis.
- **CTA:** See the Risk →

### Icon
`MountainSnow`, 48px badge, 24px icon.

### Accent Color
`#38BDF8`

### Hover Behavior
Image scales to 1.08× over 450ms; cyan top-glow intensifies and vignette darkens at the lower edges to preserve text contrast; card lifts `translateY(-6px)`; title shifts up 4px revealing the pill CTA beneath.

### Accessibility
- Minimum contrast: 4.5:1 body / 3:1 title against the bottom 65% overlay stop
- Safe text area: bottom 45%, 32px padding
- Mobile crop guidance: focal point centered on the lake itself; on narrower mobile crop, shift crop upward slightly so peak silhouettes remain visible above the lake for scale context

---

## Climate Extremes, Drought & Ecosystem Resilience

### Visual Story
The viewer should feel tension between vulnerability and recovery — a visible line between what's breaking and what's being rebuilt.

### Background Image Prompt
Ultra-realistic cinematic aerial photograph of cracked, drought-stricken farmland transitioning into resilient green cropland along a diagonal boundary line, harsh low-angle directional sunlight casting long shadows across the parched soil texture, fine dust haze drifting along the horizon, warm amber-to-earth color grading with a cool green accent where the healthy crops begin, documentary-style realism, 4:5 portrait aspect ratio, no text, no people.

### Overlay & Lighting
`linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)` base, plus an amber gradient glow `linear-gradient(0deg, #C2703D 0%, transparent 45%)` at 25% opacity anchored bottom (drought-heat effect), pulsing to 35% once on hover.

### Content
- **Eyebrow:** Resilience
- **Title:** Climate Extremes, Drought & Ecosystem Resilience
- **Subtitle:** Quantifying drought severity and ecosystem resilience to hydroclimatic extremes.
- **Description:** Copula-based drought characterization and two Scientific Reports studies on ecosystem resilience, translating statistical extremes into agricultural consequence.
- **CTA:** Explore Resilience →

### Icon
`Sprout`, 44px badge, 20px icon.

### Accent Color
`#C2703D`

### Hover Behavior
Image scales to 1.06× over 450ms; amber bottom-glow pulses once from 25% to 35% opacity then settles at 30%; card lifts `translateY(-6px)`; CTA underline draws left-to-right beneath the text.

### Accessibility
- Minimum contrast: 4.5:1 body / 3:1 title
- Safe text area: bottom 40%, 24px padding (standard card)
- Mobile crop guidance: focal point on the boundary line between cracked and green soil; keep this diagonal centered in the 4:5 mobile crop as it's the card's key visual metaphor

---

## Atmospheric Rivers, Aerosols & Air Quality

### Visual Story
The viewer should feel scale and motion at a planetary level — data made visible, weather made legible.

### Background Image Prompt
Ultra-realistic cinematic satellite-style visualization of an atmospheric river moisture plume streaming across the Indian subcontinent as seen from low orbit, a realistic cloud and coastline base overlaid with a false-color violet-to-blue data visualization of the moisture channel, deep-space vantage point with a thin curved horizon line, cinematic sci-fi-adjacent but scientifically grounded color palette, subtle star field in the upper frame, 4:5 portrait aspect ratio, no text, no people.

### Overlay & Lighting
`linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)` base, plus a diagonal violet atmospheric haze `linear-gradient(135deg, #7C3AED 0%, transparent 50%)` at 25% opacity, drifting slowly (8s loop, subtle parallax) and intensifying to 35% on hover.

### Content
- **Eyebrow:** Atmosphere
- **Title:** Atmospheric Rivers, Aerosols & Air Quality
- **Subtitle:** Characterizing atmospheric rivers and aerosol transport through AI-driven forecasting.
- **Description:** Two Springer volumes and an operational forecasting system, backed by doctoral research on predictability and black-carbon aerosols — the lab's fastest-growing frontier.
- **CTA:** Track the Data →

### Icon
`Wind`, 44px badge, 20px icon.

### Accent Color
`#7C3AED`

### Hover Behavior
Image scales to 1.06× over 450ms; violet particle haze drifts diagonally an additional 8px and brightens to 35%; card lifts `translateY(-6px)`; CTA slides in 4px from the right as the underline draws in.

### Accessibility
- Minimum contrast: 4.5:1 body / 3:1 title
- Safe text area: bottom 40%, 24px padding
- Mobile crop guidance: focal point centered on the plume's brightest violet channel; avoid cropping into the star field at top, which reads as "empty" — bias crop toward the lower two-thirds where the data visualization lives

---

## Wetlands & Water Quality Remote Sensing

### Visual Story
The viewer should feel calm, ecological richness, and quiet precision — a sense of careful, patient observation.

### Background Image Prompt
Ultra-realistic cinematic aerial photograph of a lush Ramsar wetland at dawn, soft mist hovering over mirrored water channels that perfectly reflect a pale pink-gold sky, wading birds mid-flight low over the water, dense green reed beds framing the channels, satellite-grade clarity with natural soft-focus falloff at the edges, tranquil documentary nature-photography color grading, 4:5 portrait aspect ratio, no text, no people.

### Overlay & Lighting
`linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)` base, plus a radial emerald glow `radial-gradient(circle at 50% 50%, #059669 0%, transparent 55%)` at 20% opacity centered, expanding to 30% on hover.

### Content
- **Eyebrow:** Wetlands
- **Title:** Wetlands & Water Quality Remote Sensing
- **Subtitle:** Monitoring Ramsar wetland health and water quality via satellite remote sensing.
- **Description:** A dedicated volume on India's Ramsar wetlands, an operational analysis platform, and a granted patent for water-quality monitoring.
- **CTA:** Explore Wetlands →

### Icon
`Leaf`, 44px badge, 20px icon.

### Accent Color
`#059669`

### Hover Behavior
Image scales to 1.06× over 450ms; emerald glow radiates outward from center, expanding radius by 15%; card lifts `translateY(-6px)`; CTA fades up 4px with the underline trailing behind it.

### Accessibility
- Minimum contrast: 4.5:1 body / 3:1 title
- Safe text area: bottom 40%, 24px padding
- Mobile crop guidance: focal point on the mirrored water channel convergence; preserve at least one bird silhouette in the mobile crop as the image's focal detail

---

## AI-Driven Water Systems & Decision Intelligence

### Visual Story
The viewer should feel futurism grounded in real infrastructure — the moment research becomes a product people actually use.

### Background Image Prompt
Ultra-realistic cinematic wide-angle photograph of a glowing AI decision-support dashboard interface floating above a realistic nighttime aerial view of an Indian city skyline, a translucent flood-risk map with indigo data nodes and fine glowing grid lines overlaid on the streets below, city lights blurred softly in the depth of field, cool indigo-and-black color grading with warm pinpricks of streetlight, futuristic but photographically grounded, 4:5 portrait aspect ratio, no text, no people.

### Overlay & Lighting
`linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)` base, plus an indigo digital-grid glow `linear-gradient(0deg, #4F46E5 0%, transparent 40%)` at 30% opacity anchored bottom with a fine animated grid-line texture, intensifying to 45% on hover.

### Content
- **Eyebrow:** AI Systems
- **Title:** AI-Driven Water Systems & Decision Intelligence
- **Subtitle:** Translating hydro-climate research into deployable AI decision-support systems.
- **Description:** A national flood tool, a regional water portal, and three 2024–2025 patent filings convert science into public infrastructure.
- **CTA:** Launch the Tools →

### Icon
`BrainCircuit`, 48px badge, 24px icon.

### Accent Color
`#4F46E5`

### Hover Behavior
Image scales to 1.08× over 450ms; indigo grid lines animate upward in a slow 6s loop, brightening to 45% opacity on hover; card lifts `translateY(-6px)`; pill CTA background pulses with a soft glow ring matching the accent.

### Accessibility
- Minimum contrast: 4.5:1 body / 3:1 title against the bottom gradient stop
- Safe text area: bottom 40% of the full-width banner height, 32px padding (featured)
- Mobile crop guidance: this card is full-width on desktop (16:5-ish banner) but 4:5 on mobile — bias the mobile crop to center-right where the dashboard glow and city lights concentrate, cropping out the emptier left third of sky

# Framer Implementation

- **Frame sizes:** Desktop container 1280px (auto-layout horizontal, wrap enabled); card frames per the Desktop Layout table above (560/420/480px heights)
- **Auto-layout settings:** Section = vertical auto-layout, 96px top/bottom padding, 24px gap between rows; each row = horizontal auto-layout, 24px gap, align items stretch (equal height)
- **Padding:** Card internal padding 32px (featured) / 24px (standard), text stack anchored bottom via auto-layout `align: end`
- **Gap:** 24px grid gap at all breakpoints (desktop), 20px tablet, 16px mobile
- **Overflow:** `overflow: hidden` on the card frame (clips scaled background image on hover); text stack layer sits above image layer with `overflow: visible`
- **Effects:** Background-image layer uses Framer's "Image" fill with `background-size: cover`; overlay as a separate absolutely-positioned layer with the specified gradient(s); icon badge uses Framer's native blur effect (`backdrop-filter`) component
- **Motion values:** Hover-in `scale: 1.06/1.08`, `y: -6`, `boxShadow` interpolated via Framer's `whileHover` — duration 0.45s, easing `[0.22, 1, 0.36, 1]`; hover-out duration 0.3s, easing `easeOut`; grid-glow drift animations (Cards 4 and 6) as looping `animate` props, 6–8s duration, `ease: "linear"`, `repeat: Infinity`, `repeatType: "mirror"`

# Visual Hierarchy Diagram

**Desktop (reading order, top to bottom, left to right):**
```
Row 1:  [ Water Resources — 7 cols ]  [ Himalayan Cryosphere — 5 cols ]
Row 2:  [ Drought & Resilience — 4 ]  [ Atmospheric Rivers — 4 ]  [ Wetlands — 4 ]
Row 3:  [ AI Water Systems — full width, 12 cols ]
```

**Mobile (stack order, top to bottom):**
```
1. Water Resources & Hydrological Modeling
2. Himalayan Cryosphere & Glacial Hazards
3. AI-Driven Water Systems & Decision Intelligence
4. Climate Extremes, Drought & Ecosystem Resilience
5. Atmospheric Rivers, Aerosols & Air Quality
6. Wetlands & Water Quality Remote Sensing
```

# Image Generation Pack

1. Ultra-realistic scientific visualization of a vast braided Himalayan river basin from directly above, warm golden-hour side-lighting, aerial drone composition with sediment bars and silver water channels, faint glowing cartographic flow-line overlay, deep teal and amber color palette, soft atmospheric haze, satellite-grade resolution, 4:5 aspect ratio, no text, no people.

2. Ultra-realistic scientific visualization of a turquoise glacial lake beneath jagged snow-capped Himalayan peaks, telephoto compressed composition, fractured glacial ice in the foreground, thin high-altitude haze, cool cyan and steel-blue color palette, crisp alpine atmosphere, 4:5 aspect ratio, no text, no people.

3. Ultra-realistic scientific visualization of cracked drought-stricken farmland transitioning diagonally into resilient green cropland, harsh low-angle directional sunlight, long shadow composition, fine dust-haze atmosphere, warm amber-to-earth palette with a cool green accent zone, 4:5 aspect ratio, no text, no people.

4. Ultra-realistic scientific visualization of an atmospheric river moisture plume streaming across a subcontinent viewed from low orbit, deep-space vantage composition with curved horizon, false-color violet-to-blue data overlay atmosphere, cinematic sci-fi-adjacent color palette with subtle star field, 4:5 aspect ratio, no text, no people.

5. Ultra-realistic scientific visualization of a lush wetland at dawn, mirrored water-channel composition, soft mist atmosphere, wading birds in low flight, pale pink-gold sky reflection, tranquil natural color palette, 4:5 aspect ratio, no text, no people.

6. Ultra-realistic scientific visualization of a glowing AI decision-support dashboard above a nighttime city skyline, wide-angle composition with translucent flood-risk map and indigo data nodes, soft depth-of-field atmosphere over city lights, cool indigo-and-black color palette with warm light accents, 4:5 aspect ratio, no text, no people.

# Final QA Checklist

- [ ] All 6 domain titles match the finalized names exactly (no renaming, no invented domains)
- [ ] Desktop bento grid renders as 7/5 (row 1), 4/4/4 (row 2), 12 (row 3) with no column drift at 1280px
- [ ] Tablet 2-column reflow tested at 768px and 1024px breakpoints
- [ ] Mobile stack order matches the featured-first sequence (1, 2, 6, 3, 4, 5), not domain-number order
- [ ] All background images meet 4:5 source aspect ratio before any card-specific cropping
- [ ] Text contrast verified ≥4.5:1 (body) and ≥3:1 (title) against the darkest rendered overlay state, not just the design mock
- [ ] Featured cards (1, 2, 6) show the persistent accent glow ring at rest; standard cards (3, 4, 5) show glow only on hover
- [ ] Pill CTA used only on featured cards; text-link CTA used only on standard cards
- [ ] Hover transitions match spec: 450ms in / 300ms out, correct easing curves
- [ ] Looping micro-animations (Cards 4 and 6 grid/haze drift) run at correct duration and don't cause layout shift
- [ ] Icon badges use correct Lucide icon per card (`Waves`, `MountainSnow`, `Sprout`, `Wind`, `Leaf`, `BrainCircuit`) at correct size (48px/44px badge)
- [ ] Accent hex values match exactly: `#0F766E`, `#38BDF8`, `#C2703D`, `#7C3AED`, `#059669`, `#4F46E5`
- [ ] Mobile crop focal points manually verified per card (not left to automatic center-crop)
- [ ] Section IDs (`#research-domains`, `#flagship-projects`, `#research-platforms`, `#ip-deployment`) present and correctly anchored if this section links to Projects & Applications below it
- [ ] Reduced-motion preference respected — looping/hover animations disabled or simplified for `prefers-reduced-motion: reduce`
