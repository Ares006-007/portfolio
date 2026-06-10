import { identity } from "../data/content";

const ASCII_LOGO = `
        /\\
       /  \\
      /____\\
      |    |
      |    |
     /|    |\\
    / |    | \\
   /  |____|  \\
  /___/____\\___\\
   |/|      |\\|
   |/        \\|
`;

export default function Hero() {
  return (
    <section id="hero" aria-label="Terminal Boot">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">sys_profile --identity --fetch</span>
      </div>

      <div className="cli-output" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div className="cli-ascii-art" style={{ color: 'var(--accent)', textShadow: '0 0 12px rgba(108, 59, 255, 0.4)', fontSize: '1.1rem', lineHeight: '1.2', fontWeight: 'bold', padding: '1rem', flexShrink: 0, minWidth: '200px', display: 'flex', justifyContent: 'center' }}>
          {ASCII_LOGO}
        </div>
        
        <div className="cli-output-block neofetch-stats" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, minWidth: '350px' }}>
          <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', fontSize: '1.1rem' }}>
            {identity.name.toLowerCase().replace(/\s+/g, '_')}@sys-core
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.6rem', lineHeight: '1.4' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>USER</span>
            <span style={{ color: 'var(--text-primary)' }}>{identity.name}</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>ROLE</span>
            <span style={{ color: 'var(--text-primary)' }}>{identity.role}</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>BASE</span>
            <span style={{ color: 'var(--text-primary)' }}>Bengaluru, India</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>STATUS</span>
            <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>[ ACTIVE_BUILD_MODE ]</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>DOMAINS</span>
            <span style={{ color: 'var(--text-primary)' }}>AI/ML, Mechatronics, Aerospace, Web</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>FOCUS</span>
            <span style={{ color: 'var(--text-primary)' }}>Hardware Prototyping & Intelligent Systems</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>STACK</span>
            <span style={{ color: 'var(--text-primary)' }}>Python, JS/React, FastAPI, Three.js, C++</span>

            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>MISSION</span>
            <span style={{ color: 'var(--text-primary)' }}>Combining software & systems thinking for real-world tech</span>
          </div>
          
          <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderTop: '1px dashed var(--border)', paddingTop: '1.2rem', maxWidth: '550px', lineHeight: '1.6' }}>
            <span className="cli-char" style={{ color: 'var(--cli-ok)' }}>&gt;</span> {identity.intro}
          </div>

          <div className="color-blocks" style={{ display: 'flex', gap: '0.4rem', marginTop: '1.5rem' }}>
            {['#050508', '#e8e8ec', '#6a6a7a', '#6c3bff', '#5a2ee0', '#3b82f6', '#10b981', '#f59e0b'].map(color => (
              <div key={color} style={{ width: '32px', height: '12px', backgroundColor: color, border: '1px solid rgba(255,255,255,0.1)' }}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
