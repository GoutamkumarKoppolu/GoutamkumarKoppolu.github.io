import { TbArrowUp } from "react-icons/tb";
import { profile } from "../data/resume";

export function Footer() {
  return (
    <footer className="f1">
      <div className="in">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href={profile.source} target="_blank" rel="noopener">Built with React &amp; Tailwind · source ↗</a>
        <a className="totop" href="#about">Back to top <TbArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
