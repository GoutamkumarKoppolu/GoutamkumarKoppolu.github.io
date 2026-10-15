import { useState, type ReactNode } from "react";
import { TbBrandGithub, TbChevronDown, TbDownload, TbExternalLink } from "react-icons/tb";
import { profile, projects, type Project } from "../data/resume";
import { useReleaseDownloads } from "../hooks/useReleaseDownloads";
import { ProblemFixRows } from "./ProblemFixRows";
import { Section } from "./Section";

function Step({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`step ${className}`}>
      <p className="step-lbl">{label}</p>
      {children}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const downloads = useReleaseDownloads(p.downloadsRepo);
  const [open, setOpen] = useState(false);
  const detailsId = `${p.name.replace(/\W+/g, "-").toLowerCase()}-details`;

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
          <a className="src" href={p.source} target="_blank" rel="noopener" aria-label={`${p.name} source code on GitHub (opens in new tab)`}><TbBrandGithub aria-hidden="true" /><span>Source</span></a>
        </div>
      </div>
      <div className="story">
        {p.layout === "rows" && (
          <ProblemFixRows lead={p.lead} rows={p.solutions.map(([k, b, t]) => [p.pains.find(([pk]) => pk === k)?.[1] ?? "", b, t])} />
        )}
        {p.layout === "columns" && (
          <div>
            <p className="lead">{p.lead}</p>
            <div className="cols">
              <Step label="The problem"><ul className="ticks dim">{p.pains.map(([k, t]) => <li key={k}>{t}</li>)}</ul></Step>
              <Step label="What I built"><ul className="ticks">{p.solutions.map(([k, b, t]) => <li key={k}><b>{b}</b> {t}</li>)}</ul></Step>
            </div>
          </div>
        )}
        {p.layout === "story" && (
          <>
            <Step label="The problem">
              <p className="story-p"><span className="lead">{p.lead}</span> {p.pains.map(([, t]) => t).join(" ")}</p>
            </Step>
            <Step label="What I built">
              <ul className="feats">{p.solutions.map(([k, b, t]) => <li key={k}><b>{b.replace(/\.$/, "")}</b><span>{t}</span></li>)}</ul>
            </Step>
          </>
        )}
        {p.layout !== "story" ? (
          <Step label="Result" className="result"><p dangerouslySetInnerHTML={{ __html: p.result }} /></Step>
        ) : (
          <p className="result-big" dangerouslySetInnerHTML={{ __html: p.result }} />
        )}
        <button type="button" className="more-btn" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen(!open)}>
          <TbChevronDown aria-hidden="true" /><span>{open ? "Show less" : "Read more: under the hood"}</span>
        </button>
        <div className={`more${open ? " open" : ""}`} id={detailsId}>
          <div>
            <Step label="Under the hood">
              <ul className="plain">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </Step>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" group="projects" title="Projects" sub="Things I built on my own time, each solving a problem I actually had.">
      <div className="cases">{projects.map((p) => <ProjectCard key={p.name} p={p} />)}</div>
      <p className="more-gh"><a href={profile.github} target="_blank" rel="noopener">More on GitHub ↗</a></p>
    </Section>
  );
}
