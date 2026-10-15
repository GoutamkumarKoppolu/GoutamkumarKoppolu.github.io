import { highlights } from "../data/resume";
import { Section } from "./Section";

export function Highlights() {
  return (
    <Section id="highlights" group="about" title="Highlights" hideTitle sub="A few things I've built, shipped and led.">
      <div className="k1">
        {highlights.map((h) => (
          <div key={h.label} className="k-item">
            <span className="num">{h.num}</span>
            <span className="lbl">{h.label}</span>
            <span className="ctx">{h.context}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
