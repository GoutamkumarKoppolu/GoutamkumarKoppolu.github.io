import { aiTools, skillLayers, type Skill, type SkillLayer } from "../data/resume";
import { Section } from "./Section";

function SkillTag({ s }: { s: Skill }) {
  const Icon = s.icon;
  return (
    <span>
      {Icon ? (
        <i className="ic" style={{ color: s.color }} aria-hidden="true"><Icon /></i>
      ) : (
        <i className="ic mono" style={{ background: s.color }} aria-hidden="true">{s.mono}</i>
      )}
      {s.name}
      {s.primary && <b className="prim">primary</b>}
    </span>
  );
}

const Heading = ({ l }: { l: SkillLayer }) => <h3>{l.label}<small>{l.note}</small></h3>;

// Skills drawn as the layers of a backend; hovering a layer dims the others
export function Skills() {
  return (
    <Section id="skills" group="skills" title="Skills" sub="The tools I reach for, grouped by where they sit in a system.">
      <div className="sk4">
        <div className="stack">
          {skillLayers.map((l) => (
            <div key={l.label} className="layer" tabIndex={0}>
              <Heading l={l} />
              <div className="items">{l.items.map((s) => <SkillTag key={s.name} s={s} />)}</div>
            </div>
          ))}
        </div>
        <div className="ai" tabIndex={0}>
          <Heading l={aiTools} />
          <div className="items">{aiTools.items.map((s) => <SkillTag key={s.name} s={s} />)}</div>
        </div>
      </div>
    </Section>
  );
}
