import { TbCertificate, TbSchool } from "react-icons/tb";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { certificates, education } from "../data/resume";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Education</SectionHeading>
        <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] dark:bg-[var(--color-accent-soft-dark)] dark:text-[var(--color-accent-dark)]">
            <TbSchool size={20} />
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 flex-1">
            <div>
              <h3 className="font-medium">{education.degree}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">{education.school}</p>
            </div>
            <p className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              {education.period} · {education.location}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <SectionHeading>Certificates</SectionHeading>
        <ul className="space-y-2">
          {certificates.map((cert) => (
            <li
              key={cert.name}
              className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] dark:bg-[var(--color-accent-soft-dark)] dark:text-[var(--color-accent-dark)]">
                <TbCertificate size={16} />
              </span>
              <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{cert.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {cert.issuer}
                    {cert.credentialId && (
                      <span className="text-neutral-400 dark:text-neutral-600"> · ID: {cert.credentialId}</span>
                    )}
                  </p>
                </div>
                <p className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {cert.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
