import { events } from "../data/content";

export default function Events() {
  return (
    <section id="events" aria-label="Events Organized">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">systemctl status operations</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block">
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--cli-ok)' }}>●</span> operations.service - Event Organization & Leadership Logistics
            <br />
            &nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/operations.service; enabled)
            <br />
            &nbsp;&nbsp;&nbsp;Active: <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>active (running)</span> since system boot
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '1px solid var(--cli-border)', paddingLeft: '1rem' }}>
            {events.map((evt) => (
              <article key={evt.id}>
                <div style={{ color: 'var(--cli-text)', fontWeight: 'bold' }}>
                  {evt.date} portfolio systemd[1]: Executed "{evt.name}"
                </div>
                <div style={{ color: 'var(--cli-muted)', marginTop: '0.2rem' }}>
                  &nbsp;&nbsp;ROLE: {evt.role} | ATTENDEES: {evt.attendees}
                </div>
                <div style={{ color: 'var(--cli-text)', marginTop: '0.2rem' }}>
                  &nbsp;&nbsp;<span className="cli-char">↳</span> {evt.description}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
