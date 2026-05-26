# Healing Homes Mexico Brand

Locked 2026-05-26. Architectural practice rooted in Lake Chapala. Sister product to LeadsZen, Demian, and Origen Media.

## Positioning

The home is the medicine. The craft is how we make it. We build on Vitruvian principles: durability, utility, beauty.

## Voice signature

Confident, declarative, grounded. The voice of a builder who has done the work and lets the work speak. Architecture-literate but never academic.

## Reference canon

Tadao Ando (Casa Wabi), Luis Barragán, Geoffrey Bawa, John Pawson, Phaidon and Taschen monographs.

## Voice color

Lake Chapala Blue `#3B6378`. Deep `#2A4A5C`. Hover `#4F7A91`.

Appears in: wordmark, app icon, primary CTAs, active states, section anchors, links, critical state.

Never in: body text, decorative backgrounds, hover for non-critical actions, photographic overlays, architectural diagram strokes.

## Wordmark

"Healing Homes" set in Fraunces regular, slightly opened tracking. "MEXICO" as subtitle in Inter small caps letter-spaced. Stays English on Spanish pages (the brand is the brand).

## Typography stack

- Display and editorial: Fraunces (Roman lapidary lineage)
- Chrome and UI: Inter (cross-product seamless)
- Section labels: Inter small caps letter-spaced
- Code and monospace: JetBrains Mono

## Palette

### Light mode (default — paper register)
- Page `#F5F2EB` warm paper
- Surface `#FFFFFF`
- Text primary `#1A1F2A`
- Border `#D8D3C5`

### Dark mode (back office night work)
- Page `#1A1F2A`
- Surface `#242A36`
- Text primary `#F5F2EB`

### Material accents (diagrams only)
- Concrete `#9C9A95`
- Cantera rose `#B85C3E`
- Lake fog `#A8B5C0`
- Mountain shadow `#3F4A55`

## Three layout registers

1. **The Notebook (working surface).** Default for public pages. Diagrams and photography interleaved with prose. Marginalia. Vitruvian zones.
2. **The Project Brief (case study).** Each home as a documented project. Title block, build phases, materials, builder notes.
3. **The Back Office (dwelling).** Authenticated workspace. Sidebar plus content. Same chrome grammar as the family.

## Database

Healing Homes writes to the `healinghomes` schema inside Supabase project `gkxwmkprgixbiwkpaxud` (Origen Infrastructure). Permanent home; never migrates as long as the practice stays the practice. Multi-tenant role system from day one (founder | operator | specialist | client | investor).

## Source of truth

TypeScript constants in `lib/tokens/` and `lib/brand.ts` are canonical. ESLint blocks hex outside `lib/tokens/`. Code wins.
