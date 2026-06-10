import { useState, useEffect, useRef } from "react";
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
  { label: "08:ROADMAP", href: "#roadmap" },
  { label: "09:CONTACT", href: "#contact" },
];

const PRIMARY_NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [time, setTime] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.cli-nav-toggle')) {
        setIsNavOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsNavOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <nav className="cli-status-bar" aria-label="System Navigation" style={{ position: 'sticky' }}>
      {/* Left: Identity and Path */}
      <div className="cli-status-left">
        <span className="cli-status-block highlight">[ shaik@system ]</span>
        <span className="cli-status-block hide-on-mobile" style={{ marginLeft: '0.5rem' }}>~/portfolio</span>
      </div>

      {/* Center: Primary Navigation */}
      <ul className="cli-nav-links hide-on-mobile" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        {PRIMARY_NAV.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="cli-nav-link">
              [{item.label}]
            </a>
          </li>
        ))}
      </ul>

      {/* Right: Status, Time, Hamburger */}
      <div className="cli-status-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hide-on-mobile">
          <span className="cli-status-block" style={{ borderRight: 'none' }}>sys.status: <span className="cli-ok">OK</span></span>
          <span className="cli-status-block time">{time || "00:00:00"}</span>
        </div>

        <button 
          className="cli-nav-toggle" 
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-expanded={isNavOpen}
          aria-controls="system-nav"
          aria-label="Toggle navigation menu"
        >
          <span className="cli-hamburger-line"></span>
          <span className="cli-hamburger-line"></span>
          <span className="cli-hamburger-line"></span>
        </button>
      </div>

      {/* Expanded Menu Panel */}
      <div 
        id="system-nav" 
        ref={menuRef}
        className={`cli-nav-menu ${isNavOpen ? 'open' : ''}`}
      >
        <div style={{ color: 'var(--cli-accent)', marginBottom: '0.5rem', fontWeight: 'bold' }}>[ FULL NAVIGATION ]</div>
        <ul className="cli-nav-menu-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="cli-nav-link" onClick={() => setIsNavOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="cli-nav-socials">
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="Email" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaEnvelope size={18} /> <span style={{ fontSize: '0.8rem' }}>Email</span>
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="GitHub" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaGithub size={18} /> <span style={{ fontSize: '0.8rem' }}>GitHub</span>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaLinkedin size={18} /> <span style={{ fontSize: '0.8rem' }}>LinkedIn</span>
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="Instagram" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaInstagram size={18} /> <span style={{ fontSize: '0.8rem' }}>Instagram</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
