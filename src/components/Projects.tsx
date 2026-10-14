import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { SiGithub } from "react-icons/si";
import { TbChevronDown, TbDownload, TbExternalLink } from "react-icons/tb";
import { profile, projects, type Project } from "../data/resume";
import { prefersReducedMotion, useScrollEffect } from "../hooks/useScrollEffect";
import { useReleaseDownloads } from "../hooks/useReleaseDownloads";
import { Section } from "./Section";

const docY = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

function Step({ n, label, className = "", children }: { n: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`step ${className}`}>
      <span className="k" aria-hidden="true">{n}</span>
      <p className="step-lbl">{label}</p>
      {children}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const downloads = useReleaseDownloads(p.downloadsRepo);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const on = hover ?? pinned;
  const detailsId = `${p.name.replace(/\W+/g, "-").toLowerCase()}-details`;

  // Pains and solutions share a letter; hover previews the pair, click/tap/Enter pins it
  const linked = (k: string, i: number, children: ReactNode) => (
    <li
      key={k}
      tabIndex={0}
      className={on === k ? "on" : undefined}
      style={{ "--i": i } as CSSProperties}
      onMouseEnter={() => setHover(k)}
      onMouseLeave={() => setHover(null)}
      onFocus={() => setHover(k)}
      onBlur={() => setHover(null)}
      onClick={() => setPinned(pinned === k ? null : k)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setPinned(pinned === k ? null : k);
        }
      }}
    >
      <span className="tg" aria-hidden="true">{k}</span>
      {children}
    </li>
  );

  const Icon = p.action.kind === "download" ? TbDownload : TbExternalLink;
  return (
    <article className="case">
      <div className="side">
        <div>
          <h3 className="p-name">{p.name}</h3>
          <p className="p-tag">{p.tagline}</p>
        </div>
        <div className="facts">
          {p.facts.map(([k, v]) => (
            <div key={k}><span>{k}</span><b>{k === "downloads" && downloads !== null ? downloads : v}</b></div>
          ))}
          <small>{p.factNote}</small>
        </div>
        <div className="tech">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
        <div className="plinks">
          <a className="btn btn-p" href={p.action.href} target="_blank" rel="noopener"><Icon aria-hidden="true" />{p.action.label}</a>
          <a className="src" href={p.source} target="_blank" rel="noopener" aria-label={`${p.name} source code on GitHub (opens in new tab)`}><SiGithub aria-hidden="true" /><span>Source</span></a>
        </div>
      </div>
      <div className="story">
        <span className="rail" aria-hidden="true"><span className="rail-fill empty"><i className="rail-head" /></span></span>
        <Step n="01" label="Problem">
          <p className="lead">{p.lead}</p>
          <ul className="pains">{p.pains.map(([k, t], i) => linked(k, i, <span><span className="sr-only">Pain {k}: </span>{t}</span>))}</ul>
        </Step>
        <Step n="02" label="How I solved it">
          <ul className="sols">{p.solutions.map(([k, b, t], i) => linked(k, i, <span><span className="sr-only">Answers {k}: </span><b>{b}</b> {t}</span>))}</ul>
        </Step>
        <Step n="03" label="Result" className="result">
          <p dangerouslySetInnerHTML={{ __html: p.result }} />
        </Step>
        <button type="button" className="more-btn" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen(!open)}>
          <TbChevronDown aria-hidden="true" /><span>{open ? "Show less" : "Read more: under the hood"}</span>
        </button>
        <div className={`more${open ? " open" : ""}`} id={detailsId}>
          <div>
            <Step n="04" label="Under the hood">
              <ul className="plain">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </Step>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const host = useRef<HTMLDivElement>(null);

  // A packet rides each card's rail and lights the step numbers as it reaches them
  useScrollEffect(() => {
    const read = window.scrollY + window.innerHeight * 0.6;
    host.current?.querySelectorAll(".story").forEach((story) => {
      const rail = story.querySelector<HTMLElement>(".rail")!, fill = story.querySelector<HTMLElement>(".rail-fill")!;
      const top = docY(rail), len = rail.offsetHeight, h = Math.max(0, Math.min(len, read - top));
      fill.style.height = `${h}px`;
      fill.classList.toggle("done", h >= len);
      fill.classList.toggle("empty", h <= 0);
      story.querySelectorAll<HTMLElement>(".step").forEach((st) => {
        const on = docY(st) + 10 - top <= h, was = st.classList.contains("lit");
        if (on && !was) {
          st.classList.add("lit");
          if (!prefersReducedMotion()) { st.classList.remove("ping"); void st.offsetWidth; st.classList.add("ping"); }
        }
        if (!on && was) st.classList.remove("lit", "ping");
      });
    });
  });

  return (
    <Section id="projects" group="projects" title="Projects" sub="Things I built on my own time, each solving a problem I actually had.">
      <div className="cases" ref={host}>{projects.map((p) => <ProjectCard key={p.name} p={p} />)}</div>
      <p className="more-gh"><a href={profile.github} target="_blank" rel="noopener">More on GitHub ↗</a></p>
    </Section>
  );
}
