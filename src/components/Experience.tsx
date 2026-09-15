import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { experience, type Job } from "../data/resume";

function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="relative pb-8 pl-8 last:pb-0"
    >
      <span className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
      <span className="absolute -left-[5px] top-6 h-[11px] w-[11px] rounded-full border-2 border-white bg-[var(--color-accent)] dark:border-[#13151c] dark:bg-[var(--color-accent-dark)]" />

      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <h3 className="font-medium">{job.role}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{job.org}</p>
          </div>
          <p className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            {job.period}
            {job.location ? ` · ${job.location}` : ""}
          </p>
        </div>

        <ul className="mt-3 space-y-2">
          {job.bullets.map((bullet) => (
            <li key={bullet} className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Experience</SectionHeading>
      </Reveal>
      <div>
        {experience.map((job, i) => (
          <JobCard key={job.role + job.period} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
