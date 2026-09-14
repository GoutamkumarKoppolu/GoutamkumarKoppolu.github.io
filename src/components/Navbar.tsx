import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

export function Navbar() {
  const [active, setActive] = useState<string>("summary");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#0f1117]/80">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
        <a href="#top" className="font-mono text-sm text-neutral-500 hover:text-[var(--color-accent)] dark:text-neutral-400">
          gkk
        </a>
        <div className="hidden gap-5 font-mono text-sm sm:flex">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={
                active === id
                  ? "text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                  : "text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }
            >
              {label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </div>
  );
}
