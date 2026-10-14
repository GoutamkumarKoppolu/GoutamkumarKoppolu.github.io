import { highlights } from "../data/resume";
import { prefersReducedMotion } from "../hooks/useScrollEffect";
import { Section } from "./Section";

// Scroll to the Experience bullet that backs a highlight and flash it green
function showProof(id: string) {
  const li = document.querySelector(`li[data-id="${id}"]`);
  if (!li) return;
  const reduce = prefersReducedMotion();
  window.scrollTo({ top: li.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3, behavior: reduce ? "auto" : "smooth" });
  li.classList.remove("flash");
  setTimeout(() => li.classList.add("flash"), reduce ? 0 : 450);
}

export function Highlights() {
  return (
    <Section id="highlights" group="about" title="Highlights" sub="The results I'm proudest of. Click any of them to see where it happened.">
      <div className="k1">
        {highlights.map((h) => (
          <button key={h.label} type="button" className="k-item" onClick={() => showProof(h.proof)} aria-label={`${h.num} ${h.label}. Show the proof in Experience.`}>
            <span className="num">{h.num}</span>
            <span className="lbl">{h.label}</span>
            <span className="ctx">{h.context}</span>
            <span className="proof">see proof <span className="a" aria-hidden="true">↓</span></span>
          </button>
        ))}
      </div>
    </Section>
  );
}
