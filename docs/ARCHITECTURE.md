# Architecture

Public landing site and central hub for Westlake Sleep Center, serving three
audiences: **patients**, **referring providers**, and **employees**.

## Layout

```
westlake-website/
├── frontend/                 Vite + React + TypeScript SPA (Firebase Hosting)
│   └── src/
│       ├── app/              router.tsx, pages.ts (page registry), AppLayout
│       ├── auth/             AuthContext + RequireAuth (stubs)
│       ├── components/
│       │   ├── nav/          NavBar, NavDropdown, MobileMenu, NavItemLink
│       │   └── layout/       PageShell, SectionPage, PlaceholderPage, NotFoundPage
│       ├── config/
│       │   ├── navigation.ts Nav sections & items — drives menus AND routes
│       │   └── employeeApps.ts Registry of internal web apps
│       ├── features/         One folder per area (home/ today; patients/, providers/… as built)
│       ├── services/api.ts   fetch wrapper for the future backend
│       └── styles/           tokens.css (design tokens), global.css
├── backend/                  Reserved — see backend/README.md
└── docs/
```

## How pages are added

1. Every nav entry lives in `config/navigation.ts` with an `access` level
   (`public | patient | provider | employee`).
2. The router generates a route for each entry. Non-public routes are
   automatically wrapped in `<RequireAuth access=…>`.
3. Until a real component exists, the route renders a "Coming soon"
   `PlaceholderPage`.
4. To ship a real page: build it under `features/<area>/`, then register it
   in `app/pages.ts` keyed by its path.

## Planned features (not implemented)

### Provider referral form + signature
- Route: `/providers/referral` (`access: "provider"`).
- Identity: reuse the `sleepview-workqueue` auth pattern — FastAPI issues a
  signed session JWT in an HttpOnly cookie; roles live in Firestore.
- **Note:** the workqueue's Google OAuth is restricted to `westlakesleep.com`
  (`hd` param + domain check). External providers won't have those accounts,
  so they need the workqueue's **email/password + admin-approval** path
  (bcrypt, lockout) or a magic-link flow.
- Signature: either a typed/drawn attestation tied to the authenticated
  session + audit log, or the same e-sign vendor used for patients.

### Patient registration forms + agreements
- Routes: `/patients/registration`, `/patients/forms` (later
  `/patients/forms/:formId`).
- Use **embedded signing** from DocuSign or Dropbox Sign: the backend creates
  the signing session server-side and returns a short-lived URL the page
  embeds; completion arrives via the vendor's webhook.
- Confirm the chosen vendor plan includes a **BAA**.

### Employee app launcher
- `/employees/apps` renders cards from `config/employeeApps.ts`; URLs come from
  `VITE_*` env vars.
- Gate with Google OAuth restricted to `westlakesleep.com` (same as the
  workqueue).
- Consider hosting apps on `*.westlakesleep.com` subdomains so a session
  cookie scoped to `.westlakesleep.com` can provide single sign-on across the
  site and internal apps.

## HIPAA guardrails

- The frontend is a static site and holds no PHI at rest.
- Any form that collects PHI must submit **only** to our backend on
  HIPAA-covered GCP services, or to a vendor under a signed BAA — never to
  generic third-party form/email services.
- No tokens in `localStorage`; sessions use HttpOnly cookies.
- Never put secrets in `VITE_*` env vars — they are shipped to the browser.
