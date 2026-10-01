# westlake-website

Public landing site and central hub for Westlake Sleep Center — patients,
providers, and employees.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for structure and the roadmap.

## Develop

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Build & deploy

```bash
cd frontend
npm run build      # outputs to frontend/dist
firebase deploy --only hosting
```

## Common edits

| To change… | Edit |
|---|---|
| Nav menus / add a page | `frontend/src/config/navigation.ts` |
| Colors, fonts, spacing | `frontend/src/styles/tokens.css` |
| Logo | `frontend/src/assets/logo.png` (+ `public/favicon.png`) |
| Hero image | `frontend/src/assets/` + import in `src/features/home/Hero.tsx` |
| Hero title / subtitle | `frontend/src/features/home/Hero.tsx` |
