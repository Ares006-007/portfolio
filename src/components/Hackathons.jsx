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
        <span className="cli-command">tail -f /var/log/competitions.log</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          {hackathons.map((hack, idx) => {
            // Mock PID and Log level based on result string if possible
            const pid = 1042 + idx * 17;
            const isWin = hack.result.toLowerCase().includes('win') || hack.result.toLowerCase().includes('1st') || hack.result.toLowerCase().includes('runner');
            const level = isWin ? 'SUCCESS' : 'INFO';
            const levelColor = isWin ? 'var(--cli-ok)' : 'var(--accent)';
            const timestamp = hack.date.replace(/\s+/g, '');

            return (
              <div key={hack.id} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--border)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-dim)' }}>[{timestamp}]</span>
                  <span style={{ color: levelColor, fontWeight: 'bold' }}>[{level}]</span>
                  <span style={{ color: 'var(--text-dim)' }}>[PID:{pid}]</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{hack.name.toUpperCase()}</span>
                </div>
                <div style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                  <span style={{ color: 'var(--text-dim)' }}>LOC:</span> {hack.location} <br />
                  <span style={{ color: 'var(--text-dim)' }}>MSG:</span> {hack.description} <br />
                  <span style={{ color: 'var(--text-dim)' }}>OUT:</span> <span style={{ color: levelColor }}>{hack.result}</span>
                </div>
              </div>
            );
          })}
          <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '1rem', animation: 'blink 2s infinite' }}>
            _
          </div>
        </div>
      </div>
    </section>
  );
}
