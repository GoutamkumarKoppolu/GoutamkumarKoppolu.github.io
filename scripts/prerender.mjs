// Post-build: renders the app to static HTML (crawlers and AI bots that don't run JS see the full page),
// then writes JSON-LD, llms.txt and sitemap.xml from the same data the site uses (src/data/resume.ts).
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const d = await vite.ssrLoadModule("/src/data/resume.ts");
  const { profile: p, highlights, experience, caseStudy: cs, skillLayers, aiTools, projects, education, certificates, recommendations } = d;
  const text = (html) => html.replace(/<[^>]+>/g, "");
  const today = new Date().toISOString().slice(0, 10);
  const skills = [...skillLayers, aiTools].flatMap((l) => l.items.map((s) => s.name));
  const current = experience[0].roles[0];

  // ---- Structured data (Person, ProfilePage, WebSite, FAQ for answer engines) ----
  const person = {
    "@type": "Person",
    "@id": `${p.site}/#person`,
    name: p.name,
    alternateName: p.fullName,
    jobTitle: p.title,
    description: p.tagline,
    url: p.site,
    image: `${p.site}/og.png`,
    email: `mailto:${p.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Ongole", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: experience[0].company },
    alumniOf: { "@type": "CollegeOrUniversity", name: `Rajiv Gandhi University of Knowledge Technologies (${education.school})` },
    knowsAbout: [...skills, "Backend engineering", "Event-driven architecture", "Feature flags", "API performance"],
    hasCredential: certificates.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
    sameAs: [p.linkedin, p.github],
  };
  const faq = [
    [`Who is ${p.name}?`, `${p.name} (${p.fullName}) is a ${p.title} based in ${p.location}, currently ${current.role} at ${experience[0].company}. ${p.tagline}`],
    [`What has ${p.name} achieved?`, highlights.map((h) => `${h.num} ${h.label} (${h.context})`).join("; ") + "."],
    [`What are ${p.name}'s skills?`, skillLayers.map((l) => `${l.label}: ${l.items.map((s) => s.name).join(", ")}`).join(". ") + `. AI tools: ${aiTools.items.map((s) => s.name).join(", ")}.`],
    [`What projects has ${p.name} built?`, projects.map((x) => `${x.name}: ${x.tagline}`).join(" ")],
    [`Is ${p.name} open to work?`, `Yes. He is open to senior backend and lead roles. Email ${p.email} or message him on LinkedIn (${p.linkedin}).`],
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${p.site}/#website`, url: p.site, name: p.name, inLanguage: "en" },
      { "@type": "ProfilePage", "@id": `${p.site}/#profile`, url: p.site, name: `${p.name} — ${p.title}`, dateModified: today, isPartOf: { "@id": `${p.site}/#website` }, mainEntity: { "@id": `${p.site}/#person` } },
      person,
      { "@type": "FAQPage", "@id": `${p.site}/#faq`, mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };

  // ---- Static HTML ----
  const indexPath = "dist/index.html";
  const html = readFileSync(indexPath, "utf8")
    .replace('<div id="root"></div>', `<div id="root">${renderToString(createElement(App))}</div>`)
    .replace("</head>", `  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>\n  </head>`);
  if (!html.includes("<h1")) throw new Error("prerender produced no <h1>; is #root still in index.html?");
  writeFileSync(indexPath, html);

  // ---- llms.txt: plain-text profile for AI assistants (llmstxt.org) ----
  const llms = [
    `# ${p.name}`,
    "",
    `> ${p.title} based in ${p.location}. ${p.tagline}`,
    "",
    `Full name: ${p.fullName}. ${p.openTo}. Email: ${p.email}.`,
    "",
    "## Highlights",
    ...highlights.map((h) => `- ${h.num} ${h.label}: ${h.context}`),
    "",
    "## Experience",
    ...experience.flatMap((c) => c.roles.flatMap((r) => [`### ${r.role}, ${c.company} (${r.period}${r.place ? `, ${r.place}` : ""})`, ...r.bullets.map((b) => `- ${text(b.html)}`), ""])),
    `## Case study: ${cs.title}`,
    `${cs.context}. ${cs.lead}`,
    ...cs.rows.map(([pain, b, t]) => `- Problem: ${pain} Fix: ${b} ${t}`),
    `Trade-off: ${cs.tradeoff}`,
    `Result: ${text(cs.result)}`,
    "",
    "## Skills",
    ...[...skillLayers, aiTools].map((l) => `- ${l.label}: ${l.items.map((s) => s.name + (s.primary ? " (primary)" : "")).join(", ")}`),
    "",
    "## Projects",
    ...projects.flatMap((x) => [
      `### [${x.name}](${x.source})`,
      `${x.tagline} ${x.action.label}: ${x.action.href}`,
      `Problem: ${x.lead} ${x.pains.map(([, t]) => t).join(" ")}`,
      ...x.solutions.map(([, b, t]) => `- ${b} ${t}`),
      `Result: ${text(x.result)}`,
      "",
    ]),
    "## Education",
    ...education.steps.map((s) => `- ${s.title}, ${education.school} (${s.period})`),
    "",
    "## Certificates",
    ...certificates.map((c) => `- ${c.name}, ${c.issuer} (${c.date})${c.credentialId ? `, credential ID ${c.credentialId}` : ""}`),
    "",
    "## Recommendations",
    ...recommendations.map((r) => `- "${r.quote}" — ${r.name}, ${r.title.split(" | ")[0]} (${r.relation.toLowerCase()})`),
    "",
    "## Links",
    `- [Website](${p.site})`,
    `- [Resume (PDF)](${p.site}${p.resume})`,
    `- [LinkedIn](${p.linkedin})`,
    `- [GitHub](${p.github})`,
    "",
  ].join("\n");
  writeFileSync("dist/llms.txt", llms);

  writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${p.site}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
  console.log(`prerendered index.html (${Math.round(html.length / 1024)} KB), llms.txt, sitemap.xml`);
} finally {
  await vite.close();
}
