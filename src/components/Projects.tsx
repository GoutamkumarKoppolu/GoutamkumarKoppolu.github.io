import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile } from "../data/resume";
import { useGithubRepos } from "../hooks/useGithubRepos";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Projects() {
  const state = useGithubRepos(profile.githubUsername);

  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Projects</SectionHeading>
      </Reveal>

      {state.status === "loading" && (
        <p className="text-sm text-neutral-500 dark:text-neutral-500">Loading repositories from GitHub…</p>
      )}

      {state.status === "error" && (
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          Couldn't load repositories right now — see them directly on{" "}
          <a href={profile.github} target="_blank" rel="noopener" className="text-[var(--color-accent)] underline dark:text-[var(--color-accent-dark)]">
            GitHub
          </a>
          .
        </p>
      )}

      {state.status === "success" && state.repos.length === 0 && (
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          No public repositories yet — check back soon, or browse{" "}
          <a href={profile.github} target="_blank" rel="noopener" className="text-[var(--color-accent)] underline dark:text-[var(--color-accent-dark)]">
            the GitHub profile
          </a>
          .
        </p>
      )}

      {state.status === "success" && state.repos.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {state.repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener"
              variants={card}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-[var(--color-accent)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-[var(--color-accent-dark)]"
            >
              <h3 className="font-medium">{repo.name}</h3>
              <p className="flex-grow text-sm text-neutral-600 dark:text-neutral-400">
                {repo.description ?? "No description provided."}
              </p>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {repo.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent)] dark:bg-[var(--color-accent-soft-dark)] dark:text-[var(--color-accent-dark)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <p className="flex gap-3 text-xs text-neutral-500 dark:text-neutral-500">
                {repo.language && <span>{repo.language}</span>}
                {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
              </p>
            </motion.a>
          ))}
        </motion.div>
      )}
    </section>
  );
}
