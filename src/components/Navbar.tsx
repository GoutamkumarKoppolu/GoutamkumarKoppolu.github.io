import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import { TbBriefcase, TbCode, TbMail, TbMoon, TbStack2, TbSun, TbUser } from "react-icons/tb";
import { profile } from "../data/resume";
import { useScrollEffect } from "../hooks/useScrollEffect";

const LINKS: { id: string; label: string; icon: IconType }[] = [
  { id: "about", label: "About", icon: TbUser },
  { id: "experience", label: "Experience", icon: TbBriefcase },
  { id: "skills", label: "Skills", icon: TbStack2 },
  { id: "projects", label: "Projects", icon: TbCode },
  { id: "contact", label: "Contact", icon: TbMail },
];

// Desktop: each link's track fills as you read its sections (sections carry data-s="<link id>"). Phones: bottom tab bar.
export function Navbar() {
  const [active, setActive] = useState("about");
  const segs = useRef<(HTMLElement | null)[]>([]);

  useScrollEffect(() => {
    const secs = [...document.querySelectorAll<HTMLElement>("main section[data-s]")];
    if (!secs.length) return;
    const mid = window.scrollY + window.innerHeight / 2;
    const end = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    setActive((secs.filter((s) => s.offsetTop <= mid).pop() ?? secs[0]).dataset.s!);
    LINKS.forEach(({ id }, i) => {
      const g = secs.filter((s) => s.dataset.s === id);
      if (!g.length || !segs.current[i]) return;
      const top = g[0].offsetTop, last = g[g.length - 1], bot = last.offsetTop + last.offsetHeight;
      segs.current[i]!.style.setProperty("--p", String(end ? 1 : Math.max(0, Math.min(1, (mid - top) / (bot - top)))));
    });
  });

  // index.html applies the saved theme before paint; CSS picks the sun/moon icon from data-theme
  const toggleTheme = () => {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#F8FAFC" : "#0F172A");
    try { localStorage.setItem("theme", theme); } catch { /* private mode: theme just isn't remembered */ }
  };

  const current = (id: string) => (active === id ? { className: "active", "aria-current": "location" as const } : {});

  return (
    <>
      <nav className="nav" aria-label="Sections">
        <a className="logo" href="#about">{profile.name}</a>
        <div className="links">
          {LINKS.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} {...current(id)}>
              {label}
              <i className="seg"><b ref={(el) => { segs.current[i] = el; }} /></i>
            </a>
          ))}
        </div>
        <button type="button" className="theme" onClick={toggleTheme} aria-label="Switch between light and dark mode">
          <TbSun className="sun" aria-hidden="true" /><TbMoon className="moon" aria-hidden="true" />
        </button>
      </nav>
      <nav className="dock" aria-label="Sections">
        {LINKS.map(({ id, label, icon: Icon }) => (
          <a key={id} href={`#${id}`} {...current(id)}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
