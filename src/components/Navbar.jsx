import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "01:ABOUT", href: "#about" },
  { label: "02:PROJECTS", href: "#projects" },
  { label: "03:HACKATHONS", href: "#hackathons" },
  { label: "04:EVENTS", href: "#events" },
  { label: "05:SKILLS", href: "#skills" },
  { label: "06:CONTACT", href: "#contact" },
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

      <div className="cli-status-right">
        <span className="cli-status-block">sys.status: <span className="cli-ok">OK</span></span>
        <span className="cli-status-block time">{time || "00:00:00"}</span>
      </div>
    </nav>
  );
}
