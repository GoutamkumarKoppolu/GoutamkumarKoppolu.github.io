import type { IconType } from "react-icons";
import {
  SiAnthropic,
  SiCisco,
  SiClaude,
  SiFirebase,
  SiGithubcopilot,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbBrandAzure, TbBrandWindows, TbSql } from "react-icons/tb";

export const profile = {
  site: "https://goutamkoppolu.is-a.dev",
  name: "Goutam Kumar Koppolu",
  fullName: "Venkata Sai Goutam Kumar Koppolu",
  title: "Senior Backend Engineer",
  roleNote: "Dhan Technology Labs",
  tagline:
    "4+ years designing and running production backends for 600k active users. I build fast, event-driven APIs with Node.js and GraphQL, and lead the team that ships them safely.",
  openTo: "Open to backend & lead roles",
  location: "Ongole, India",
  email: "koppolugoutamkumar@gmail.com",
  linkedin: "https://linkedin.com/in/goutam-kumar-koppolu-89302913b",
  github: "https://github.com/GoutamkumarKoppolu",
  resume: "/Goutam_Kumar_Koppolu_Resume.pdf",
  source: "https://github.com/GoutamkumarKoppolu/GoutamkumarKoppolu.github.io",
};

export const highlights = [
  { num: "~85%", label: "faster API responses", context: "30s → under 4s for home-screen loads on login" },
  { num: "<30", label: "5xx errors a day", context: "down from 200–300 after fixing recurring Node.js crashes" },
  { num: "20+", label: "zero-downtime rollouts", context: "feature-flagged releases to 600k active users of a US internet provider" },
  { num: "6", label: "people on the team I lead", context: "as Lead Developer at Dhan Technology Labs" },
];

// Bullets are HTML so key numbers can carry the green highlight (<mark>)
export type Role = { role: string; period: string; place?: string; promoted?: boolean; bullets: { html: string }[] };
export type Company = { company: string; span: string; about?: string; current?: boolean; roles: Role[] };

export const experience: Company[] = [
  {
    company: "Dhan Technology Labs",
    span: "09/2022 – Present",
    about: "I lead the customer-facing application of a US-based internet service provider.",
    current: true,
    roles: [
      {
        role: "Lead Developer",
        period: "06/2025 – Present",
        place: "Remote",
        promoted: true,
        bullets: [
          { html: "Architected an event-driven system that cut API response times <mark>~85% (30s → under 4s)</mark>, improving user retention through faster home-screen loads on login." },
          { html: "Designed and rolled out a portal-wide feature-flag system enabling <mark>20+ zero-downtime rollouts to 600k users</mark>, with safe experimentation and gradual rollouts to specific customer segments, without production redeploys." },
          { html: "Found why our Node.js servers kept crashing and restarting in production, and fixed the root cause in how errors were handled, which <mark>eliminated outages and cut failed requests (5xx errors) from 200–300 a day to under 30</mark>." },
          { html: "Lead a <mark>team of 6</mark>. Drove cross-functional buy-in with stakeholders and clients, pitching architectural improvements and surfacing trade-offs to win approval for optimized system designs." },
        ],
      },
      {
        role: "Backend Developer",
        period: "09/2022 – 06/2025",
        bullets: [
          { html: "<mark>Within six months of joining</mark>, rewrote an existing Node-RED plugin to support a use case it couldn't handle and no off-the-shelf tool covered." },
          { html: "Integrated application performance monitoring for GraphQL servers, surfacing real-time metrics in Kibana dashboards to identify and resolve critical API bottlenecks and improve throughput." },
        ],
      },
    ],
  },
  {
    company: "Primesoft IP Solutions",
    span: "01/2022 – 09/2022",
    roles: [
      {
        role: "Cloud DevOps Associate",
        period: "01/2022 – 09/2022",
        place: "Hyderabad",
        bullets: [
          { html: "Monitored and troubleshot IaaS and PaaS services hosted on Microsoft Azure." },
          { html: "Maintained tools and frameworks supporting deployment automation, application health checks and patching." },
          { html: "Analyzed logs to troubleshoot application and infrastructure issues in production and non-production environments." },
        ],
      },
    ],
  },
];

