import { SiGithub } from "react-icons/si";
import { TbBrandLinkedin, TbFileText, TbMail } from "react-icons/tb";
import { profile } from "../data/resume";
import { useCopy } from "../hooks/useCopy";

export function Hero() {
  const { message, copy } = useCopy(profile.email);
  return (
    <section className="hero" id="about" data-s="about">
      <p className="badge"><i className="dot" aria-hidden="true" />{profile.openTo}</p>
      <h1 className="name">{profile.name}</h1>
      <p className="roleline">{profile.title} <span>· {profile.roleNote}</span></p>
      <p className="tag">{profile.tagline}</p>
      <div className="ctas">
        <a className="btn btn-p" href="#contact">Get in touch</a>
        <a className="btn btn-s" href={profile.resume} target="_blank" rel="noopener"><TbFileText aria-hidden="true" />Résumé</a>
        <div className="socials">
          <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub (opens in new tab)"><SiGithub aria-hidden="true" /><span className="tip">GitHub</span></a>
          <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn (opens in new tab)"><TbBrandLinkedin aria-hidden="true" /><span className="tip">LinkedIn</span></a>
          <button type="button" onClick={copy} aria-label="Copy email address">
            <TbMail aria-hidden="true" />
            <span className={`tip${message ? " show" : ""}`} aria-live="polite">{message || "Copy email"}</span>
          </button>
        </div>
      </div>
      <a className="cue" href="#highlights"><i aria-hidden="true" />highlights</a>
    </section>
  );
}
