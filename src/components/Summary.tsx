import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { profile } from "../data/resume";

export function Summary() {
  return (
    <section id="summary" className="mx-auto max-w-3xl px-6 py-12">
      <Reveal>
        <SectionHeading>Summary</SectionHeading>
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">{profile.summary}</p>
      </Reveal>
    </section>
  );
}
