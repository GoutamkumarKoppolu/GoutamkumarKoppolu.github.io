import { useEffect, useRef, useState } from "react";
import { TbBrandLinkedin, TbChevronDown, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { recommendations, recommendationsUrl } from "../data/resume";
import { prefersReducedMotion } from "../hooks/useScrollEffect";
import { Section } from "./Section";

type Rec = (typeof recommendations)[number];

function Recommendation({ r, onOpen }: { r: Rec; onOpen: () => void }) {
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
        <button type="button" className="more-btn" aria-expanded={open} aria-controls={id} onClick={() => { setOpen(!open); onOpen(); }}>
          <TbChevronDown aria-hidden="true" /><span>{open ? "Show less" : "Read full recommendation"}</span>
        </button>
        <a className="lilink" href={recommendationsUrl} target="_blank" rel="noopener"><TbBrandLinkedin aria-hidden="true" /><span>View on LinkedIn</span></a>
      </div>
    </figure>
  );
}

export function Recommendations() {
  const n = recommendations.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"l" | "r">("r");
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const go = (d: 1 | -1) => {
    setDir(d > 0 ? "r" : "l");
    setI((x) => (x + d + n) % n);
  };
  const press = (d: 1 | -1) => {
    setAuto(false);
    go(d);
  };

  // Once the section is on screen, slide every 10s; pressing a button or opening the full text stops it for good
  useEffect(() => {
    if (n < 2 || !auto || prefersReducedMotion()) return;
    let t: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && t === undefined) t = window.setInterval(() => { setDir("r"); setI((x) => (x + 1) % n); }, 10000);
    }, { threshold: 0.4 });
    io.observe(ref.current!);
    return () => { io.disconnect(); clearInterval(t); };
  }, [auto, n]);

  return (
    <Section id="recommendations" group="contact" title="Recommendations" sub="What people I've built with say about working with me.">
      <div className="recs" ref={ref} role="group" aria-roledescription="carousel" aria-label="Recommendations">
        <div key={i} className={n > 1 ? `slide in-${dir}` : undefined} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
          <Recommendation r={recommendations[i]} onOpen={() => setAuto(false)} />
        </div>
        {n > 1 && (
          <div className="rnav">
            <button type="button" onClick={() => press(-1)} aria-label="Previous recommendation"><TbChevronLeft aria-hidden="true" /></button>
            <span aria-live={auto ? "off" : "polite"}>{i + 1} / {n}</span>
            <button type="button" onClick={() => press(1)} aria-label="Next recommendation"><TbChevronRight aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </Section>
  );
}
