import { hackathons } from "../data/content";

export default function Hackathons() {
  return (
    <section id="hackathons" aria-label="Hackathons">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">tail -f /var/log/hackathons.log</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {hackathons.map((hack) => (
            <article key={hack.id} style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: 'var(--cli-muted)', width: '120px', flexShrink: 0 }}>
                [{hack.date.replace(/\s+/g, '')}]
              </span>
              <div>
                <span style={{ color: 'var(--cli-accent)', fontWeight: 'bold' }}>{hack.name.toUpperCase()}</span>
                <span style={{ color: 'var(--cli-muted)' }}> @ {hack.location}</span>
                <div style={{ marginTop: '0.2rem' }}>
                  <span className="cli-char">&gt;</span> {hack.description}
                </div>
                <div style={{ marginTop: '0.2rem', color: 'var(--cli-ok)' }}>
                  RESULT: {hack.result}
                </div>
              </div>
            </article>
          ))}
          <div style={{ color: 'var(--cli-muted)', fontStyle: 'italic', marginTop: '1rem' }}>
            tail: /var/log/hackathons.log: file truncated
          </div>
        </div>
      </div>
    </section>
  );
}