// Work case study: shown between Experience and Skills, with a before/after diagram
export const caseStudy = {
  context: "Dhan Technology Labs · customer-facing app for a US internet provider",
  title: "Home screen: 30s → under 4s",
  lead: "After login, customers waited up to 30 seconds for the home screen to load.",
  rows: [
    ["Every request went through the API gateway, the account service and the database, one after another, so each one added its own wait.", "One place to read.", "The home screen reads straight from MongoDB in a single query instead of walking that chain."],
    ["Most of that data had not changed since the last visit, but it was fetched again on every login.", "Change events through Kafka.", "The main database publishes an event to Kafka whenever a record changes; a consumer picks it up and updates the copy in MongoDB."],
    ["The new MongoDB copy started out empty.", "Backfilled through the same pipeline.", "Existing records were fetched from the APIs and sent as Kafka events, so the first copy was built the same way every later update arrives."],
  ] as [string, string, string][],
  tradeoff: "We keep a second database holding the same data, spending storage to make every login fast.",
  result: "<mark>~85% faster home-screen loads (30s → under 4s)</mark>, improving retention, with every change still showing up as it happens.",
};

export type Skill = { name: string; icon?: IconType; mono?: string; color: string; primary?: boolean };
export type SkillLayer = { label: string; note: string; items: Skill[] };

