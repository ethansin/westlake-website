# Design Guide

The reference for building new pages on the Westlake Sleep Center site. Read
this before adding or restyling any page so the site stays visually cohesive.

> **For agents:** follow this file over your own stylistic defaults. Reuse the
> existing components and tokens listed here before writing new CSS. If a page
> genuinely needs something new, build it from the tokens and add it to this
> guide in the same change.

---

## 1. Look & feel

**Modern, clinical, calm, with a light glass texture.** It should feel like a
trustworthy medical practice, not a tech startup or a spa.

- **Light and airy.** Pale blue-white page backgrounds and generous whitespace.
  Saturated blue is used sparingly: the hero panel, links, and small accents.
- **Glass, not flat.** Raised surfaces (cards, menus, panels) are frosted,
  semi-transparent white with a soft blur, a thin white border, and a soft
  shadow. The nav bar is the one exception: glass with **no border**.
- **Quiet typography.** Bold, tightly-spaced geometric headings over a neutral,
  very readable body face.
- **Restraint.** No stock icon sets, emoji, gradients on text, drop shadows on
  text, or decorative illustrations. Motion is subtle and brief.

---

## 2. Tokens

All values live in `frontend/src/styles/tokens.css`. **Never hard-code a color,
font, radius, or duration that has a token.** To change the look site-wide,
change the token.

### Color

| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#2e6fb7` | Hero panel, links, primary accents |
| `--color-brand-strong` | `#1f5a9e` | Hover / pressed, text on `brand-soft` |
| `--color-brand-soft` | `#e7f0fa` | Tinted backgrounds, badges, row hover |
| `--color-accent` | `#6cc3e8` | Focus rings, small highlights only |
| `--color-ink` | `#0f2a44` | Headings and body text |
| `--color-ink-muted` | `#4f6884` | Secondary text, descriptions, breadcrumbs |
| `--color-line` | `#d9e4f0` | Hairline dividers on light surfaces |
| `--color-surface` | `#f4f8fc` | Page background |
| `--color-white` | `#ffffff` | Text on brand blue, logo tile |

Rules:
- Body text is always `--color-ink` or `--color-ink-muted` on light surfaces,
  and white (or white at ~84% opacity) on `--color-brand`.
- `--color-accent` is too light for text on white. Don't use it for text.
- No new hues (reds, greens, etc.) without updating this guide. If an error or
  success state is needed later, add tokens here first.

### Glass

| Token | Use |
|---|---|
| `--glass-bg` | Nav bar (more see-through) |
| `--glass-bg-strong` | Cards, dropdowns, menus (via `.glass`) |
| `--glass-border` | Thin white border on glass surfaces |
| `--glass-blur` | `backdrop-filter` value |
| `--glass-shadow` | Resting shadow for glass surfaces |

Apply glass with the global **`.glass`** class rather than re-declaring it.

> **Gotcha:** a `backdrop-filter` on an element stops its descendants' blur
> from seeing the page. Don't put glass inside glass. If a container needs
> glass behind glass children, put the container's glass on a separate layer
> (see `.navbar__glass` in `NavBar.css`).

### Shape, spacing, motion

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | Small controls |
| `--radius-md` | 12px | List rows, buttons, inputs |
| `--radius-lg` | 18px | Cards, panels, menus |
| `--radius-pill` | 999px | Badges, chips, nav triggers |
| `--gutter` | 16–48px fluid | Horizontal page padding (never less than 16px) |
| `--nav-height` | 72px | Offset content below the fixed nav |
| `--duration-fast` | 160ms | All hover/open transitions |
| `--ease-out` | — | Movement (transforms) |

Spacing generally steps in multiples of 4px: 8, 12, 16, 24, 28, 40, 56, 96.

---

## 3. Typography

Fonts load from Google Fonts in `frontend/index.html`.

- **Manrope** (`--font-display`) for headings, nav triggers, and the wordmark.
  Weights 500 / 600 / 700 / 800.
- **Inter** (`--font-body`) for everything else. Weights 400 / 500 / 600.

All `h1`–`h4` already get Manrope, `line-height: 1.15`, and
`letter-spacing: -0.02em` from `global.css`.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero title | `clamp(2.25rem, 4.4vw, 4rem)` | 800 | Home page only |
| Page title (`h1`) | `clamp(2rem, 3.6vw, 3rem)` | 800 | `-0.03em` tracking; use `PageShell` |
| Section heading (`h2`) | ~1.5rem | 700 | |
| Sub-heading (`h3`) | ~1.15rem | 700 | |
| Lead paragraph | 1.1rem | 400 | `--color-ink-muted`, max ~40rem wide |
| Body | 16px | 400 | `line-height: 1.6` |
| Item label | 14.5–16px | 600 | Inter |
| Secondary / description | 13–14px | 400 | `--color-ink-muted` |
| Eyebrow / section label | 12–13px | 600 | Uppercase, `0.04–0.08em` tracking |

