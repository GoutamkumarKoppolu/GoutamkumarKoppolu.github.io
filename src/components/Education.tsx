import { certificates, education, issuers, type Certificate } from "../data/resume";
import { Section } from "./Section";

function IssuerLogo({ issuer, small }: { issuer: Certificate["issuer"]; small?: boolean }) {
  const { icon: Icon, mono, color } = issuers[issuer];
  return <span className={`ilogo${small ? " sm" : ""}`} style={{ background: color }} aria-hidden="true">{Icon ? <Icon /> : mono}</span>;
}

const credential = (c: Certificate) => c.credentialId ? <code className="id">ID {c.credentialId}</code> : c.code ? <code className="id">{c.code}</code> : null;

export function Education() {
  const anthropic = certificates.filter((c) => c.issuer === "Anthropic");
  const others = certificates.filter((c) => c.issuer !== "Anthropic");
  const issuerCount = new Set(certificates.map((c) => c.issuer)).size;
  return (
    <Section id="education" group="projects" title="Education & certificates" sub="Where the foundations came from, and what I keep learning.">
      <h3 className="sub-h">Education</h3>
      <ol className="edu-tl">
        {education.steps.map((s, i) => (
          <li key={s.title} className={i === 0 ? "now" : undefined}>
            <span className="node" aria-hidden="true" />
            <p className="edu-t">{s.title}</p>
            <p className="edu-m">{education.school} · {s.period}</p>
          </li>
        ))}
      </ol>
      <h3 className="sub-h">Certificates<span>{certificates.length} from {issuerCount} issuers</span></h3>
      <div className="issuers">
        <div className="iss focus">
          <div className="iss-head"><IssuerLogo issuer="Anthropic" /><b>Anthropic</b><span>{anthropic.length} · 2026</span></div>
          <ul>
            {anthropic.map((c) => (
              <li key={c.name}>
                <span className="n">{c.name}{c.recent && <span className="new">new</span>}</span>
                <span className="d">{c.date}</span>
                {credential(c)}
              </li>
            ))}
          </ul>
        </div>
        <div className="iss-col">
          {others.map((c) => (
            <div key={c.name} className="iss slim">
              <div className="iss-head"><IssuerLogo issuer={c.issuer} small /><b>{issuers[c.issuer].name}</b><span>{c.date}</span></div>
              <ul><li><span className="n">{c.name}</span>{credential(c)}</li></ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
