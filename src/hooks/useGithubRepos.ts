import { useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; repos: Repo[] };

const MAX_PROJECTS = 6;

export function useGithubRepos(username: string): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        );
        if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

        const data: Repo[] = await res.json();
        const ranked = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
          })
          .slice(0, MAX_PROJECTS);

        if (!cancelled) setState({ status: "success", repos: ranked });
      } catch (err) {
        console.error("Failed to load GitHub repositories:", err);
        if (!cancelled) setState({ status: "error" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
