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
        <span className="cli-command">ls -la ./projects/</span>
      </div>

      <div className="cli-output">
        <div className="cli-table-header" style={{ display: 'flex', color: 'var(--cli-muted)', marginBottom: '1rem', borderBottom: '1px solid var(--cli-border)', paddingBottom: '0.5rem' }}>
          <span style={{ width: '120px' }}>PERMISSIONS</span>
          <span style={{ width: '100px' }}>OWNER</span>
          <span style={{ width: '100px' }}>SIZE</span>
          <span style={{ flex: 1 }}>PROJECT_NAME / DETAILS</span>
        </div>

        <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((proj) => (
            <article key={proj.id} className="project-entry" style={{ display: 'flex' }}>
              <span style={{ width: '120px', color: 'var(--cli-ok)' }}>drwxr-xr-x</span>
              <span style={{ width: '100px', color: 'var(--cli-text)' }}>shaik</span>
              <span style={{ width: '100px', color: 'var(--cli-muted)' }}>4.2K</span>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: 'var(--cli-accent)', fontSize: '1rem' }}>./{proj.name.toLowerCase().replace(/\s+/g, '-')}</h3>
                
                <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem', color: 'var(--cli-text)' }}>
                  {proj.description}
                </div>

                <div style={{ color: 'var(--cli-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  [STACK]: {proj.stack.join(" | ")}
                </div>

                <div className="project-links" style={{ display: 'flex', gap: '1rem' }}>
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                      <span className="cli-char">↳</span> [source_code]
                    </a>
                  )}
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                      <span className="cli-char">↳</span> [live_deployment]
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