// Drawn top to bottom as the layers of a backend; AI tools sit beside them
export const skillLayers: SkillLayer[] = [
  { label: "API architecture", note: "how services talk", items: [
    { name: "REST", icon: TbApi, color: "#94A3B8" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  ] },
  { label: "Languages", note: "what I write", items: [
    { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", primary: true },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
  ] },
  { label: "Databases", note: "where data lives", items: [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Redis", icon: SiRedis, color: "#FF4438" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MS SQL Server", icon: TbSql, color: "#CC2927" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  ] },
  { label: "Cloud", note: "where it runs", items: [{ name: "Azure", icon: TbBrandAzure, color: "#0078D4" }] },
];

export const aiTools: SkillLayer = {
  label: "AI tools",
  note: "assists every layer",
  items: [
    { name: "Claude", icon: SiClaude, color: "#D97757" },
    { name: "GitHub Copilot", icon: SiGithubcopilot, color: "#A1A1AA" },
    { name: "Antigravity", mono: "Ag", color: "#4285F4" },
  ],
};

export type Project = {
  name: string;
  tagline: string;
  facts: [string, string][];
  factNote: string;
  stack: string[];
  action: { label: string; href: string; kind: "download" | "open" };
  source: string;
  downloadsRepo?: string; // fact "downloads" is replaced by the live GitHub release count
  layout: "rows" | "story" | "columns"; // rows: problem → fix per row; story: problem paragraph + feature grid; columns: problems beside fixes
  lead: string;
  pains: [string, string][]; // [letter, pain]
  solutions: [string, string, string][]; // [letter it answers, title, detail]
  result: string; // HTML
  details: string[];
};

export const projects: Project[] = [
  {
    name: "DigiLog",
    tagline: "A private, offline money tracker for Android.",
    facts: [["downloads", "50"], ["releases", "6"], ["latest", "v2.0.1"]],
    factNote: "Downloads: live count from GitHub releases",
    stack: ["React 19", "Vite", "Dexie / IndexedDB", "Capacitor 7", "Vitest", "GitHub Actions"],
    action: { label: "Download APK", href: "https://github.com/GoutamkumarKoppolu/DigiLog/releases/latest/download/digilog.apk", kind: "download" },
    source: "https://github.com/GoutamkumarKoppolu/DigiLog",
    downloadsRepo: "GoutamkumarKoppolu/DigiLog",
    layout: "rows",
    lead: "My bank balance never told me what I could actually spend.",
    pains: [
      ["A", "EMIs, rent and SIPs were still due this month."],
      ["B", "A credit-card bill was quietly building up."],
      ["C", "Subscriptions renewed without warning."],
      ["D", "A friend still owed me money."],
      ["E", "Part of the balance was meant for savings."],
      ["F", "Apps that automate tracking want an account and access to my SMS."],
    ],
    solutions: [
      ["A", "Usable balance.", "EMIs, rent and SIPs deduct automatically on their day once the month's salary lands, and home shows what's left after everything still due."],
      ["B", "Credit-card tracking.", "Log spends per card, pay the bill as an expense, and compare logged vs paid month by month (bills paid after the 25th count for that month)."],
      ["C", "Subscriptions with reminders.", "Monthly, yearly and free-trial costs with a phone reminder before each renewal. Card-charged ones show up in that card's estimated bill."],
      ["D", "Borrowed & lent.", "Who owes whom, repaid in parts, with each payment moving money in or out of the balance or a savings pot."],
      ["E", "Savings pots.", "Savings grouped by goal that can never go below zero; \"Use savings\" draws from a pot instead of the balance."],
      ["F", "Local-first, no account.", "Everything lives on the phone in IndexedDB (via Dexie), wrapped as an Android app with Capacitor. No server, no SMS permission, fully offline."],
    ],
    result: "One number I can trust before spending: <mark>usable balance</mark>. Shipped to real users with <mark>50+ downloads</mark>, and new versions released based on their feedback.",
    details: [
      "Every figure has a documented formula, from current balance to usable salary, so the numbers are predictable.",
      "One-file backup and restore (save to phone or share to Drive); new versions install over the old APK without losing data.",
      "Feature-folder architecture, Vitest tests, and every APK built by GitHub Actions straight from the repository.",
      "Also: event budgets, bill and warranty storage, spending insights by tag, and themes from light to pure black.",
    ],
  },
  {
    name: "Network Hospital Finder",
    tagline: "Cashless hospitals and insurer news, in one place.",
    facts: [["insurers", "12"], ["news refresh", "weekly"], ["hosting cost", "₹0"]],
    factNote: "Live on GitHub Pages",
    stack: ["TypeScript", "Vite", "GitHub Actions", "GitHub Pages", "Firebase Analytics"],
    action: { label: "Open live site", href: "https://goutamkumarkoppolu.github.io/network-hospital-finder/", kind: "open" },
    source: "https://github.com/GoutamkumarKoppolu/network-hospital-finder",
    layout: "story",
    lead: "When a family member needs admission, the first question is: is this hospital cashless under our insurance?",
    pains: [
      ["A", "The answer is buried on each insurer's own website, all different."],
      ["B", "There's no easy way to see how that insurer is doing in the news."],
      ["C", "If a claim goes wrong, the complaint path is unclear."],
      ["D", "Insurers don't allow their hospital lists to be scraped or copied."],
    ],
    solutions: [
      ["A", "One place, every insurer.", "Pick one of 12 major Indian health insurers and jump straight to its official network hospital locator."],
      ["B", "Weekly insurer news.", "Recent headlines, good and bad, linked to the original articles. A GitHub Actions job refreshes them every Monday and opens an issue if it fails."],
      ["C", "Know who to call.", "Each insurer's IRDAI registration, ownership, official links and a step-by-step complaint path."],
      ["D", "Link, don't copy.", "The site keeps no hospital data of its own. robots.txt and terms are checked and recorded per insurer, and only official sources are linked."],
    ],
    result: "A free, private tool covering <mark>12 major health insurers</mark> with <mark>news refreshed every week</mark> automatically. No login, ads or cookies, and <mark>₹0</mark> to host.",
    details: [
      "A data pipeline ready for permitted sources: a new dataset replaces the old one only if it passes validation (at least 1 row, no more than a 30% drop, 80% with a pincode, no empty names).",
      "IRDAI blocks bots, so the weekly job flags when the annual report is due and opens an issue for a manual update instead of guessing.",
      "Builds and deploys to GitHub Pages automatically; only an anonymous visitor count is collected.",
    ],
  },
  {
    name: "Lower Body Training",
    tagline: "A guided daily exercise plan for lower-body strength.",
    facts: [["size", "~42 KB"], ["build step", "none"], ["works", "offline"]],
    factNote: "Installable on the phone",
    stack: ["HTML", "CSS", "JavaScript", "SVG animation", "PWA"],
    action: { label: "Open app", href: "https://goutamkumarkoppolu.github.io/physical-exercises/", kind: "open" },
    source: "https://github.com/GoutamkumarKoppolu/physical-exercises",
    layout: "columns",
    lead: "A home exercise plan on paper is hard to stick to.",
    pains: [
      ["A", "I forgot how to do each exercise correctly."],
      ["B", "I lost track of which session was today."],
      ["C", "Skipped days went unnoticed."],
      ["D", "I couldn't tell whether I was getting stronger."],
      ["E", "It had to be on my phone, even without internet."],
    ],
    solutions: [
      ["A", "Animated how-to.", "Every exercise is an animated figure drawn in SVG, with step-by-step instructions underneath. Tap to pause."],
      ["B", "A \"Today\" view.", "The daily routine and that day's session from the weekly rotation, together on one screen."],
      ["C", "Streaks and a calendar.", "A days-in-a-row counter and a calendar marking full and partial days."],
      ["D", "Monthly test.", "Ankle mobility, calf raises and balance logged once a month, with history to compare."],
      ["E", "Installable and offline.", "A single ~42 KB HTML file with a service worker and manifest. Data stays on the device."],
    ],
    result: "A daily routine that is <mark>installable, offline and dependency-free</mark>, with progress measured month over month.",
    details: [
      "No framework and no build step: one HTML file, so it loads instantly and is easy to change.",
      "Animations are plain SVG and code, with no videos or images to download.",
      "A lighter Sunday session is built into the weekly rotation.",
    ],
  },
];

export const education = {
  school: "RGUKT IIIT Ongole",
  steps: [
    { title: "B.Tech, Computer Science", period: "2018 – 2022" },
    { title: "Intermediate", period: "2016 – 2018" },
  ],
};

export type Issuer = { name: string; icon?: IconType; mono?: string; color: string };
export const issuers: Record<string, Issuer> = {
  Anthropic: { name: "Anthropic", icon: SiAnthropic, color: "#D97757" },
  IBM: { name: "IBM", mono: "IBM", color: "#5B8DEF" },
  Microsoft: { name: "Microsoft", icon: TbBrandWindows, color: "#0078D4" },
  Cisco: { name: "Cisco", icon: SiCisco, color: "#049FD9" },
};

export type Certificate = { name: string; issuer: keyof typeof issuers; date: string; credentialId?: string; code?: string; recent?: boolean };

// Newest first; Anthropic is shown as its own highlighted group
export const certificates: Certificate[] = [
  { name: "Claude Platform 101", issuer: "Anthropic", date: "Sep 2026", credentialId: "ugrt97qkuisu", recent: true },
  { name: "Claude Code 101", issuer: "Anthropic", date: "Sep 2026", credentialId: "ucjb2rpw74v4", recent: true },
  { name: "Claude 101", issuer: "Anthropic", date: "Aug 2026", credentialId: "6sx6wqtom77n", recent: true },
  { name: "Docker Essentials: A Developer Introduction", issuer: "IBM", date: "Feb 2022" },
  { name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", date: "Jun 2021", code: "AZ-900" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco", date: "Jul 2021" },
];

export const recommendations = [
  {
    name: "Rashmi Prabhakar",
    initials: "RP",
    title: "Lead Product Designer | Product Strategy & Systems Thinking | Design Engineering | GenAI",
    relation: "Worked with Goutam on the same team",
    date: "Oct 5, 2026",
    quote: "He consistently demonstrated strong technical expertise, ownership, and excellent cross-functional collaboration.",
    paragraphs: [
      "I had the opportunity to work closely with Goutam while we were part of the same product team. I worked as a Product Designer, while Goutam contributed as a Backend Engineer. Throughout our collaboration, he consistently demonstrated <mark>strong technical expertise, ownership, and excellent cross-functional collaboration</mark>.",
      "Goutam has a great ability to <mark>bridge technical requirements with the broader product goals</mark>. He communicates clearly, coordinates well with team members, and approaches challenges with a practical, solution-focused mindset. His responsiveness and willingness to collaborate made the overall product development process much smoother.",
      "Beyond his technical skills, what makes Goutam stand out is his attitude toward teamwork. He is <mark>dependable, approachable, and always willing to support his colleagues</mark>. His combination of technical capability and strong collaboration skills makes him a valuable asset to any product team. I highly recommend Goutam to anyone looking for a <mark>talented and reliable Backend Engineer</mark>.",
    ],
  },
];
export const recommendationsUrl = "https://www.linkedin.com/in/goutam-kumar-koppolu-89302913b/details/recommendations/";
