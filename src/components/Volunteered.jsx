import { volunteeredEvents } from "../data/content";

export default function Volunteered() {
  return (
    <section id="volunteered" aria-label="Volunteered Events">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">dmesg | grep "volunteer_ops"</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {volunteeredEvents.map((vol, idx) => {
            // Mock kernel timestamp
            const dmesgTime = `[  ${(12.345678 + idx * 45.123).toFixed(6)}]`;
            
            return (
              <div key={vol.id} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px dotted var(--border)', paddingBottom: '0.8rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-dim)', whiteSpace: 'pre' }}>{dmesgTime}</span>
                  <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>volunteer_ops:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{vol.name}</span>
                  <span style={{ color: 'var(--text-dim)' }}>&lt;{vol.date}&gt;</span>
                </div>
                <div style={{ paddingLeft: '9.5rem', color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                  <span style={{ color: 'var(--accent)' }}>ROLE: {vol.role}</span>
                  <br />
                  <span style={{ color: 'var(--text-dim)' }}>kernel_msg: </span> {vol.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
