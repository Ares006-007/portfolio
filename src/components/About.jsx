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
        <span className="cli-command">./scripts/decrypt_profile.sh --target=self</span>
      </div>

      <div className="cli-output">
        <div style={{ color: 'var(--cli-warn)', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          <div>[SYS] Initiating profile decryption...</div>
          <div>[SYS] Bypassing security protocols... <span style={{ color: 'var(--cli-ok)' }}>OK</span></div>
          <div>[SYS] Assembling data blocks... <span style={{ color: 'var(--cli-ok)' }}>100%</span></div>
        </div>

        <div className="cli-output-block" style={{ border: '1px solid var(--border)', padding: '1.5rem', position: 'relative', backgroundColor: '#08080b' }}>
          <div style={{ position: 'absolute', top: '-10px', left: '10px', backgroundColor: 'var(--bg-deep)', padding: '0 10px', color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            [ IDENTITY_DATA_STREAM ]
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {about.paragraphs.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--text-dim)', userSelect: 'none', width: '80px', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>
                  0x{((i + 1) * 1024).toString(16).toUpperCase()}
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {p}
                </span>
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', bottom: '-10px', right: '10px', backgroundColor: 'var(--bg-deep)', padding: '0 10px', color: 'var(--cli-ok)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            EOF_REACHED
          </div>
        </div>
      </div>
    </section>
  );
}
