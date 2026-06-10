import { useState, useEffect } from "react";
import { contact } from "../data/content";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "01:ABOUT", href: "#about" },
  { label: "02:PROJECTS", href: "#projects" },
  { label: "03:HACKATHONS", href: "#hackathons" },
  { label: "04:EVENTS", href: "#events" },
  { label: "05:VOLUNTEERED", href: "#volunteered" },
  { label: "06:EXPERIENCE", href: "#experience" },
  { label: "07:SKILLS", href: "#skills" },
  { label: "08:CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="cli-status-bar" aria-label="System Navigation">
      <div className="cli-status-left">
        <span className="cli-status-block highlight">[ shaik@system ]</span>
        <span className="cli-status-block">root / dev / ops</span>
      </div>

      <ul className="cli-nav-links">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="cli-nav-link">
              [{item.label}]
            </a>
          </li>
        ))}
      </ul>

      <div className="cli-status-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="cli-social-strip" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderRight: '1px solid var(--border)', paddingRight: '1rem' }}>
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="Email (smtp)" title="smtp" style={{ display: 'flex', alignItems: 'center' }}>
            <FaEnvelope size={15} />
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="GitHub (git)" title="git" style={{ display: 'flex', alignItems: 'center' }}>
            <FaGithub size={15} />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="LinkedIn (net-link)" title="net-link" style={{ display: 'flex', alignItems: 'center' }}>
            <FaLinkedin size={15} />
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="Instagram (ig-feed)" title="ig-feed" style={{ display: 'flex', alignItems: 'center' }}>
            <FaInstagram size={15} />
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="cli-status-block" style={{ borderRight: 'none' }}>sys.status: <span className="cli-ok">OK</span></span>
          <span className="cli-status-block time">{time || "00:00:00"}</span>
        </div>
      </div>
    </nav>
  );
}