Rules:
- Sentence case for titles, buttons, and labels ("Preparing for your sleep
  study"). Uppercase only for tiny eyebrow labels and badges.
- Keep long-form text to a readable width of **~68 characters** (`max-width:
  68ch`).

---

## 4. Layout

- **Interior pages** use `PageShell` (`components/layout/PageShell.tsx`). It
  provides the soft blue-tinted background with two faint radial glows, the
  nav offset, the breadcrumb, the `h1`, and an optional lead paragraph. Content
  sits in a centered column, **max 1080px wide**.
- **Home** is the only full-bleed page (the hero).
- Single breakpoint: **900px.** Below it the nav collapses to the hamburger
  menu and side-by-side layouts stack. Design mobile-first within that.
- No horizontal scrolling at any width down to 320px.
- Space between the page header and the first content block is **40px**.

---

## 5. Components

### Existing — reuse these

| Component / class | Where | Use for |
|---|---|---|
| `PageShell` | `components/layout/PageShell.tsx` | Every interior page |
| `.glass` | `styles/global.css` | Any raised surface |
| `.card-grid` + `.card` | `components/layout/pages.css` | Grids of link cards (section overviews). Lift 2px on hover |
| `NavItemLink` / `.nav-item` | `components/nav/NavItemLink.tsx` | A link with a bold label plus a muted one-line description |
| `.badge` | `pages.css` | Small status labels ("Coming soon") |
| `.text-link` | `pages.css` | Inline / standalone text links ("← Back to Patients") |
| `.placeholder-card` | `pages.css` | "Coming soon" content |
| `LinkList` | `components/layout/LinkList.tsx` | Lists of documents to scan (e.g. `/info/policies`). See below |

| Content blocks | `components/layout/content.css` | Informational pages (e.g. `/patients/home-sleep-study`). See below |

**Content blocks** (import `content.css` in the page):
- `.content-stack`: vertical column (max 880px, 24px gaps) holding a page's sections.
- `.content-section` + `.glass`: one panel per topic, with an `h2`. Optional
  `.eyebrow` label above the `h2` for context ("Before your appointment").
- `.section-heading`: an `h2` that sits outside a panel, above a group of cards.
- `.steps`: three numbered glass cards for a short process. Stacks on mobile.
- `.checklist`: items with a brand-blue check-circle icon, for "what to bring" lists.
- `.numbered-list`: small tinted number badges, for directions or ordered instructions.
- `.callout`: tinted box with a brand-blue left edge, for tips and side notes.
- `.split`: two columns inside a panel. Stacks below 900px.
- `.detail-list`: a `<dl>` of label/value rows (uppercase muted label, value
  beside it, hairline dividers). Stacks below 900px. Used on Contact.
- `.video-embed`: 16:9 rounded frame. Use `youtube-nocookie.com` embeds and
  include a plain "Watch on YouTube" link as a fallback.
- Clinic address and phone number come from `config/clinic.ts`. Never retype them.

**`LinkList` details.** One `.glass` panel, max 720px wide, with full-width
rows divided by `--color-line` hairlines. Each row shows a label
(Inter 600), an optional muted one-line description, and a chevron that
nudges right on hover while the row tints `--color-brand-soft`. An item
without a `to` renders as an unlinked row with a "Coming soon" badge. Use a
list instead of cards when the items are things to scan or read rather than
destinations to browse.

### Planned — spec for upcoming pages

These don't exist yet. Build them to this spec when first needed, then move
them to the table above.

**Document / prose page** (for policies, terms, and other plain text)

- `PageShell` with the document title as the `h1`. Breadcrumb shows its parent
  index page.
- Optional muted "Last updated: …" line under the title (14px).
- Body inside a single `.glass` panel (`--radius-lg`, padding 28–40px,
  ~24px on mobile), text constrained to `max-width: 68ch`.
- Plain text styling via a `.prose` class: 16px Inter, `line-height: 1.7`,
  `--color-ink`; paragraphs 1em apart; `h2` 1.25rem / 700 with 2em space
  above; lists indented with 0.4em between items; links styled like
  `.text-link` but underlined.
- No images, cards, or decorative elements. Readability first.

---

## 6. Iconography

- Inline SVG only, no icon libraries.
- 12–16px, `stroke="currentColor"`, stroke width 1.5–1.6, round caps and
  joins, no fill. Match the existing chevron and lock icons.
- Decorative icons get `aria-hidden="true"`. Meaningful ones get
  `role="img"` and an `aria-label`.
- A lock icon next to a link means "sign-in required". Don't use it for
  anything else.

---

## 7. Interaction & motion

- Hover: a background tint (`--color-brand-soft` or a translucent brand
  tint), a 2px lift for cards, or an underline for text links. Pick one per
  element.
- Transitions use `--duration-fast`. No animation longer than ~250ms, and no
  looping or attention-seeking motion.
- `prefers-reduced-motion` is already honored globally. Don't override it.
- Focus: the global `:focus-visible` ring (`--color-accent`). Never remove
  outlines without replacing them.

---

## 8. Accessibility & content

- Text contrast at least WCAG AA (4.5:1). The tokens above meet it when used
  as described.
- One `h1` per page (provided by `PageShell`). Don't skip heading levels.
- Links say where they go ("SMS privacy policy", not "click here"). Links
  that open a new tab or another site use `target="_blank"` with
  `rel="noopener noreferrer"`.
- Write plainly for patients: short sentences, no jargon without explanation.
- **HIPAA:** no page may collect or display patient information except
  through the planned backend. See `ARCHITECTURE.md`.

---

## 9. Adding a page — checklist

1. Add or update the entry in `frontend/src/config/navigation.ts`, unless
   the page is deliberately unlisted (e.g. an individual policy reached from
   an index page).
2. Build the page under `frontend/src/features/<area>/`, wrapped in
   `PageShell`.
3. Register it in `frontend/src/app/pages.ts` (or add an explicit route for
   unlisted pages).
4. Use existing classes and components first. Put any new styles in a CSS file
   next to the component, using tokens only.
5. Check it at 375px, 768px, and 1440px wide, with keyboard-only navigation.
6. If you introduced a reusable pattern, document it in section 5.
