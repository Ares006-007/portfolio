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
        <span className="cli-command">systemctl status operations.service</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          <div style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
            <span style={{ color: 'var(--cli-ok)' }}>●</span> <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>operations.service - Event Organization & Leadership Logistics</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;&nbsp;Loaded:</span> <span style={{ color: 'var(--text-secondary)' }}>loaded (/etc/systemd/system/operations.service; enabled; vendor preset: enabled)</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;&nbsp;Active:</span> <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>active (running)</span> <span style={{ color: 'var(--text-secondary)' }}>since Sun 2023-10-01 14:00:00 UTC; 8 months 8 days ago</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Docs:</span> <span style={{ color: 'var(--accent)' }}>man:operations(8)</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;Main PID:</span> <span style={{ color: 'var(--text-primary)' }}>1045 (ops-manager)</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tasks:</span> <span style={{ color: 'var(--text-primary)' }}>{events.length} (limit: 4915)</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;&nbsp;&nbsp;Memory:</span> <span style={{ color: 'var(--text-primary)' }}>42.0M</span>
            <br />
            <span style={{ color: 'var(--text-dim)' }}>&nbsp;&nbsp;&nbsp;&nbsp;CGroup:</span> <span style={{ color: 'var(--text-secondary)' }}>/system.slice/operations.service</span>
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─1045 /usr/bin/ops-manager --daemon</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {events.map((evt, idx) => {
              const hexAddr = `0x${(1045 + idx * 8).toString(16).padStart(4, '0')}`;
              const timestamp = evt.date.substring(0, 3) + " " + (10 + idx).toString().padStart(2, '0') + " 09:00:00";

              return (
                <div key={evt.id} style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-dim)' }}>{timestamp} portfolio ops-manager[{hexAddr}]:</span> 
                    <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginLeft: '0.5rem' }}>Executed "{evt.name}"</span>
                  </div>
                  <div style={{ color: 'var(--text-dim)', paddingLeft: '2rem', marginTop: '0.2rem' }}>
                    ROLE: {evt.role} | ATTENDEES: {evt.attendees}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', paddingLeft: '2rem', marginTop: '0.2rem', lineHeight: '1.4' }}>
                    {evt.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
