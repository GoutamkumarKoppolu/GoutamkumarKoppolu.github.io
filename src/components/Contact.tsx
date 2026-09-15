import { useState } from "react";
import { motion } from "framer-motion";
import { TbBrandGithub, TbBrandLinkedin, TbCheck, TbMail } from "react-icons/tb";
import { Reveal } from "./Reveal";
import { profile } from "../data/resume";

const socialLinks = [
  { label: "LinkedIn", href: profile.linkedin, icon: TbBrandLinkedin, color: "#0a66c2" },
  { label: "GitHub", href: profile.github, icon: TbBrandGithub, color: undefined },
];

function EmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (e.g. insecure context); the address is still shown.
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      {copied ? <TbCheck size={18} color="#22c55e" /> : <TbMail size={18} color="#4f46e5" />}
      {copied ? "Copied!" : profile.email}
    </motion.button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Let's work together</h2>
        <p className="mx-auto mt-3 max-w-md text-neutral-600 dark:text-neutral-400">
          Open to backend and GenAI engineering opportunities — reach out through any of these.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <EmailButton />
          {socialLinks.map(({ label, href, icon: Icon, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Icon size={18} color={color} />
              {label}
            </motion.a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
