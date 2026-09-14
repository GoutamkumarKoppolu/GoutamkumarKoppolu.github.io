# GoutamkumarKoppolu.github.io

Personal profile page for Goutam Kumar Koppolu — plain HTML/CSS/JS, no build step, no
frameworks, no GitHub Actions. The Projects section pulls live from the GitHub REST API
client-side, so it stays up to date automatically as new public repos are pushed.

## Preview locally

Just open `index.html` in a browser, or serve it so the GitHub API fetch behaves exactly
like it will in production:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Publish it on GitHub Pages (free)

This repo is named `GoutamkumarKoppolu.github.io`, which GitHub treats as a special
**user site** — once it exists on GitHub with `index.html` at the root of the `main`
branch, GitHub Pages serves it automatically at `https://GoutamkumarKoppolu.github.io`.
No GitHub Actions workflow and no manual "enable Pages" step needed.

1. Create a new **empty** repository on GitHub named exactly `GoutamkumarKoppolu.github.io`
   (no README/license/gitignore — this folder already has everything).
2. From inside this folder, point it at that repo and push:
   ```bash
   git remote add origin https://github.com/GoutamkumarKoppolu/GoutamkumarKoppolu.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. Wait 1-2 minutes, then visit `https://GoutamkumarKoppolu.github.io`.
4. If it doesn't appear: go to the repo's **Settings → Pages** and confirm the source is
   set to `Deploy from a branch` → `main` / `(root)`.

## Notes

- The Projects section calls `api.github.com/users/GoutamkumarKoppolu/repos` unauthenticated,
  which is capped at 60 requests/hour **per visitor IP** — plenty for a personal page, but if
  it ever shows the fallback message under heavy testing, that's why (it recovers within the
  hour, no action needed).
- Forked repos are excluded from the Projects list; the top 6 are picked by star count, then
  most recently pushed.
- To update resume content, edit the text directly in `index.html` — there's no data file or
  build step.
