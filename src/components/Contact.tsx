import { useEffect, useState } from "react";
import { TbBrandLinkedin, TbCopy, TbFileText, TbMail } from "react-icons/tb";
import { profile } from "../data/resume";
import { useCopy } from "../hooks/useCopy";
import { Section } from "./Section";

const indiaTime = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

export function Contact() {
  const { message, copy } = useCopy(profile.email);
  const [time, setTime] = useState(indiaTime);
  useEffect(() => {
    const t = setInterval(() => setTime(indiaTime()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <Section id="contact" group="contact" title="Contact">
      <div className="ct1">
        <span className="badge"><i className="dot" aria-hidden="true" />{profile.openTo}</span>
        <h3>Let's build something fast and reliable.</h3>
        <p className="lead">I'm looking for senior backend or lead roles where performance and safe releases matter. The quickest way to reach me is email.</p>
        <div className="mailrow">
          <span className="mail">{profile.email}</span>
          <button type="button" className="iconbtn" onClick={copy}>
            <TbCopy aria-hidden="true" /><span>Copy</span>
            <span className={`copied${message ? " show" : ""}`} aria-live="polite">{message}</span>
          </button>
        </div>
        <div className="ctas">
          <a className="btn btn-p" href={`mailto:${profile.email}`}><TbMail aria-hidden="true" />Email me</a>
          <a className="btn btn-s" href={profile.linkedin} target="_blank" rel="noopener"><TbBrandLinkedin aria-hidden="true" />LinkedIn</a>
          <a className="btn btn-s" href={profile.resume} target="_blank" rel="noopener"><TbFileText aria-hidden="true" />Resume</a>
        </div>
        <div className="meta">
          <span><b>based in</b> {profile.location}</span>
          <span><b>local time</b> <time suppressHydrationWarning>{time}</time> IST</span>
          <span><b>reply</b> usually within a day</span>
        </div>
      </div>
    </Section>
  );
}
