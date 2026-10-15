import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { caseStudy as cs } from "../data/resume";
import { ProblemFixRows } from "./ProblemFixRows";
import { Section } from "./Section";

const BEFORE = ["Customer app", "API gateway", "Internal Systems", "Main Database"];
const STEP = 640 / 3; // before-row box spacing: 4 boxes of 120 across 760
const LABEL =
  "Before: the customer app went through the API gateway, the account service and the database one after another, about 30 seconds. After: the main database emits change events, Kafka carries them to MongoDB, and the app reads MongoDB once, under 4 seconds.";

// Before/after of the login path; colors come from CSS classes (currentColor + accent) so both themes work
function Diagram() {
  return (
    <figure className="dia">
      <div className="dia-scroll">
        <svg viewBox="0 0 760 272" role="img" aria-label={LABEL}>
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" /></marker>
            <marker id="ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" className="ac" /></marker>
          </defs>
          <text x="0" y="16" className="row">BEFORE</text>
          <text x="760" y="16" className="s" textAnchor="end">~30s per home-screen load</text>
          {BEFORE.map((n, i) => (
            <g key={n}>
              <rect className="box" x={i * STEP} y="32" width="120" height="36" rx="6" />
              <text className="t" x={i * STEP + 60} y="54" textAnchor="middle">{n}</text>
              {i < 3 && <line className="ln" x1={i * STEP + 122} y1="50" x2={i * STEP + STEP - 2} y2="50" markerEnd="url(#ah)" />}
            </g>
          ))}
          <text x="380" y="92" className="s" textAnchor="middle">each call waits for the one before it, mostly to fetch data that hasn't changed</text>
          <line x1="0" y1="116" x2="760" y2="116" className="ln" strokeDasharray="3 5" opacity=".5" />
          <text x="0" y="146" className="row">AFTER</text>
          <text x="760" y="146" className="ac" textAnchor="end">under 4s</text>
          <rect className="box" x="0" y="180" width="130" height="36" rx="6" />
          <text className="t" x="65" y="202" textAnchor="middle">Main database</text>
          <rect className="box new" x="210" y="180" width="130" height="36" rx="6" />
          <text className="t" x="275" y="202" textAnchor="middle">Kafka</text>
          <rect className="box new" x="420" y="180" width="150" height="36" rx="6" />
          <text className="t" x="495" y="196" textAnchor="middle">MongoDB</text>
          <text className="s" x="495" y="209" textAnchor="middle">ready-to-read copy</text>
          <rect className="box" x="640" y="180" width="120" height="36" rx="6" />
          <text className="t" x="700" y="202" textAnchor="middle">Customer app</text>
          <line className="ln new" x1="132" y1="198" x2="208" y2="198" markerEnd="url(#ag)" />
          <text className="ac" x="170" y="190" textAnchor="middle">change event</text>
          <line className="ln new" x1="342" y1="198" x2="418" y2="198" markerEnd="url(#ag)" />
          <text className="ac" x="380" y="190" textAnchor="middle">consumed</text>
          <line className="ln new" x1="638" y1="198" x2="572" y2="198" markerEnd="url(#ag)" />
          <text className="ac" x="605" y="190" textAnchor="middle">1 read</text>
          <text x="275" y="240" className="s" textAnchor="middle">runs whenever a record changes,</text>
          <text x="275" y="255" className="s" textAnchor="middle">not when a customer logs in</text>
        </svg>
      </div>
      <figcaption>The gateway → account → database chain is gone from the login path. Changes flow into MongoDB as they happen, so the app reads one up-to-date place.</figcaption>
    </figure>
  );
}

export function CaseStudy() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="case-study" group="experience" title="Case study">
      <div className="cs">
        <h3 className="cs-title">{cs.title}</h3>
        <button type="button" className="more-btn hl" aria-expanded={open} aria-controls="cs-body" onClick={() => setOpen(!open)}>
          <TbChevronDown aria-hidden="true" /><span>{open ? "Hide the case study" : "Read the case study"}</span>
        </button>
        <div className={`more${open ? " open" : ""}`} id="cs-body">
          <div className="cs">
            <Diagram />
            <ProblemFixRows lead={cs.lead} rows={cs.rows} />
            <div>
              <p className="step-lbl">Trade-off</p>
              <p className="cs-result">{cs.tradeoff}</p>
            </div>
            <div>
              <p className="step-lbl">Result</p>
              <p className="cs-result" dangerouslySetInnerHTML={{ __html: cs.result }} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
