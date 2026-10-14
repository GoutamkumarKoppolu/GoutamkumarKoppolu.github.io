import { useEffect, useState } from "react";

type Release = { assets: { download_count: number }[] };

// Total downloads across all GitHub releases of `repo` ("owner/name"); null until loaded or if the API fails
export function useReleaseDownloads(repo?: string) {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((releases: Release[]) => {
        const sum = releases.reduce((n, r) => n + r.assets.reduce((m, a) => m + a.download_count, 0), 0);
        if (!cancelled) setTotal(sum);
      })
      .catch((err) => console.error(`Failed to load downloads for ${repo}:`, err));
    return () => {
      cancelled = true;
    };
  }, [repo]);
  return total;
}
