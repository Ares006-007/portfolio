import { about } from "../data/content";

export default function About() {
  return (
    <section id="about" aria-label="About">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">cat identity.md</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block">
          {about.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: i === about.paragraphs.length - 1 ? 0 : '1rem' }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
