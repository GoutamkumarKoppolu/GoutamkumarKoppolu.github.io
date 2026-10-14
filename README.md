# GoutamkumarKoppolu.github.io

Personal profile page for Goutam Kumar Koppolu — React + TypeScript + Vite, dark "terminal" design
over an animated service-mesh background. Projects are hand-picked case studies; DigiLog's download
count is fetched live from its GitHub releases.

## Stack

- **React 19 + TypeScript**, one component per section (`src/components/`)
- **Tailwind CSS v4** (reset) plus the design's own stylesheet in `src/index.css`
- Animations are plain CSS and canvas: the mesh, the scroll-linked timeline packet and project rails; all respect reduced motion
- **Vite** for dev/build
- All content lives in one place: `src/data/resume.ts`; the résumé PDF is `public/Goutam_Kumar_Koppolu_Resume.pdf`

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
