import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { skills } from "../data/resume";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const pill = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

function PillGroup({ title, items }: { title: string; items: { name: string; primary?: boolean }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm text-neutral-500 dark:text-neutral-500">{title}</h3>
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {items.map((item) => (
          <motion.li
            key={item.name}
            variants={pill}
            whileHover={{ y: -2 }}
            className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            {item.name}
            {item.primary && (
              <span className="ml-1.5 text-xs text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
                primary
              </span>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Skills</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2">
          <PillGroup title="Languages" items={skills.languages} />
          <PillGroup title="Frameworks" items={skills.frameworks} />
        </div>
      </Reveal>
    </section>
  );
}
