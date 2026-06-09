import { identity } from "../data/content";

const ASCII_LOGO = `
    .oodMMMMmoo.
  .dMMMMMMMMMMMMb.
 .MMMMMMMMMMMMMMMM.
 MMMMMMMMMMMMMMMMMM
 MMMMMMMMMMMMMMMMMM
 \`MMMMMMMMMMMMMMMM'
  \`VMMMMMMMMMMMMV'
    \`+odMMMMdo+'
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
        <span className="cli-command">neofetch --target=shaik</span>
      </div>

      <div className="cli-output" style={{ display: 'flex', gap: '3rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div className="cli-ascii-art" style={{ color: 'var(--accent)', textShadow: '0 0 10px var(--accent-glow)' }}>
          {ASCII_LOGO}
        </div>
        
        <div className="cli-output-block neofetch-stats" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: '300px' }}>
          <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
            shaik@portfolio-sys
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>OS</span>
            <span style={{ color: 'var(--text-primary)' }}>Arch Linux x86_64</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Kernel</span>
            <span style={{ color: 'var(--text-primary)' }}>6.6.10-arch1-1</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Uptime</span>
            <span style={{ color: 'var(--text-primary)' }}>4 days, 20 hours, 14 mins</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Packages</span>
            <span style={{ color: 'var(--text-primary)' }}>1420 (pacman), 8 (flatpak)</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Shell</span>
            <span style={{ color: 'var(--text-primary)' }}>zsh 5.9</span>
            
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Resolution</span>
            <span style={{ color: 'var(--text-primary)' }}>1920x1080</span>
          </div>

          <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border)', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.5rem' }}>
            <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>User</span>
            <span style={{ color: 'var(--text-primary)' }}>{identity.name}</span>

            <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>Role</span>
            <span style={{ color: 'var(--text-primary)' }}>{identity.role}</span>

            <span style={{ color: 'var(--cli-ok)', fontWeight: 'bold' }}>Status</span>
            <span style={{ color: 'var(--text-primary)' }}>[ ONLINE ]</span>
          </div>
          
          <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic', maxWidth: '500px' }}>
            <span className="cli-char" style={{ color: 'var(--text-dim)' }}>&gt;</span> {identity.intro}
          </div>

          <div className="color-blocks" style={{ display: 'flex', gap: '0.3rem', marginTop: '1.5rem' }}>
            {['#050508', '#e8e8ec', '#6a6a7a', '#6c3bff', '#5a2ee0', '#3b82f6', '#10b981', '#f59e0b'].map(color => (
              <div key={color} style={{ width: '24px', height: '12px', backgroundColor: color, border: '1px solid rgba(255,255,255,0.1)' }}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
