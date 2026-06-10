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
  { label: "08:CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.cli-mobile-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
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
      <div className="cli-status-left">
        <span className="cli-status-block highlight">[ shaik@system ]</span>
        <span className="cli-status-block hide-on-mobile">root / dev / ops</span>
      </div>

      {/* Desktop Links */}
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
        <div className="cli-social-strip hide-on-mobile" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderRight: '1px solid var(--border)', paddingRight: '1rem' }}>
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
          <span className="cli-status-block hide-on-mobile" style={{ borderRight: 'none' }}>sys.status: <span className="cli-ok">OK</span></span>
          <span className="cli-status-block time">{time || "00:00:00"}</span>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="cli-mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          <span className="cli-hamburger-line"></span>
          <span className="cli-hamburger-line"></span>
          <span className="cli-hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        id="mobile-nav" 
        ref={menuRef}
        className={`cli-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
      >
        <div style={{ color: 'var(--cli-accent)', marginBottom: '0.5rem', fontWeight: 'bold' }}>[ NAVIGATION ]</div>
        <ul className="cli-mobile-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="cli-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="cli-mobile-socials">
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="Email" style={{ display: 'flex', alignItems: 'center' }}>
            <FaEnvelope size={18} />
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="GitHub" style={{ display: 'flex', alignItems: 'center' }}>
            <FaGithub size={18} />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center' }}>
            <FaLinkedin size={18} />
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="cli-nav-link" aria-label="Instagram" style={{ display: 'flex', alignItems: 'center' }}>
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
