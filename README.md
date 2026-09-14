# GoutamkumarKoppolu.github.io

Personal profile page for Goutam Kumar Koppolu — React + TypeScript + Vite, styled with
Tailwind CSS, animated with Framer Motion. The Projects section pulls live from the GitHub
REST API client-side, so it stays current as new public repos are pushed.

## Stack

- **React 19 + TypeScript**, componentized (`src/components/`)
- **Tailwind CSS v4** for styling
- **Framer Motion** for scroll reveals, staggered lists, hero entrance, hover/tap micro-interactions
- **Vite** for dev/build
- Resume content lives in one place: `src/data/resume.ts`

## Develop locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static files to dist/
npm run preview # serve the production build locally
```

## Deploy — GitHub Pages via GitHub Actions (free)

This repo is named `GoutamkumarKoppolu.github.io`, GitHub's special name for a **user site**
served at `https://GoutamkumarKoppolu.github.io`. Because this app now has a build step, Pages
needs to be told to deploy from the included GitHub Actions workflow
(`.github/workflows/deploy.yml`) rather than serving the repo root directly.

One-time setup, after this repo exists on GitHub with this code pushed to `main`:

1. Go to the repo's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch").
3. Push to `main` (or re-run the workflow from the **Actions** tab) — it builds and deploys
   automatically. No manual step after that; every push to `main` redeploys.
4. Visit `https://GoutamkumarKoppolu.github.io` once the workflow finishes (~1 minute).

## Notes

- The Projects section calls `api.github.com/users/GoutamkumarKoppolu/repos` unauthenticated,
  capped at 60 requests/hour **per visitor IP** — plenty for a personal page; it shows a
  graceful fallback message if the limit is hit or the fetch fails.
- Forked repos are excluded from Projects; the top 6 shown are ranked by star count, then most
  recently pushed.
- Dark mode respects the OS preference by default and can be toggled manually (persisted via
  `localStorage`) using the sun/moon button in the nav bar.
- To update resume content, edit `src/data/resume.ts` — no need to touch component files.
