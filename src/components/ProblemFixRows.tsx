// Problem → fix rows, shared by the case study and project cards: each row is [problem, fix title, fix detail]
export function ProblemFixRows({ lead, rows }: { lead: string; rows: [string, string, string][] }) {
  return (
    <div>
      <p className="lead">{lead}</p>
      <div className="pf-row pf-head" aria-hidden="true"><p className="step-lbl">Problem</p><span /><p className="step-lbl">What I built</p></div>
      <ul className="pf">
        {rows.map(([pain, b, t]) => (
          <li key={b} className="pf-row">
            <span className="pain">{pain}</span>
            <span className="arr"><span aria-hidden="true">→</span><span className="sr-only">What I built:</span></span>
            <span><b>{b}</b> {t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
