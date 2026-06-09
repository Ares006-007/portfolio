import { contact } from "../data/content";

export default function Contact() {
  const links = [
    { label: "email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "github", value: contact.github, href: contact.github },
    { label: "linkedin", value: contact.linkedin, href: contact.linkedin },
    { label: "twitter", value: contact.twitter, href: contact.twitter },
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
        <span className="cli-command">ping connections --resolve</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block">
          <p style={{ color: 'var(--cli-muted)', marginBottom: '1.5rem' }}>
            PING connections (127.0.0.1) 56(84) bytes of data.
            <br/>
            Resolving secure channels...
          </p>

          <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
            {links.map((link) => (
              <div key={link.label} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ width: '100px', color: 'var(--cli-accent)', fontWeight: 'bold' }}>
                  {link.label.toUpperCase()}
                </span>
                <span className="cli-char">=&gt;</span>
                <span>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cli-text)', textDecoration: 'underline', textDecorationColor: 'var(--cli-border)', textUnderlineOffset: '4px' }}>
                    {link.value}
                  </a>
                </span>
                <span style={{ color: 'var(--cli-ok)', marginLeft: 'auto' }}>time=14ms</span>
              </div>
            ))}
          </div>

          <footer className="contact-footer" style={{ borderTop: '1px solid var(--cli-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', color: 'var(--cli-muted)', fontSize: '0.85rem' }}>
            <span>--- connections ping statistics ---</span>
            <span>4 packets transmitted, 4 received, 0% packet loss</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
