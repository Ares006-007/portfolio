import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <div className="cli-prompt-line">
        <span className="cli-user">guest</span>
        <span className="cli-char">@</span>
        <span className="cli-host">portfolio</span>
        <span className="cli-char">:</span>
        <span className="cli-path">~</span>
        <span className="cli-char">$</span>
        <span className="cli-command">tree -h -L 2 ./mission_archive/</span>
      </div>

      <div className="cli-output">
        <div className="cli-output-block" style={{ fontFamily: 'var(--font-mono)' }}>
          <div style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            ./mission_archive/
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {projects.map((proj, idx) => {
              const isLastProj = idx === projects.length - 1;
              const projPrefix = isLastProj ? '└── ' : '├── ';
              const childPrefix = isLastProj ? '    ' : '│   ';
              
              return (
                <div key={proj.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--text-dim)' }}>{projPrefix}</span>
                    <span style={{ color: 'var(--cli-warn)', fontWeight: 'bold' }}>[{proj.name.replace(/\s+/g, '_')}]</span>
                  </div>
                  
                  <div style={{ display: 'flex', color: 'var(--text-secondary)', paddingRight: '1rem' }}>
                    <span style={{ color: 'var(--text-dim)', whiteSpace: 'pre' }}>{childPrefix}├── </span>
                    <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>[desc]</span> 
                    {proj.description}
                  </div>
                  
                  <div style={{ display: 'flex', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-dim)', whiteSpace: 'pre' }}>{childPrefix}├── </span>
                    <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>[tech]</span> 
                    <span style={{ color: 'var(--accent)' }}>{proj.stack.join(", ")}</span>
                  </div>

                  <div style={{ display: 'flex', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-dim)', whiteSpace: 'pre' }}>{childPrefix}└── </span>
                    <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>[links]</span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                          <span style={{ color: 'var(--cli-ok)' }}>*</span>source
                        </a>
                      )}
                      {proj.live && (
                        <a href={proj.live} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                          <span style={{ color: 'var(--cli-ok)' }}>*</span>live_demo
                        </a>
                      )}
                    </div>
                  </div>
                  {!isLastProj && (
                    <div style={{ display: 'flex', color: 'var(--text-dim)', whiteSpace: 'pre' }}>
                      │
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div style={{ marginTop: '1rem', color: 'var(--text-dim)' }}>
            <br />
            {projects.length} directories, {projects.length * 3} files
          </div>
        </div>
      </div>
    </section>
  );
}
