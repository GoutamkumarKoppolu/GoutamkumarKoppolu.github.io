import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skillCategories } from "../data/skillIcons";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tile = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Skills</SectionHeading>

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(category.id)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-active"
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative">{category.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            variants={grid}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {active.items.map((item) => (
              <motion.div
                key={item.name}
                variants={tile}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${item.color}1a` }}
                >
                  <item.icon size={20} color={item.color} />
                </span>
                <span className="text-sm font-medium">{item.name}</span>
                {item.primary && (
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent)] dark:bg-[var(--color-accent-soft-dark)] dark:text-[var(--color-accent-dark)]">
                    primary
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
