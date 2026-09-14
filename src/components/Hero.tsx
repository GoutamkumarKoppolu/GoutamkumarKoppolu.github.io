import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/resume";

const PROMPT = "whoami";

function useTypewriter(text: string, speed = 90) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}

export function Hero() {
  const typed = useTypewriter(PROMPT);

  return (
    <header id="top" className="border-b border-neutral-200 pb-10 pt-16 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-3 font-mono text-sm text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
        >
          &gt; {typed}
          <span className="animate-pulse">_</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-1 text-lg text-neutral-600 dark:text-neutral-400"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-1 text-sm text-neutral-500 dark:text-neutral-500"
        >
          {profile.location}
        </motion.p>

        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          aria-label="Contact links"
          className="mt-6 flex flex-wrap gap-3"
        >
          {[
            { label: "Email", href: `mailto:${profile.email}` },
            { label: "LinkedIn", href: profile.linkedin },
            { label: "GitHub", href: profile.github },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              className="rounded-md border border-neutral-200 px-3.5 py-1.5 font-mono text-sm text-neutral-700 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-[var(--color-accent-dark)] dark:hover:text-[var(--color-accent-dark)]"
            >
              {label}
            </a>
          ))}
        </motion.nav>
      </div>
    </header>
  );
}
