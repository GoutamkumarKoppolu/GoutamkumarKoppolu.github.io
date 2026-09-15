export const profile = {
  name: "Venkata Sai Goutam Kumar Koppolu",
  firstName: "Goutam",
  title: "Senior Backend Engineer",
  tagline:
    "I build high-performance backend systems and lead teams to ship them safely — currently expanding into generative AI application development.",
  location: "Ongole, India",
  email: "koppolugoutamkumar@gmail.com",
  linkedin: "https://linkedin.com/in/goutam-kumar-koppolu-89302913b",
  github: "https://github.com/GoutamkumarKoppolu",
  githubUsername: "GoutamkumarKoppolu",
  summary:
    "Backend and lead engineer with four years of experience designing and shipping scalable production systems serving 450k active users. Proven track record architecting high-performance APIs, leading engineering teams, and delivering zero-downtime deployments through feature flag systems. Strong foundation in Node.js, GraphQL, and event-driven architecture. Currently expanding expertise into generative AI application development.",
};

export type Job = {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    role: "Lead Developer",
    org: "Dhan Technology Labs",
    period: "06/2025 – Present",
    location: "Remote",
    bullets: [
      "Architected an event-driven system that cut API response times ~85% (30s → under 4s), improving user retention through faster home-screen loads on login.",
      "Designed and rolled out a portal-wide feature-flag system enabling zero-downtime deployments to 450k users, with safe experimentation and gradual rollouts to specific customer segments — no production redeploys.",
      "Resolved recurring Node.js production restarts by fixing faulty exception handling and process-killing listeners; added a top-level error listener that eliminated outages and improved stability.",
      "Drove cross-functional buy-in with stakeholders and clients, pitching architectural improvements and surfacing trade-offs to win approval for optimized system designs.",
    ],
  },
  {
    role: "Backend Developer",
    org: "Dhan Technology Labs",
    period: "09/2022 – 06/2025",
    bullets: [
      "Customized an existing Node-RED plugin to support a bespoke use case with no off-the-shelf solution, enabling rapid workflow automation within six months.",
      "Integrated application performance monitoring for GraphQL servers, surfacing real-time metrics in Kibana dashboards to identify and resolve critical API bottlenecks and improve throughput.",
    ],
  },
  {
    role: "Cloud DevOps Associate",
    org: "Primesoft IP Solutions",
    period: "01/2022 – 09/2022",
    location: "Hyderabad",
    bullets: [
      "Responsible for monitoring and troubleshooting IaaS and PaaS services hosted on Microsoft Azure cloud platform.",
      "Maintained tools and frameworks that support deployment automation, health checks of applications, and patching activities.",
      "Analyzed logs to support and troubleshoot application and infrastructure issues in both production and non-production environments.",
    ],
  },
];

export const education = {
  degree: "B.Tech — Computer Science",
  school: "RGUKT - Ongole",
  period: "2019 – 06/2022",
  location: "Ongole",
};

export const certificates = ["AZ-900: Microsoft Azure Fundamentals"];
