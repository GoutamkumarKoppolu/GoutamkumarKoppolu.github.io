import { useState } from "react";
import { TbBrandLinkedin, TbChevronDown } from "react-icons/tb";
import { recommendations, recommendationsUrl } from "../data/resume";
import { Section } from "./Section";

type Rec = (typeof recommendations)[number];

function Recommendation({ r }: { r: Rec }) {
  const [open, setOpen] = useState(false);
  const id = `${r.initials.toLowerCase()}-full`;
  return (
    <figure className="r1">
      <blockquote className="q">{r.quote}</blockquote>
      <figcaption className="foot">
        <div className="who"><span className="av" aria-hidden="true">{r.initials}</span><div><b>{r.name}</b><small>{r.title}</small></div></div>
        <p className="rel">{r.relation} · {r.date}</p>
      </figcaption>
      <div className={`rfull${open ? " open" : ""}`} id={id}>
        <div>{r.paragraphs.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</div>
      </div>
      <div className="acts">
        <button type="button" className="more-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          <TbChevronDown aria-hidden="true" /><span>{open ? "Show less" : "Read full recommendation"}</span>
        </button>
        <a className="lilink" href={recommendationsUrl} target="_blank" rel="noopener"><TbBrandLinkedin aria-hidden="true" /><span>View on LinkedIn</span></a>
      </div>
    </figure>
  );
}

export function Recommendations() {
  return (
    <Section id="recommendations" group="contact" title="Recommendations" sub="What people I've built with say about working with me.">
      <div className="recs">{recommendations.map((r) => <Recommendation key={r.name} r={r} />)}</div>
    </Section>
  );
}
