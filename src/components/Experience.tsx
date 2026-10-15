import { useRef } from "react";
import { experience } from "../data/resume";
import { prefersReducedMotion, useScrollEffect } from "../hooks/useScrollEffect";
import { Section } from "./Section";

const docY = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

export function Experience() {
  const tl = useRef<HTMLOListElement>(null);

  // A packet rides the timeline to a reading point; each role pings, lights up and reveals as it arrives
  useScrollEffect(() => {
    const list = tl.current;
    if (!list) return;
    const fill = list.querySelector<HTMLElement>(".fill")!;
    const top = docY(list) + 8, len = list.offsetHeight - 16;
    const h = Math.max(0, Math.min(len, window.scrollY + window.innerHeight * 0.55 - top));
    fill.style.height = `${h}px`;
    fill.classList.toggle("done", h >= len);
    fill.classList.toggle("empty", h <= 0);
    list.querySelectorAll(".co").forEach((c) => c.classList.toggle("lit", docY(c) + 7 - top <= h));
    list.querySelectorAll<HTMLElement>(".role").forEach((r) => {
      const on = docY(r) + 26 - top <= h, was = r.classList.contains("lit");
      r.classList.toggle("lit", on);
      if (!on) return;
      if (!r.classList.contains("in")) {
        r.querySelectorAll<HTMLElement>(".bul li").forEach((li, i) => (li.style.transitionDelay = `${120 + i * 60}ms`));
        r.classList.add("in");
        r.parentElement!.querySelector(".co-head")!.classList.add("in");
      }
      if (!was && !prefersReducedMotion()) {
        r.classList.remove("ping");
        void r.offsetWidth; // restart the pulse animation
        r.classList.add("ping");
      }
    });
  });

  return (
    <Section id="experience" group="experience" title="Experience" sub="4+ years building and running production backends.">
      <ol className="tl" ref={tl}>
        <li className="fill empty" aria-hidden="true"><i className="head" /></li>
        {experience.map((c) => (
          <li key={c.company} className={`co${c.current ? " now" : ""}`}>
            <span className="node" aria-hidden="true" />
            <div className="co-head"><h3>{c.company}</h3><span>{c.span}</span></div>
            {c.about && <p className="co-about">{c.about}</p>}
            {c.roles.map((r) => (
              <div key={r.role} className="role">
                <p className="r-title">{r.role}{r.promoted && <span className="promo">promoted</span>}</p>
                <p className="r-meta">{r.period}{r.place && ` · ${r.place}`}</p>
                <ul className="bul">
                  {r.bullets.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b.html }} />)}
                </ul>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </Section>
  );
}
