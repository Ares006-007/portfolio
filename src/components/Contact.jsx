import { contact } from "../data/content";

export default function Contact() {
  const links = [
    { label: "email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "github", value: contact.github, href: contact.github },
    { label: "linkedin", value: contact.linkedin, href: contact.linkedin },
    { label: "twitter", value: contact.twitter, href: contact.twitter },
  ];

  return (
    <section className="section" id="contact" aria-label="Contact">
      <h2 className="section-header">Contact</h2>

      <p className="contact-prompt">
        <span className="caret">&gt;</span> reach out
      </p>

      <div className="contact-links">
        {links.map((link) => (
          <div key={link.label} className="contact-row">
            <span className="contact-label">{link.label}</span>
            <span className="contact-value">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.value}
              </a>
            </span>
          </div>
        ))}
      </div>

      <footer className="contact-footer">
        <p>Built from scratch. No templates.</p>
      </footer>
    </section>
  );
}
