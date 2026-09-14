import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { certificates, education } from "../data/resume";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Education</SectionHeading>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <h3 className="font-medium">{education.degree}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{education.school}</p>
          </div>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
            {education.period} · {education.location}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <SectionHeading>Certificates</SectionHeading>
        <ul className="list-inside list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
          {certificates.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
