# CLAUDE.md

Public landing site and hub for Westlake Sleep Center (patients, providers,
employees). Vite + React + TypeScript SPA in `frontend/`, deployed to Firebase
Hosting. `backend/` is reserved and not implemented.

## Read before working

- **`docs/DESIGN.md`**: the visual design guide. Required reading before
  creating or restyling any page. Reuse its tokens and components, and record
  new reusable patterns there.
- **`docs/ARCHITECTURE.md`**: repo structure, how routes are generated, the
  planned auth / referral / e-signature features, and HIPAA guardrails.

## Key conventions

- Navigation, overview pages, and routes are all generated from
  `frontend/src/config/navigation.ts`. To hide a page without deleting it,
  set `archived: true`.
- Built pages are registered in `frontend/src/app/pages.ts`. Unregistered nav
  items render a "Coming soon" placeholder.
- Styling uses plain CSS and the variables in `frontend/src/styles/tokens.css`.
  No UI or icon libraries.
- Never send patient data anywhere except the planned HIPAA-covered backend.

## Commands

Run from `frontend/`:

```bash
npm run dev     # http://localhost:5173
npm run build   # type-check + production build
npm run lint
```
