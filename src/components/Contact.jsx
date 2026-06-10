import { contact } from "../data/content";

export default function Contact() {
  const links = [
    { value: contact.email, href: `mailto:${contact.email}`, port: "25/tcp", status: "open", service: "EMAIL" },
    { value: contact.github, href: contact.github, port: "443/tcp", status: "open", service: "GITHUB" },
    { value: contact.linkedin, href: contact.linkedin, port: "443/tcp", status: "open", service: "LINKEDIN" },
    { value: contact.instagram, href: contact.instagram, port: "443/tcp", status: "open", service: "INSTAGRAM" },
  ];

  return (
    <section id="contact" aria-label="Contact">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">nmap -p- -sV shaik.local</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          <div style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
            Starting Nmap 7.93 ( https://nmap.org ) at {new Date().toISOString().split('T')[0]} 00:00 UTC<br />
            Nmap scan report for shaik.local (192.168.1.100)<br />
            Host is up (0.0024s latency).<br />
            Not shown: 65531 closed tcp ports (reset)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '80px 60px 100px 1fr', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontWeight: 'bold', whiteSpace: 'nowrap', overflowX: 'auto' }}>
            <span>PORT</span>
            <span>STATE</span>
            <span>SERVICE</span>
            <span>ENDPOINT</span>
          </div>

          <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', overflowX: 'auto' }}>
            {links.map((link) => (
              <div key={link.service} style={{ display: 'grid', gridTemplateColumns: '80px 60px 100px 1fr', gap: '1rem', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <span style={{ color: 'var(--accent)' }}>{link.port}</span>
                <span style={{ color: 'var(--cli-ok)' }}>{link.status}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{link.service}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textDecorationColor: 'var(--border)', textUnderlineOffset: '4px', transition: 'all 0.2s' }} onMouseOver={(e) => {e.target.style.color = 'var(--accent)'; e.target.style.textDecorationColor = 'var(--accent)';}} onMouseOut={(e) => {e.target.style.color = 'var(--text-primary)'; e.target.style.textDecorationColor = 'var(--border)';}}>
                    {link.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ color: 'var(--text-dim)', lineHeight: '1.4' }}>
            Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds<br />
            <br />
            <span style={{ color: 'var(--cli-warn)', display: 'inline-block', border: '1px solid var(--cli-warn)', padding: '4px 8px', backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
              Ready to establish secure handshake. Click an endpoint to initiate connection.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
