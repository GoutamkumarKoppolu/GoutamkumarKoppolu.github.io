import { motion } from "framer-motion";
import { profile } from "../data/resume";

export function Hero() {
  return (
    <header id="top" className="pb-16 pt-20 sm:pt-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-sm font-medium text-[var(--color-accent)] dark:bg-[var(--color-accent-soft-dark)] dark:text-[var(--color-accent-dark)]"
        >
          {profile.title}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Hi, I'm {profile.firstName}.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-2 text-sm text-neutral-500 dark:text-neutral-500"
        >
          {profile.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-8"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] dark:bg-[var(--color-accent-dark)] dark:text-neutral-950"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </header>
  );
}
